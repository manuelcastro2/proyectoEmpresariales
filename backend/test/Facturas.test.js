const request = require('supertest');
const app = require('../app');
const factura = require('../models/facturasModel')
const bodega = require('../models/bodegasModel')

jest.mock('../models/facturasModel')
jest.mock('../models/bodegasModel')
const facturaSet = [
    {
        nroFactura: 1,
        tipoFactura: "FacturaCompra",
        tercero: {
            nombre: "diego villanueva",
            tipoTercero: "proveedor",
            documento: "1234566789",
            direccion: "calle 67 #7-22",
            telefono: 3208946678
        },
        fecha: Date.parse("2023-11-15"),
        bodega: {
            nombre: "la cascanueses",
            direccion: "calle 68 6-77"
        },
        elementos: [
            {
                codigoProducto: 1,
                nombre: "cartulina azul",
                valorUnitario: 1600,
                porcentaje: 0.19,
                unidadMedida: "unidad",
                cantidad: 5,
            },
        ],
        totalOperacion: 32130
    },
    {
        nroFactura: 2,
        tipoFactura: "FacturaCompra",
        tercero: {
            nombre: "diego villanueva",
            tipoTercero: "proveedor",
            documento: "1234566789",
            direccion: "calle 67 #7-22",
            telefono: 3208946678
        },
        fecha: Date.parse("2023-11-15"),
        bodega: {
            nombre: "la cascanueses",
            direccion: "calle 68 6-77"
        },
        elementos: [
            {
                codigoProducto: 1,
                nombre: "cartulina azul",
                valorUnitario: 1600,
                porcentaje: 0.19,
                unidadMedida: "unidad",
                cantidad: 5,
            },
        ],
        totalOperacion: 32130
    }
]

const nuevaFactura = {

    nroFactura: 1,
    tipoFactura: "FacturaCompra",
    tercero: {
        nombre: "diego villanueva",
        tipoTercero: "proveedor",
        documento: "1234566789",
        direccion: "calle 67 #7-22",
        telefono: 3208946678
    },
    fecha: {
        $date: "2023-11-15T00:00:00.000Z"
    },
    bodega: {
        nombre: "la cascanueses",
        direccion: "calle 68 6-77"
    },
    elementos: [
        {
            codigoProducto: 1,
            nombre: "cartulina azul",
            valorUnitario: 1600,
            porcentaje: 0.19,
            unidadMedida: "unidad",
            cantidad: 5,
        },
    ],
    totalOperacion: 32130
}


const facturaActualizar = {
    nroFactura: 1,
    tipoFactura: "FacturaCompra",
    tercero: {
        nombre: "diego actualizado",
        tipoTercero: "proveedor",
        documento: "1234566789",
        direccion: "calle actualizada",
        telefono: 3000000000,
    },
    fecha: Date.parse("2023-11-15"),
    bodega: {
        _id: "abc123",
        nombre: "bodega actualizada",
        direccion: "nueva dirección",
    },
    elementos: [
        {
            codigoProducto: 2,
            nombre: "papel",
            valorUnitario: 2000,
            porcentaje: 0.19,
            unidadMedida: "unidad",
            cantidad: 10,
        }
    ],
    totalOperacion: 23800
};

factura.find.mockImplementation((filtro = {}) => {
    if (filtro.fecha && filtro.fecha["$gte"] && filtro.fecha["$lte"]) {
        return Promise.resolve(
            facturaSet.filter(f => {
                const fechaFactura = new Date(f.fecha);
                return fechaFactura >= filtro.fecha["$gte"] && fechaFactura <= filtro.fecha["$lte"];
            })
        );
    }

    const resultado = facturaSet.filter(usuario =>
        Object.entries(filtro).every(
            ([clave, valor]) => usuario[clave] == valor
        )
    );
    return Promise.resolve(resultado);
});

describe("test unitarios de facturas", () => {
    test('Debería obtener lista de facturas', async () => {
        const response = await request(app).get('/facturas/');
        expect(response.body.facturas.length).toBe(2);
        expect(Array.isArray(response.body.facturas)).toBe(true)
    });

    test('La lista de facturas no debe venir vacia', async () => {
        const response = await request(app).get('/facturas');
        expect(response.body.facturas.length).toBeGreaterThan(0);
    });

    test('busqueda de facturas valido', async () => {
        const response = await request(app).post(`/facturas/filtro`).send({ nroFactura: 1 })
        expect(Array.isArray(response.body.facturas)).toBe(true);
        expect(response.body.facturas.length).toBe(1)
    });

    test('busqueda de facturas no encontrado', async () => {
        const response = await request(app).post(`/facturas/filtro`).send({ nroFactura: 3 })

        expect(response.body.facturas.length).toBe(0);
    });

    test("Crear un nuevo factura", async () => {

        factura.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevaFactura)
        }));

        const response = await request(app).post(`/facturas/`).send(nuevaFactura);
        expect(response.body.facturas).toBeInstanceOf(Object);
        expect(response.body.facturas).toMatchObject(nuevaFactura);
    })

    test("cuando el bodega no se crea correctamente", async () => {
        const nuevaFactura = {}

        factura.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevaFactura)
        }));

        const response = await request(app).post(`/facturas/`).send(nuevaFactura);

        expect(response.body.facturas).toEqual({});
        expect(response.body.facturas).not.toContainEqual(nuevaFactura)
    })


    test('Debe actualizar correctamente la bodega y la factura', async () => {
        bodega.updateOne.mockResolvedValue({ acknowledged: true, modifiedCount: 1 });
        factura.updateOne.mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

        const response = await request(app)
            .patch('/facturas/')
            .send(facturaActualizar);

        expect(bodega.updateOne).toHaveBeenCalledWith(
            { _id: facturaActualizar.bodega._id },
            facturaActualizar.bodega
        );

        expect(factura.updateOne).toHaveBeenCalledWith(
            { nroFactura: facturaActualizar.nroFactura },
            facturaActualizar
        );

        expect(response.statusCode).toBe(200);
        expect(response.body.facturas).toEqual({ acknowledged: true, modifiedCount: 1 });
    });

    test('Debe retornar error si ocurre una falla', async () => {
        bodega.updateOne.mockRejectedValue(new Error('Error en bodega'));

        const response = await request(app)
            .patch('/facturas/')
            .send(facturaActualizar);

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('mensaje', 'Error en bodega');
    }, 10000);

    test('Eliminar factura', async () => {

        const id = "sdj21nbsdh1212"

        factura.deleteOne = jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 });
        const response = await request(app)
            .delete(`/facturas/${id}`)

        expect(factura.deleteOne).toHaveBeenCalledWith({ _id: id });
        expect(response.body.facturas).toEqual({ acknowledged: true, deletedCount: 1 });
    });

    test('Debe devolver facturas dentro del rango de fechas', async () => {

        const fechaInicio = '2023-10-15';
        const fechaFinal = '2023-11-20';

        const response = await request(app).get(`/facturas/filtrofecha/${fechaInicio}/${fechaFinal}`);
        console.log(response.body.facturas);
        
        expect(response.body.facturas).toHaveLength(2);
        expect(response.body.facturas[0].nroFactura).toBe(1);

    })
})


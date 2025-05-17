const request = require('supertest');
const app = require('../app');
const bodega = require('../models/bodegasModel')

jest.mock('../models/bodegasModel')

const bodegaSet = [
    {
        nombre: "la cascanueses",
        direccion: "calle 68 6-77",
        productos: [
            {
                codigoProducto: 1,
                nombre: "cartulina azul",
                tipoProducto: "cartulina",
                unidadMedida: "unidad",
                valorUnitario: 1600,
                existencias: null,
                porcentaje: 0.19,
            }
        ]
    },
    {
        nombre: "la macara",
        direccion: "calle 27 6-77",
        productos: [
            {
                codigoProducto: 1,
                nombre: "cartulina azul",
                tipoProducto: "cartulina",
                unidadMedida: "unidad",
                valorUnitario: 1600,
                existencias: null,
                porcentaje: 0.19,
            }
        ]
    }
]

const nuevobodega = {

    nombre: "la cocoa",
    direccion: "calle 68 6-77",
    productos: [
        {
            codigoProducto: 1,
            nombre: "cartulina azul",
            tipoProducto: "cartulina",
            unidadMedida: "unidad",
            valorUnitario: 1600,
            existencias: null,
            porcentaje: 0.19,
        }
    ]
}


bodega.find.mockImplementation((filtro = {}) => {
    const resultado = bodegaSet.filter(usuario =>
        Object.entries(filtro).every(
            ([clave, valor]) => usuario[clave] == valor
        )
    );
    return Promise.resolve(resultado);
});

describe("test unitarios de bodegas", () => {
    test('Debería obtener lista de bodegas', async () => {
        const response = await request(app).get('/bodegas/');
        expect(response.body.bodegas.length).toBe(2);
        expect(Array.isArray(response.body.bodegas)).toBe(true)
    });

    test('La lista de bodegas no debe venir vacia', async () => {
        const response = await request(app).get('/bodegas');
        expect(response.body.bodegas.length).toBeGreaterThan(0);
    });

    test('busqueda de bodegas valido', async () => {
        const response = await request(app).get(`/bodegas/la macara`)
        expect(Array.isArray(response.body.bodegas)).toBe(true);
        expect(response.body.bodegas.length).toBe(1)
    });

    test('busqueda de bodegas no encontrado', async () => {
        const response = await request(app).get(`/bodegas/los macara`)
         
        expect(response.body.bodegas.length).toBe(0);
    });

    test("Crear un nuevo bodega", async () => {

        bodega.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevobodega)
        }));

        const response = await request(app).post(`/bodegas/`).send(nuevobodega);
        expect(response.body.bodegas).toBeInstanceOf(Object);
        expect(response.body.bodegas).toMatchObject(nuevobodega);
    })

    test("cuando el bodega no se crea correctamente", async () => {
        const nuevobodega = {}

        bodega.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevobodega)
        }));

        const response = await request(app).post(`/bodegas/`).send(nuevobodega);

        expect(response.body.bodegas).toEqual({});
        expect(response.body.bodegas).not.toContainEqual(nuevobodega)
    })

    test('Actualizar un bodega correctamente', async () => {
        const bodegaActualizado = {
            _id : "sdj21nbsdh1212",
            codigobodega: 1,
            nombre: "cartulina verde",
            descripcion: "cartulina escolar verde",
            tipobodega: "cartulina",
            existencias: 5,
            unidadMedida: "unidad",
            valorUnitario: 1600,
            porcentaje: 0.19
        }

        bodega.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

        const response = await request(app)
            .patch('/bodegas/')
            .send(bodegaActualizado);

        expect(bodega.updateOne).toHaveBeenCalledWith({ _id: bodegaActualizado._id }, bodegaActualizado);
        expect(response.body.bodegas).toEqual({ acknowledged: true, modifiedCount: 1 });
    });

    test('Actualizar un usuario incorrectamente', async () => {
        const usuarioActualizado = {
            nombre: "cartulina verde",
            _id : "sdj21nbsdh1212",
            descripcion: "cartulina escolar verde",
            tipobodega: "cartulina",
            existencias: 5,
            unidadMedida: "unidad",
            valorUnitario: 1600,
            porcentaje: 0.19
        }

        bodega.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 0 });
        const response = await request(app)
            .patch('/bodegas/')
            .send(usuarioActualizado);

        expect(bodega.updateOne).toHaveBeenCalledWith({_id:"sdj21nbsdh1212"}, usuarioActualizado);
        expect(response.body.bodegas).toEqual({ acknowledged: true, modifiedCount: 0 });
    });

    test('Eliminar bodega', async () => {

        const id = "sdj21nbsdh1212"

        bodega.deleteOne = jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 });
        const response = await request(app)
            .delete(`/bodegas/${id}`)

        expect(bodega.deleteOne).toHaveBeenCalledWith({ _id: id });
        expect(response.body.bodegas).toEqual({ acknowledged: true, deletedCount: 1 });
    });
})


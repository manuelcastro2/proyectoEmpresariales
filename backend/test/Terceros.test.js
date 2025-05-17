const request = require('supertest');
const app = require('../app');
const Tercero = require('../models/tercerosModel')

jest.mock('../models/tercerosModel')

const terceroSet = [
    {
        nombre: "Juan Rodriguez",
        tipoTercero: "Proveedor",
        tipoDocumento: "Cedula",
        documento: "12345678",
        direccion: "calle 66 #6-22",
        telefono: 325323223232
    },
    {
        nombre: "Mario Castaño",
        tipoTercero: "Proveedor",
        tipoDocumento: "Cedula",
        documento: "23421323",
        direccion: "calle 27 #18-15",
        telefono: 325323223232
    }
]

const nuevoTercero = {
    nombre: "Mario del Rio",
    tipoTercero: "Proveedor",
    tipoDocumento: "Cedula",
    documento: "23421323",
    direccion: "calle 27 #18-15",
    telefono: 325323223232
}

Tercero.find.mockImplementation((filtro = {}) => {
    const resultado = terceroSet.filter(usuario =>
        Object.entries(filtro).every(
            ([clave, valor]) => usuario[clave] == valor
        )
    );
    return Promise.resolve(resultado);
});

describe("test unitarios de tercreos", () => {
    test('Debería obtener lista de terceros', async () => {
        const response = await request(app).get('/terceros/');
        expect(response.body.thirds.length).toBe(2);
        expect(Array.isArray(response.body.thirds)).toBe(true)
    });

    test('La lista de terceros no debe venir vacia', async () => {
        const response = await request(app).get('/terceros');
        expect(response.body.thirds.length).toBeGreaterThan(0);
    });

    test('busqueda de tercero valido', async () => {
        const response = await request(app).get(`/terceros/Proveedor`);
        expect(Array.isArray(response.body.thirds)).toBe(true);
        expect(response.body.thirds.length).toBe(2)
    });

    test('busqueda de tercero no encontrado', async () => {
        const response = await request(app).get(`/terceros/Cliente`);
        console.log(response.body.thirds);
        expect(response.body.thirds.length).toBe(0);
    });

    test('Buscar el tercero por cedula,es encontrado', async () => {
        const response = await request(app).post(`/terceros/documento`).send({ documento: "23421323" });
        expect(Array.isArray(response.body.thirds)).toBe(true);
        expect(response.body.thirds[0]).toHaveProperty('nombre', 'Mario Castaño')
        expect(response.body.thirds[0]).toHaveProperty('documento', "23421323")
    });

      test('Buscar el tercero por cedula, no es encontrado', async () => {
            const response = await request(app).post(`/terceros/documento`).send({ cedula: "123456755544" });
            expect(Array.isArray(response.body.thirds)).toBe(true);
            expect(response.body.thirds.length).toBe(0)
        });

    test("Crear un nuevo tercero", async () => {

        Tercero.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevoTercero)
        }));

        const response = await request(app).post(`/terceros/`).send(nuevoTercero);
        expect(response.body.thirds).toBeInstanceOf(Object);
        expect(response.body.thirds).toMatchObject(nuevoTercero);
    })

    test("cuando el tercero no se crea correctamente", async () => {
        const nuevoTercero = {}

        Tercero.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevoTercero)
        }));

        const response = await request(app).post(`/terceros/`).send(nuevoTercero);

        expect(response.body.thirds).toEqual({});
        expect(response.body.thirds).not.toContainEqual(nuevoTercero)
    })

    test('Actualizar un tercero correctamente', async () => {
        const terceroActualizado =  {
        nombre: "Mario Calderon",
        tipoTercero: "Cliente",
        tipoDocumento: "Cedula",
        documento: "23421323",
        direccion: "calle 27 #18-15",
        telefono: 325323223232
    }

        Tercero.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

        const response = await request(app)
            .patch('/terceros/')
            .send(terceroActualizado);

        expect(Tercero.updateOne).toHaveBeenCalledWith({ documento: "23421323" }, terceroActualizado);
        expect(response.body.thirds).toEqual({ acknowledged: true, modifiedCount: 1 });
    });

    test('Actualizar un usuario incorrectamente', async () => {
        const usuarioActualizado =  {
        nombre: "Mario Calderon",
        tipoTercero: "Cliente",
        tipoDocumento: "Cedula",
        direccion: "calle 27 #18-15",
        telefono: 325323223232
    }

        Tercero.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 0 });
        const response = await request(app)
            .patch('/terceros/')
            .send(usuarioActualizado);

        expect(Tercero.updateOne).toHaveBeenCalledWith({}, usuarioActualizado);
        expect(response.body.thirds).toEqual({ acknowledged: true, modifiedCount: 0 });
    });

    test('Eliminar usuario', async () => {

        const id = "sdj21nbsdh1212"

        Tercero.deleteOne = jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 });
        const response = await request(app)
            .delete(`/terceros/${id}`)

        expect(Tercero.deleteOne).toHaveBeenCalledWith({ _id: id });
        expect(response.body.thirds).toEqual({ acknowledged: true, deletedCount: 1 });
    });
})


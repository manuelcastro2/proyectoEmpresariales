const request = require('supertest');
const app = require('../app');
const user = require('../models/usuariosModel')

jest.mock('../models/usuariosModel')

const usuarioSet = [
    {
        nombre: "Juan",
        apellido: "Rodriguez",
        cedula: "125434566",
        rol: "ventas",
        clave: "prueb@12"
    },
    {
        nombre: "Mario",
        apellido: "Cañas",
        cedula: "3421762",
        rol: "Bodegas",
        clave: "prueb@234"
    }
]

const nuevoUsuario = {
    nombre: "Carlos",
    apellido: "Guajiro",
    cedula: "123456789",
    rol: "Admiinistrador",
    clave: "prueb@admin"
}

user.find.mockImplementation((filtro = {}) => {
    const resultado = usuarioSet.filter(usuario =>
        Object.entries(filtro).every(
            ([clave, valor]) => usuario[clave] == valor
        )
    );
    return Promise.resolve(resultado);
});

describe("test unitarios de usuarios", () => {
    test('Debería obtener lista de usuarios', async () => {
        const response = await request(app).get('/usuarios');
        expect(response.body.users.length).toBe(2);
        expect(Array.isArray(response.body.users)).toBe(true)
    });

    test('La lista de usuarios no debe venir vacia', async () => {
        const response = await request(app).get('/usuarios');
        expect(response.body.users.length).toBeGreaterThan(0);
    });

    test('busqueda de usuario validad', async () => {
        const response = await request(app).get(`/usuarios/ventas`);
        expect(Array.isArray(response.body.users)).toBe(true);
        expect(response.body.users[0]).toHaveProperty('nombre', 'Juan')
    });

    test('busqueda de usuario no encontrado', async () => {
        const response = await request(app).get(`/usuarios/administrador`);
        expect(response.body.users.length).toBe(0);
    });

    test('Buscar el usuario por cedula,es encontrado', async () => {
        const response = await request(app).post(`/usuarios/documento`).send({ cedula: "3421762" });
        expect(Array.isArray(response.body.users)).toBe(true);
        expect(response.body.users[0]).toHaveProperty('apellido', 'Cañas')
        expect(response.body.users[0]).toHaveProperty('cedula', "3421762")
    });

  test('Buscar el usuario por cedula, no es encontrado', async () => {
        const response = await request(app).post(`/usuarios/documento`).send({ cedula: "123456755544" });
        expect(Array.isArray(response.body.users)).toBe(true);
        expect(response.body.users.length).toBe(0)
    });

    test("Crear un nuevo usuario", async () => {

        user.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevoUsuario)
        }));

        const response = await request(app).post(`/usuarios/`).send(nuevoUsuario);
        expect(response.body.users).toBeInstanceOf(Object);
        expect(response.body.users).toMatchObject(nuevoUsuario);
    })

    test("cuando el usuario no se crea correctamente", async () => {
        const nuevoUsuario = {}

        user.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevoUsuario)
        }));

        const response = await request(app).post(`/usuarios/`).send(nuevoUsuario);

        expect(response.body.users).toEqual({});
        expect(response.body.users).not.toContainEqual(nuevoUsuario)
    })

    test('Actualizar un usuario correctamente', async () => {
        const usuarioActualizado = {
            nombre: "Mario",
            apellido: "Cañas",
            cedula: "3421762",
            rol: "ventas",
            clave: "nuevaClave456"
        };

        user.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

        const response = await request(app)
            .patch('/usuarios/')
            .send(usuarioActualizado);

        expect(user.updateOne).toHaveBeenCalledWith({ cedula: "3421762" }, usuarioActualizado);
        expect(response.body.users).toEqual({ acknowledged: true, modifiedCount: 1 });
    });

    test('Actualizar un usuario incorrectamente', async () => {
        const usuarioActualizado = {
            nombre: "Mario",
            apellido: "Cañas",
            rol: "ventas",
            clave: "nuevaClave456"
        };

        user.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 0 });
        const response = await request(app)
            .patch('/usuarios/')
            .send(usuarioActualizado);

        expect(user.updateOne).toHaveBeenCalledWith({}, usuarioActualizado);
        expect(response.body.users).toEqual({ acknowledged: true, modifiedCount: 0 });
    });

    test('Eliminar usuario', async () => {

        const id="sdj21nbsdh1212"
      
        user.deleteOne = jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 });
        const response = await request(app)
            .delete(`/usuarios/${id}`)

        expect(user.deleteOne).toHaveBeenCalledWith({_id:id});
        expect(response.body.users).toEqual({ acknowledged: true, deletedCount: 1 });
    });
})


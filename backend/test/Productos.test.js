const request = require('supertest');
const app = require('../app');
const producto = require('../models/productosModel')

jest.mock('../models/productosModel')

const productoSet = [
    {
        codigoProducto: 1,
        nombre: "cartulina azul",
        descripcion: "cartulina escolar azul",
        tipoProducto: "cartulina",
        existencias: 5,
        unidadMedida: "unidad",
        valorUnitario: 1600,
        porcentaje: 0.19
    },
    {
        codigoProducto: 2,
        nombre: "cartulina roja",
        descripcion: "cartulina escolar roja",
        tipoProducto: "cartulina",
        existencias: 5,
        unidadMedida: "unidad",
        valorUnitario: 1600,
        porcentaje: 0.19
    }
]

const nuevoProducto = {
    codigoProducto: 1,
    nombre: "cartulina amarilla",
    descripcion: "cartulina escolar amarilla",
    tipoProducto: "cartulina",
    existencias: 5,
    unidadMedida: "unidad",
    valorUnitario: 1600,
    porcentaje: 0.19
}

producto.find.mockImplementation((filtro = {}) => {
    const resultado = productoSet.filter(usuario =>
        Object.entries(filtro).every(
            ([clave, valor]) => usuario[clave] == valor
        )
    );
    return Promise.resolve(resultado);
});

describe("test unitarios de productos", () => {
    test('Debería obtener lista de productos', async () => {
        const response = await request(app).get('/productos/');
        expect(response.body.products.length).toBe(2);
        expect(Array.isArray(response.body.products)).toBe(true)
    });

    test('La lista de productos no debe venir vacia', async () => {
        const response = await request(app).get('/productos');
        expect(response.body.products.length).toBeGreaterThan(0);
    });

    test('busqueda de productos valido', async () => {
        const response = await request(app).post(`/productos/codigoProducto`).send({ codigoProducto: 1 });
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBe(1)
    });

    test('busqueda de productos no encontrado', async () => {
        const response = await request(app).post(`/productos/codigoProducto`).send({ codigoProducto: 3 });
        expect(response.body.products.length).toBe(0);
    });

    test("Crear un nuevo producto", async () => {

        producto.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevoProducto)
        }));

        const response = await request(app).post(`/productos/`).send(nuevoProducto);
        expect(response.body.products).toBeInstanceOf(Object);
        expect(response.body.products).toMatchObject(nuevoProducto);
    })

    test("cuando el producto no se crea correctamente", async () => {
        const nuevoproducto = {}

        producto.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(nuevoproducto)
        }));

        const response = await request(app).post(`/productos/`).send(nuevoproducto);

        expect(response.body.products).toEqual({});
        expect(response.body.products).not.toContainEqual(nuevoproducto)
    })

    test('Actualizar un producto correctamente', async () => {
        const productoActualizado = {
            codigoProducto: 1,
            nombre: "cartulina verde",
            descripcion: "cartulina escolar verde",
            tipoProducto: "cartulina",
            existencias: 5,
            unidadMedida: "unidad",
            valorUnitario: 1600,
            porcentaje: 0.19
        }

        producto.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

        const response = await request(app)
            .patch('/productos/')
            .send(productoActualizado);

        expect(producto.updateOne).toHaveBeenCalledWith({ codigoProducto: 1 }, productoActualizado);
        expect(response.body.products).toEqual({ acknowledged: true, modifiedCount: 1 });
    });

    test('Actualizar un usuario incorrectamente', async () => {
        const usuarioActualizado = {
            nombre: "cartulina verde",
            descripcion: "cartulina escolar verde",
            tipoProducto: "cartulina",
            existencias: 5,
            unidadMedida: "unidad",
            valorUnitario: 1600,
            porcentaje: 0.19
        }

        producto.updateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 0 });
        const response = await request(app)
            .patch('/productos/')
            .send(usuarioActualizado);

        expect(producto.updateOne).toHaveBeenCalledWith({}, usuarioActualizado);
        expect(response.body.products).toEqual({ acknowledged: true, modifiedCount: 0 });
    });

    test('Eliminar producto', async () => {

        const id = "sdj21nbsdh1212"

        producto.deleteOne = jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 });
        const response = await request(app)
            .delete(`/productos/${id}`)

        expect(producto.deleteOne).toHaveBeenCalledWith({ _id: id });
        expect(response.body.products).toEqual({ acknowledged: true, deletedCount: 1 });
    });
})


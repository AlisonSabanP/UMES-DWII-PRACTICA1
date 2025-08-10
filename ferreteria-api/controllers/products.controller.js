import { products } from '../mock-data/products.data.js';
import Joi from 'joi';

const productoSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    nombre: Joi.string().min(3).max(100).required(),
    categoria: Joi.string().max(50).required(),
    marca: Joi.string().max(50).required(),
    modelo: Joi.string().max(50).required(),
    precio: Joi.number().positive().required(),
    costo: Joi.number().min(0).required(),
    stock: Joi.number().integer().min(0).required(),
    unidad: Joi.string().valid('unidad', 'caja', 'paquete').required(),
    proveedor_id: Joi.number().integer().min(1).required(),
    codigo_barras: Joi.string()
        .pattern(/^\d{13}$/)
        .required()
        .messages({
        'string.pattern.base': 'El código de barras debe tener 13 dígitos',
        }),
    activo: Joi.boolean().required(),
});

const getProductsHandler = async (req, res) => {
    try {
        return res.status(200).json({
        message: 'success',
        data: {
            products,
            count: products.length,
        },
        });
    } catch (error) {
        console.error('Error en getProductsHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const postProductHandler = async (req, res) => {
    try {
        const newProduct = req.body;

        const { error, value } = productoSchema.validate(newProduct, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (products.some((p) => p.id === value.id)) {
        return res.status(409).json({ message: 'Producto con este ID ya existe' });
        }

        if (value.costo > value.precio) {
        return res.status(400).json({ message: 'El precio no puede ser menor que el costo' });
        }

        products.push(value);
        return res.status(201).json({
        message: 'Producto creado exitosamente',
        data: { productId: value.id },
        });
    } catch (error) {
        console.error('Error en postProductHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const putProductHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedProduct = req.body;

        const { error, value } = productoSchema.validate(updatedProduct, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (value.id !== id) {
        return res.status(400).json({ message: 'El ID en el cuerpo no coincide con el de la URL' });
        }

        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (value.costo > value.precio) {
        return res.status(400).json({ message: 'El precio no puede ser menor que el costo' });
        }

        products[index] = value;
        return res.status(200).json({
        message: 'Producto actualizado exitosamente',
        data: { productId: id },
        });
    } catch (error) {
        console.error('Error en putProductHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteProductHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = products.findIndex((p) => p.id === id);

        if (index === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
        }

        products.splice(index, 1);
        return res.status(200).json({
        message: 'Producto eliminado exitosamente',
        data: { productId: id },
        });
    } catch (error) {
        console.error('Error en deleteProductHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
        }
};

export {
    getProductsHandler,
    postProductHandler,
    putProductHandler,
    deleteProductHandler
}
import { suppliers } from '../mock-data/suppliers.data.js';
import Joi from 'joi';


const supplierSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    nombre: Joi.string().min(5).max(100).required(),
    nit: Joi.string()
        .pattern(/^\d{6,7}-\d$/)
        .required()
        .messages({
        'string.pattern.base': 'El NIT debe tener formato XXXXXX-X o XXXXXXX-X',
        }),
    direccion: Joi.object({
        pais: Joi.string().max(50).required(),
        departamento: Joi.string().max(50).required(),
        municipio: Joi.string().max(50).required(),
        direccion: Joi.string().max(200).required(),
    }).required(),
    telefonos: Joi.array().min(1).required(),
    email: Joi.string().email().required(),
    representante: Joi.string().max(100).required(),
    activo: Joi.boolean().required(),
});

const getSuppliersHandler = async (req, res) => {
    try {
        return res.status(200).json({
        message: 'success',
        data: {
            suppliers,
        },
        });
    } catch (error) {
        console.error('Error en getSuppliersHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const postSupplierHandler = async (req, res) => {
    try {
        const newSupplier = req.body;

        const { error, value } = supplierSchema.validate(newSupplier, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (suppliers.some((s) => s.id === value.id)) {
        return res.status(409).json({ message: 'Proveedor con este ID ya existe' });
        }

        suppliers.push(value);
        return res.status(201).json({
        message: 'Proveedor creado exitosamente',
        data: { supplierId: value.id },
        });
    } catch (error) {
        console.error('Error en postSupplierHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const putSupplierHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedSupplier = req.body;

        const { error, value } = supplierSchema.validate(updatedSupplier, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (value.id !== id) {
        return res.status(400).json({ message: 'El ID en el cuerpo no coincide con el de la URL' });
        }

        const index = suppliers.findIndex((s) => s.id === id);
        if (index === -1) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        suppliers[index] = value;
        return res.status(200).json({
        message: 'Proveedor actualizado exitosamente',
        data: { supplierId: id },
        });
    } catch (error) {
        console.error('Error en putSupplierHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteSupplierHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = suppliers.findIndex((s) => s.id === id);

        if (index === -1) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        suppliers.splice(index, 1);
        return res.status(200).json({
        message: 'Proveedor eliminado exitosamente',
        data: { supplierId: id },
        });
    } catch (error) {
        console.error('Error en deleteSupplierHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export {
    getSuppliersHandler,
    postSupplierHandler,
    putSupplierHandler,
    deleteSupplierHandler
}
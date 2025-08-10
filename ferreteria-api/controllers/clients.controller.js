// src/controllers/clients.controller.js
import { clients } from '../mock-data/clients.data.js';
import Joi from 'joi';

const clienteSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    nombre: Joi.string().min(3).max(100).required().messages({'any.required': 'El nombre es requerido'}),
    fechaNacimiento: Joi.string()
        .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
        .required()
        .messages({
        'string.pattern.base': 'La fecha de nacimiento debe estar en formato DD/MM/YYYY',
        }),
    edad: Joi.number().integer().min(0).max(150).required(),
    direccion: Joi.object({
        pais: Joi.string().max(50).required(),
        departamento: Joi.string().max(50).required(),
        municipio: Joi.string().max(50).required(),
        direccion: Joi.string().max(200).required(),
    }).required(),
    telefonos: Joi.array()
        .min(1)
        .required()
        .messages({
        'array.min': 'Debe proporcionar al menos un teléfono',
        }),
});

export const getClientsHandler = async (req, res) => {
    try {
        return res.status(200).json({
        message: 'success',
        data: {
            clients,
        },
        });
    } catch (error) {
        console.error('Error en getClientsHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const postClientHandler = async (req, res) => {
    try {
        const newClient = req.body;

        const { error, value } = clienteSchema.validate(newClient, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (clients.some((c) => c.id === value.id)) {
        return res.status(409).json({ message: 'Cliente con este ID ya existe' });
        }

        clients.push(value);
        return res.status(201).json({
        message: 'Cliente creado exitosamente',
        data: { clientId: value.id },
        });
    } catch (error) {
        console.error('Error en postClientHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const putClientHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedClient = req.body;

        const { error, value } = clienteSchema.validate(updatedClient, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (value.id !== id) {
        return res.status(400).json({ message: 'El ID en el cuerpo no coincide con el de la URL' });
        }

        const index = clients.findIndex((c) => c.id === id);
        if (index === -1) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        clients[index] = value;
        return res.status(200).json({
        message: 'Cliente actualizado exitosamente',
        data: { clientId: id },
        });
    } catch (error) {
        console.error('Error en putClientHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteClientHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = clients.findIndex((c) => c.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        clients.splice(index, 1);
        return res.status(200).json({
            message: 'Cliente eliminado exitosamente',
            data: { clientId: id },
        });
    } 
    catch (error) {
        console.error('Error en deleteClientHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
import { workers } from '../mock-data/workers.data.js';
import Joi from 'joi';

const workerSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    nombre: Joi.string().min(3).max(100).required(),
    puesto: Joi.string().max(50).required(),
    fechaContratacion: Joi.string()
        .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
        .required(),
    salario: Joi.number().positive().required(),
    direccion: Joi.object({
        pais: Joi.string().max(50).required(),
        departamento: Joi.string().max(50).required(),
        municipio: Joi.string().max(50).required(),
        direccion: Joi.string().max(200).required(),
    }).required(),
    telefonos: Joi.array().min(1).required(),
    email: Joi.string().email().required(),
    activo: Joi.boolean().required(),
});

const getWorkersHandler = async (req, res) => {
    try {
        return res.status(200).json({
        message: 'success',
        data: {
            workers,
            count: workers.length,
        },
        });
    } catch (error) {
        console.error('Error en getWorkersHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const postWorkerHandler = async (req, res) => {
    try {
        const newWorker = req.body;

        const { error, value } = workerSchema.validate(newWorker, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (workers.some((w) => w.id === value.id)) {
        return res.status(409).json({ message: 'Trabajador con este ID ya existe' });
        }

        workers.push(value);
        return res.status(201).json({
        message: 'Trabajador creado exitosamente',
        data: { workerId: value.id },
        });
    } catch (error) {
        console.error('Error en postWorkerHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const putWorkerHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedWorker = req.body;

        const { error, value } = workerSchema.validate(updatedWorker, { abortEarly: false });
        if (error) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: error.details.map((e) => e.message),
        });
        }

        if (value.id !== id) {
        return res.status(400).json({ message: 'El ID en el cuerpo no coincide con el de la URL' });
        }

        const index = workers.findIndex((w) => w.id === id);
        if (index === -1) {
        return res.status(404).json({ message: 'Trabajador no encontrado' });
        }

        workers[index] = value;
        return res.status(200).json({
        message: 'Trabajador actualizado exitosamente',
        data: { workerId: id },
        });
    } catch (error) {
        console.error('Error en putWorkerHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteWorkerHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = workers.findIndex((w) => w.id === id);

        if (index === -1) {
        return res.status(404).json({ message: 'Trabajador no encontrado' });
        }

        workers.splice(index, 1);
        return res.status(200).json({
        message: 'Trabajador eliminado exitosamente',
        data: { workerId: id },
        });
    } catch (error) {
        console.error('Error en deleteWorkerHandler:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export {
    getWorkersHandler,
    postWorkerHandler,
    putWorkerHandler,
    deleteWorkerHandler
}
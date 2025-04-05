const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Usamos una función en el controlador que incluye todos los filtros y paginación
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);



module.exports = router;




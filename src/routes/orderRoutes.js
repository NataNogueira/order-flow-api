// Instanciamentos
const { Router } = require('express');
const { dbPool } = require('../config/database');
const OrderModel = require('../models/OrderModel');
const OrderService = require('../services/OrderService');
const OrderController = require('../controllers/OrderController');
const auth = require('../middleware/auth');

const router = Router();

// Passagem de dependências
const orderModel = new OrderModel(dbPool);
const orderService = new OrderService(orderModel);
const orderController = new OrderController(orderService);

// Definição de caminhos
router.post('/', auth, (req, res) => orderController.create(req, res));
router.get('/list', auth, (req, res) => orderController.list(req, res));
router.get('/:id', auth, (req, res) => orderController.getById(req, res));
router.put('/:id', auth, (req, res) => orderController.update(req, res));
router.delete('/:id', auth, (req, res) => orderController.delete(req, res));

module.exports = router;
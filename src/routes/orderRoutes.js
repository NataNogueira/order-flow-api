// Instanciamentos
const { Router } = require('express');
const { dbPool } = require('../config/database');
const OrderModel = require('../models/orderModel');
const OrderService = require('../services/orderService');
const OrderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = Router();

// Passagem de dependências
const orderModel = new OrderModel(dbPool);
const orderService = new OrderService(orderModel);
const orderController = new OrderController(orderService);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *         value:
 *           type: number
 *         creationDate:
 *           type: string
 *           format: date-time
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *               valorTotal:
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                     quantidadeItem:
 *                       type: integer
 *                     valorItem:
 *                       type: number
 *           example:
 *             numeroPedido: "v10089015vdb-01"
 *             valorTotal: 150.75
 *             dataCriacao: "2026-03-09T15:30:00Z"
 *             items:
 *               - idItem: "1"
 *                 quantidadeItem: 2
 *                 valorItem: 50.00
 *               - idItem: "2"
 *                 quantidadeItem: 1
 *                 valorItem: 50.75
 *     responses:
 *       201:
 *         description: Pedido criado
 */
router.post('/', auth, (req, res) => orderController.create(req, res));

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/list', auth, (req, res) => orderController.list(req, res));

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do pedido
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', auth, (req, res) => orderController.getById(req, res));

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Atualiza o valor de um pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.put('/:id', auth, (req, res) => orderController.update(req, res));

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pedido removido
 */
router.delete('/:id', auth, (req, res) => orderController.delete(req, res));

module.exports = router;
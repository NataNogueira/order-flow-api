const OrderMapper = require('../models/orderMapper');

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    async create(payload) {
        const domainData = OrderMapper.toDomain(payload);
        return await this.orderModel.create(domainData);
    }

    async getById(id) {
        return await this.orderModel.findById(id);
    }

    async getAll() {
        return await this.orderModel.findAll();
    }

    async update(id, payload) {
        const value = payload.valorTotal;
        return await this.orderModel.updateValue(id, value);
    }

    async delete(id) {
        return await this.orderModel.delete(id);
    }
}

module.exports = OrderService;
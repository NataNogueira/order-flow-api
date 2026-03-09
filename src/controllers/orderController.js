class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async create(req, res) {
        try {
            const order = await this.orderService.create(req.body);
            res.status(201).json(order);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async getById(req, res) {
        const order = await this.orderService.getById(req.params.id);
        order ? res.json(order) : res.status(404).send();
    }

    async list(req, res) {
        const orders = await this.orderService.getAll();
        res.json(orders);
    }

    async update(req, res) {
        try {
            const updated = await this.orderService.update(req.params.id, req.body);
            res.json(updated);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        await this.orderService.delete(req.params.id);
        res.status(204).send();
    }
}

module.exports = OrderController;
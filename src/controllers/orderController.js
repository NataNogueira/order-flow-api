class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async create(req, res) {
        try {
            const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

            if (!numeroPedido) throw new Error("O campo 'numeroPedido' é obrigatório.");
            if (valorTotal === undefined || isNaN(valorTotal)) throw new Error("O campo 'valorTotal' é obrigatório e deve ser um número.");
            if (!dataCriacao || isNaN(Date.parse(dataCriacao))) throw new Error("O campo 'dataCriacao' é obrigatório e deve ser uma data válida.");
            if (!items || !Array.isArray(items) || items.length === 0) throw new Error("O campo 'items' deve ser um array preenchido.");

            items.forEach((item, index) => {
                if (!item.idItem || !item.quantidadeItem || item.valorItem === undefined) {
                    throw new Error(`Item no índice ${index} está incompleto (idItem, quantidadeItem e valorItem são obrigatórios).`);
                }
            });

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
            const { valorTotal } = req.body;
            if (valorTotal === undefined || isNaN(valorTotal)) {
                throw new Error("O campo 'valorTotal' é obrigatório para atualização e deve ser um número.");
            }

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
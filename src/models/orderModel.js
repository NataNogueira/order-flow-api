// Arquivo responsável por executar as queries (SELECT, INSERT, UPDATE, DELETE) dentro do BD

class OrderModel {
    constructor(db) {
        this.db = db;
    }

    // Função para criar (caso não exista) o banco de dados, e inserir as informações.
    async create(data) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            await client.query(
                'INSERT INTO "Order" ("orderId", "value", "creationDate") VALUES ($1, $2, $3)',
                [data.orderId, data.value, data.creationDate]
            );

            for (const item of data.items) {
                await client.query(
                    'INSERT INTO "Items" ("orderId", "productId", "quantity", "price") VALUES ($1, $2, $3, $4)',
                    [data.orderId, item.productId, item.quantity, item.price]
                );
            }
            await client.query('COMMIT');
            return data;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    // Funções de busca
    async findById(id) {
        const res = await this.db.query('SELECT * FROM "Order" WHERE "orderId" = $1', [id]);
        if (res.rows.length === 0) return null;
        const items = await this.db.query('SELECT * FROM "Items" WHERE "orderId" = $1', [id]);
        return { ...res.rows[0], items: items.rows };
    }

    async findAll() {
        const res = await this.db.query('SELECT * FROM "Order"');
        return res.rows;
    }

    // Função de Atualização
    async updateValue(id, value) {
        const res = await this.db.query(
            'UPDATE "Order" SET "value" = $1 WHERE "orderId" = $2 RETURNING *',
            [value, id]
        );
        return res.rows[0];
    }

    // Função Drop
    async delete(id) {
        await this.db.query('DELETE FROM "Order" WHERE "orderId" = $1', [id]);
    }
}

module.exports = OrderModel;
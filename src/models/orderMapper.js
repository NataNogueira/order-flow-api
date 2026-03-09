class OrderMapper {
    static toDomain(payload) {
        // Remove o sufixo do número do pedido conforme exemplo (v10089015vdb-01 -> v10089015vdb)
        const orderId = payload.numeroPedido.split('-')[0]; 
        
        return {
            orderId,
            value: payload.valorTotal,
            creationDate: new Date(payload.dataCriacao).toISOString(),
            items: payload.items.map(item => ({
                productId: parseInt(item.idItem, 10),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
    }
}

module.exports = OrderMapper;
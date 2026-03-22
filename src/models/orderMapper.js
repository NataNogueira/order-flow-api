class OrderMapper {
    static toDomain(payload) {
        // Remove o sufixo do número do pedido conforme exemplo (v10089015vdb-01 -> v10089015vdb)
        const orderId = payload.numeroPedido ? payload.numeroPedido.split('-')[0] : null; 
        
        return {
            orderId,
            value: payload.valorTotal,
            creationDate: payload.dataCriacao ? new Date(payload.dataCriacao).toISOString() : null,
            items: (payload.items || []).map(item => ({
                productId: parseInt(item.idItem, 10),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
    }
}

module.exports = OrderMapper;
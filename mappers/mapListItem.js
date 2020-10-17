const mapListItem = (rs) => {

    const items = [];

    rs.forEach(itemRs => {

        const priceSplit = `${itemRs.price}`.split('.');
        const price = +priceSplit[0];
        const decimals = !!priceSplit[1] ? +priceSplit[1] : 0;

        const item = {
            id: itemRs.id,
            title: itemRs.title,
            price: {
                currency: itemRs.currency_id,
                amount: price,
                decimals
            },
            picture: itemRs.thumbnail,
            condition: itemRs.condition,
            free_shipping: itemRs.shipping.free_shipping
        }

        items.push(item);
    });

    return items;
}

module.exports = mapListItem;

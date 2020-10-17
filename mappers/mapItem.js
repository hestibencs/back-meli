const mapItem = (rsItem, description = '') => {

    const picture = rsItem.pictures.length > 0 ?
        rsItem.pictures[0].url : rsItem.thumbnail;

    const priceSplit = `${rsItem.price}`.split('.');
    const price = +priceSplit[0];
    const decimals = !!priceSplit[1] ? +priceSplit[1] : 0;

    return {
        id: rsItem.id,
        title: rsItem.title,
        price: {
            currency: rsItem.currency_id,
            amount: price,
            decimals
        },
        picture,
        condition: rsItem.condition,
        free_shipping: rsItem.shipping.free_shipping,
        sold_quantity: rsItem.sold_quantity,
        description: description
    }
}

module.exports = mapItem;

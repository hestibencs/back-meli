var axios = require('axios')
var express = require('express');
const mapItem = require('../mappers/mapItem');
var mapListCategories = require('../mappers/mapListCategories');
var mapListItem = require('../mappers/mapListItem');
var router = express.Router();
var author = {
    name: 'Heiner',
    lastname: 'Castellanos'
};
var API_DESCRIPTION = 'https://api.mercadolibre.com/items';
var API_SEARCH = 'https://api.mercadolibre.com/sites/MLA/search';

/* GET item description. */
router.get('/:id', async (req, res, next) => {

    try {
        const item = await axios.get(
            `${API_DESCRIPTION}/${req.params.id}`
        );
        const description = await axios.get(
            `${API_DESCRIPTION}/${req.params.id}/description`
        );

        const rs = {
            author,
            item: mapItem(item.data, description.data.plain_text)
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(rs);

    } catch (error) {
        if (!!error.response) {
            res.status(error.response.status);
        }
    }
});

/* GET items for query. */
router.get('/', async (req, res, next) => {

    try {
        const items = await axios({
            url: API_SEARCH,
            method: 'get',
            params: {
                q: req.query.q
            }
        });

        const { data } = items;
        const { results, filters } = data;

        const rs = {
            author,
            categories: mapListCategories(filters),
            items: mapListItem(results.slice(0, 4))
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(rs);

    } catch (error) {
        if (!!error.response) {
            res.status(error.response.status);
        }
    }
});

module.exports = router;

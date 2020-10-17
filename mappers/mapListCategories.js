const mapListCategories = (rsFilters) => {

    const categories = [];

    rsFilters.filter(e => e.id === 'category')
        .forEach(filter =>
            filter.values.forEach(
                value => value.path_from_root.forEach(
                    path => categories.push(path.name)
                )
            )
        );

    return categories;
}

module.exports = mapListCategories;

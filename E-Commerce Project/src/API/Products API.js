


export const fetchProducts = () =>
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => data);


export const fetchCategories = () =>
    fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then(data => data);



export const fechOrderedBy = (by) =>
    fetch(`https://dummyjson.com/products?sortBy=discountPercentage&order=${by}`)
        .then(res => res.json())
        .then(data => data);



export const fechPopular = () =>
    fetch(`https://dummyjson.com/products?sortBy=rating&limit=15&order=desc`)
        .then(res => res.json())
        .then(data => data);


export const fechNewArrivals = () =>
    fetch(`https://dummyjson.com/products?sortBy=meta&order=desc&limit=15`)
        .then(res => res.json())
        .then(data => data);


export const fechSpecialOffers = () =>
    fetch(`https://dummyjson.com/products?sortBy=discountPercentage&order=desc&limit=15`)
        .then(res => res.json())
        .then(data => data);


export const fechLimited = () =>
    fetch(`https://dummyjson.com/products?sortBy=stock&order=asc&skip=10&limit=15`)
        .then(res => res.json())
        .then(data => data);




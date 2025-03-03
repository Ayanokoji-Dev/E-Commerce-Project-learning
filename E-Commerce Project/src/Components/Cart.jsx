import useShop from '../Context-Reducer/ShopContext'
import '../Styles/Cart.css'
import React from 'react'


const Cart = () => {

    const {products,removeFromCard}=useShop();

    const uniqueProductsMap = new Map();

products.forEach(product => {
    if (uniqueProductsMap.has(product.title)) {
        // إذا كان المنتج موجودًا، قم بتحديث الكمية والإجمالي
        const existingProduct = uniqueProductsMap.get(product.title);
        existingProduct.quantity += 1;
        existingProduct.totalPrice = (existingProduct.quantity * product.price).toFixed(2) ;
        uniqueProductsMap.set(product.title, existingProduct);
    } else {
        // إذا لم يكن موجودًا، أضف المنتج الجديد
        uniqueProductsMap.set(product.title, {
            ...product,
            quantity: 1,
            totalPrice: product.price,
        });
    }
});

// تحويل الخريطة إلى مصفوفة
const uniqueProducts = Array.from(uniqueProductsMap.values());

// إنشاء العناصر
const createdProducts = uniqueProducts.map((product, index) => (
    <React.Fragment key={index}>
        <div className="product">
            <div className="productImage">
                <img src={product.images[0]} alt={product.title} width={'50%'} height={'50%'} />
            </div>
            <div className="productTitle">
                {product.title}
            </div>
            <div className="productPrice">
                {`$ ${product.price}`}
            </div>
            <div className="productQuantity">
                <p>{product.quantity}</p>
            </div>
            <div className="productTotal">
                {`$ ${product.totalPrice}`}
            </div>
            <div className="productRemove">
                <button className="removeProduct" onClick={() => removeFromCard(product)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </button>
            </div>
        </div>
        <hr />
    </React.Fragment>
));

    return (
        <div className='cart'>
            <div className="titles">
                <div className="productsTitle">
                    Products
                </div>
                <div className="titleTitle">
                    Title
                </div>
                <div className="priceTitle">
                    Price
                </div>
                <div className="quantityTitle">
                    Quantity
                </div>
                <div className="totalTitle">
                    Total
                </div>
                <div className="removeTitle">
                    Remove
                </div>
            </div>
            <hr />
            <div className="products">
                {(createdProducts) ? createdProducts : ''}
            </div>
        </div>
    )
}

export default Cart

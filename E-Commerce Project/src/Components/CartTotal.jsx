import useShop from '../Context-Reducer/ShopContext'
import '../Styles/CartTotal.css'

const CartTotal = () => {

    const shippingFee = 0;

    const {total}=useShop();
    const Total = parseFloat(total.toFixed(2)); // تحويل النص إلى رقم
    
    const TotalPrice = (Total + shippingFee) === 0 
    ? Math.floor(Total + shippingFee) 
    : (Total + shippingFee).toFixed(2); // التأكد من النتيجة


    return (
        <div className="cartTotal-promoCode">
            <div className='cartTotal'>
                <div>
                    <h2>Cart Totals : </h2>
                </div>
                <div className="subtotal">
                    <p>Subtotal</p>
                    <p>{`$${Total}`} </p>
                </div>
                <hr />
                <div className="shippingFee">
                    <p>Shipping Fee</p>
                    <p>{shippingFee===0?'FREE' : `$${shippingFee}`}</p>
                </div>
                <hr />
                <div className="total">
                    <p>Total</p>
                    <p>{`$${TotalPrice}`} </p>
                </div>
            </div>
            <div className="promoCode">
                <p>If you have a promo Code , Enter it here </p>
                <div className="input-button">
                    <input type="text" placeholder='Promo Code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CartTotal

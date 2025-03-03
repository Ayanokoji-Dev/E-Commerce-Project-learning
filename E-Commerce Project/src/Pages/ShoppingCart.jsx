import Cart from '../Components/Cart'
import CartTotal from '../Components/CartTotal'
import  '../Styles/ShoppingCart.css'

const ShoppingCart = () => {


    return (
        <div className='shoppingCart'>
            <Cart  />
            <CartTotal />
        </div>
    )
}

export default ShoppingCart

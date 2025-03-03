// import products from '../API/fakeAPI'
import ProductList from '../Components/ProductList'
import useShop from '../Context-Reducer/ShopContext'
import  '../Styles/Favorite.css'

const Favorite = () => {

    const {favorites}=useShop();

    return (
        <div className='favorite'>
            <ProductList title={'Your Favorite Products :'} apiData={favorites} />
        </div>
    )
}

export default Favorite

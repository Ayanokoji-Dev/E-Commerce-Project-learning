import useShop from '../Context-Reducer/ShopContext';
import '../Styles/ProductCard.css';
import { Link } from 'react-router-dom';


const ProductCard = ({ productTitle, image , price , index , apiData  }) => {

    const {addToCart,addToFav}=useShop();


    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + "...";
        }
        return title;
    };

    const handleClick=(e)=>{
        e.target.classList.toggle('added');
    }


    return (
        <div className="productCard">
            <div className="productImg">
                <img src={image || "default-placeholder.png"} alt={productTitle} width={'100%'} height={'7rem'} />
            </div>
            <div className="title">
                <Link key={index} to={'/details'} state={{productApiData:apiData[index]}}>
                    <h4>{truncateTitle(productTitle || "Unknown Title",25)}</h4>
                </Link>
                <div className="price-add">
                    <h3> {price ? `$ ${price}` : ''} </h3>
                    <div className="add-fav">
                        <div 
                        className="fav" 
                        onClick={(e)=>{
                            addToFav(apiData[index])
                            handleClick(e)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                        </div>
                        <div className="add" onClick={()=>{addToCart(apiData[index])}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                            </svg>
                            +
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductCard

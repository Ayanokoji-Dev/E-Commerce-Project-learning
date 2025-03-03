import '../Styles/ProductList.css'
import notFoundImage from '../assets/imgNotFound.jpg'
import ProductCard from '../Components/ProductCard'
import {  useRef } from 'react'


const getImage = (data) => {
    if (data.images) {
        return data.images[0];
    }
    // Return a fallback image if none of the structures are found
    return notFoundImage;
}

const getTitle = (data) => {
    console.log(data);  // تحقق من البيانات
    if (data && data.title) {
        return data.title;
    }
    return "Unknown Title";
}


const ProductList = ({title,category,apiData,notFoundMessage} ) => {




    console.log(apiData);

    const cardsRef=useRef();




    return (
        <div className='title-cards'>
            <h2>{title}</h2>
            <div className="cards-list" ref={cardsRef} >
            {apiData && apiData.length > 0 ? (
                apiData.map((card, index) => {
                    return(
                        <div key={index}>
                                <ProductCard 
                                productTitle={getTitle(card)} 
                                image={getImage(card)} 
                                price={card.price}
                                index={index}
                                apiData={apiData}
                                key={index} 
                                />
                        </div>
                    )})
                ) : (
                    <div className="not-found-message">
                        {notFoundMessage || <p>No Products available</p>}
                    </div>
                )}

            </div>
        </div>
    )
}

export default ProductList

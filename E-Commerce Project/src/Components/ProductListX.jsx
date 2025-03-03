import '../Styles/ProductListX.css'
import notFoundImage from '../assets/imgNotFound.jpg'
import ProductCard from '../Components/ProductCard'
import { useEffect, useRef } from 'react'


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


const ProductListX = ({title,category,apiData} ) => {




    console.log(apiData);

    const cardsRef=useRef();

    const handleWheel = (event)=>{
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(()=>{
        cardsRef.current.addEventListener("wheel",handleWheel);

    },[])



    return (
        <div className='title-cards'>
            <h2>{title}</h2>
            <div className="cards-list-X" ref={cardsRef} >
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
                    <p>No Products available</p>
                )}

            </div>
        </div>
    )
}

export default ProductListX

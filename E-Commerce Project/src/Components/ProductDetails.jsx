import { useLocation } from 'react-router-dom'
import '../Styles/ProductDetails.css'
import useShop from '../Context-Reducer/ShopContext';
import userImage from '../assets/istockphoto-1300845620-612x612-removebg-preview.png';


const ProductDetails = () => {

    const {addToCart,addToFav}=useShop();

    const location = useLocation();
    const {productApiData}=location.state;
    console.log("APIdata from location : ",productApiData)

    const fakeImages = [productApiData.images[0],productApiData.images[1],productApiData.images[2],productApiData.images[3]];

    const imagesCreated = fakeImages.map((img,i)=><img src={img} key={i} width={'100%'} />)

    const tags = productApiData.tags.map((tag)=>`${tag} ,`)

    const discount = Math.floor(productApiData.discountPercentage);

    const newPrice = Math.floor(productApiData.price - (productApiData.price * discount / 100));


    const getStarts = (rating)=>{
        const fullStarts = Math.floor(rating);
        const halfStart = (rating % 1 >= 0.5)?true:false;
        const emptyStarts = halfStart ? 4-fullStarts : 5-fullStarts;

        let stars = '';

        // إضافة النجوم الممتلئة
        for (let i = 0; i < fullStarts; i++) {
            stars += `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>`;
        }

        // إضافة نصف النجمة إذا كان موجود
        if (halfStart) {
            stars += `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
                        <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
                        </svg>`;
        }

        // إضافة النجوم الفارغة
        for (let i = 0; i < emptyStarts; i++) {
            stars += `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                        </svg>`;
        }

        return <div dangerouslySetInnerHTML={{ __html: stars }} />;
    }

    const reviews = ( productApiData.reviews )
                    ? productApiData.reviews.map((review,index)=>{
                        const date = review.date.slice(0,10);
                        return (
                            <div className="review" key={`${productApiData.reviewerName}-${index}`}>
                                <div className="username-date-rate">
                                    <div className="username-date">
                                        <div className="username">
                                            <img src={userImage} width={'20%'} />
                                            {review.reviewerName}
                                        </div>
                                        <div className="date">
                                            {date}
                                        </div>
                                    </div>
                                    <div className="ratingProductComment">
                                        {getStarts(review.rating)}
                                    </div>
                                </div>
                                <h4 className='reviewComment'>
                                    {review.comment}
                                </h4>
                            </div>
                        )
                    })
                    : 'No Reviews For The Current Time';



    // const fakeReview =[
    //     {
    //         "rating": 2,
    //         "comment": "Very unhappy with my purchase!",
    //         "date": "2024-05-23T08:56:21.618Z",
    //         "reviewerName": "John Doe",
    //         "reviewerEmail": "john.doe@x.dummyjson.com"
    //     },
    //     {
    //         "rating": 2,
    //         "comment": "Not as described!",
    //         "date": "2024-05-23T08:56:21.618Z",
    //         "reviewerName": "Nolan Gonzalez",
    //         "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
    //     },
    //     {
    //         "rating": 5,
    //         "comment": "Very satisfied!",
    //         "date": "2024-05-23T08:56:21.618Z",
    //         "reviewerName": "Scarlett Wright",
    //         "reviewerEmail": "scarlett.wright@x.dummyjson.com"
    //     }
    // ]


    // const reviews = ( fakeReview )
    //                 ? fakeReview.map((review)=>{
    //                     const date = review.date.slice(0,10);
    //                     return (
    //                         <div className="review" key={review.reviewerEmail}>
    //                             <div className="username-date-rate">
    //                                 <div className="username-date">
    //                                     <div className="username">
    //                                         <img src={userImage} width={'20%'} />
    //                                         {review.reviewerName}
    //                                     </div>
    //                                     <div className="date">
    //                                         {date}
    //                                     </div>
    //                                 </div>
    //                                 <div className="ratingProductComment">
    //                                     {getStarts(review.rating)}
    //                                 </div>
    //                             </div>
    //                             <h4 className='reviewComment'>
    //                                 {review.comment}
    //                             </h4>
    //                         </div>
    //                     )
    //                 })
    //                 : 'No Reviews For The Current Time';


    const handleClick=(e)=>{
        e.target.classList.toggle('added');
    }
    const handleCartClick=(e)=>{
        e.target.classList.add('added');
        setTimeout(()=>{
            e.target.classList.remove('added')
        },1000)
    }
    const handleCartSvgClick=(e)=>{
        e.target.parentElement.classList.add('added');
        setTimeout(()=>{
            e.target.parentElement.classList.remove('added')
        },1000)
    }
    


    // const fakeReview1=fakeReview[0];

    return (
        <div className='productDetails'>
            <div className="productImages-infos">
                <div className="productImages">
                    <div className="images">
                        {imagesCreated}
                    </div>
                    <div className="mainImage">
                        <img src={productApiData.thumbnail} width={'100%'} />
                    </div>
                </div>
                <div className="productInfos">
                    <h2>{productApiData.title} </h2>
                    <div className="productRatingD">
                        {getStarts(productApiData.rating)}
                    </div>
                    <div className="prices">
                        <div className="oldPrice">
                            {`$${productApiData.price}`}
                        </div>
                        <div className="newPrice">
                            {`$${newPrice}`}
                        </div>
                        <div className="discount">
                            {`-${discount}%`}
                        </div>
                    </div>
                    <div className="description">
                        {productApiData.description}
                    </div>
                    <div className="tags">
                        <p>Tags : </p>&nbsp;&nbsp;&nbsp; {tags}
                    </div>
                    <div className="productCategoryD">
                        <p>Category : </p>&nbsp;&nbsp;&nbsp; {productApiData.category}
                    </div>
                    <div className="add-fav">
                        <div className="fav" onClick={(e)=>{
                            addToFav(productApiData)
                            handleClick(e)
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                        </div>
                        <div className="add" onClick={(e)=>{
                            addToCart(productApiData)
                            handleCartClick(e)
                            }}>
                            <svg 
                            onClick={(e)=>{
                                // e.stopPropagation();
                                addToCart(productApiData)
                                handleCartSvgClick(e)
                            }}
                            xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                            </svg>
                            <span className="plus">+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews">
                <h3>Reviews : </h3>
                {reviews}
            </div>
        </div>
    )
}

export default ProductDetails

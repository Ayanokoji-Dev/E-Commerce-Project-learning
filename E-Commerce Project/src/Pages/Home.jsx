import '../Styles/Home.css'
import ProductListX from '../Components/ProductListX';
import { useEffect, useState } from 'react';
import { fechLimited, fechNewArrivals, fechPopular, fechSpecialOffers } from '../API/Products API';
import Loader from '../Components/Loading';


const Home = () => {

    const [isLoading,setIsLoading]=useState(false);

    const [popularProducts,setPopularProducts]=useState({})
    const [newArrivals,setNewArrivals] = useState({});
    const [specialOffers,setSpecialOffers] = useState({});
    const [limitedEdition,setLimitedEdition] = useState({});


    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(()=>{
        const fechHomeProducts=async()=>{
            setIsLoading(true);
            const fechedPopularProducts = await fechPopular();
            setPopularProducts(fechedPopularProducts.products);

            await delay(1000);

            const fechedNewArrivalsProducts = await fechNewArrivals();
            setNewArrivals(fechedNewArrivalsProducts.products);

            await delay(1000);

            const fechedSpecialOffers = await fechSpecialOffers();
            setSpecialOffers(fechedSpecialOffers.products);

            await delay(1000);

            const fechedLimitedEdition = await fechLimited();
            setLimitedEdition(fechedLimitedEdition.products);

            await delay(4000);
            setIsLoading(false);
        }

        fechHomeProducts();
    },[])

    console.log(limitedEdition);
    
    return (
        <div className='home'>
            {
                isLoading
                ? <Loader />
                :
                <>
                    <div className="offer-section">

                    </div> 
                    <ProductListX title={'Popular Products :'} apiData={popularProducts} />
                    <ProductListX title={'New Arrivals :'} apiData={newArrivals} />
                    <ProductListX title={'Limited Edition :'} apiData={limitedEdition} />
                    <ProductListX title={'Special Offers :'} apiData={specialOffers} />
                </>
            }
        </div>
    )
}

export default Home

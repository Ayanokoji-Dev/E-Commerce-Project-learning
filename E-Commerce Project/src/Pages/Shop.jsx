import ProductList from "../Components/ProductList"
import '../Styles/Shop.css'
import { fetchCategories, fetchProducts } from "../API/Products API";
import { useEffect, useState } from "react";


const Shop = () => {


    const [shopProducts,setShopProducts]=useState({});


    const [categories,setCategories]=useState([]);
    const [currentCat,setCurrentCat]=useState("");
    const [currentRate,setCurrentRate]=useState("");
    const [currentOrder,setCurrentOrder]=useState("");


    useEffect(() => {
        const fetchChoosedCat = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);

                const response = await fetch(`https://dummyjson.com/products/category/${currentCat}?limit=20`);
                const data = await response.json();
                setShopProducts(data.products); // افترض أن الاستجابة تحتوي على بنية بيانات مناسبة
                console.log('PRODUCTS BY CATEGORY ', data.products)
            } catch (error) {
                console.error('حدث خطأ أثناء جلب منتجات الفئة المختارة:', error);
            }
        };
    
        const getFilters = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);
    
                // إذا كنت بحاجة لإضافة تأخير قبل جلب المنتجات
                setTimeout(async () => {
                    const fetchedProducts = await fetchProducts();
                    setShopProducts(fetchedProducts.products);
                }, 1000);
            } catch (error) {
                console.error('حدث خطأ أثناء جلب الفئات:', error);
            }
        };
    
        if (currentCat !== '') {
            fetchChoosedCat();
        } else {
            getFilters();
        }


    }, [currentCat]);


    


    useEffect(() => {
        const fetchSortedProducts = async () => {
            if (currentOrder !== "") {
                try {
                    const response = await fetch(
                        `https://dummyjson.com/products?sortBy=price&order=${currentOrder}`
                    );
                    const data = await response.json();
                    if (data && data.products) {
                        setShopProducts(data.products);
                        console.log("منتجات مرتبة حسب السعر: ", data.products);
                    } else {
                        setShopProducts([]);
                    }
                } catch (error) {
                    console.error("حدث خطأ أثناء جلب المنتجات المرتبة حسب السعر:", error);
                }
            }
        };

        fetchSortedProducts(); // استدعاء الدالة لجلب المنتجات بناءً على الترتيب
    }, [currentOrder]);
    
    
    useEffect(() => {
        const fetchSortedProducts = async () => {
            if (currentRate !== "") {
                try {
                    const response = await fetch(
                        `https://dummyjson.com/products?sortBy=rating&order=${currentRate}`
                    );
                    const data = await response.json();
                    if (data && data.products) {
                        setShopProducts(data.products);
                        console.log("منتجات مرتبة حسب السعر: ", data.products);
                    } else {
                        setShopProducts([]);
                    }
                } catch (error) {
                    console.error("حدث خطأ أثناء جلب المنتجات المرتبة حسب السعر:", error);
                }
            }
        };

        fetchSortedProducts(); // استدعاء الدالة لجلب المنتجات بناءً على الترتيب
    }, [currentRate]);
    
    

    const selectCategories = categories.map((category,index)=>{
        return (
            <option key={index} value={category} >
                {category}
            </option>
        )
    })

    // const rateStars = (rate) => {
    //     let stars = '';
    //     for (let i = 1; i <= 5; i++) { // 5 هو العدد الكلي للنجوم
    //         stars += i <= rate ? '⭐' : '☆'; // نجم ممتلئ أو فارغ
    //     }
    //     return stars;
    // };

    
    return (
        <div className="shop">
            <div className="filters">
                <select 
                className="category"
                value={currentCat}
                onChange={(e)=>{setCurrentCat(e.target.value)}}
                >
                    <option value="">Categories</option>
                    {selectCategories}
                </select>
                <select 
                className="rating"
                value={currentRate}
                onChange={(e)=>{setCurrentRate(e.target.value)}}
                >
                    <option value="">Review</option>
                    <option value="desc">Highest Rates </option>
                    <option value="asc">Lowest Rates </option>
                </select>
                <select 
                className="by-offer"
                value={currentOrder}
                onChange={(e)=>{setCurrentOrder(e.target.value)}}
                >
                    <option value="">Price</option>
                    <option value="desc">Expensive to Cheap</option>
                    <option value="asc">Cheap to Expensive</option>
                </select>
            </div>
                <ProductList apiData={shopProducts} />
        </div>
    )
}

export default Shop

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import shopReducer from "./ShopReducer";
import { saveCart, saveFavorites } from "../Firebase/firebaseFuns";
import { useAuth } from '../Firebase/firebaseContext';


export const ShopContext = createContext();

export const ShopProvider = ({children})=>{

    const { cart } = useAuth();
    const [initialState, setInitialState] = useState({
        favorite: JSON.parse(localStorage.getItem('favorites')) || [],
        cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
        productsNum: JSON.parse(localStorage.getItem('productsNum')) || 0,
        total: JSON.parse(localStorage.getItem('total')) || 0
    });

    useEffect(() => {
        if (cart && cart.length > 0) {
            setInitialState(prevState => ({
                ...prevState,
                cartProducts: cart
            }));
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);
    


    const [state,dispatch]=useReducer(shopReducer,initialState);
    const {user}=useAuth();


    const addToCart = async(products)=>{
        const updatedProducts = state.cartProducts.concat(products);
        updatePrice(updatedProducts);
        updateProductsNum(updatedProducts);

        localStorage.setItem('cart',JSON.stringify(updatedProducts));

        if(user && user.uid){
            await saveCart(user.uid , updatedProducts)
        }

        dispatch({
            type:"ADD_TO_CART",
            payload:{
                products:updatedProducts
            }
        })
    }

    const addToFav =async (products)=>{
        let updatedProducts;
        
        const isProductInFav = state.favorite.some(item => item.id === products.id);
        
        if (isProductInFav) {
            updatedProducts = state.favorite.filter(item => item.id !== products.id);
        } else {
            updatedProducts = [...state.favorite, products];
        }

        localStorage.setItem('favorites',JSON.stringify(updatedProducts));

        if(user && user.uid){
            await saveFavorites(user.uid , updatedProducts);
        }

        dispatch({
            type:"ADD_TO_FAV",
            payload:{
                products:updatedProducts
            }
        })
    }

    const removeFromCard =async(products)=>{
        const updatedProducts = state.cartProducts.filter((currentProduct)=> currentProduct.id !== products.id);
        updatePrice(updatedProducts);
        updateProductsNum(updatedProducts);

        localStorage.setItem('cart',JSON.stringify(updatedProducts));

        if (user && user.uid) {
            await saveCart(user.uid, updatedProducts); // استخدم user.uid هنا
        }

        dispatch({
            type:"REMOVE_FROM_CART",
            payload:{
                products:updatedProducts
            }
        })
    }

    const updatePrice =(products)=>{
        let total =0;
        products.forEach((product)=> total += product.price);
        localStorage.setItem('total',JSON.stringify(total));
        dispatch({
            type:"UPDATE_PRICE",
            payload:{
                total:total
            }
        })
    }
    
    const updateProductsNum =(products)=>{
        let productsNum = products.length;
        localStorage.setItem('productsNum',JSON.stringify(productsNum));
        dispatch({
            type:"UPDATE_PRODUCTS_NUM",
            payload:{
                productsNum:productsNum
            }
        })
    }


    const sharedValue = {
        total:state.total,
        products:state.cartProducts,
        favorites:state.favorite,
        productsNum:state.productsNum,
        addToCart,
        addToFav,
        removeFromCard
    }

    return (
        <ShopContext.Provider value={sharedValue} >
            {children}
        </ShopContext.Provider>
    )
}

const useShop=()=>{
    const context = useContext(ShopContext);

    if(context === undefined){
        throw new Error('useShop must be used within ShopProvider')
    }
    return context
}
export default useShop;


const shopReducer = (state,action)=>{
    const {type,payload}=action;
    switch(type){
        case 'ADD_TO_CART':
            console.log('ADDED TO CART : ',payload)
            return {
                ...state,
                cartProducts:payload.products
            }
        case 'ADD_TO_FAV':
            console.log('ADDED TO FAV : ',payload)
            return {
                ...state,
                favorite:payload.products
            }
        case 'REMOVE_FROM_CART':
            console.log('REMOVED FROM CART : ',payload)
            return {
                ...state,
                cartProducts:payload.products
            }
        case 'UPDATE_PRICE':
            console.log('TOTAL : ',payload)
            return {
                ...state,
                total:payload.total
            }
        case 'UPDATE_PRODUCTS_NUM':
            console.log('PODUCTS NUM : ',payload)
            return {
                ...state,
                productsNum:payload.productsNum
            }
        default:
            throw new Error('Case not found : ',type);
    }

}
export default shopReducer
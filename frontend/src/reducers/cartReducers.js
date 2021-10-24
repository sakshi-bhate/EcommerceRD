export const CartReducer = (state = {cartItems:[]},action)=>{
    switch(action.type){
        case 'CART_ADD_ITEM':
            const item=action.payload
            const exsist=state.cartItems.find((tar)=>tar.product===item.product)
            if(exsist){
                return {...state,cartItems:state.cartItems.map((tar)=>tar.product===exsist.product?item:tar)}
            }else{
                return {...state,cartItems:[...state.cartItems,item]}
            }
        case 'CART_REMOVE_ITEM':
            return {...state,cartItems:state.cartItems.filter(p=>p.product!==action.payload)}
        default:
            return state

    }

}
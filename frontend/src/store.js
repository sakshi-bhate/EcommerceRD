import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools, compostWithDevTools} from 'redux-devtools-extension'
import {ProductListReducers,ProductDetailReducers} from './reducers/productReducers'
import {CartReducer} from './reducers/cartReducers'

const reducer=combineReducers(
    {
        productList:ProductListReducers,
        productDetail:ProductDetailReducers, 
        cart:CartReducer,
    }
    
)

const storageItem=localStorage.getItem('cartitems')? JSON.parse(localStorage.getItem('cartitems')):[]

const initialState={
    cart:{cartItems:storageItem}
}
const middleware=[thunk]

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
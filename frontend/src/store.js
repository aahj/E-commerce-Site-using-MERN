import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer } from './reducer/productReducers';
import { authReducer, userReducer, forogotPasswordReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducers';


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forogotPassword: forogotPasswordReducer,
    cart: cartReducer
})

// put data in state just before loading
let initialState = {
    //  pull data from localStorage and save it to initialState
    // if item exist, get it from LocalStorage and parse it to JSON
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo:localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {},
    }
}

const middleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;
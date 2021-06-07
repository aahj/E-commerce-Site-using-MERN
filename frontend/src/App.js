import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Home from './Components/Home';
import ProductDetails from './Components/products/ProductDetails';

// import carts
import Cart from './Components/cart/Cart';
import Shipping from './Components/cart/ShippingInfo';
import ConfirmOrder from './Components/cart/ConfirmOrder';
import Payment from './Components/cart/Payment';
import OrderSuccess from './Components/cart/OrderSuccess';

// import orders
import ListOrders from './Components/order/ListOrders';
import OrderDetails from './Components/order/OrderDetails';

// import Auth or User
import Login from './Components/user/Login';
import Register from './Components/user/Register';
import Profile from './Components/user/Profile';
import UpdateProfile from './Components/user/UpdateProfile';
import UpdatePassword from './Components/user/UpdatePassword';
import ForgotPassword from './Components/user/ForgotPassword';
import NewPassword from './Components/user/NewPassword';

// imports admin
import Dashboard from './Components/admin/Dashboard';
import ProductList from './Components/admin/ProductList';
import NewProduct from './Components/admin/NewProduct';
import UpdateProduct from './Components/admin/UpdateProduct';
import OrderList from './Components/admin/OrderList';
import ProcessOrder from './Components/admin/ProcessOrder';
import UsersList from './Components/admin/UsersList';
import UpdateUser from './Components/admin/UpdateUser';

import store from './store';
import { load_user } from './actions/userAction';
import ProtectedRoute from './Components/Routes/protectedRoute';

// payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { userReducer } from './reducer/userReducer';


function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  // load currently logged user instantly when user refresh the page
  useEffect(() => {
    store.dispatch(load_user());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();

  }, [])

  const { user, loading } = useSelector(state => state.auth);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />

          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute path="/success" component={OrderSuccess} />

          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/password/forgot' component={ForgotPassword} exact />
          <Route path='/password/reset/:token' component={NewPassword} exact />
          <ProtectedRoute path='/me' component={Profile} exact />
          <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
          <ProtectedRoute path='/password/update' component={UpdatePassword} exact />

          <ProtectedRoute path='/orders/me' component={ListOrders} exact />
          <ProtectedRoute path='/order/:id' component={OrderDetails} exact />
        </div>

        <ProtectedRoute path='/dashboard' isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path='/admin/products' isAdmin={true} component={ProductList} exact />
        <ProtectedRoute path='/admin/product' isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path='/admin/product/:id' isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path='/admin/orders' isAdmin={true} component={OrderList} exact />
        <ProtectedRoute path='/admin/order/:id' isAdmin={true} component={ProcessOrder} exact />
        <ProtectedRoute path='/admin/users' isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />

        {/* {!loading && user.role !== 'admin' && (
          <Footer />
        )} */}

      </div>
    </Router>
  );
}

export default App;

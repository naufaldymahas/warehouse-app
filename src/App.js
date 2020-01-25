import React from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import ListProduct from './containers/ListProduct/ListProduct';
import AddProduct from './containers/AddProduct/AddProduct';
import './App.css'

const App = () => {
  return (
    <>
      <header style={{ borderBottom: '1px solid black' }} className='p-2 mb-4 d-flex'>
        <h4 className='m-0 nav-link'>
          <Link to='/' className='home-navbar'>Product Management</Link>
        </h4>
        <span className='my-auto'>
          <Link to='/add' className='navbar'>
            Add Product
          </Link>
        </span>
      </header>
      <div className='px-4'>
        <Switch>
          <Route path='/' exact component={ListProduct}/>
          <Route path='/add' exact component={AddProduct}/>
        </Switch>
      </div>
    </>
  )
};

export default withRouter(App);

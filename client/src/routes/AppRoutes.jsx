import React from 'react';
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import { NavBarMain } from '../components/NavBarMain';
import LoginAndRegister from '../views/LoginAndRegister';
import { MainScreen } from '../views/MainScreen';
import { ProductInfo } from '../views/ProductInfo';

export const AppRoutes = () => {
  return (
    <Router>
    <NavBarMain />
    <Routes>
    <Route path='/login' element={<LoginAndRegister goto="/register" login={true} />} />
      <Route path='/register' element={<LoginAndRegister goto="/login" login={false} />} />
      <Route path='/product/create' element={<ProductInfo user={true} />} />
      <Route path='/product/:id' element={<ProductInfo />} />
      <Route path='/product/update/:id' element={<ProductInfo />} />
      <Route path='/' element={<MainScreen user={true} />} />
    </Routes>
  </Router>
  )
};


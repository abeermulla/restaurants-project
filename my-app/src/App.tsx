import React from 'react';
import './App.css';
import { Navbar } from './Navbar/Navbar';
import { navArr } from './Navbar/navitems';
import { Footer } from './Footer/Footer';
import { footerArr } from './Footer/footeritems';
import {BrowserRouter , Route , Routes} from "react-router-dom";
import { Home } from './Home/home';
import { Signup } from './Signup/signup';
import { Restaurants } from './Restaurants/restaurants';
import { Conditoria } from './Conditoria/conditoria';
import { Bakery } from './Bakery/bakery';
// import { Delivery } from './Delivery/delivery';
import { Aboutus } from './Aboutus/aboutus';
// import { Followus } from './Followus/followus';
import { Coffeeshop } from './CoffeeShop/coffeeshop';
import { Contactus } from './ContactUs/contactus';
import { Login } from './Login/login';
// import { Profile } from './Profile/profile';





function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar navItems={navArr} />
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="home" element={<Home/>} />
        <Route path="advertising" element={<Signup/>} />
        <Route path="restaurants" element={<Restaurants/>} />
        <Route path="coffeeshop" element={<Coffeeshop/>} />
        <Route path="conditoria" element={<Conditoria/>} />
        <Route path="bakery" element={<Bakery/>} />
        <Route path="login" element={<Login/>} />
        {/* <Route path="delivery" element={<Delivery/>} /> */}
        <Route path="contactUs" element={<Contactus/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        {/* <Route path="followus" element={<Followus/>} /> */}
        {/* <Route path="profile" element={<Profile/>} /> */}
        </Routes>
        </BrowserRouter>
        
        <Footer footerItems={footerArr}/>
        
        
        
        
        


      </header>
    </div>
  );
}
export default App;

// this function contains all the pages of the website and connecting between them



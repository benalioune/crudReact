
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Products from './components/Products';
import Home from './components/Home';
import { useEffect, useState } from 'react';

import NewProducts from './components/NewProducts';

// import Home and Products components here


function App() {
  // utilser les hooks pour encapsuler la logique reutilisable dans plusieurs composants (une fonctions)
  const [currentRoute, setCurrentRoute] = useState();

  // executer un traitement une fois que le composant est chargé on utilise les useEffect() 

  useEffect(() => {

    const path = window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length));


  }, []);

  function handleClick() {

  }

  return (
    <BrowserRouter>

      <nav className='card col-6 offset-3 p-2'>
        <ul className="nav na-pills">

          <li>
            <Link onClick={() => setCurrentRoute("home")}
              className={
                currentRoute == "home"
                  ? "btn btn-primary btn-lg mx-3 px-5 py-3 mt-2"
                  : "btn btn-outline-primary btn-lg mx-3 px-5 py-3 mt-2"
              } to={"/home"}>Home</Link>
          </li>

          <li>
            <Link onClick={() => setCurrentRoute("products")}
              className={
                currentRoute == "products"
                  ? "btn btn-primary btn-lg mx-3 px-5 py-3 mt-2"
                  : "btn btn-outline-primary btn-lg mx-3 px-5 py-3 mt-2"
              } to={"/products"}>Products</Link>
          </li>

          <li>
            <Link onClick={() => setCurrentRoute("newproducts")}
              className={
                currentRoute == "newproducts"
                  ? "btn btn-primary btn-lg mx-3 px-5 py-3 mt-2"
                  : "btn btn-outline-primary btn-lg mx-3 px-5 py-3 mt-2"
              } to={"/newproducts"}>New Product</Link>
          </li>


        </ul>
      </nav>

      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="newproducts" element={<NewProducts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

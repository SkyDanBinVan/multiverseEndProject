import 'normalize.css';
import './App.css';
import React, { useState, useEffect } from 'react'
import { ProductRow, ViewProduct, ListProducts } from './components/products'
import backendProducts from './services/backendProducts'

import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch,
  useHistory
} from "react-router-dom"

const API_LINK = "http://localhost:3001"

function App() {
  const [cart, setCart] = useState({"-1": 0});

  const addToCart = (product) => {
    console.log("adding to cart...")
    console.log(product);
    console.log(product.id);
    let c = {...cart};
    if (c[product.id] != undefined) {
      c[product.id] += 1;
      //setCart({...cart, `${product.title}`: 1})
    } else {
      c[product.id] = 1;
    }
    console.log(`new cart: ${JSON.stringify(c)}`);
    setCart(c);
  }
  const [products, setProducts] = useState([])
  useEffect(() => {
    console.log('effect');
    backendProducts
    .getAll()
    .then(response => {
      //console.log('promise fulfilled');
      setProducts(response);
      //console.log(response);
    })
  }, []);
  //console.log(products);
  const match = useRouteMatch('/products/:id')  
  const product = match ? products.find(product => product.id === Number(match.params.id)) : null
  //console.log(`product: ${product}`)
  const itemsInCart = Object.values(cart).reduce((a, b) => {return a + b});
  console.log(`cart values: ${Object.values(cart)}`)
  let padding = { padding: 5 };
  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/new">new</Link>
      </div>
      <div>
        <h2>Items in cart: {itemsInCart}</h2>
      </div>
      <Switch>
        <Route path="/products/:id">
            <ViewProduct product={product} addToCart={addToCart}/>        
        </Route>
        <Route path="/">
          <ListProducts products={products} />
        </Route>
      </Switch>

      <div>
        <i>cute footer :O</i>
      </div>
    </div>
  )
}

export default App;

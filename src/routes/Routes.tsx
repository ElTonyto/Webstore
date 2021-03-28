import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Cart from "../components/cart/Cart"
import Offers from "../components/offers/Offers"
import Products from "../components/products/Products"
import OrderSummary from "../components/summary/OrderSummary"

import NotFound from "../components/errors/NotFound"

import Home from "../components/home/Home"
import ProductById from "../components/products/ProductById"


const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/products/:id" component={ProductById} />

        <Route exact path="/order-summary" component={OrderSummary} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/offers" component={Offers} />
        <Route exact path="/products" component={Products} />
        
        <Route exact path="/not-found" component={NotFound} />

        <Route exact path="/" component={Home} />
    
        <Redirect from="*" to="/not-found" />
    </Switch>
)

export default Routes

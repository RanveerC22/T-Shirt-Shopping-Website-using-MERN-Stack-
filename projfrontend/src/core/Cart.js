import React, { useEffect, useState } from "react";
import "../styles.css"
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/CartHelper";
import StripCheckout from "./StripCheckout";



const Cart = () =>{

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() =>{
        setProducts(loadCart())

    }, [reload])
    
    const loaddAllProducts =() =>{
        return(
            <div >
                <h2>This section is to load the products</h2>
                {products.map((product, index) =>(
                    <Card
                    key={index}
                    product={product}
                    addtoCart = {false}
                    removeFromCart = {true}
                    setReload = {setReload}
                    reload ={reload}
                    />
                )
                
                )}
            </div>
        )
    }

    const loaddCheckout =() =>{
        return(
            <div >
                <h2>This section is for Checkout</h2>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to Checkout">
           <div className="row text-center">
              <div className="col-6" >
                {loaddAllProducts()}
              </div>
              <div className="col-6" >
                <StripCheckout 
                products = {products}
                setReload = {setReload}
                />
              </div>

           </div>
        </Base>
    )
}

export default Cart
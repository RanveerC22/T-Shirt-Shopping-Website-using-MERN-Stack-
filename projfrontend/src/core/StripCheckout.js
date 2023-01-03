import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';

import {createOrder} from "./helper/orderHelper"



const StripCheckout = ({products, 
    setReload = f =>f, 
    reload = undefined}) => {

        const [data , setData] = useState({
            loading:false,
            success:false,
            error:"",
            address:""
        });


        const token = isAuthenticated() && isAuthenticated().token
        const userId = isAuthenticated() && isAuthenticated().user._id

        const getFinalAmount = () =>{
           let amount = 0
           products.map(p => {
            amount = amount + p.price
           })

           return amount;
        };

        const makepayment = (token) =>{
            const body ={
                token,
                products
            }

            return fetch(`${API}/stripepayment`, {
                method:"POST",
                headers:{
                       Accept:"application/json",
                      "Content-Type" : "application/json"
                },
                body:JSON.stringify(body)
            }).then(response=>{
               console.log(response)
               const {status} =response
               console.log("STATUS", status)
            }).catch(error => console.log(error))
        }

        const showStripeButton = () =>{
            return isAuthenticated() ? (
                <StripeCheckoutButton
                stripeKey="pk_test_51M8FbxSI0vH7d1OWtmAEN5celJIwoeS3yMKu5RVNqLecTbA6VFIeFDKkjvgVjLCMcIKhjMjT5lIyZonKxZGgbigj000w21vyIK"
                token= {makepayment}
                amount = {getFinalAmount()*100}
                name = "One Last Step"
                shippingAddress
                billingAddress
                >
                <button className='btn btn-success'>Pay with stripe</button>
                </StripeCheckoutButton>
            ) : (
                <Link to={"/signin"}>
                    <button className='btn btn-warning'>Sign In</button>
                </Link>
            )
        }



  return (
    <div>
        <h3 className='text-white'>
            Strip Checkout {getFinalAmount()}
        </h3>
        {showStripeButton()}
    </div>
  )
}

export default StripCheckout;

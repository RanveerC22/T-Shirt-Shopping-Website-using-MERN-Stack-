import React, { useEffect, useState } from "react";
import "../styles.css"
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Link } from "react-router-dom";



export default function Home(){

  const [products , setProducts] = useState([])
  const [error , setError] = useState(false)

  const loadAllProduct = () =>{
    getProducts().then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setProducts(data)
      }
    })
  }


  useEffect(() =>{
    loadAllProduct()
  }, [])



    console.log("API IS",API)
    return (
        <Base title="Home Page" description="">
           <div className="row px-3 text-center">
            <h1 className="text-white">All of The T-Shirts Are here!!</h1>
            <div className="row">
              {products.map((product , index)=>{
                return(
                  <div key={index} className="col-4 mb-4">
                  <Card product={product}/>  
                  </div>
                )
              })}
            </div>
           </div>

        </Base>
    )
}
import React from 'react'
import { API } from '../../backend';


const ImageHelper =({product}) => {

   const imageulr = product ?`${API}/product/photo/${product._id}`:`https://images.pexels.com/photos/3532557/pexels-photo-3532557.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load`
   return (
    <div className="rounded border border-success p-2">
                <img
                  src={imageulr}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
              </div>
  )
}

export default ImageHelper;

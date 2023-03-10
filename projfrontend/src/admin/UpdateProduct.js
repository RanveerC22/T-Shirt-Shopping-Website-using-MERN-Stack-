import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getCategories, getProduct, updateProduct } from './helper/adminapicall'



const UpdateProduct = ({match}) => {


  const {user ,  token} = isAuthenticated();

  const [values , setValues] = useState({
    name: "",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:[],
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    getaRedirect:false,
    formData:"",
  })

  const {name, description,price,stock, categories,category,loading,error,createdProduct,getaRedirect,formData} = values;

  const preload = (productId) =>{
    getProduct(productId).then(data=>{
      console.log(data)
      if(data.error){
        setValues({...values,error:data.error})
      }else{
        setValues({
            ...values,
            name : data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            stock:data.stock,
            formData:new FormData()
           

        })
        preloadCategories()
      }
    })
  }

  const  preloadCategories =() =>{
    
    getCategories().then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({
                categories:data, formData:new FormData()
            })
        }
    })


}


  useEffect(() => {
    preload(match.params.productId)
  }, []);


  const onSubmit =(event) =>{
  event.preventDefault();
  setValues({...values, error:"", loading: true })
  updateProduct(match.params.productId,user._id, token, formData).then(data=>{
    if(data &&data.error){
      setValues({...values, error:data.error})
    }else{
      setValues({
        
        ...values,
        name:"",
        description:"",
        price:"",
        photo:"",
        stock:"",
        loading:false,
        createdProduct: data.name, 
      })
    }
  })
  }

  const handleChange = name => event =>{
    const value = name ==="photo" ? event.target.files[0] : event.target.value
    formData.set(name, value);
    setValues({...values,[name]:value})
  }

  const successMessage =() =>(
    <div className='bg-success mt-1' style={{display: createdProduct? "" : "none" }}>
      <h4>{createdProduct} Updated Successfully</h4>
    </div>
  )

  const errorMessage =() =>(
    <div className='bg-success mt-1' style={{display: error? "" : "none" }}>
      <h4>Failed To Create A Product</h4>
    </div>
  )


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="container-fluid btn btn-block btn-success mb-2">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
          
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mb-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate, index) =>(
                <option key={index} value={cate._id}>{cate.name}</option>

              ))}

              
            </select>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Update Product
          </button>
        </form>
      );


  return (
   <Base
   title='Add a product here!'
   description='Welcome to product creation section'
   className='container bg-info p-3'>
   <Link to={'/admin/products'} className='btn btn-md btn-dark mb-3'>Return Back To Managing Product Page</Link>
    
    <div className='row bg-dark text-white rounded'>
        <div className='col-md-8 offset-md-2'>
            {successMessage()}
            {errorMessage()}
            
            {createProductForm()}
           
        </div>

    </div>
   </Base>
  )
}

export default UpdateProduct

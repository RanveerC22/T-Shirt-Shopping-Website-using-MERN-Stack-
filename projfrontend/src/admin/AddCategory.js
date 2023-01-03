import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {createCategory} from "./helper/adminapicall"

const AddCategory = () =>{

  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const {user , token} = isAuthenticated()

  const goBack =() =>{
    return (
      <div className='mt-3'>
        <Link className='btn btn-small btn-info mb-3' to={"/admin/dashboard"}>Go Back</Link>
      </div>
    )
  }


  const handleChange= event =>{
    setError("")
    setName(event.target.value)
}

  const onSubmit = (event) =>{
    event.preventDefault();
    setError("")
    setSuccess(false)
    createCategory(user._id, token , {name})
    .then(data=>{
      if(data.error){
        setError(true)
      }else{
        setError("")
        setSuccess(true)
        setName("")
      }
    })

  }
  const myCategoryForm =() =>{
    return (
      <form>
        <div className='form-group'>
          <p className='lead'>Enter the category</p>
          <input type={'text'} className ='form-control my-3' autoFocus required 
          placeholder='For Ex. Summer' onChange={handleChange} value= {name}>

          </input>
        </div>
        <button className='btn btn-outline-info my-1' onClick={onSubmit}>Create Category</button>
      </form>
    )

  }

  const successMessage=()=>{
    return(
    <div className="alert alert-success mt-2" style={{display: success ? "":"none"}}>Category Created Successfully</div>
    )
    
}

const errorMessage=()=>{
  return(
  <div className="alert alert-danger mt-2" style={{display: error ? "":"none"}}>Failed to Created Successfully</div>
  )
  
}
 

  return (
    <Base title='Create a Category' description='Add a new category for new T-Shirts'
     className='container bg-info p-4'>

        <div className='row bg-white rounded'>
            <div className='col-md-8 offset-md-2'>
               {successMessage()}
               {errorMessage()}
               {myCategoryForm()}
               {goBack()}
            </div>
            
        </div>
       
     </Base>
  )
}

export default AddCategory;
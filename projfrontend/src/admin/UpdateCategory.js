import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getCategory, updateCategory } from './helper/adminapicall'


const UpdateCategory= ({match}) =>{

  const [name , setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const{user , token} = isAuthenticated();

    const preload=(categoryId) =>{
        getCategory(categoryId).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setName(data.name)
            }
        })
    }
    

    useEffect(() => {
        preload(match.params.categoryId)
      }, []);

      const handleChange= event =>{
        setName(event.target.value)
    }

    const successMessage=()=>{
      return(
      <div className="alert alert-success mt-2" style={{display: success ? "":"none"}}> Category name Updated Successfully</div>
      )}


      const goBack =() =>{
        return (
          <div className='mt-3'>
            <Link className='btn btn-small btn-info mb-3' to={"/admin/dashboard"}>Go Back</Link>
          </div>
        )
      }


      const myCategoryForm =() =>{
        return (
          <form>
            <div className='form-group'>
              <p className='lead'>Enter the new category name to be updated</p>
              <input type={'text'} className ='form-control my-3' autoFocus required 
              placeholder='For Ex. Summer' onChange={handleChange} value= {name}>
    
              </input>
            </div>
            <button className='btn btn-outline-info my-1' onClick={onSubmit}>Update Category</button>
          </form>
        )
    
      }

      const onSubmit = (event) =>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        updateCategory(match.params.categoryId , user._id, token, {name} )
        .then(data=>{
          if(data.error){
            setError(true)
            console.log(user._id)
          }else{
            setError("")
            setSuccess(true)
            console.log(user._id)
            setName("")
          }
        })

        
      }
    

  return (
    <Base title='Create a Category' description='Add a new category for new tshirts'
    className='container bg-info p-4'>

       <div className='row bg-white rounded'>
           <div className='col-md-8 offset-md-2'>
              {successMessage()}
              {myCategoryForm()}
              {goBack()}
           </div> 
       </div>
    </Base>
  )
}

export default UpdateCategory;

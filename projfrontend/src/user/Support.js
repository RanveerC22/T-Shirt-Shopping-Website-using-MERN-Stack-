
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'


const  Support = () => {

    const [Redirect, setRedirect] = useState(false)
    const [Name, setName] = useState([])
    const [Suggestion, setSuggestion] = useState([])
    const [error,setError] = useState(false)


    const onSubbmit =(event) =>{
        event.preventDefault();
        setName("");
        setSuggestion("");
        setError(true)
    }

    const successMessage=()=>{
      return(
      <div className="alert alert-success mt-2" style={{display: error ? "":"none"}}>Thank you for your valuable response</div>
      )
      
  }
    const handleChange= event =>{
       
        setName(event.target.value)
    }

    const handleChangesugg = event =>{
        setSuggestion(event.target.value)
    }

    const myCategoryForm =() =>{
        return (
          <form>
            <div className='form-group'>
              <p className='lead'>Enter your email</p>
              <input type={'text'} className ='form-control my-3' autoFocus required 
              placeholder='For Ex. sachintendulkar@gmail.com' onChange={handleChange}  value={Name}>
              </input>

              <p className='lead'>Write your suggestions here</p>
              <input type={'text'} className ='form-control my-3' autoFocus required 
               onChange={handleChangesugg} value={Suggestion}  >
              </input>
            </div>
            <button className='btn btn-outline-info my-1' onClick={onSubbmit}>Send</button>
          </form>
         
        )
    
      }

  return (
   <Base title='Support Center' description='Your suggestions are appreciated' className='container bg-success p-4'>
      <div className='row bg-white rounded'>
           <div className='col-md-8 offset-md-2'>
              {successMessage()}
              {myCategoryForm()}
            
           </div> 
       </div>

      <footer className='foorter bg-dark my-auto py-'>
            <div className='container-fluid bg-success text-white text-center py-4'>
                <h4>Thank You for your suggestion</h4>
                <div className="">
              <Link
                className="btn btn-warning"
                to={`/`}
              >
                <span className="text-center">Return Back to Home</span>
              </Link>
            </div>
            </div>

            <div className='container text-center'>
                <span className='text-muted'>
                    An Amazing TSHIRTS <span className='text-white'>MERN</span>
                </span>
            </div>
        </footer>
   </Base>
        
   
  )
}

export default Support;

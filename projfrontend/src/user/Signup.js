import React from "react";
import { useState } from "react";
import Base from "../core/Base"
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup=()=>{

    const [values, setValues] =useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success: false
    });

    const {name , email , password , error, success}=values

    const handelChange= name => event=>{
        setValues({...values,error:false, [name]:event.target.value})
    }

    const onSubmit =event=>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
       .then(data=>{
        if(data.error){
            setValues({...values,error: data.error , success:false})
        }else{
            setValues({
                ...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true,
            })
        }
       })
       .catch(console.log("Error In Signup"))
    }


    const successMessage=()=>{
        return(
            <div className="alert alert-success" style={{display: success ? "":"none"}}>New Account was created Successfully. Please 
            <Link to={"/signin"}>Login Here</Link></div>
        )
       
    }

    const errorMessage=()=>{
        return(
        <div className="alert alert-danger" style={{display: error ? "":"none"}}>{error}</div>
        )
        
    }




    const signUpForm =()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handelChange("name")} type={"text"} value={name}></input>
                        </div>

                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handelChange("email")} type={"email"} value={email}></input>
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control"  onChange={handelChange("password")}  type={"password"} value={password}></input>
                        </div>

                        <div className="form-group py-3">Already a user? Please 
                        <Link to={"/signin"}>SignIn Here</Link></div>

                        <br></br>

                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return(
        <Base title="SignUp Page" description="Not a user? please Signup">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>

        <footer className='foorter bg-dark my-auto py-'>
            <div className='container-fluid bg-success text-white text-center py-4'>
                <h4>If you got any questions or suggestions feel free to reach out</h4>
                <div className="">
              <Link
                className="btn btn-warning"
                to={`/admin/support`}
              >
                <span className="text-center">Contact Us</span>
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

export default Signup; 
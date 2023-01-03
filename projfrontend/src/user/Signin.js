import React from "react";
import { useState } from "react";
import Base from "../core/Base"
import { Link,Redirect } from "react-router-dom";
import{signin, authenticate,isAuthenticated} from "../auth/helper"


const Signin=()=>{

    const [values,setValues]=useState({
        email:"",
        password:"",
        error:"",
        loading: false,
        didRedirect: false
    })

    const{email,password,error,loading,didRedirect}= values;
    const {user} = isAuthenticated();

    const handelChange= name => event=>{
        setValues({...values,error:false, [name]:event.target.value})
    }

    const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true})
                })
            }
        })
        .catch(console.log("signin request failed"))
    }

    const performRedirect=()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to={"/admin/dashboard"}/>
            }else{
                return <Redirect to={"/user/dashboard"}/>

            }  
        }

        if(isAuthenticated()){
            return <Redirect to={"/"} />
        }
    }


    const loadingMessage=()=>{
        return(
           loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
           )
        )
       
    }

    const errorMessage=()=>{
        return(
        <div className="alert alert-danger" style={{display: error ? "":"none"}}>{error}</div>
        )
        
    }


    const SignInForm=()=>{
        return(
            <div className="row">
            <div className="col-6 offset-3 text-left">
                <form>
                    <div className="form-froup">
                        <label className="text-light">Email</label>
                        <input onChange={handelChange("email")}  value={email} type={"email"} className="form-control"></input>
                    </div>
    
                    <div className="form-froup">
                        <label className="text-light">Password</label>
                        <input onChange={handelChange("password")} value={password} type={"password"} className="form-control"></input>
                    </div>

                    <div className="form-group py-3">Not a user? Please 
                        <Link to={"/signup"}>Signup Here</Link></div>
                    <br></br>
    
                    <button onClick={onSubmit} className="btn btn-success">Submit</button>
                </form>
            </div>
            </div>
        )
    }
    
    return(
        <Base title="SignIn Page" description="A Page for user to SignIn!">
        {loadingMessage()}
        {errorMessage()}
        {SignInForm()}
        {performRedirect()}
        

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

export default Signin;
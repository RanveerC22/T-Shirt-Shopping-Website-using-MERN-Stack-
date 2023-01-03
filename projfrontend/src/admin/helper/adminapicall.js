import { isAuthenticated } from "../../auth/helper";
import { API } from "../../backend";


//Category API Calls

export const createCategory =(userID, token , category) =>{

    return fetch (`${API}/category/create/${userID}`,{
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
       
        body : JSON.stringify(category)
    }).then(response => {
        return response
    })

    .catch(error => console.log(error))
}

//API for getting all the categories

export const getCategories = () =>{
    return fetch (`${API}/categories`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }) 
    .catch(error => console.log(error))
}

//Product API Calls

export const createProduct = (userID ,  token , product)=>{
 return fetch (`${API}/product/create/${userID}`,{
    method :"POST",
    headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
    },

    body: product
    
 }).then(response =>{
    return response.json();
 })

 .catch(err=> console.log(err))
}

//API for getting all the products

export const getProducts = () =>{
    return fetch (`${API}/products`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }) 
    .catch(error => console.log(error))
}


// API for getting a product

export const getProduct = productID =>{
    return fetch (`${API}/product/${productID}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }) 
    .catch(error => console.log(error))
}

// API for updating a product

export const updateProduct = (productID ,userID ,  token , product)=>{
    return fetch (`${API}/product/${productID}/${userID}`,{
       method :"PUT",
       headers:{
           Accept:"application/json",
           Authorization: `Bearer ${token}`
       },
   
       body: product
    }).then(response =>{
       return response.json()
    })
   
    .catch(err=> console.log(err))
   }
   

// API for deleting a product

export const deleteProduct = (productID, userID , token)=>{
    return fetch (`${API}/product/${productID}/${userID}`,{
       method :"DELETE",
       headers:{
           Accept:"application/json",
           Authorization: `Bearer ${token}`
       }
   
    }).then(response =>{
       return response.json()
    })
   
    .catch(err=> console.log(err))
   }

// API for deleting a category

export const deleteCategory =(categoryID, userID, token)=>{
    return fetch(`${API}/category/${categoryID}/${userID}`,{
        method :"DELETE",
       headers:{
           Accept:"application/json",
           Authorization: `Bearer ${token}`
       }
    }).then(response =>{
        return response.json()
     })
    
     .catch(err=> console.log(err))
}

// APi for getting a single category
export const getCategory = (categoryID)=>{

    return fetch (`${API}/category/${categoryID}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }) 
    .catch(error => console.log(error))
}


// API for updating the category

export const updateCategory =(categoryID, userID, token, newname) =>{


    return fetch (`${API}/category/${categoryID}/${userID}`,{
      
    method :"PUT",
       headers:{
           Accept:"application/json",
           "Content-Type" : "application/json",
           Authorization: `Bearer ${token}`
       },
   
       body: JSON.stringify(newname)
        
    }).then(response =>{
        return response.json()
     })
    
     .catch(err=> console.log(err))
    

}

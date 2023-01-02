import React from "react";
import {BrowserRouter, Switch , Route} from "react-router-dom"
import Home from "./core/Home";
import signin from "./user/Signin";
import signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import Support from "./user/Support";



export default function Routes(){
    return(
        <BrowserRouter>
         <Switch>
            <Route path="/" exact component ={Home} />
            <Route path="/signup" exact component ={signup} />
            <Route path="/signin" exact component ={signin} />

           <PrivateRoute path="/user/dashboard" exact component ={UserDashBoard} />
           <AdminRoute path="/admin/dashboard" exact component ={AdminDashBoard} />
           <AdminRoute path='/admin/create/category' exact component ={AddCategory} />
           <AdminRoute path = '/admin/categories' exact component={ManageCategories}></AdminRoute>
           <AdminRoute path = '/admin/create/product' exact component={AddProduct}></AdminRoute>
           <AdminRoute path = '/admin/products' exact component={ ManageProducts}></AdminRoute>
           <AdminRoute path = '/admin/product/update/:productId' exact component={UpdateProduct}></AdminRoute>
           <AdminRoute path = '/admin/category/update/:categoryId' exact component={UpdateCategory}></AdminRoute>

           <PrivateRoute path="/cart" exact component ={Cart} />

          <Route path="/admin/support" exact component={Support}   />



         </Switch>
        
        </BrowserRouter>
    );
}

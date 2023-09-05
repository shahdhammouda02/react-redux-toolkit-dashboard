import {Route, Routes} from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import AllCategories from '../Pages/Categories/AllCategories'
import CrudCategory from '../Pages/Categories/CrudCategory'
import AllProducts from '../Pages/Products/AllProducts'
import CrudProducts from '../Pages/Products/CrudProducts'

const AppRoutes=()=>{
    return(
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/allcategories" element={<AllCategories />}></Route>
                <Route path="/update-category/:id" element={<CrudCategory />}></Route>
                <Route path="/add-category" element={<CrudCategory />}></Route>
                <Route path="/allproducts" element={<AllProducts />}></Route>
                <Route path="/update-product/:id" element={<CrudProducts />}></Route>
                <Route path="/add-product" element={<CrudProducts />}></Route>
            </Routes>
    )
}
export default AppRoutes
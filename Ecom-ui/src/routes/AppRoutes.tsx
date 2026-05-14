import { Routes, Route } from "react-router-dom";
import ProductManagement from "../pages/products/productManagement"
import ProductDetail from "../pages/products/productDetail"
import AppLayout from "../layouts/AppLayout";

const AppRoutes = () => {
    return <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/products/:id" element={<ProductDetail />} />  
        </Route>
    </Routes>
}

export default AppRoutes;
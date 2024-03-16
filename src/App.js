import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Product from './views/Product/Product';
import Contact from './views/Contact/Contact';
import Setting from './views/Setting/Setting';
import Order from './views/Order/Order';
import Login from './views/RegisterLogin/Login';
import Register from './views/RegisterLogin/Register';
import Cart from './views/Cart/Cart'
import Buy from './views/Buy/Buy'
import ProductDetail from './views/ProductDetail/ProductDetail';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AdminSidebar from './components/AdminSidebar/AdminSidebar'
import Dashboard from './views/Admin/Dashboard/Dashboard'
import AdminHeader from './components/AdminHeader/AdminHeader'
import Products from './views/Admin/Products/Products'
import Category from './views/Admin/Category/Category';
import Customers from './views/Admin/Customers/Customers';
import Coupons from './views/Admin/Coupons/Coupons';
import OurStaff from './views/Admin/OurStaff/OurStaff';
import Orders from './views/Admin/Orders/Orders';
import AdminAddProduct from './views/Admin/Products/AddProduct';
import AdminEditProduct from './views/Admin/Products/EditProduct';
import EditCategory from './views/Admin/Category/EditCategory';
import AddCategory from './views/Admin/Category/AddCategory';
import AddCoupon from './views/Admin/Coupons/AddCoupon';
import EditCoupon from './views/Admin/Coupons/EditCoupon';
import { ToastContainer } from 'react-toastify'
import EditProfile from "./views/Admin/EditProfile/EditProfile"
import Chatbot from "./chatbot";
import CompareDetail from './views/ProductDetail/CompareDetail';

const UserLayout = () => {
  return (
    <div className="font-baskerville flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

const LoginLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

const AdminLayout = () => {
  const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"))
  if (userLogin && userLogin?.role === 'CUSTOMER') {
    return <p>abc</p>
  }
  return (
    <div>
      <AdminHeader />
      <div className="flex">
        {/* <AdminSidebar /> */}
        <Outlet />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/danh-muc" element={<Product />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/thanh-toan" element={<Buy />} />
          <Route path="/san-pham/:id" element={<ProductDetail />} />
          <Route path="/so-sanh/:id1/:id2" element={<CompareDetail />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/order" element={<Order />} />
        </Route>

        <Route element={<LoginLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="category" element={<Category></Category>} />
          <Route path="customers" element={<Customers />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="our-staff" element={<OurStaff />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products/add-product" element={<AdminAddProduct />} />
          <Route path="products/edit-product/:id" element={<AdminEditProduct />} />
          <Route path="category/add-category" element={<AddCategory />} />
          <Route path="category/edit-category/:id" element={<EditCategory />} />
          <Route path="coupons/add-coupon" element={<AddCoupon />} />
          <Route path="coupons/edit-coupon/:id" element={<EditCoupon />} />
        </Route>
      </Routes>
      
      <ToastContainer></ToastContainer>
      <Chatbot></Chatbot>
    </BrowserRouter>
  );
}

export default App;

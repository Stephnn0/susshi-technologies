import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './features/home/home'
import LoginPage from './features/auth/LoginPage'
import BlogPage from './features/blog/blog-page/BlogPage'
import SinglePage from './features/blog/single-page/SinglePage'
import ServicesPage from './features/services/ServicesPage'
import ProductsPage from './features/products/Products.Page'
import ConsultingPage from './features/consulting/ConsultingPage'
import ResearchPage from './features/research/ResearchPage'
import ReactGA from "react-ga4"
import SingleServicePage from './features/services/single-service/SingleServicePage'
import RegisterScreen from './features/auth/register/RegisterScreen'
import ProfileScreen from './features/user/profile/ProfileScreen'
import PersistLogin from './hooks/PersistLogin'
import RequireAuth from './hooks/RequireAuth'
import ShoppingCartPage from './features/shopping-cart/ShoppingCartPage'
import OrderPage from './features/user/orders/OrderPage'
import DashboardPage from './features/user/user-dashboard/DashboardPage'

function App() {

  const TRACKING_ID = "G-CDL185CG12"
  ReactGA.initialize(TRACKING_ID);
  

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route element={<PersistLogin />}>

        <Route index element={<Home />} />
        
        <Route path='services' element={<ServicesPage />}/>

        <Route path='products' element={<ProductsPage />} />
        <Route path='consulting' element={<ConsultingPage />} />
        <Route path='research' element={<ResearchPage />} />

        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterScreen />} />

        <Route path='blog' element={<BlogPage />} />
        <Route path='posts/:id' element={<SinglePage />} />
        <Route path='services/:id' element={<SingleServicePage />} />

        <Route path='cart' element={<ShoppingCartPage />} />


        <Route element={<RequireAuth  />}>
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='profile' element={<ProfileScreen />} />
        <Route path='orders' element={<OrderPage />} />
        </Route>
        
        </Route>


      </Route>
    </Routes>
  )
}

export default App

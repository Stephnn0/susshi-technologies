import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import LoginScreen from "./features/auth/LoginScreen"
import RequireAuth from "./hooks/RequireAuth"
import HomeScreen from "./features/home/HomeScreen"
import PersistLogin from "./hooks/PersistLogin"
import BlogPage from "./features/blog/BlogPage"
import ServicesPage from "./features/services/ServicesPage"
import ResearchPage from "./features/research/ResearchPage"
import ConsultingPage from "./features/consulting/ConsultingPage"

function App() {

  return (
    <Routes>
      <Route index path="login" element={<LoginScreen />} />
      <Route path="/" element={<Layout/>}>
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth  />}>
          <Route path="admin" element={<HomeScreen />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="products" element={<ResearchPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="consulting" element={<ConsultingPage/>} />
        </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App

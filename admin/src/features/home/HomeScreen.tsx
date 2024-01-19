import useLogout from "../../hooks/useLogout"
import "./home-screen.css"
import 'react-quill/dist/quill.snow.css';


const HomeScreen = () => {
  const logout = useLogout();



  return (
    <section style={{display: "flex"}}>
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>LOGOUT</button>
    </div>
  
    </section>
  )
}

export default HomeScreen
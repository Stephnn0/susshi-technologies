import useLogout from "../../hooks/useLogout";
import "./drop-button.css"
import { Link } from 'react-router-dom';


const DropdownButton  = () => {
  const logout = useLogout();


  return (
    <div className="drop-button-main">
        <div className="drop-button-main-button">
          <Link to="/"><h4>Go to Website</h4></Link>
        </div>
        <hr/>
        <div className="drop-button-main-button" onClick={logout}>
          <h4>logout</h4>
        </div>   
   </div>
  );
};

export default DropdownButton;

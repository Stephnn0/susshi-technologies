import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar2.css';
import './AuthNavbar.css'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';
import logg from "../../assets/brandy.png"
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext, TodoContextType } from '../../context/AuthProvider';
import { useLocation } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import DropdownButton from '../dropdown/DropButton';
import axios from 'axios';
import accountsusshi from "../../assets/account.jpg"
import APIEndpoints from '../../utilities/urls';
import { useIdFromToken } from '../../hooks/GetIdFromToken';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import avatar from "../../assets/avatar.jpg"


function Navbar2() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { accessToken } = useContext(AuthContext) as TodoContextType
  const location = useLocation();
  const { cartQuantity } = useShoppingCart();
  const [img, setImg] = useState<string | null>(null);
  const id = useIdFromToken()
  const [isOpen, setIsOpen] = useState<boolean>(false);
    
  console.log(img ,'imgggg')

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
 };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 970) {
        setDropdown(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

// -------------------------------- DROPDOWN FUNCTIONALITY
  const onClick = () => {
    setDropdown(!dropdown)
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } 
  };
  // --------------------------------------------------------



  useEffect(() => {
    if(accessToken && accessToken.accessToken){
      const fetchProfilePic = async () => {
        try {
          const responseImg = await axios.get(`${APIEndpoints.auth}/profile/profilePic`, {
            params: {
              userId: id, 
            },
            headers: {
              'Content-Type': 'application/json',
               Authorization:`Bearer ${accessToken.accessToken}`
  
            },
            withCredentials: true,
          });
          setImg(responseImg.data)
  
        } catch(err){
          console.log(err)
        }
      }
      fetchProfilePic()
    }
  })

  return (
         <>  
           {    
           location.pathname === '/profile' ||
            location.pathname === '/orders' || 
            location.pathname === '/dashboard'

              ?
               (
      <nav className='navbarauth'>
                   <div className='navbarauth-up'>
                      <Link to='/'>
                      <img 
                       alt="logo" 
                       src={accountsusshi} 
                       className='navbar-logo-second' 
                       onClick={closeMobileMenu}/>
                      </Link>

             <div 
             onClick={toggleDropdown}
            className='mini-profile-pic'
            style={{
              backgroundColor: "rgb(186, 179, 179)",
              margin: "12px",
              height: "30px",
              width: "31px",
              borderRadius: "50px",
              cursor: "pointer"
                      }}>
            { img !== null ?
                         <img src={img as string}  
                         className='mini-profile-pic-img'
                         style={{
                         width: "100%",
                         height: "100%",
                         borderRadius: "50px"
                    }}/>
                    : 
                    <img src={avatar}  
                    className='mini-profile-pic-img'
                    style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50px"
               }}/>
            }
 


        </div>   
          { 
           isOpen &&  
          <DropdownButton/>
          }
          </div>
             <div className='navbarauth-down'>
             <Link to="/dashboard"
                  className='navbarauth-down-icons'>
             <DashboardIcon style={{color: "black"}}/>
              <h5>Dashboard</h5>
              </Link>
             <Link to="/orders" 
                   className='navbarauth-down-icons'>
                    <LocalMallIcon/>
                    <h5>Orders</h5>
              </Link>
              <Link to="/profile" 
                    className='navbarauth-down-icons'>
                      <AccountCircleIcon/>
                      <h5>Profile</h5>
              </Link>
            </div>
       </nav> 
     ) 
     : 
      <nav className='navbar' >
        <a onClick={handleClick} className='menu-icon'>
            {click ? 
               <CloseIcon className="search"/>  :
                <DensityMediumIcon className="density"/> 
            }
        </a>

        <Link to='/'>
        <img 
        alt="logo" 
        src={logg} 
        className='navbar-logo' 
        onClick={closeMobileMenu}/>
        </Link>
        

          {/* --------------------MENU LIST ICONS----------------------- */}
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}  >
              Home
            </Link>
          </li>

          {/* -------------------------------------------------- */}
          <li
            className='nav-item'
            onClick={onClick}
          >
            <Link
              to='/services'
              className='nav-links'
              onClick={closeMobileMenu}
              onMouseLeave={onMouseLeave}
              
            >
              Services <i className='fas fa-caret-down' />
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/consulting'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Consulting
            </Link>
          </li>
          {/* -------------------------------------------------- */}

          <li className='nav-item'>
            <Link
              to='/research'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Research
            </Link>
          </li>
         {/* -------------------------------------------------- */}
          <li className='nav-item'>
            <Link
              to='/blog'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
          </li>
        </ul>
      <div className="nav-div1-innericons">
        <a onClick={()=>(window.location.href = 'https://github.com/susshitechnologies')}><GitHubIcon className="git" style={{cursor: "pointer"}} /></a>
        { cartQuantity !== 0 ? (
          <div className='custom-shopping-cart-navbar-div'>
          <Link to="/cart"> <ShoppingBagIcon/></Link>
           <div className='custom-shopping-cart-navbar-div-inner'>
          <h5>{ cartQuantity }</h5> 
          </div>
          </div> ) : (
                 
                 <div className='div-for-empty-shopping'>
                 <Link className='disapear-icon' to="/cart">
                   <ShoppingBagIcon className="shopping">
                   </ShoppingBagIcon>
                 </Link>
               </div>
          )
          }
        { !accessToken?.accessToken  ? 
            <a><Link className='disapear-icon' to="/login"><PersonIcon className="person" /></Link></a>
            : 
            <Link className='disapear-icon' to="/dashboard"><div 
            className='mini-profile-pic'
            style={{
              backgroundColor: "rgb(186, 179, 179)",
              margin: "-3px",
              height: "30px",
              width: "31px",
              borderRadius: "50px",
              cursor: "pointer"
                      }}>
         <img src={img as string}  
              className='mini-profile-pic-img'
              style={{
              width: "100%",
              height: "100%",
              borderRadius: "50px"
         }}/>
        </div></Link>
             }  
     </div>
      </nav>
      
      }
      <hr/>
    </>
  );
}

export default Navbar2;
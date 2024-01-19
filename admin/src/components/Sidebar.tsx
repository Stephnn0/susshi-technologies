import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar/sidebar.css"
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import WorkIcon from '@mui/icons-material/Work';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import InventoryIcon from '@mui/icons-material/Inventory';
import BiotechIcon from '@mui/icons-material/Biotech';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

export interface AuthProviderProps {
    children: ReactNode;
  }
  
const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem =[
        {
            path:"/admin",
            name:"Dashboard",
            icon:<DashboardIcon/>
        },
        {
            path:"/blog",
            name:"Blog",
            icon:<BookIcon/>
        },
        {
            path:"/services",
            name:"Services",
            icon:<WorkIcon/>
        },
        {
            path:"/products",
            name:"Products",
            icon:<InventoryIcon/>
        },
        {
            path:"/research",
            name:"Research",
            icon:<BiotechIcon/>
        },
        {
            path:"/consulting",
            name:"Consulting",
            icon:<AccessibilityNewIcon/>
        }
    ]

  return (
    <div className='container'>
        <div className='sidebar' style={{width: isOpen ? "200px" : "50px"}}>
            <div className='top_section'>
            <DensityMediumIcon className="density" onClick={toggle} style={{cursor: "pointer"}}/> 
            </div>
            {
                menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link">
                        <div className='icon'>{item.icon}</div>
                        <div className='link_text' style={{display: isOpen ? "block" : "none"}}>{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar
import {  useState } from "react"
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import "./eight-services.css";

// images
import image1 from './../../assets/categories/ai.png'
import image2 from './../../assets/categories/Analytics.png'
import image3 from './../../assets/categories/automation.png'
import image4 from './../../assets/categories/db.png'

import image5 from './../../assets/categories/devops.png'
import image6 from './../../assets/categories/quantum.png'
import image7 from './../../assets/categories/security.png'
import image8 from './../../assets/categories/servers.png'

const EightServices = () => {
    const [isLoading] = useState(false);

    const imageObjects = [
      { name: 'Analytics', image: image2, cat: 'analytics' },
      { name: 'Databases', image: image4, cat: 'databases' },
      { name: 'Devops', image: image5, cat: 'devops' },
      { name: 'IT Automation', image: image3, cat: 'automation'},

      { name: 'Security', image: image7, cat: 'security' },
      { name: 'Custom Software Solutions', image: image6, cat: 'industry' },
      { name: 'Server Administration', image: image8, cat: 'servers' },
      { name: 'Network Administration', image: image1, cat: 'networks'},
      
    ];

    
  return (
    <div>
        { isLoading ? (
                <CircularProgress/>
        ) : (
            <>
            <div className="eight-cat-container">
                {imageObjects.map((obj, index) => (
                <div key={index} className="eight-cat-container-in">
                <img src={obj.image} />
                <Link className="link" to={`/services/${obj.cat}`}>
                <h3>{obj.name}</h3>
                </Link>
                </div>
                ))}            
            </div>
          </>
        )}
    </div>
  )
}

export default EightServices
import decor from "../../assets/decor.png"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';


import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";



const Footer = () => {

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };


  return (
    <section className="footer-main">
        <div className="footer-img-mobile">
          <img src={decor}/>
        </div>
        <br/>
        <br/>
        <div className="logo-for-susshi">
        </div>
        <div className="footer-div-top">

        <div className="ft-div">
            <h3>Products & Solutions</h3>
            <span>Cloud computing</span>
            <span>Data & Analytics</span>
            <span>Security</span>
            <span>IT infrastructure</span>
            <span>Blockchain</span>
        </div>
        <div className="ft-div">
            <h3>Susshi Store</h3>
            <span>Software</span>
            <span>Hardware</span>
            <span>Orders</span>
            <span>Download Center</span>
            <span>Payments</span>
            </div>
        <div className="ft-div">
            <h3>Education</h3>
            <span>Youtube</span>
            <span>Students</span>
            <span>Forums</span>
            <span>Questions</span>
            <span>Contact Us</span>
        </div>
        <div className="ft-div">
            <h3>Business</h3>
            <span>Coming Soon</span>
            <span>Coming Soon</span>
            <span>Coming Soon</span>
            <span>Coming Soon</span>
            <span>Coming Soon</span>
        </div>
        {/* <div className="ft-div">
            <h3>Documentations</h3>
            <span>Languages</span>
            <span>Tools</span>
            <span>Sushi Learn</span>
            <span>Algorithms</span>
            <span>Data Structures</span>
        </div> */}
        <div className="ft-div">
            <h3>Company</h3>
            <span>About Susshi</span>
            <span>Company News</span>
            <span>Inverstors</span>
            <span>Accessibility</span>
            <span>Sustainability</span>
        </div>

         <div className="ft-div">
        <div className="footer-img">
          <img src={decor}/>
        </div>
         <br/>
        <Box sx={{ minWidth: 120, color: "white", backgroundColor: "white",  }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Language</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>English</MenuItem>
          <MenuItem value={20}>Spanish</MenuItem>
          <MenuItem value={30}>Italian</MenuItem>
        </Select>
      </FormControl>
       </Box>
        </div>


        </div>
        <hr />
        <div className="footer-div-down">
            <div className="inner-ft-d-left">
            <LinkedInIcon style={{padding: "5px"}}/>
            <InstagramIcon style={{padding: "5px"}}/>
            <FacebookIcon style={{padding: "5px"}}/>
            <YouTubeIcon style={{padding: "5px"}}/>
            </div>
        

            <div className="inner-ft-d-right">
            <span>Languages</span>
            <span>Privacy</span>
            <span>Sales Terms</span>
            <span>Terms of Service</span>
            <span>Careers</span>
                </div>
        </div>
    </section>
  )
}


export default Footer
import Img4 from '../../assets/dbsss.jpeg';
import Img1 from '../../assets/niti.png';
import Img2 from '../../assets/devops-tools.jpeg';
import Img3 from '../../assets/bb.jpeg';
import Button from '@mui/material/Button';
// import 



const ThreeCards = () => {
  return (
    <section className="three-card-sec">
        <div className="card-one">
            <div>
            <img alt="img" src={Img2} style={{width: "100%"}}/>
            </div>
            <h2>DevOps</h2>
            <p>DevOps management tool with AI analysis, recommendations and software for continuous integration and deployment pipelines.</p>
            <Button variant="outlined" style={{margin: 20}} >Learn more</Button>
        </div>
        <div className="card-one">
        <img alt="img1" src={Img1} style={{width: '100%'}}/>
            <h2>Networks</h2>
            <p>IP addressing, Domain Name System (DNS), primary domain email service, security products, firewalls, VPN termination, intrusion prevention systems (IPS).</p>
            <Button variant="outlined" style={{margin: 20}}>Learn more</Button>
        </div>
        <div className="card-one">
         <img alt="img3" src={Img3} style={{width: '100%'}}/>
           <h2>Databases</h2>
           <p>We offer a wide array of cloud database services, which includes NoSQL as well as relational databases.</p>
           <Button variant="outlined" style={{margin: 20}}>Learn more</Button>
        </div>
        <div className="card-one">
         <img alt="img4" src={Img4} style={{width: '100%'}}/>
           <h2>Analytics</h2>
           <p>Software for business intelligence and performance management.</p>
           <Button variant="outlined" style={{margin: 20}}>Learn more</Button>
        </div>


    </section>
  )
}

export default ThreeCards
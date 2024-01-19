import "./why-us.css"
import PhoneIcon from '@mui/icons-material/Phone';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TuneIcon from '@mui/icons-material/Tune';
import GppGoodIcon from '@mui/icons-material/GppGood';



const WhyusComponent = () => {
  return (
    <div className="grid-container">
      <div className="grid-item">
        <PhoneIcon/>
        <h4>Support 24/7</h4>
        <h5>Are IT issues disrupting
           your workflow? We've got you
            covered 24 hours a day, 
            7 days a week! Our dedicated 
            IT support team is here to 
            ensure your systems run smoothly, 
            no matter the time.</h5>

      </div>
      <div className="grid-item">
        <SavingsIcon/>
        <h4>Costs Savings</h4>
        <h5>
        As a seasoned small business, 
        you understand the value of every
         penny and the importance of making
          the most of your resources. We get it, 
          and that's why our cost-efficient IT
           support is tailored to help your
            experienced company thrive without 
            breaking the bank.
        </h5>
      </div>
      <div className="grid-item">
        <TrendingUpIcon/>
      <h4>Scalability</h4>
      <h5>
      Your small business has achieved
       remarkable growth, and now you need 
       an IT support partner who can keep
        up with your expanding needs. Look 
        no further! We offer scalable IT 
        support solutions designed to propel
         your experienced company to the next level.
      </h5>

      </div>
      <div className="grid-item">
        <TuneIcon/>
      <h4>Tailored Customization</h4>
      <h5>
      Your business is one-of-a-kind, 
      and your IT solutions should be too.
       We specialize in delivering customized 
       IT services designed to meet the specific 
       needs and goals of your enterprise.
        At Susshi Tech, 
        we don't believe in one-size-fits-all.
         We believe in custom IT excellence.
      </h5>

      </div>
      <div className="grid-item">
        <AnalyticsIcon/>
        <h4>Analytics</h4>
        <h5>
        Data is the new currency, and 
        making informed decisions based
         on data insights is crucial for
          your IT business. At Susshi Tech,
           we offer advanced analytics services 
           that turn data into actionable 
           intelligence, helping you optimize
            performance, drive innovation,
             and stay ahead of the competition.
        </h5>
      </div>
      <div className="grid-item">
        <GppGoodIcon/>
        <h4>Data Security</h4>
        <h5>
        In today's digital landscape, safeguarding
         your data is non-negotiable. 
         At Susshi, we take your data security seriously.
          Our comprehensive data security solutions are
           designed to protect your IT business against 
           threats, breaches, and vulnerabilities, 
           ensuring that your valuable information remains
            safe and confidential.
        </h5>
      </div>
    </div>
  )
}

export default WhyusComponent
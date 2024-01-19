import { FC } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "./double-section.css"


interface DoubleSectionProps {
  imageUrl: string;
  title: string;
  description: string;
  bgColor: string;
}

const ReusableDoubleSection: FC<DoubleSectionProps> = ({
  imageUrl,
  title,
  description,
  bgColor,
}) => {

 
    const sectionStyle = {
    backgroundColor: bgColor,
  };

  return (
    <section className="double-section-main">
      <div className='double-section-left' style={sectionStyle}>
        <div className="double-section-left-inside">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="double-button-section">
          <div className="double-button-button" >
        <h5>Book a Meeting</h5>
        <CalendarTodayIcon/>
       </div>
       <div className="double-button-button">
        <h5>Learn More About it</h5>
        <ArrowForwardIcon/>
       </div>
          </div>
        </div>
      </div>
      <div className='double-img-right'>
        <img alt='img' src={imageUrl} />
      </div>
    </section>
  );
};

export default ReusableDoubleSection;

import Button from '@mui/material/Button';
import Img2 from "../../assets/pi.png";
import "./split-section.css"



const SplitSection = () => {
  return (
    <section className="split-section-main">
        <div className='split-section-left'>
            <h1>We provide technology solutions to bring your vision to life</h1>
            <p>Evolve and scale for tomorrow with end-to-end custom software design and development services.
              Don't wait any longer to make your idea a reality
            </p>
            <Button variant="outlined" >Plan my project</Button>
        </div>
        <div className='split-img-right'>
            <img alt='img' src={Img2} />
        </div>
    </section>
  )
}

export default SplitSection
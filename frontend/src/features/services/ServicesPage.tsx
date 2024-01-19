import Footer from "../../components/Footer/Footer"
import ReusableDoubleSection from "../../components/reusable-double-section/ReusableDoubleSec"
import img from "../../assets/real.jpeg"
import EightServices from "../../components/8services/8Services"
import { useEffect } from "react"


const ServicesPage = () => {
  useEffect(()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  })
  
  return (
    <section>
         <main>
            <ReusableDoubleSection imageUrl={img} title={"SUSSHI Tech Industry Solutions"} description={"Discover the extraordinary impact of our innovative technologies on diverse industries. Our deep industry knowledge, customized services, and industry-specific solutions are helping clients to transform their businesses around the world."} bgColor={""} />
            <EightServices />
         </main>
          <Footer />
    </section>
  )
}

export default ServicesPage
import Footer from "../../components/Footer/Footer"
import ReusableDoubleSection from "../../components/reusable-double-section/ReusableDoubleSec"
import img from "../../assets/business.jpeg"


const ConsultingPage = () => {
  return (
    <section>
         <main>
            <ReusableDoubleSection imageUrl={img} title={"Application management services for hybrid cloud"} description={"Susshi Tech Consulting delivers high-quality and innovative hybrid cloud management services to our clients so that technology enables their business objectives and accelerates the cloud journey, unleashing the full potential of their technology investments."} bgColor={""} />
         </main>
          <Footer />
    </section>
  )
}

export default ConsultingPage
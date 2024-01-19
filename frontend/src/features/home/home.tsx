import AnnouncementBar from "../../components/announcement/AnnouncementBar"
import Footer from "../../components/Footer/Footer"
import ReusableDoubleSection from "../../components/reusable-double-section/ReusableDoubleSec"
import ThreeCards from "../../components/three-cards/ThreeCards"
import "./styles/home.css"
import img1 from "../../assets/data.jpg"
import { ContactUs } from "../contact-form/ContactForm"
import EightServices from "../../components/8services/8Services"
import TwoSecText from "../../components/two-section-text/TwoSecText"
import { useEffect } from "react"


const Home = () => {

  useEffect(()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  })


    
  return (
    <section>
        <header>
        <ReusableDoubleSection imageUrl={img1} title={"We provide technology solutions to bring your vision to life"} description={"Evolve and scale for tomorrow with end-to-end custom software design and development services. Don't wait any longer to make your idea a reality"} bgColor={""} />
        <AnnouncementBar />
        </header>
        <main>
        <TwoSecText titleRight={"Explore our Technology"} descriptionLeft={"From our flagship products for enterprise hybrid cloud infrastructure to next-generation AI, security and storage solutions, find the answer to your business challenge."} link={"products"} />
        <EightServices/>
        <ContactUs />
        <TwoSecText titleRight={"Discover our Consulting Experience"} descriptionLeft={"Bringing together a diverse set of voices with new technology, we collaborate closely, ideate freely and swiftly apply breakthrough innovations that drive big impact."} link={"consulting"} />
        <ThreeCards />
        <TwoSecText titleRight={"Inside SUSSHI TECHNOLOGIES"} descriptionLeft={"We are here to solve the world’s toughest problems through technology and that wouldn’t be possible without our most important branch: The SUSSHI research team. Have a look at our talented scientist work."} link={"research"} />
        </main>
        <footer>
          <Footer />
        </footer>
    </section>
  )
}

export default Home
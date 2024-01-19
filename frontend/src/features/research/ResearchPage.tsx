import Footer from "../../components/Footer/Footer"
import ReusableDoubleSection from "../../components/reusable-double-section/ReusableDoubleSec"
import img from "../../assets/science.jpeg"


const ResearchPage = () => {
  return (
    <section>
         <main>
            <ReusableDoubleSection imageUrl={img} title={"We choose the big, urgent, mind-bending work that endures and shapes generations."} description={"We’re a group of scientists and researchers around the globe who deeply believe in the power of the scientific method to invent what’s next for Susshi Tech, our clients, and the world."} bgColor={""} />


         </main>
          <Footer />
    </section>
  )
}

export default ResearchPage
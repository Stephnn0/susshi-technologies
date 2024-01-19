import Footer from "../../components/Footer/Footer"
import ReusableDoubleSection from "../../components/reusable-double-section/ReusableDoubleSec"
import img from "../../assets/programming.jpeg"


const ProductsPage = () => {
  return (
    <section>
         <main>
            <ReusableDoubleSection imageUrl={img} title={"Transformative technology solutions for the manufacturing industry "} description={"AI and hybrid cloud technologies help manufacturers achieve new levels of business agility"} bgColor={""} />


         </main>
          <Footer />
    </section>
  )
}

export default ProductsPage
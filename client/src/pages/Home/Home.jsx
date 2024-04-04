import Category from "../../components/Category"
import Contact from "../../components/Contact"
import FeaturedProducts from "../../components/FeaturedProducts"
import Slider from "../../components/Slider"

function Home() {
  return (
    <div className="home">
      <Slider/>
      <FeaturedProducts type="featured" />
      <Category/>
      <FeaturedProducts type="trending" />
      <Contact/>
    </div>
  )
}

export default Home

import { useState } from "react"
import "./Products.scss"
import List from "../../components/List"
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
function Products() {

  const catId = parseInt(useParams().id)


  const [price, setPrice] = useState(0)
  const [sort, setSort] = useState(null)
  const [selectedCats , setSelectedCats] = useState([])

  const{data , loading, error} = useFetch(`/sub-categories?[filter][categories][id][$eq]=${catId}`)
  const handleChange = (e) =>{
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedCats(
      checked ? [...selectedCats , value] :
      selectedCats.filter((item) => item !== value)
    )
  }
  console.log(selectedCats);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
         {data?.map((item) =>(
           <div className="inputItem" key={item.id}>
              <input type="checkbox" id={item.id} value={item.id} onChange={handleChange} />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
           )) }
          
          
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
         <div className="inputItem">
          <h4>Price :{price}</h4>
          <span>0</span>
          <input type="range" min={0} max={10000} onChange={(e) => setPrice(e.target.value)} />
          <span>10000</span>
         </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
         <div className="inputItem">
          <input type="radio" id="asc" value="asc" name="price"  onChange={e=> setSort("asc")} />
          <label htmlFor="asc">Lowest to Highest</label>
         </div>
         <div className="inputItem">
          <input type="radio" id="desc" value="desc" name="price" onChange={e=> setSort("desc")} />
          <label htmlFor="desc">Highest to Lowest</label>
         </div>
        </div>
      </div>
      <div className="right">
        <img className="catImg" src="https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="ai wearing shoes" />
        <List catId={catId} maxPrice ={price} sort={sort} subCats = {selectedCats} />
      </div>
    </div>
  )
}

export default Products
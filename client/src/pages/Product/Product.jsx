import { useState } from "react"
import "./Product.scss"
import { Heart, ShoppingBag } from 'lucide-react';
import {useDispatch} from "react-redux"
import {addToCart } from "../../redux/cartReducer"
import { useParams} from "react-router-dom"
import useFetch from "../../hooks/useFetch"
function Product() {

  const id = useParams().id

  const [selectedImg, setSelectedImage] = useState("img")
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const {data , loading, error} = useFetch(`/products/${id}?populate=*`)

  return (
    <div className="product">
      {
        loading ? "loading" : (
          <>
          <div className="left">
        <div className="images">
          <img src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url} alt="image 1" onClick={e=> setSelectedImage("img")}/>
          <img src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url} alt="image 2" onClick={e=> setSelectedImage("img2")} />
        </div>
        <div className="mainImg">
          <img src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes[selectedImg]?.data?.attributes?.url} alt="mainimg" />
        </div>
      </div>
      <div className="right">
        <h1>{data?.attributes.title}</h1>
        <span>${data?.attributes.price}</span>
        <p>
          {data?.attributes.desc}
        </p>
        <div className="quantity">
          <button onClick={() => setQuantity(prev=> (prev === 1 ? 1 : prev-1))}>-</button>
          {quantity}
          <button onClick={() => setQuantity(prev=> prev+1)}>+</button>
        </div>
        <button className="add" onClick={()=> dispatch(addToCart({
          id:data.id,
          title: data.attributes.title,
          desc: data.attributes.desc,
          price: data.attributes.price,
          img: import.meta.env.VITE_APP_UPLOAD_URL + data.attributes.img.data.attributes.url,
          quantity,
        }))}><ShoppingBag /> Add To Cart</button>
        <div className="links">
          <div className="item">
            <Heart />Add to Wish List
          </div>
          
        </div>
      </div>
          
          </>
        )
      }
      
    </div>
  )
}

export default Product
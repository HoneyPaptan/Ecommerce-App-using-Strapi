import {ChevronDown, Heart, Search, Shirt, ShoppingBag, User} from "lucide-react"
import {Link} from "react-router-dom"
import "./Navbar.scss"
import { useState } from "react"
import Cart from "./Cart"
import { useSelector } from "react-redux"
function Navbar() {
  const products = useSelector(state => state.cart.products)

  const [open, setOpen] = useState(false)
  return (
    
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Shirt className="image-nav-hero" />
            <ChevronDown />
          </div>
          <div className="item">
            <Link className="link" to="/products/1">Women</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/2">Men</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">PAPTANSTORE</Link>
        </div>
        <div className="right">
        <div className="item">
          <Link className="link" to="/">About</Link>
        </div><div className="item">
          <Link className="link" to="/">Contact</Link>
        </div><div className="item">
          <Link className="link" to="/">Stores</Link>
        </div>
        <div className="icons">
          <Search />
          <User />
          <Heart />
          <div className="cartIcons" onClick={() => setOpen(!open)}>
          <ShoppingBag />
          <span>{products.length}</span>

          </div>
        </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  )
}

export default Navbar
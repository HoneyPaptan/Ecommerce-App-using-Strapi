import "./Cart.scss"
import { Trash2 } from 'lucide-react';
import { useSelector} from "react-redux"
import { removeItem, resetCart } from "../redux/cartReducer";
import {useDispatch} from "react-redux"
import {loadStripe} from '@stripe/stripe-js';
import {makeRequest} from "../makeRequest"
function Cart() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart.products)

    const total = () =>{
        let total = 0;
        products.forEach((item) => (total += item.quantity * item.price))
        return total.toFixed(2)
    }
    const stripePromise = loadStripe('pk_test_51OnTVaSGc9Bsiu9zD4C1Ji7UUnUQ5wQvB0ke5IuOc5JP2kBMytzZaoKrlr2hdfyp4jtfEHEaFrpAn7ehdlxNEfRE00LjPjz10A');
    const handlePayment = async () =>{
        try {
            const stripe = await stripePromise;

            const res = await makeRequest.post("/orders", {
                products,
            })
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="cart">
        <h1>Products in your cart</h1>
        {products?.map(item=>(
            <div className="item" key={item.id}>
                <img src={item.img} alt="" />
                <div className="details">
                    <h1>{item.title}</h1>
                    <p>{item?.desc.substring(0,100)}</p>
                    <div className="price">
                        {item.quantity}x ${item.price}
                    </div>
                </div>
                <Trash2 className="delete" onClick={() => dispatch(removeItem(item.id))} />
                
            </div>
        ))}

        <div className="total">
            <span>SUBTOTAL</span>
            <span>${total()}</span>
        </div>
        <button onClick={handlePayment}>Proceed To Checkout</button>
        <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span>
    </div>
  )
}

export default Cart
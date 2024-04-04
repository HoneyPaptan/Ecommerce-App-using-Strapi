import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./app.scss"
function App() {
  
  //creating  a layout to use it in every page
  const Layout = () =>{
    return (
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>

      </div>
    )
  }


  
  const router = createBrowserRouter([
   {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products/:id",
        element:<Products />
      },
      {
        path: "/product/:id",
        element: <Product />
      },
    ]
   }
  ])

  return (
    <>
      <div>
      <RouterProvider router={router} />
      </div>
  
    </>
  )
}

export default App

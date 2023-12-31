import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Title= ()=>{
    //logo of the website 
    return (
     <div className=" h-20">
     <img className =" h-full"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTje1NxRiimUMR1JfIXlZIqVPd_9obRBnvnsQ&usqp=CAU"></img>
     </div>
    )
 } 

const Header= ()=>{
    const[isLoggedIn,setLoggedIn]=useState();  // login button toggle using custom hooks
    const cartItems =useSelector((store)=>store.cart.item); // subscribing to redux store by useSelector hook which is provided by react-redux
    console.log(cartItems);
    return (
        <div className="flex justify-between items-center px-20 bg-orange-400 " > 
            <Title/>
            <div className=" flex gap-28 ">
                <ul className=" flex gap-5  items-center text-zinc-50 text-lg font-semibold">
                    <li><Link to="/">Home</Link></li> 
                    <li><Link to="/About">About</Link></li>
                    <li><Link >Offers</Link></li>
                    <li><Link to="/cart" >
                            <div className="flex gap-2 ">
                            <img width="32" height="32" src="https://img.icons8.com/cute-clipart/64/shopping-cart-loaded.png" alt="shopping-cart-loaded"/>
                                <p data-testid="cart">{cartItems.length}</p>
                            </div>
                        </Link></li>
                </ul>
            
            <div className=" flex gap-5 item-center   text-zinc-50 text-lg font-semibold">
            {
                /* conditional rending of login button based on isLoggenIn status */
                isLoggedIn ?(<button onClick={()=>setLoggedIn(false)}>logout</button>):(<button onClick={()=>setLoggedIn(true)}>login</button>)
            }
            <Link to="/notification"><img className="h-6 items-center" src="https://img.icons8.com/?size=512&id=11642&format=png"></img></Link>
            </div>
            </div>
        </div>
    )
}

export default Header;
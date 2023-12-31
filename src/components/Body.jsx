import { useState , useEffect,useContext} from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer"; // shimmer is used for making better user  experience untill api data is not  fetched we can show shimmer to  user instead blank page
import { FilterRestaura } from "../config";
import { Link } from "react-router-dom"; // Link component is used for routing it does't refresh the  whole website line a tag



const Body=()=>{
    const [allrestaura,setallrestaura]=useState([]);
    const [restaura,setRestaura]=useState([]);
    const [searchInput,setSearchInput]=useState("kfc");
    useEffect(()=>{
        // useEffect is  react hook which is called after rendring the page , it can to two parameter 1st is fuction,2 is dependency array , any change in depency array will recall the useEffect method, we can put the things in which we want if this value change we need to call useEffect again, if the dependency array is empty useEffect will call only once,if we do not provide dependency array it call after render and after every rerender. so we generally put those things inside this which we needed once or needed when specific value change like API call
        getRestaurants();
    },[]);

    
    async function getRestaurants(){
        try{
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.351793&lng=78.0095493&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");// API calling by fetch method
        if(!data.ok){
            throw new Error(`response is not ok ${data.status} - ${data.statusText}`)
        }
        const json= await data.json();
        const restaurants=json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if(!restaurants){
            throw new Error(`No restaurants found in data`);
        }
        // console.log(json);
        setRestaura(restaurants);
        setallrestaura(restaurants);
        }catch(error){
            console.log("error occured  during fetching",error);
        }
    }
    // console.log(restaura[0].info.name);
    if (restaura?.length === 0 && allrestaura?.length !== 0){
    return (
        <div className=" flex h-96 w-full bg-gray-50 ">
        <img src="https://notebookstore.in/image/no-product-found.png" alt="" />
       </div>)
    }// if we fillterd all restaurant and no one is matching to search result  


    console.log("all restarua");
    return allrestaura?.length  === 0 ? <Shimmer /> : (
        <div>
            <div className="flex flex-col my-8 mx-16 justify-between bg-slate-300 py-5 px-4 sm:flex-col">
                <div className="search-box-items">
                    <input type="text" className="p-1 rounded-md w-96" placeholder="search" value={searchInput} onChange={(e)=>{
                        setSearchInput(e.target.value);
                    }}/>
                    <button className="ml-5 bg-slate-500 text-white px-3 rounded-md p-1 " onClick={()=>{
                        const data=FilterRestaura(searchInput,allrestaura);
                        setRestaura(data);
                    }}>search</button>
                   
                </div>
                <div className="bg-white px-3 rounded-md">location - clock-tower, dehradun,uk</div>
            </div>
            <div className="flex flex-wrap gap-20 ml-16">{
            
            restaura?.map((Restaurant)=>  {
            return( <Link to={"/Restaurant/"+ Restaurant.info.id} key={Restaurant.info.id}><RestaurantCard {...Restaurant.info} /></Link>)
            })}
            
            </div>
        </div>
    )
}

export default Body;
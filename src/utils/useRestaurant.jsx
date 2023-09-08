import { useEffect, useState } from "react"

const useRestaurant =(resId)=>{
    const [restaurant,setRestaurant]=useState(null);

    useEffect(()=>{
        getRestaurantInfo();
    },[]);
    async function getRestaurantInfo(){
        const data =await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.351793&lng=78.0095493&restaurantId="+resId
        );
        const json = await data.json();
        setRestaurant(json.data.cards[0].card.card.info);
        console.log(json.data.cards[0].card.card.info.name)
        

    }
    return restaurant;
}

export default useRestaurant;
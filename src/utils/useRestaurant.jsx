import { useEffect, useState } from "react"

const useRestaurant =(resId)=>{
    const [restaurant,setRestaurant]=useState(null);
    const[menu,setMenu]=useState(null);

    useEffect(()=>{
        getRestaurantInfo();
    },[]);
    async function getRestaurantInfo(){
        try{
        const data =await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.351793&lng=78.0095493&restaurantId="+resId );
        
        if (!data.ok){
            throw new Error(`response is not ok ${data.status}- ${data.statusText}`)
        }
        const json = await data.json();
        setRestaurant(json.data.cards[0].card.card.info);
        // console.log(json.data.cards[0].card.card.info)
        setMenu(json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards);
        // console.log(json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards);
        /*const   {{{{cards}}}}     =  json.data.cards[2];
        /*const [{{itemCards}}]=cards[1];
        /*setMenu(itemCards);
        */
        }catch(error){
            console.log("data is not fetched properly");
        }
        

    }
    return [restaurant,menu];
}

export default useRestaurant;
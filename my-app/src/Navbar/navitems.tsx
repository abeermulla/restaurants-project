// this array contains the elements in the navbar and the icon of each element
import {FaHome, FaRegUserCircle} from "react-icons/fa";
import {SiCoffeescript} from "react-icons/si";
import {RiRestaurant2Fill} from "react-icons/ri";
import {GiSlicedBread} from "react-icons/gi";
import {GiCupcake} from "react-icons/gi";
import {FiLogIn} from "react-icons/fi";


export let navArr = [
    // {
    //     Icon: <FaRegUserCircle className="profileicon"></FaRegUserCircle>,
    //     title: "",
    //     url: "profile"
    // },
    {
        Icon: <FiLogIn className="loginicon"></FiLogIn>,
        title: "התחבר",
        url: "login"
    },
    {
        Icon: <GiSlicedBread className="bakeryicon"></GiSlicedBread>,
        title: "מאפיות",
        url: "bakery"
    },
    {
        Icon: <GiCupcake className="conditoriaicon"></GiCupcake>,
        title: "קונדיטוריות",
        url: "conditoria"
    },
    {
        Icon: <SiCoffeescript className="coffeeshopicon"></SiCoffeescript>,
        title: "בתי קפה",
        url: "coffeeshop"
    },
    {
        Icon: <RiRestaurant2Fill className="restaurantsicon"></RiRestaurant2Fill>,
        title: "מסעדות",
        url: "restaurants"
    },
    {
        Icon: <FaHome className="homeicon"></FaHome>,
        title: "דף הבית",
        url: "home"
        
    }
];

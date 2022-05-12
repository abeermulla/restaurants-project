// this array contains the elements in the footer and the icon of each element
// import { url } from "inspector";
// import { FaMotorcycle } from "react-icons/fa";
import {BiPhoneCall} from "react-icons/bi";
import { RiUserFollowFill } from "react-icons/ri";
import {BsFillInfoCircleFill} from "react-icons/bs";
import {GoPencil} from "react-icons/go";

export let footerArr = [
    {
        Icon: <GoPencil className="advertisingicon"></GoPencil>,
        title: " הרשמה",
        url: "advertising"
    },
    {
        Icon: <BiPhoneCall className="contactusicon"></BiPhoneCall>,
        title: "צור קשר",
        url: "contactus"
    },
    // {
    //     Icon: <RiUserFollowFill className="followusicon"></RiUserFollowFill>,
    //     title: "עקבו אחרינו",
    //     url: "followus"
    // },
    // {
    //     Icon: <FaMotorcycle className="deliveryicon"></FaMotorcycle>,
    //     title: "משלוחים",
    //     url: "delivery"
    // },
    {
        Icon: <BsFillInfoCircleFill className="aboutusicon"></BsFillInfoCircleFill>,
        title: "אודות",
        url: "aboutus"
    },
    // {
    //     Icon:<></>,
    //     title: "עזרה",
    //     url: "helpcenter"
    // },


]












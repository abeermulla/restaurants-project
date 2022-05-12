import React from "react";
import { useEffect } from "react";
import './home.css'
import { ImagesGallery } from "./Homeimages";
import { homestitle } from "./Hometitles";
import { homeimagesarr } from './Homeimagesarr';
import { Followus } from "../Followus/followus";


export function HomeItems() {
    useEffect(() => {
        (document.querySelector('.homestitle') as HTMLElement).innerHTML = homestitle.innerHTML    
     }, [])

    return (
        <div className="Home" >
 
            <div className="homestitle">
            
            </div>

            <h2 className="sentencefood">(: הזמן היחיד לדיאטה הוא כשאתה מחכה שהסטייק יתבשל </h2>
            <ImagesGallery images = {homeimagesarr}/>
             

           <div className="followushome"><Followus></Followus></div>

        
            

        </div>
    )
}

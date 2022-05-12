// this function goes over the elements for each card in the array and takes the data from it 
// this function will help us at the projects in the future if we want to build an array with cards
import React from 'react'



export function Helpingfunccard(props: {imgurl:{src: string, name: string, url: string, location: string, phone: string, instagram: string, facebook: string, menu: string}}) {
    return (
        <div className='card'>

            <a href={props.imgurl.url}><img src={props.imgurl.src}/> </a>
            <h5> {props.imgurl.name} </h5>
  
        </div>
    )
}

// this function goes over all the cards in the array and shows the card and its data 
import React from 'react'
import { Helpingfunccard } from './helpingfunccard'


export  function Helpingfungall(props: {imgurl:{src: string, name: string, url: string, location: string, phone: string, instagram: string, facebook: string, menu: string}[]}) {
    return (
        <div className='gallery'>

            {props.imgurl.map((curr,i) => (<Helpingfunccard imgurl={curr} key={i} />))}

            
        </div>
    )
}


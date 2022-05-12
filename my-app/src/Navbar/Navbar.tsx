// this function goes over all the elements of the array for the navbar and shows the data of each element
import './Navbar.css'
import React from 'react'

export function Navbar(props: {navItems: {Icon: JSX.Element, title: string, url: string }[]}) {
    return (
        
        <div className="Navbar">
            <div className="allitems">
                 <ul className="pagesItemsUl">
                    {props.navItems.map((curr, i) => (
                        <li key={i}> <a href={curr.url}> {curr.title} {curr.Icon} </a></li>
                    ))}
                 </ul>

            </div>
            
        </div>
    )
}


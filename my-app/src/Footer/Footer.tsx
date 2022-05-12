// this function goes over all the elements of the array for the footer and shows the data of each element
import './Footer.css'
import React from 'react'

export function Footer(props: {footerItems: {Icon: JSX.Element, title: string, url: string }[]}) {
    return (
        <div className="Footer">
            
                 <ul className="footeritemsUl">
                    {props.footerItems.map((curr, i) => (
                        <li key={i}> <a href={curr.url}> {curr.title} {curr.Icon}</a></li>
                    ))}
                 </ul>

            
            
        </div>
    )
}


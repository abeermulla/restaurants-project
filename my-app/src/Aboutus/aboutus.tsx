import { useEffect } from 'react'
import './about.css'
import { aboutuspara } from './aboutuspara'

export function Aboutus() {
    useEffect(() => {
        (document.querySelector('.aboutuspara') as HTMLElement).innerHTML = aboutuspara.innerHTML    
     }, [])
    return (
        <div className='aboutuspage'>
            <div className="aboutuspara">

            </div>

        </div>
    )
}

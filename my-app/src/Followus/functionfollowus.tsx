import './followus.css'

export function Functionfollowus(props: {socialMedia: {icon : JSX.Element, url: string}[] }) {
    return (
    <div>
        <div className='socialfollow'>
        {props.socialMedia.map((curr, i) => (

           <div className='socialicons'>

           <a href={curr.url}> {curr.icon} </a>

           </div>
           ))}
        </div>
    </div>
        
        
    )}

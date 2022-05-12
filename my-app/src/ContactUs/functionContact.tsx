import './contactus.css'

export function Functioncontact(props: {socialMedia: {icon : JSX.Element, url: string, description: string}[] }) {
    return (
    
        <div className='socialcontact'>
        {props.socialMedia.map((curr, i) => (

           <div className='contactusinfo'>

           <div className='contactusinfo2'><a href={curr.url}> {curr.icon} </a> <p>{curr.description}</p></div>

           </div>
           ))}
        </div>
    
        
        
    )}
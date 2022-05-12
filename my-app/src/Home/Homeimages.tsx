export function ImagesGallery(props: {images: {src: string, title: string}[]}){
    return (
        <div className='allhomeimages'>
        <div className="homeimages">
            {props.images.map((curr, i) => (
           <img className='allallhomeimages' src={curr.src} alt="" />
             
            ))}
            

        </div>
        </div>
    )
}
//  <><p>{curr.title}</p></>

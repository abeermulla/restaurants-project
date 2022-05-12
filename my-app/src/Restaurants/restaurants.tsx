// this is the main function that connecting the elements of the home page
import { GalleryOfTheRestaurants } from './GalleryOfTheRestaurants'
import './restaurants.css'
export function Restaurants() {
    return (
        <div className='allrestaurantscards'>
            <GalleryOfTheRestaurants></GalleryOfTheRestaurants>
        </div>
    )
}


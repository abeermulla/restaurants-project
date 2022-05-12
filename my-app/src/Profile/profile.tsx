import '../Signup/signup.css'
import {IoIosBusiness} from "react-icons/io";
import {MdEmail, MdLocationOn, MdPassword, MdPhoneAndroid} from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineInstagram } from 'react-icons/ai';
import { RiFacebookBoxLine } from 'react-icons/ri';
import { BiFoodMenu } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { getId } from '../configuration';


    export function Profile() {
    let url = 'http://127.0.0.1:5789/business/';
    url = url + getId().id;
    console.log(url);

    let [restaurant, setrestaurant] = useState({
       
        buisnessname: "",
        phone: "",
        password: "",
        remarks: "",
        menu: "",
        location: "",
        instagram: "",
        facebook: "",
        email: "",
        id: getId().id
    })
    useEffect(() => {

        axios.get(url)
            .then(response => {
                setrestaurant(response.data);
                console.log(response.data);
            });
    }, []);
    const btnOption = { button: 1 };

    function updateInfo(e:
        React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        var formdata = new FormData(e.target as HTMLFormElement);
        if (btnOption.button === 1) {
            // url = url + getId().id;
            // console.log(getId().id);
            axios.delete(url)
                .then(response1 => {
                    console.log(response1.data);

                })
        }
        if (btnOption.button === 2) {

            const updatedRestaurant = {
                
                buisnessname: formdata.get('buisnessname'),
                phone: formdata.get('telNo'),
                password: formdata.get('password'),
                remarks: formdata.get('remarks'),
                menu: formdata.get('menu'),
                location: formdata.get('location'),
                instagram: formdata.get('instagram'),
                facebook: formdata.get('facebook'),
                email: formdata.get('email'),
                id: getId().id
            }

            axios.put(url,
                updatedRestaurant
            )
                .then(res => {
                })
        }
    }
    
        return (
        <div className='signupformpage'>
            <div id='signupdataform'>
                <form onSubmit={(e) => {updateInfo(e)}}>
                
                <div id="allprofile">
                    <div className='colmun'> 
                    <div>                  
                    <label className='lbl'>
                        <GoPencil className='clockicon'></GoPencil> 
                         :הערות                   
                    </label>  
                    <textarea name="remarks" id="remarks" cols={30} rows={7} defaultValue={restaurant.remarks}></textarea>
                    </div>

                    <div>                  
                    <label className='lbl'> 
                    <BiFoodMenu className='menuicon'></BiFoodMenu>
                        :תפריט                 
                    </label>  
                    <textarea name="menu" id="menu" cols={30} rows={7} defaultValue={restaurant.menu}></textarea>
                    </div>
                    
                        <div>
                            <button className='updatebtn' type='submit' onClick={() => (btnOption.button = 2)}>עדכן</button>
                            <button className='deletebtn' type='submit' onClick={() => (btnOption.button = 1)}>מחק</button>
                        </div>
                    </div>

                    

                    <div className='colmun'>
                    <div>
                    <label className='lbl'>
                    <IoIosBusiness className='businessicon'></IoIosBusiness>
                        :שם העסק
                    </label>
                    <input type="text" id="buisnessname" name="buisnessname" placeholder="שם העסק" defaultValue={restaurant.buisnessname}/>  
                    </div>

                    <div>
                    <label className='lbl'> 
                    <MdPassword className='passwordiconlogin'></MdPassword>
                         :סיסמה 
                    </label>
                    <input id="password" name="password" type="password" placeholder="סיסמה" defaultValue={restaurant.password} />
                    </div>

                    <div>
                    <label className='lbl'> 
                    <MdPhoneAndroid className='phoneicon'></MdPhoneAndroid>
                         :טלפון 
                    </label>
                    <input id="telId" name="telNo" type="tel" placeholder="מספר טלפון" defaultValue={restaurant.phone}/>
                    </div>

                    <div>                  
                    <label className='lbl'> 
                    <MdLocationOn className='locationicon'></MdLocationOn>
                         :מיקום 
                    </label>                   
                    <input type="text" id="location" name="location" placeholder="מיקום" defaultValue={restaurant.location}/>
                    </div>

                    <div>                  
                    <label className='lbl'> 
                    <MdEmail className='emailicon'></MdEmail>
                    :אימייל
                    </label>                   
                    <input type="text" id="email" name="email" placeholder="@gmail.com" defaultValue={restaurant.email}/>
                    </div>

                    <div>                  
                    <label className='lbl'> 
                    <AiOutlineInstagram className='instagramicon'></AiOutlineInstagram>
                        : חשבון איסטגרם
                    </label>                   
                    <input type="text" id="instagram" name="instagram" placeholder="instagram" defaultValue={restaurant.instagram}/>
                    </div>

                    <div>                  
                    <label className='lbl'> 
                    <RiFacebookBoxLine className='facebookicon'></RiFacebookBoxLine>
                        :חשבון פייסבוק
                    </label>                   
                    <input type="text" id="facebook" name="facebook" placeholder="facebook" defaultValue={restaurant.facebook}/>
                    </div> 
                    </div>
                    
                </div>
                </form>
    
            </div>
        </div>
        )
    }





    
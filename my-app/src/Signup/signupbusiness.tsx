import './signup.css'
import {MdEmail, MdPassword, MdPhoneAndroid} from "react-icons/md";
// import { useEffect } from 'react';
import axios from 'axios';
import {GrFormLocation} from "react-icons/gr";
// import { getId, setId } from '../configuration';
import { FaUser } from 'react-icons/fa';
import { BiFoodMenu } from 'react-icons/bi';
import { IoIosBusiness } from 'react-icons/io';
import { RiFacebookBoxLine } from 'react-icons/ri';
import { AiOutlineInstagram } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';

export function Signupbusiness() {
    const url = 'http://127.0.0.1:5789/business/addnewbusiness';

    function mySubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        var formDatasignup = new FormData(e.target as HTMLFormElement);
        const restaurant = {
            businessName: formDatasignup.get('businessname'),
            username: formDatasignup.get('username'),
            logoImage: formDatasignup.get('logoImage'),
            FirstAndLastName: formDatasignup.get('FirstAndLastName'),
            password: formDatasignup.get('password'),
            location: formDatasignup.get('location'),
            remarks: formDatasignup.get('remarks'),
            phone: formDatasignup.get('telNo'),
            email: formDatasignup.get('email'),
            instagram: formDatasignup.get('instagram'),
            facebook: formDatasignup.get('facebook'),
            menuImage: formDatasignup.get('menu'),
            category: formDatasignup.get('selectcategory'),
        }
        console.log(restaurant);
        axios.post(url,
            restaurant
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
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
            }

            axios.put(url,
                updatedRestaurant
            )
                .then(res => {
                })
        }
    }
    return (
    <div>
            <form name='signupbusiness' className='signupbusiness' onSubmit={(e) => { mySubmit(e) }} >
            <h2 className='headerofformsignup'> טופס הרשמה לפרסום העסק שלכם</h2>
                <div id="allsignup">
                    <div className='colmun'>
                    <div className='category'>
                    <label className='categorylbl'> :סוג העסק 
                        <div className='categorydiv'> 
                        <select name="selectcategory" id="selectcategory">
                        <option value="nothing">בחר סוג העסק</option>
                        <option value="1">מסעדות</option>
                        <option value="2">בתי קפה</option>
                        <option value="3">קונדיטוריות</option>
                        <option value="4">מאפיות</option>
                        </select>
                        </div>
                    </label>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                        :תמונת הלוגו                 
                    </label>  
                    <textarea name="logoImage" id="logoImage" cols={30} rows={5}></textarea>
                    </div>
                    
                    <div>                  
                    <label className='businguplbl'>
                        <GoPencil className='clockicon'></GoPencil> 
                         :הערות                   
                    </label>  
                    <textarea name="remarks" id="remarks" cols={30} rows={5}></textarea>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <BiFoodMenu className='menuicon'></BiFoodMenu>
                        :תפריט                 
                    </label>  
                    <textarea name="menu" id="menu" cols={30} rows={5}></textarea>
                    </div>
                    <input id="Submit" type="submit"></input>
                    <h4 className='h4signup'>?יש לך חשבון כבר </h4>
                    <a href="./login" id='gotologin'>התחבר</a>
                    </div>


                    <div className='colmun'>
                    <div>
                    <label className='businguplbl'>
                    <FaUser className='usernameicon'></FaUser>
                        :שם משתמש
                    </label>
                    <input type="text" id="username" name="username" placeholder="שם משתמש" />  
                    </div>

                    <div>
                    <label className='businguplbl'>
                    <IoIosBusiness className='businessicon'></IoIosBusiness>
                        :שם העסק
                    </label>
                    <input type="text" id="businessname" name="businessname" placeholder="שם העסק"/>  
                    </div>
                    
                    <div>
                    <label className='businguplbl'>
                        :שם
                    </label>
                    <input type="text" id="FirstAndLastName" name="FirstAndLastName" placeholder="שם פרטי ושם משפחה" />  
                    </div>

                    <div>
                    <label className='businguplbl'> 
                    <MdPassword className='passwordiconlogin'></MdPassword>
                         :סיסמה 
                    </label>
                    <input id="password" name="password" type="password" placeholder="סיסמה" />
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <MdEmail className='emailicon'></MdEmail>
                    :אימייל
                    </label>                   
                    <input type="text" id="email" name="email" placeholder="@gmail.com" />
                    </div>
                    
                    <div>
                    <label className='businguplbl'> 
                    <MdPhoneAndroid className='phoneicon'></MdPhoneAndroid>
                         :טלפון 
                    </label>
                    <input id="telId" name="telNo" type="tel" placeholder="מספר טלפון"/>
                    </div>
                    <div>                  
                    <label className='businguplbl'> 
                    <GrFormLocation className='locationicon'></GrFormLocation>
                         :מיקום 
                    </label>                   
                    <input type="text" id="location" name="location" placeholder="מיקום"/>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <AiOutlineInstagram className='instagramicon'></AiOutlineInstagram>
                        : חשבון איסטגרם
                    </label>                   
                    <input type="text" id="instagram" name="instagram" placeholder="instagram"/>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <RiFacebookBoxLine className='facebookicon'></RiFacebookBoxLine>
                        :חשבון פייסבוק
                    </label>                   
                    <input type="text" id="facebook" name="facebook" placeholder="facebook"/>
                    </div> 
                    
                    </div>
                </div>
                
                
                    
            </form>
           </div>
    )
}


















    
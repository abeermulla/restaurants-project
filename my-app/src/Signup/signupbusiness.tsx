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
            <h2 className='headerofformsignup'> ???????? ?????????? ???????????? ???????? ????????</h2>
                <div id="allsignup">
                    <div className='colmun'>
                    <div className='category'>
                    <label className='categorylbl'> :?????? ???????? 
                        <div className='categorydiv'> 
                        <select name="selectcategory" id="selectcategory">
                        <option value="nothing">?????? ?????? ????????</option>
                        <option value="1">????????????</option>
                        <option value="2">?????? ??????</option>
                        <option value="3">??????????????????????</option>
                        <option value="4">????????????</option>
                        </select>
                        </div>
                    </label>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                        :?????????? ??????????                 
                    </label>  
                    <textarea name="logoImage" id="logoImage" cols={30} rows={5}></textarea>
                    </div>
                    
                    <div>                  
                    <label className='businguplbl'>
                        <GoPencil className='clockicon'></GoPencil> 
                         :??????????                   
                    </label>  
                    <textarea name="remarks" id="remarks" cols={30} rows={5}></textarea>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <BiFoodMenu className='menuicon'></BiFoodMenu>
                        :??????????                 
                    </label>  
                    <textarea name="menu" id="menu" cols={30} rows={5}></textarea>
                    </div>
                    <input id="Submit" type="submit"></input>
                    <h4 className='h4signup'>????? ???? ?????????? ?????? </h4>
                    <a href="./login" id='gotologin'>??????????</a>
                    </div>


                    <div className='colmun'>
                    <div>
                    <label className='businguplbl'>
                    <FaUser className='usernameicon'></FaUser>
                        :???? ??????????
                    </label>
                    <input type="text" id="username" name="username" placeholder="???? ??????????" />  
                    </div>

                    <div>
                    <label className='businguplbl'>
                    <IoIosBusiness className='businessicon'></IoIosBusiness>
                        :???? ????????
                    </label>
                    <input type="text" id="businessname" name="businessname" placeholder="???? ????????"/>  
                    </div>
                    
                    <div>
                    <label className='businguplbl'>
                        :????
                    </label>
                    <input type="text" id="FirstAndLastName" name="FirstAndLastName" placeholder="???? ???????? ?????? ??????????" />  
                    </div>

                    <div>
                    <label className='businguplbl'> 
                    <MdPassword className='passwordiconlogin'></MdPassword>
                         :?????????? 
                    </label>
                    <input id="password" name="password" type="password" placeholder="??????????" />
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <MdEmail className='emailicon'></MdEmail>
                    :????????????
                    </label>                   
                    <input type="text" id="email" name="email" placeholder="@gmail.com" />
                    </div>
                    
                    <div>
                    <label className='businguplbl'> 
                    <MdPhoneAndroid className='phoneicon'></MdPhoneAndroid>
                         :?????????? 
                    </label>
                    <input id="telId" name="telNo" type="tel" placeholder="???????? ??????????"/>
                    </div>
                    <div>                  
                    <label className='businguplbl'> 
                    <GrFormLocation className='locationicon'></GrFormLocation>
                         :?????????? 
                    </label>                   
                    <input type="text" id="location" name="location" placeholder="??????????"/>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <AiOutlineInstagram className='instagramicon'></AiOutlineInstagram>
                        : ?????????? ??????????????
                    </label>                   
                    <input type="text" id="instagram" name="instagram" placeholder="instagram"/>
                    </div>

                    <div>                  
                    <label className='businguplbl'> 
                    <RiFacebookBoxLine className='facebookicon'></RiFacebookBoxLine>
                        :?????????? ??????????????
                    </label>                   
                    <input type="text" id="facebook" name="facebook" placeholder="facebook"/>
                    </div> 
                    
                    </div>
                </div>
                
                
                    
            </form>
           </div>
    )
}


















    
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdPassword, MdPhoneAndroid } from 'react-icons/md';

export function Signupcustomer() {
    const url = 'http://127.0.0.1:5789/users/addnewuser';
    function mySubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        var formDatasignup = new FormData(e.target as HTMLFormElement);
        const customer = {
            username: formDatasignup.get('username'),
            password: formDatasignup.get('password'),
            FirstAndLastName: formDatasignup.get('FirstAndLastName'),
            phone: formDatasignup.get('telNo'),
            email: formDatasignup.get('email')
        }
        console.log(customer);
        axios.post(url,
            customer
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
  return (
    <div>
        <form className='signupcustomer' name="signupcustomer" onSubmit={(e) => { mySubmit(e) }}>
        <h2 className='headerofformsignup'> טופס הרשמה למשתמש</h2>
     <div>
                    <label className='lbl'>
                    <FaUser className='usernameicon'></FaUser>
                        :שם משתמש
                    </label>
                    <input type="text" id="buisnessname" name="username" placeholder="שם העסק" />  
                    </div>

                    <div>
                    <label className='lbl'>
                        :שם
                    </label>
                    <input type="text" id="FirstAndLastName" name="FirstAndLastName" placeholder="שם פרטי ושם משפחה" />  
                    </div>

                    <div>
                    <label className='lbl'> 
                    <MdPassword className='passwordiconlogin'></MdPassword>
                         :סיסמה 
                    </label>
                    <input id="password" name="password" type="password" placeholder="סיסמה" />
                    </div>

                    <div>                  
                    <label className='lbl'> 
                    <MdEmail className='emailicon'></MdEmail>
                    :אימייל
                    </label>                   
                    <input type="text" id="email" name="email" placeholder="@gmail.com" />
                    </div>
                    
                    <div>
                    <label className='lbl'> 
                    <MdPhoneAndroid className='phoneicon'></MdPhoneAndroid>
                         :טלפון 
                    </label>
                    <input id="telId" name="telNo" type="tel" placeholder="מספר טלפון"/>
                    </div>

        <input id="Submit" type="submit"></input>
        </form>
    </div>
  )
}

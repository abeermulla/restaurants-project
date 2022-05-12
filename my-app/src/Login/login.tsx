import React from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Navigate, useNavigate } from 'react-router-dom';
import './login.css';


export function Login() {
    const navigate = useNavigate();
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postData('http://localhost:5789/business/login', { username: `${((document.querySelector('#username')) as HTMLInputElement).value}`, password: `${((document.querySelector('#password')) as HTMLInputElement).value}` })
        .then(data => {
            console.log("login - after POST to http://localhost:5789/login: ", data);
            localStorage.setItem("username", data.username);
            document.cookie = "token=" + data.token;
            navigate('/restaurants')
        });
    }
            

async function postData(url1 = '', data = {}) {
    // Default options are marked with *
    let response;
    try {
        response = await fetch(url1, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // credentials: 'include', // include, *same-origin, omit
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Cookie': document.cookie
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        console.log(response);
    }
    catch (err) {
        console.log("postData - error while sending POST ", err);
        return
    }
    return response.json(); // parses JSON response into native JavaScript objects
}
if (localStorage.getItem("username") !== "") {
    localStorage.setItem("username", "")
    return (<Navigate to="/signin" />)
}
else {
  return (
      <div className='loginformpage'>
        <div id='logindataform'>
            <form className='loginform' onSubmit={(e) => { handleLogin(e) }} >
                <div id="all">
                    <h2 className='headerofformlogin'> התחברות</h2>
                    <div>
                    <label className='loginlbl'>
                    <FaUser className='usernameicon'></FaUser>
                        :שם משתמש
                    </label>
                    <input type="text" id="username" name="username" placeholder="שם משתמש" />  
                    </div>

                    <div>
                    <label className='loginlbl'>
                    <RiLockPasswordFill className='passwordicon'></RiLockPasswordFill>
                        :סיסמה  
                    </label>
                    <input type="password" id="password" name="password" placeholder="סיסמה" />
                    <label className='passwordCorrection'></label>  
                    </div>

                    <input id="loginSubmit" type="submit"></input>

                    <div className='towwords'>
                    <h4 className='h4login'>?אין לך חשבון</h4>
                    <a href="./advertising" className='gotosignup'>הירשם</a>
                    </div>
                </div>
                    </form>
        </div>
     </div>
  
)}}
  

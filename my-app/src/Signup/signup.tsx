import React from 'react'
import { useState } from 'react';
import { Signupbusiness } from './signupbusiness';
import { Signupcustomer } from './signupcustomer';

export function Signup() {
  let [isCustomer, setIsCustomer] = useState(false)
  let [isBusiness, setIsBusiness] = useState(false)
  return (
    <div className='signupformpage'>
    <div className='toetypessignup'>
    <label className='checkboxlbl'>הירשם כבעל עסק 
    <input className="checkboxsinup1" name="customer" type="checkbox" onChange={() => setIsCustomer(!isCustomer)}/>
    </label>
    <label className='checkboxlbl'>הירשם כמשתמש  
    <input className="checkboxsinup2" name="business" type="checkbox" onChange={() => setIsBusiness(!isBusiness)}/>
    </label>
    </div>
    {isCustomer && <Signupcustomer/>}
    {isBusiness && <Signupbusiness/>}
    </div>
    )}



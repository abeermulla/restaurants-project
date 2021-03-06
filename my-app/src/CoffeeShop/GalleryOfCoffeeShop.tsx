import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { StarRating } from '../Restaurants/rating';

export function GalleryOfCoffeeShop() {
    const [coffeeshopsArr, setCoffeeshopsArr] = useState(
        [{
        businessName: "",
        username : "",
          password : "",
          confirmpassword : "",
          location:"",
          remarks: "",
          phone:"",
          email: "",
          instagram:"",
          facebook:"",
          menuImage:"",
          logoImage: ""
        }]);
        // category_id of coffeeshop = 2
  const url = 'http://127.0.0.1:5789/business/category/2';
 
  useEffect(() => {
    console.log("hello there new coffeeshop");
    axios.get(url)
    .then(coffeeshop => {
      setCoffeeshopsArr(coffeeshop.data);
    });   
  }, []);
  return (
    <div className="cardrestaurant">
        
            {coffeeshopsArr.map((curr, i) => {
                console.log("-----------");
                console.log(curr);
                console.log("-----------");

                return <Coffeeshopcard key={i} {...curr} ></Coffeeshopcard>;
            })}
    </div>
);
}

const Coffeeshopcard = (props: {
  businessName: string,
  logoImage: string,
  username : string,
  password : string,
  confirmpassword : string,
  location: string,
  remarks: string,
  phone: string,
  email: string,
  instagram: string,
  facebook: string,
  menuImage: string, 
}) => {
  function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    var formDataorder = new FormData(e.target as HTMLFormElement);
    const order = {
        username : formDataorder.get('username'),
        customerphone: formDataorder.get('customerphone'),
        numberofpeople: formDataorder.get('numberofpeople'),
        date: formDataorder.get('orderdate'),
        hour: formDataorder.get('ordertime'),
        businessName: formDataorder.get('businessName'),
    }
    console.log(order);
    const url = 'http://127.0.0.1:5789/tablereservation/tablereservation' + `/${username}`;
    axios.post(url,
      order
    )
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}

const url = 'http://127.0.0.1:5789/commentsandrating/comment/' + props.businessName;
let [commentsArr, setCommentsArr] = useState(
  [{
    username : "",
    comment : "",
  }]);
useEffect(() => { 
  console.log(url);
  axios.get(url)
  .then(comment => {
    commentsArr = comment.data
      setCommentsArr(commentsArr);
      console.log(comment);
      
  });   
}, []);


let [allCommentsOpen, setallCommentsOpen] = useState(false);
  const [popupOpen, setpopupOpen] = useState(false);
  const [ordersOpen, setordersOpen] = useState(false);
  let username = localStorage.getItem("username")
  console.log(username);
  const [comment, setcomment] = useState(""); 
  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("hello");
    
    setcomment(event.target.value);
    console.log(comment);
}
return (
  <div className="allthecards">
  <div className="card">
    <ul>
      <li><img className="gallerycard" src={props.logoImage} alt=""/></li>
      <li>{props.businessName}</li>
      <li>{props.phone}</li>
      <li><StarRating></StarRating></li>
      <button className="btnpopup" onClick={() => { setpopupOpen(popupOpen ? false : true) }}>?????????? ???? ???????????? ???????? ??????</button>
      <button className="btnorders" onClick={() => { setordersOpen(ordersOpen ? false : true) }}>???????????? ?????????? ???????? ??????</button>
      <div className="popupform">{ordersOpen &&
        <form className="ordersform" onSubmit={(e) => { submitOrder(e) }}>
          <a className="close" href="#" onClick={() => { setordersOpen(ordersOpen ? false : true) }}>&times;</a>
           <input type="hidden" value={props.businessName} name="businessName"/>
           <input type="hidden" value= {`${username}`} name="username"/>
          <div>
          <label className='orderslbl'>:???????? ?????????? 
            <input className="ordersinput" type="text" id="customertel" placeholder="???????? ??????????" name="customerphone" required/>
          </label>
          </div>

          <div>
          <label className='orderslbl'> :?????????? 
          <input className="ordersinput" type="date" id="orderdate" name="orderdate" min="2022-3-1" max="2024-3-1" required/>
          </label>
          </div>

          <div>
          <label className='orderslbl'>:??????
          <input className="ordersinput" type="time" id="ordertime" name="ordertime" min="10:00" max="21:00" required/>
          </label>
          </div>

          <div>
          <label className='orderslbl'> :???????? ???????????? 
            <input className="ordersinput" type="number" id="numberofcustomers" name="numberofpeople" min="4" max="20" required/>
          </label>
          </div>

          <button className="submitorder">?????? ??????????</button>
        </form>}
      </div>
      <div className="popup">
      {popupOpen &&
      <ul className="modalcontentcoffeeshop">
      <a className="close" href="#" onClick={() => { setpopupOpen(popupOpen ? false : true) }}>&times;</a>
      <li>{props.username}</li>
      <li>{props.phone}</li>
      <li><a href={props.instagram}><BsInstagram className="instaicon"/></a></li>
      <li><a href={props.facebook}><FaFacebookSquare className='faceicon'/></a></li>
      <li><a href={props.location}><MdLocationOn className="locationicon"/></a></li>
      <li>{props.remarks}</li>
      <li><img className="menu" src={props.menuImage} alt=""/></li>
      </ul>}
      <div>
        <input type="hidden" value={props.businessName} name="businessName" />
        <li><textarea className="commenttextarea" placeholder="???????????? ??????????" name="comment" cols={20} rows={4} onChange={(e) => handleChangeTextArea(e)}></textarea>
        <button className="submitcomment" onClick={async (e) => {
          try{
          axios.post('http://127.0.0.1:5789/commentsandrating/newComment' , {username:`${username}`,businessName:`${props.businessName}`,comment:`${comment}`}).then(res => {console.log(res);
          } ).catch(err => {console.log(err)});
          console.log(username, "!!!!!!");}

          catch (err) {
          console.log(err);

      }}}>?????? </button></li>
      <button className="commentsbutton" type="submit" onClick={() => {setallCommentsOpen(!allCommentsOpen)}
      }>???? ??????????????</button>
      {allCommentsOpen &&<div className="cardcomment">
            {commentsArr.map((curr, i) => {

                return <CommentCard key={i} {...curr} ></CommentCard>;
            })}
        </div >}
      </div>

      </div>
      </ul>
  </div>
  </div>
  
  )
}
const CommentCard = (props: {
  username : string,
  comment : string
}) => {
return(
<ul>
    <li className="usernamecomment">{props.username}</li>
    <li className="commentcontent">{props.comment}</li>
    
</ul>
)}



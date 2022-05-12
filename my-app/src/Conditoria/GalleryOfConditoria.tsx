import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { StarRating } from '../Restaurants/rating';

export function GalleryOfConditoria() {
    const [conditoriaArr, setConditoriaArr] = useState(
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
          logoImage: "",
         
        }]);
        // // category_id of conditoria = 3
  const url = 'http://127.0.0.1:5789/business/category/3';
  
  useEffect(() => {
    console.log("hello there new conditoria");
    axios.get(url)
    .then(conditoria => {
        setConditoriaArr(conditoria.data);
    });   
  }, []);
  return (
    <div className="cardrestaurant">
            {conditoriaArr.map((curr, i) => {
                console.log("-----------");
                console.log(curr);
                console.log("-----------");
                return <Conditoriacard key={i} {...curr} ></Conditoriacard>;
            })}
        </div >)}



const Conditoriacard = (props: {
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
  

}) => {
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
  let username = localStorage.getItem("username")
  console.log(username);
  const [comment, setcomment] = useState(""); 
  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("hello");
    
    setcomment(event.target.value);
    console.log(comment);
}
  const [popupOpen, setpopupOpen] = useState(false);
  return (
    <div className="allthecards">
    <div className="card">
      <ul>
        <li><img className="gallerycard" src={props.logoImage} alt=""/></li>
        <li>{props.businessName}</li>
        <li>{props.phone}</li>
        <li><StarRating></StarRating></li>
        <button className="btnpopup" onClick={() => { setpopupOpen(popupOpen ? false : true) }}>להצגת כל הפרטים לקונדיטוריה</button>
        <div className="popup">
        {popupOpen &&
        <ul className="modalcontentconditoria">
        <a className="close" href="#" onClick={() => { setpopupOpen(popupOpen ? false : true) }}>&times;</a>
        <li>{props.username}</li>
        <li>{props.phone}</li>
        <li><a href={props.instagram}><BsInstagram className="instaicon"/></a></li>
        <li><a href={props.facebook}><FaFacebookSquare className='faceicon'/></a></li>
        <li><a href={props.location}><MdLocationOn className="locationicon"/></a></li>
        <li>{props.remarks}</li>
        </ul>}
        <div>
        <input type="hidden" value={props.businessName} name="businessName" />
        <li><textarea className="commenttextarea" placeholder="להוספת תגובה" name="comment" cols={20} rows={4} onChange={(e) => handleChangeTextArea(e)}></textarea>
        <button className="submitcomment" onClick={async (e) => {
          try{
          axios.post('http://127.0.0.1:5789/commentsandrating/newComment' , {username:`${username}`,businessName:`${props.businessName}`,comment:`${comment}`}).then(res => {console.log(res);
          } ).catch(err => {console.log(err)});
          console.log(username, "!!!!!!");}

          catch (err) {
          console.log(err);

      }}}>שלח </button></li>
      <button className="commentsbutton" type="submit" onClick={() => {setallCommentsOpen(!allCommentsOpen)}
      }>כל התגובות</button>
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

import React ,{useState,useEffect}from "react";
//import Button from 'react-bootstrap/Button';
import '../../style.css'
import Cookies from "js-cookie";
import EditProfileButton from "./EditProfile";
function Profile() {

  const [followersCount ,setFollowersCount] =useState(0)
  const [followingCount ,setFollowingCount] =useState(0)


  useEffect(() => {
    const userId =
"64ae245adf06decf232c8dfd"
    fetchFollowersCount(userId);
    fetchFollowingCount(userId);
  }, []);

  const fetchFollowersCount =(userId)=>{
    fetch(`http://localhost:5000/api/vi/user/${userId}/follow`,{
      method: 'PATCH',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`
        }
    }).then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result && result.follow && result.follow.length) {
        setFollowersCount(result.follow.length);}
        else{
          return 1
        }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const fetchFollowingCount =(userId)=>{
    fetch(`http://localhost:5000/api/v1/user/${userId}/follow`,{
      method: 'PATCH',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`
        }
    }).then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result && result.follow && result.follow.length) {
        setFollowingCount(result.follow.length);}
        else{
          return 1
        }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div style={{maxWidth:"500px" ,margin:'0px auto'}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlcyUyMG9mJTIwaHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pro-img"/>
        </div>
        <div>
         <div className="profile" style={{display:"flex" ,marginTop:"30px" ,justifyContent:"space-between"}}>
         <h4 style={{ marginRight: '30px' }}>jyoti_kumari</h4>
         <div style={{ width:'200px'}}>
        <EditProfileButton />
        </div>
         </div>
          <div
            style={{
              display: "flex",
             justifyContent:"space-around",
              width: "70%",
              margin: "18px",
            }}
          >
            <h5>{followersCount} followers</h5>
            <h5>{followingCount} following</h5>
          </div>
          <i className="material-icons">location_on</i>
         < h5>bio</h5>
         <div className="button" style={{display:"flex",  justifyContent:"space-evenly"}}>
         <button type='submit' className='btn btn-primary'>
              POSTS
            </button>
            <button type='submit' className='btn btn-primary'>
             SAVED
            </button>
         </div>
        </div>
  
      </div>
      <div className="gallery">
        <img
          className="item"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlcyUyMG9mJTIwaHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pro-img2"
        />
      </div>
    </div>
  );
}

export default Profile;

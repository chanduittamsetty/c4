// This is an event details page which has its own route
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Event = () => {
  let user=JSON.parse(localStorage.getItem('userLoginDetails'))||null;
  const [userData,setUser]=useState([]);
  const [meetData,setmeetData]=useState([]);
  const [but,setBut]=useState(false);
  const {id} =useParams();
  const num=+id;
  useEffect(()=>{
    if(user!=null){
    axios.get(`http://localhost:8080/users?name=${user.name}`).then(res=>setUser(res.data));
    axios.get(`http://localhost:8080/users?name=${user.name}`).then(res=>setBut (res.data[0].subscribed.includes(num)));
    }
    axios.get(`http://localhost:8080/meetups/${id}`).then(res=>setmeetData(res.data));

  },[])
  const subscribe=()=>{
    setUser(userData[0].subscribed.push(num));
    axios.put(`http://localhost:8080/users/${userData[0].id}`,userData[0]).then(res=>setUser(res.data))
    setBut(true)
  }

  
  return (
    <div className="eventContainer">
      {<div style={{display:"flex",gap:"10px"}}>
      <div className="title">{meetData.title}</div>
              <div className="theme">{meetData.theme}</div>
              <div className="description">{meetData.description}</div>
              <div className="date">{meetData.date}</div>
              <div className="time">{meetData.time}</div>
              <div className="location">{meetData.location}</div>
              <img className="image" src={meetData.image}/>

            </div>}
            
          {(but)?<button className="unsubscribe">Unsubscribe</button>:<button className="subscribe" onClick={subscribe}>Subscribe</button>}
            
          
      
    </div>
  );
};

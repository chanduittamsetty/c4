import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
  let user=JSON.parse(localStorage.getItem('userLoginDetails'))||null;
  const [userData,setUser]=useState([]);
  const [meetData,setmeetData]=useState([]);
  const [subData,setsubData] =useState([]);
  const [subarr,setsubArr]=useState([]);
  const [filter,setFilter]=useState([]);
  useEffect(()=>{
    
    
    axios.get(`http://localhost:8080/meetups`).then(res=>setmeetData(res.data))
    
    if(user!=null){
      axios.get(`http://localhost:8080/users?name=${user.name}`).then(res=>setUser(res.data))
    } 
    if(user!=null){
      axios.get(`http://localhost:8080/users?name=${user.name}`).then(res=>setsubArr(res.data[0].subscribed));
    } 
    axios.get(`http://localhost:8080/meetups`).then(res=>setsubData(res.data))
   
},[]);


const meetfilter=(el)=>{
  if(userData.length!=0){
  if(user!=null ){
    return (userData[0].interests.includes(el.theme) && userData[0].location==el.location)
  }else{
    return true;
  }
}
}



const filtercity=(e)=>{
  setFilter(subData);
  const {id,value}=e.target;
  setsubData(subData.filter((el)=>{if(el.location==value){
    return el;
  }}));
  
}
  return (
    <div className="homeContainer">
      {meetData
        .filter((el) => {return meetfilter(el) }) // Filter on the basis of Users interests and location (both true)
        .map((el) => {
          // console.log(el);
          return (
            <Link to={`event/${el.id}`} className="events" key={el.id}>
              {/* add your children here (divs)
              ex : title, theme, description, date, time, location, image(optional)
              the classNames should be also : title, theme, description, date, time, location, image(optional)
             */
            <div style={{display:"flex",gap:"10px"}}>
              <div className="title">{el.title}</div>
              <div className="theme">{el.theme}</div>
              <div className="description">{el.description}</div>
              <div className="date">{el.date}</div>
              <div className="time">{el.time}</div>
              <div className="location">{el.location}</div>
              <img className="image" src={el.image}/>

            </div>
             }
            </Link>
          );
        })}

      <div className="subscribedData">
        <div>
          <select
            value={""} 
            id="location"
             // add value here
            onChange={(e) => {filtercity(e) }}
          >
            <option value="">------</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        <Link to={`/addmeet`}> Add Meetup</Link>
        <h1>Subscribed Events</h1>
        <div className="subscribedEvents">
          {/* All user subcribed events should be displayed here in an ascending order of date */}

          {subData.sort((a,b)=> new Date(a.date) - new Date(b.date))
            .map((el) => { if(subarr.includes(el.id))
              return (
                <Link to={`event/${el.id}`} className="events" key={el.title}>
                  {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                <div style={{display:"flex",gap:"10px",marginTop:"20px"}}>
                <div className="title">{el.title}</div>
              <div className="theme">{el.theme}</div>
              <div className="description">{el.description}</div>
              <div className="date">{el.date}</div>
              <div className="time">{el.time}</div>
              <div className="location">{el.location}</div>
              <img className="image" src={el.image}/>

            </div>
                </Link>
              );
            })}

        </div>
      </div>
    </div>
  );
};

import NavBar from "./NavBar";
import './Dashboard.css';
import Plans from "./Plans";
import axios from "axios";
import {useState ,useEffect} from "react";
import { PLANS_API } from "../Constants";

const Dashboard = () => {
    let [plans,setPlans] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'));
    const token = user.token;
	useEffect(()=>{
	    axios.get(PLANS_API,{ headers: {"Authorization" : `Bearer ${token}`} }).then(response =>{
					setPlans(response.data.data);
    }).catch((error) => {
        console.log("Error from all Plans API",error)
  })
	},[])

      return (
        <div>
          <NavBar/>
          <div className="maincontainer">
       <section>
          <div class="container py-5">
           
            <div class="row text-center align-items-end">
            {plans?.length>0 && plans.map((each,index)=>{
	   			return <Plans plandata={each} key={index} />
	   		})}
            </div>
          </div>
        </section>
      </div>
        </div>
      );
    };
export default Dashboard;
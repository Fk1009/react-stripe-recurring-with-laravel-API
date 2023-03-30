import './Dashboard.css';
import axios from "axios";
import {useState ,useEffect} from "react";
import { Link } from "react-router-dom";

const Plans = (props) => {
    return (
        <div className="col-lg-4 mb-5 mb-lg-0">
        <div className="bg-white p-5 rounded-lg shadow">
          <h1 className="h6 text-uppercase font-weight-bold mb-4">{props.plandata.name}</h1>
          <h2 className="h1 font-weight-bold">{props.plandata.currency}{props.plandata.price}<span className="text-small font-weight-normal ml-2">/ {props.plandata.interval}</span></h2>
          <div className="custom-separator my-4 mx-auto bg-primary"></div>
          <ul className="list-unstyled my-5 text-small text-left">
            <li className="mb-3">
              <i className="fa fa-check mr-2 text-primary"></i> Lorem ipsum dolor sit amet</li>
            <li className="mb-3">
              <i className="fa fa-check mr-2 text-primary"></i> Sed ut perspiciatis</li>
            <li className="mb-3">
              <i className="fa fa-check mr-2 text-primary"></i> At vero eos et accusamus</li>
            <li className="mb-3 text-muted">
              <i className="fa fa-times mr-2"></i>
              <del>Nam libero tempore</del>
            </li>
            <li className="mb-3 text-muted">
              <i className="fa fa-times mr-2"></i>
              <del>Sed ut perspiciatis</del>
            </li>
            <li className="mb-3 text-muted">
              <i className="fa fa-times mr-2"></i>
              <del>Sed ut perspiciatis</del>
            </li>
          </ul>
          <Link  to={`/checkout/${props.plandata.id}`} className="btn btn-primary btn-block p-2 shadow rounded-pill">Subscribe</Link>
        </div>
      </div>
    );
  }
  
  
  export default Plans;



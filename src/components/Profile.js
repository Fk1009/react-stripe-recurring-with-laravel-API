import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, Badge } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    let [userDetails,setUserDetails] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'));
    const token = user.token;
    useEffect(()=>{
	    axios.get('http://localhost:8000/api/subscribe',{ headers: {"Authorization" : `Bearer ${token}`} }).then(response =>{
        setUserDetails(response.data);
        console.log(response);
    }).catch((error) => {
        console.log("Error from User details API",error)
  })
	},[])

  return (
    <div>
      <NavBar />
      <Container>
        <Row className="vh-100 d-flex">
          <Col>
            <div className="border border-2 border-primary mt-3"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>User Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        userDetails &&  userDetails.user ?
                   <>
                    <tr>
                      <td>Name</td>
                      <td colSpan={2}>{userDetails.user.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td colSpan={2}>{userDetails.user.email}</td>
                    </tr>
                    <tr>
                      <td>Customer Id</td>
                      <td colSpan={2}>{userDetails.user.stripe_id}</td>
                    </tr>
                    <tr>
                      <td>Payment Method</td>
                      <td colSpan={2}>{userDetails.user.pm_type}</td>
                    </tr>
                    <tr>
                      <td>Susbcription Status</td>
                      <td colSpan={2}> <Badge bg="success">
                      {userDetails.user_current_subscription.stripe_status}
                </Badge></td>
                    </tr>
                    </>
                      : null }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

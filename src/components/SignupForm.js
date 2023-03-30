import React, { useState,useEffect } from 'react'
import { Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import { useFormik } from 'formik';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const validateUser = userData => {
  const errors = {};
  if (!userData.name) {
    errors.name = 'Please Enter Your Name';
  } else if (userData.name.length > 20) {
    errors.Name = 'Name cannot exceed 20 characters';
  }
  if (!userData.email) {
    errors.email = 'Please Enter Your Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
    errors.email = 'Invalid email address';
  }

  if (!userData.password) {
    errors.password = 'Please Enter Your Password';
  } else if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i.test(userData.password)) {
    errors.password = 'Invalid Password,8 characters length, 2 letters in Upper Case,1 Special Character (!@#$&*),2 numerals (0-9),3 letters in Lower Case';
  }
  return errors;
};


const SignupForm = () => {
const navigate = useNavigate();

useEffect(()=>{
  if (localStorage.getItem('user-info')) {
    navigate('/dashboard');
  } 
},[]);
 
  const formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      c_password:''
    },
  
    validate:validateUser,
    onSubmit:(values)=>{
    axios.post('http://localhost:8000/api/register',values).then(response =>{
      if (response.status == 201) {
        toast.success("User Registered Successfully !", {
          position: toast.POSITION.TOP_RIGHT
        });
        localStorage.setItem('user-info',JSON.stringify(response.data));
        navigate('/dashboard');
      }else{
        toast.error("Please check Again!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
  }).catch((response) => {
    toast.error("Please check Again!", {
      position: toast.POSITION.TOP_RIGHT
    });
})
      
    }
  });

  return (
    <div>
      
      <NavBar/>
      <ToastContainer />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  {/* <h2 className="fw-bold mb-2 text-center text-uppercase ">Logo</h2> */}
                  <div className="mb-3">
                    <Form onSubmit={formik.handleSubmit}>
                    
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter Name"  value={formik.values.name}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.touched.name && formik.errors.name ? <span style={{color:'red'}}>{formik.errors.name}</span> : null}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" value={formik.values.email}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.touched.email && formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : null}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password"  value={formik.values.password}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.touched.password && formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : null}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name ='c_password' placeholder="Password" value={formik.values.c_password}
                  onChange={formik.handleChange} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignupForm;

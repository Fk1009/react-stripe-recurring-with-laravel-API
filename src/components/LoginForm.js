import React, { useState,useEffect } from 'react'
import { Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import { useFormik } from 'formik';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { LOGIN_API,EMAIL_REQ,EMAIL_INVALID,PASS_REQ,PASS_INVALID,LOGIN_SUCCESS,TRY_AGAIN } from '../Constants';


const validateLoginUser = userData => {
    const errors = {};
    if (!userData.email) {
      errors.email = EMAIL_REQ;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
      errors.email = EMAIL_INVALID;
    }
  
    if (!userData.password) {
      errors.password = PASS_REQ;
    } else if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i.test(userData.password)) {
      errors.password = PASS_INVALID;
    }
    return errors;
  };
  

const LoginForm = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('user-info')) {
          navigate('/dashboard');
        } 
      },[]);


    const formik=useFormik({
      initialValues:{
        email:'',
        password:'',
      },
    
      validate:validateLoginUser,
      onSubmit:(values)=>{
        
      axios.post(LOGIN_API,values).then(response =>{
        if (response.status == 200) {
          toast.success(LOGIN_SUCCESS, {
            position: toast.POSITION.TOP_RIGHT
          });
        localStorage.setItem('user-info',JSON.stringify(response.data));
        setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
       
        }else{
          toast.error(TRY_AGAIN, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
    }).catch((response) => {
      toast.error(TRY_AGAIN, {
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
                        
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Login
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
  
  export default LoginForm;
  

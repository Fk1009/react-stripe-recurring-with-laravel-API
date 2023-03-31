import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import { CARD_CVV_REQ, CARD_INVALID, CARD_MONTH_INVALID, CARD_MONTH_REQ, CARD_NUMBER_REQ, CARD_YEAR_INVALID, CARD_YEAR_REQ, PLANS_API, SINGLE_PLAN_API, SUBSCRIPTION_ADD_SUCCESS, SUBSCRIPTION_ALREADY_ACTIVE, SUBSCRIPTION_API, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_UPDATE_SUCCESS, TRY_AGAIN } from "../Constants";


const validateCheckoutCard = (userData) => {
  const errors = {};
  if (!userData.card_number) {
    errors.card_number = CARD_NUMBER_REQ;
  } else if (
    !/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i.test(userData.card_number)
  ) {
    errors.card_number = CARD_INVALID;
  }

  if (!userData.exp_month) {
    errors.exp_month = CARD_MONTH_REQ;
  } else if (
    !/^(0?[1-9]|1[012])$/i.test(
      userData.exp_month
    )
  ) {
    errors.exp_month =
      CARD_MONTH_INVALID;
  }

  if (!userData.exp_year) {
    errors.exp_year = CARD_YEAR_REQ;
  } else if (
    !/^20(1[1-9]|[2-9][0-9])$/i.test(userData.exp_year)
  ) {
    errors.exp_year = CARD_YEAR_INVALID;
  }

  if (!userData.cvc) {
    errors.cvc = CARD_CVV_REQ;
  } 

  return errors;
};

const Checkout = () => {
    let [singlePlan,setSinglePlan] = useState([]);
    const [product, setProduct] = useState({});
    let user = JSON.parse(localStorage.getItem('user-info'));
    const token = user.token;
    let { plan_id } = useParams();

    useEffect(()=>{
	    axios.get(SINGLE_PLAN_API+'/'+ plan_id,{ headers: {"Authorization" : `Bearer ${token}`} }).then(response =>{
            setSinglePlan(response.data);
    }).catch((error) => {
        console.log("Error from all Plans API",error)
  })
	},[])
   

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      card_number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
    },

    validate: validateCheckoutCard,
    onSubmit: (values) => {
      let params = {
        ...values,
        plan_id: plan_id
      }
      axios
        .post(SUBSCRIPTION_API, params,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then((response) => {
          console.log('here', response.data);
          if (response.data.message == SUBSCRIPTION_ADD_SUCCESS) {
            toast.success(SUBSCRIPTION_ADD_SUCCESS, {
              position: toast.POSITION.TOP_RIGHT,
            });
            // setTimeout(() => {
            //   navigate("/dashboard");
            // }, 2000);
          }else if(response.data.message == SUBSCRIPTION_ALREADY_ACTIVE){
            toast.error(SUBSCRIPTION_ALREADY_ACTIVE, {
              position: toast.POSITION.TOP_RIGHT,
            });
            // setTimeout(() => {
            //   navigate("/dashboard");
            // }, 2000);
          }else if(response.data.message == SUBSCRIPTION_UPDATE_SUCCESS){
            toast.success(SUBSCRIPTION_UPDATE_SUCCESS, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          } else {
            toast.error(TRY_AGAIN, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        })
        .catch((response) => {
          toast.error(TRY_AGAIN, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <Container>
        <Row className="vh-100 d-flex">
          <Col>
            <div className="border border-2 border-primary mt-3"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Checkout with this total amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td colSpan={2}>{singlePlan.name}</td>
                    </tr>
                    <tr>
                      <td>Interval</td>
                      <td colSpan={2}>{singlePlan.interval}</td>
                    </tr>
                    <tr>
                      <td>Total Price</td>
                      <td colSpan={2}>{singlePlan.price}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {/* <div className="border border-2 border-primary"></div> */}
            <div>
              {/* <h2 className="fw-bold mb-2 text-center text-uppercase ">Logo</h2> */}
              <div className="mb-3 mt-3">
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicCardNumber">
                    <Form.Control
                      type="text"
                      name="card_number"
                      placeholder="Card number"
                      value={formik.values.card_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.card_number && formik.errors.card_number ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.card_number}
                      </span>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicExpMonth">
                    <Form.Control
                      type="number"
                      name="exp_month"
                      placeholder="Expiry Month"
                      value={formik.values.exp_month}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.exp_month && formik.errors.exp_month ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.exp_month}
                      </span>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicExpYear">
                    <Form.Control
                      type="number"
                      name="exp_year"
                      placeholder="Expiry Year"
                      value={formik.values.exp_year}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.exp_year && formik.errors.exp_year ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.exp_year}
                      </span>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCvc">
                    <Form.Control
                      type="number"
                      name="cvc"
                      placeholder="cvc"
                      value={formik.values.cvc}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.cvc && formik.errors.cvc ? (
                      <span style={{ color: "red" }}>{formik.errors.cvc}</span>
                    ) : null}
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Checkout
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;

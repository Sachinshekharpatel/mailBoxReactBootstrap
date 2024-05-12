import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./sendmailpage.css";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import useFetch from "../customhooks/usefetch";
function SendMailPage() {
  const navigate = useNavigate();
  const [mails, setMails] = useState([]);
  const EmailOfUser = localStorage.getItem("emailMailBox");
  const [mailDetail, setMailDetail] = useState(null);
  const [messageModal, setMessageModal] = useState(false);
  const data = useFetch(
    `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json`
  );
  useEffect(() => {
    console.log(mailDetail, messageModal);
  }, [mailDetail]);
  useEffect(() => {
    if (data !== null) {
      const mailArray = data.filter(
        (item) => item.myemail === EmailOfUser
      );
      const noemail = data.filter(
        (item) => item.myemail === EmailOfUser
      );
      setMails(mailArray);
      if (noemail.length === 0) {
        alert("No Emails");
        navigate("/");
      }
    }
  }, [data, mails]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json"
  //     )
  //     .then((response) => {
  //       if (response.data === null) {
  //         alert("No Emails");
  //         navigate("/");
  //       } else {
  //         const mailDataAllUser = Object.values(response.data);
  //         const mailArray = mailDataAllUser.filter(
  //           (item) => item.myemail === EmailOfUser
  //         );
  //         const noemail = mailDataAllUser.filter(
  //           (item) => item.myemail === EmailOfUser
  //         );
  //         setMails(mailArray);
  //         if (noemail.length === 0) {
  //           alert("No Emails");
  //           navigate("/");
  //         }
  //       }
  //     });
  // }, [mails, data]);

  const readEmailHandler = (item) => {
    console.log("read email", item);
    setMessageModal(true);
    setMailDetail(item);
    // const newdata = {
    //   ...item,
    //   read: true,
    // };
    // axios
    //   .put(
    //     `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData/${item.name}.json`,
    //     newdata
    //   )
    //   .then((response) => {
    //     const mailArray = mails.filter((itemMailArray) =>
    //       itemMailArray.name == item.name ? newdata : itemMailArray
    //     );
    //     setMails(mailArray);
    //   });
  };
  const modalCloseBtnHandler = () => {
    setMessageModal(false);
    setMailDetail(null);
  };
  const logoutBtnHandler = () => {
    localStorage.removeItem("tokenMailBox");
    localStorage.removeItem("emailMailBox");
    navigate("/loginpage");
  };
  return (
    <Container fluid className="send-mail-page-container mt-4">
      {mailDetail !== null && messageModal && (
        <Modal show={messageModal} onHide={modalCloseBtnHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Mail Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address of the Sender</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={mailDetail.to}
                    placeholder="Enter email"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={mailDetail.body}
                    as="textarea"
                    rows={3}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={modalCloseBtnHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Row>
        <Col>
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="m-3"
          >
            Home
          </Button>
          <Button
            variant="secondary"
            className="m-3"
            onClick={() => navigate("/inboxpage")}
          >
            Inbox
          </Button>
          <Button
            className="btn btn-danger m-3"
            onClick={() => logoutBtnHandler()}
            variant="secondary"
          >
            Logout
          </Button>
          <h2 className="mb-4">SendMailPage</h2>
          <ListGroup>
            {mails.length > 0 ? (
              mails.map((item) => (
                <ListGroup.Item
                  key={Math.random()}
                  className="d-flex align-items-center"
                >
                  <label>
                    <input type="checkbox" class="input" />
                    <span className="custom-checkbox"></span>
                  </label>
                  <div className="flex-grow-1">
                    <div>{item.to}</div>
                  </div>
                  <div className="readmeBtn">
                    <Button
                      onClick={() => readEmailHandler(item)}
                      variant="primary"
                    >
                      Read Email
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default SendMailPage;

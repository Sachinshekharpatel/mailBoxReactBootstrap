import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./sendmailpage.css";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

function SendMailPage() {
  const navigate = useNavigate();
  const [mails, setMails] = useState([]);
  const EmailOfUser = localStorage.getItem("emailMailBox");
  const [mailDetail, setMailDetail] = useState(null);
  const [messageModal, setMessageModal] = useState(false);
  useEffect(() => {
    console.log(mailDetail, messageModal);
  }, [mailDetail]);
  useEffect(() => {
    axios
      .get(
        "https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json"
      )
      .then((response) => {
        if (response.data === null) {
          alert("No Emails");
          navigate("/");
        } else {
          const mailDataAllUser = Object.values(response.data);
          const mailArray = mailDataAllUser.filter(
            (item) => item.myemail === EmailOfUser
          );
          setMails(mailArray);
        }
      });
  }, [mails]);
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

  return (
    <Container className="mt-4">
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
        <Col md={3}></Col>
        <Col md={9}>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="secondary" className="m-4" onClick={() => navigate("/inboxpage")}>
            Inbox
          </Button>
          <h2 className="mb-4">SendMailPage</h2>
          <ListGroup>
            {mails.map((item) => (
              <ListGroup.Item
                key={Math.random()}
                className="d-flex align-items-center"
              >
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
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default SendMailPage;
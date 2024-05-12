import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./inboxpage.css";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { sendMailBtnReduxStore } from "../reduxstore/reduxstore";
import { useDispatch } from "react-redux";
import useFetch from "../customhooks/usefetch";
function InboxPage() {
  const unreadMsgSelector = useSelector(
    (state) => state.sendmail.TotalUnreadMsg
  );
  const data = useFetch(
    `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json`
  );
  // above data variable is custom  hook is used for fetching data from firebase
  const dispatch = useDispatch();
  const [unreadMsg, setUnreadMsg] = useState(unreadMsgSelector);
  const navigate = useNavigate();
  const [mails, setMails] = useState([]);
  const EmailOfUser = localStorage.getItem("emailMailBox");
  const [mailDetail, setMailDetail] = useState(null);
  const [messageModal, setMessageModal] = useState(false);
  const [totalmail, setTotalmail] = useState(0);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json`
  //     )
  //     .then((response) => {
  //       const mailDataAllUser = Object.values(response.data);
  //       const mailArray = mailDataAllUser.filter(
  //         (item) => item.myemail === EmailOfUser && item.read === false
  //       );
  //       setUnreadMsg(mailArray.length);
  //       dispatch(sendMailBtnReduxStore.unreadMsgHandler(mailArray.length));
  //     });
  // }, [unreadMsg, unreadMsgSelector]);

  useEffect(() => {
    // console.log(data);
    if (data !== null) {
      const mailArray = data.filter(
        (item) => item.myemail === EmailOfUser && item.read === false
      );
      setUnreadMsg(mailArray.length);
      dispatch(sendMailBtnReduxStore.unreadMsgHandler(mailArray.length));
    }
    if (data !== null) {
      const mailArray = data.filter((item) => item.myemail === EmailOfUser);
      const noemail = data.filter(
        (item) => item.myemail === EmailOfUser
      );

      if (noemail.length === 0) {
        alert("No Emails");
        navigate("/");
      }
      setTotalmail(mailArray.length);
    }
  }, [unreadMsg, unreadMsgSelector, data]);

  useEffect(() => {
    console.log(mailDetail, messageModal);
    console.log(unreadMsgSelector);
  }, [unreadMsgSelector]);

  useEffect(() => {
    setTimeout(() => {
      console.log("every 2 seconds");
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
    }, 2000);
  }, [mails]);

  const readEmailHandler = (item) => {
    setUnreadMsg(unreadMsg - 1);
    setMessageModal(true);
    setMailDetail(item);
    console.log("read email", item);
    const newdata = {
      ...item,
      read: true,
    };
    axios
      .put(
        `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData/${item.name}.json`,
        newdata
      )
      .then((response) => {
        const mailArray = mails.map((itemMailArray) =>
          itemMailArray.name === item.name ? newdata : itemMailArray
        );
        setMails(mailArray);
      });
  };

  const modalCloseBtnHandler = () => {
    setMessageModal(false);
    setMailDetail(null);
  };

  const deleteBtnHandler = (item) => {
    axios
      .delete(
        `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData/${item.name}.json`
      )
      .then(() => {
        console.log(item);
        if (item.read == false) {
          setUnreadMsg(unreadMsg - 1);
          dispatch(
            sendMailBtnReduxStore.unreadMsgHandler(unreadMsg - 1)
          );
        }
      });
  };
  const logoutBtnHandler = () => {
    localStorage.removeItem("tokenMailBox");
    localStorage.removeItem("emailMailBox");
    navigate("/loginpage");
  };

  return (
    <div>
      <Container fluid className="inbox-page-container">
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
        <Row className="justify-content-center">
          <Col xs={16} md={12}>
            <Button variant="secondary" className="m-3" disabled>
              Total Unread : {unreadMsg}
            </Button>
            <Button
              variant="secondary"
              className="m-3"
              onClick={() => navigate("/")}
            >
              Home Page
            </Button>
            <Button
              variant="secondary"
              className="m-3"
              onClick={() => navigate("/sendmailpage")}
            >
              Sent Page
            </Button>
            <Button
              className="btn btn-danger m-3"
              onClick={() => logoutBtnHandler()}
              variant="secondary"
            >
              Logout
            </Button>
            <h2 className="mb-4">Inbox Page</h2>
            <ListGroup>
              {mails.length > 0 ? (
                mails.map((item) => (
                  <ListGroup.Item
                    key={item.name}
                    className="d-flex align-items-center"
                  >
                    {!item.read ? (
                      <div>
                        <button className="btn btn-primary circular-button"></button>
                        <p className="text-danger">Unread</p>
                      </div>
                    ) : (
                      <p className="text-success">Readed</p>
                    )}
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
                      <Button
                        onClick={() => deleteBtnHandler(item)}
                        variant="danger"
                        className="ms-2"
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <>
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                  {/* <p>No Mails for Now</p> */}
                </>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InboxPage;

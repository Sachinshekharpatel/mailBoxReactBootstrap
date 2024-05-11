import React, { useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill"; // this library is used for body so that we can write text in the body like bold and italic and other option
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./createmailPage.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sendMailBtnReduxStore } from "../reduxstore/reduxstore";
const CreateMailPage = () => {
  const dispatch = useDispatch();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const selectUnread = useSelector((state) => state.sendmail);
  const [body, setBody] = useState("");
  // const apikey = "AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0";
  const toRef = useRef();

  const subjectRef = useRef();

  const SendMailHandler = (e) => {
    e.preventDefault();
    const to = toRef.current.value.trim();
    const subject = subjectRef.current.value.trim();
    //below cleanBody function is used for removing html tags from body because earlier in body part the data is sending includes p tag
    const cleanBody = (html) => {
      return html.replace(/<[^>]*>?/gm, "");
    };
    const data = {
      to: to,
      subject: subject,
      body: cleanBody(body),
      read: false,

      myemail: localStorage.getItem("emailMailBox"),
    };
    dispatch(sendMailBtnReduxStore.unreadMsgHandler(selectUnread+1));

    axios
      .post(
        "https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json",
        data
      )
      .then((response) => {
        console.log("Mail Sent Successfully");
        const dataToUpdate = response.data.name;
        const newdata = {
          to: to,
          subject: subject,
          body: cleanBody(body),
          read: false,
          myemail: localStorage.getItem("emailMailBox"),
          name: dataToUpdate,
        };
        console.log(response.data.name);
        axios.put(
          `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData/${response.data.name}.json`,
          newdata
        );
        toRef.current.value = "";
        subjectRef.current.value = "";
        setBody("");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const closeBtnHandler = () => {
    dispatch(sendMailBtnReduxStore.editormodal());
  };
  return (
    <div className="createMailPage">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="closeBtnDiv">
              <h1 className="text-center mt-2">Create Mail</h1>
              <button onClick={closeBtnHandler} className="button">
                <span className="X"></span>
                <span className="Y"></span>
                <span className="close">Close</span>
              </button>
            </div>

            <Form onSubmit={SendMailHandler}>
              <Form.Group controlId="formTo">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter recipient's email"
                  ref={toRef}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  ref={subjectRef}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBody">
                <Form.Label>Body</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={body}
                  style={{ height: "auto", marginBottom: "10px" }}
                  onChange={setBody}
                  modules={modules}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 mb-3 w-100">
                Send Mail
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateMailPage;

import React, { useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill"; // this library is used for body so that we can write text in the body like bold and italic and other option
import "react-quill/dist/quill.snow.css";
import axios from "axios";
const CreateMailPage = () => {
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
  const [body, setBody] = useState("");
  const apikey = "AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0";
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
      myemail: localStorage.getItem("email"),
    };

    axios
      .post(
        "https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json",
        data
      )
      .then((response) => {
        console.log("Mail Sent Successfully");
        toRef.current.value = "";
        subjectRef.current.value = "";
        setBody("");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Create Mail</h1>
          <Form onSubmit={SendMailHandler}>
            <Form.Group controlId="formTo">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="text"
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
                onChange={setBody}
                modules={modules}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100">
              Send Mail
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMailPage;

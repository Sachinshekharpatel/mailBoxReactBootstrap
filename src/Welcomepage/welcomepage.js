import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./welcomepage.css";
import axios from "axios";
import CreateMailPage from "../sendMailcomponent/CreateMailPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import imageSrc from "./image.png";
import { sendMailBtnReduxStore } from "../reduxstore/reduxstore";
import useFetch from "../customhooks/usefetch";
function Welcomepage() {
  const unreadMsgSelector = useSelector(
    (state) => state.sendmail.TotalUnreadMsg
  );
  const data = useFetch(
    `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json`
  );

  const [unreadMsg, setUnreadMsg] = useState(unreadMsgSelector);
  const EmailOfUser = localStorage.getItem("emailMailBox");
  const dispatch = useDispatch();
  const sendMail = useSelector((state) => state.sendmail.editor);
  // const [sendMailModal, setSendMailModal] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("tokenMailBox") || null;

  useEffect(() => {
    if (token == null) {
      navigate("/loginpage");
    }
    setUnreadMsg(unreadMsgSelector);
    // console.log(unreadMsg,unreadMsgSelector);
  }, [token, unreadMsg, unreadMsgSelector]);

  useEffect(() => {
    // console.log(data);
    if (data !== null) {
      const mailArray = data.filter(
        (item) => item.myemail === EmailOfUser && item.read === false
      );
      setUnreadMsg(mailArray.length);
      dispatch(sendMailBtnReduxStore.unreadMsgHandler(mailArray.length));
    }
  }, [unreadMsg, unreadMsgSelector, data]);
  useEffect(() => {
    console.log(data);
    if (data !== null) {
      const mailArray = data.filter(
        (item) => item.myemail === EmailOfUser && item.read === false
      );
      // setUnreadMsg(mailArray.length);
      // dispatch(sendMailBtnReduxStore.unreadMsgHandler(mailArray.length));
    }
  }, [unreadMsg, unreadMsgSelector, data]);

  // useEffect( () => {
  //   console.log(data);
  //   axios
  //     .get(
  //       `https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json`
  //     )
  //     .then((response) => {
  //       // console.log(data);
  //       const mailDataAllUser = Object.values(response.data);
  //       const mailArray = mailDataAllUser.filter(
  //         (item) => item.myemail === EmailOfUser && item.read === false
  //       );
  //       setUnreadMsg(mailArray.length);
  //       dispatch(sendMailBtnReduxStore.unreadMsgHandler(mailArray.length));
  //     });
  // }, [unreadMsg, unreadMsgSelector]);

  useEffect(() => {
    console.log(sendMail);
  }, [sendMail]);

  const logoutBtnHandler = () => {
    localStorage.removeItem("tokenMailBox");
    localStorage.removeItem("emailMailBox");
    navigate("/loginpage");
  };

  const sendMailBtnHandler = () => {
    // setSendMailModal(!sendMailModal);

    dispatch(sendMailBtnReduxStore.editormodal());
  };
  const inboxBtnHandler = () => {
    navigate("/inboxpage");
  };
  const sendMailPageBtnHandler = () => {
    navigate("/sendmailpage");
  };

  return (
    <div>
      <div className="containerWithShadow">
        <h3 className="header-title mt-2 mb-3">Welcome To SachinMessenger</h3>
      </div>
      <div className="header-container">
        <div className="inbox">
          <button onClick={inboxBtnHandler} className="inbox-btn">
            <svg
              viewBox="0 0 512 512"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
            </svg>
            <span class="msg-count">{unreadMsgSelector}</span>
          </button>
        </div>
        <div className="inbox">
          <Button onClick={sendMailPageBtnHandler} variant="primary">
            Sent
          </Button>
        </div>
        <h5 style={{ color: "grey" }}>
          Hi, {localStorage.getItem("emailMailBox")}
        </h5>
        <button onClick={() => logoutBtnHandler()} className="Btn">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
      <div className="sendmail">
        <button onClick={() => sendMailBtnHandler()}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Compose</span>
        </button>
      </div>
      {sendMail ? (
        <CreateMailPage></CreateMailPage>
      ) : (
        <img
          style={{
            width: "70%",
            height: "70%",
            objectFit: "cover",
            marginTop: "10px",
          }}
          src={imageSrc}
        ></img>
      )}
    </div>
  );
}

export default Welcomepage;

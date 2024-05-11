import React, { useState, useEffect } from "react";
import axios from "axios";
function InboxPage() {
  const [mails, setMails] = useState([]);
  const EmailOfUser = localStorage.getItem("emailMailBox");
  useEffect(() => {
    axios
      .get(
        "https://fir-cypresstestcase-default-rtdb.firebaseio.com/MailBoxData.json"
      )
      .then((response) => {
        const mailDataAllUser = Object.values(response.data);
        // console.log(mailDataAllUser);

        const mailArray = mailDataAllUser.filter(
          (item) => item.myemail === EmailOfUser
        );
        console.log(mailArray)
        setMails(mailArray);
      });
  }, []);

  return (
    <div>
      <h1>Inside Inboxpage</h1>
      {mails.map((mail) => (
           <h1>{EmailOfUser} Has Send Mail To : {mail.to}</h1>
      ))}
    </div>
  );
}

export default InboxPage;

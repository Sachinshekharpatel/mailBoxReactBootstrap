import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let mailDataAllUser = Object.values(data);
        
        setData(mailDataAllUser);
      });
  }, [url]);
//    console.log(data)
  return data;
};

export default useFetch;
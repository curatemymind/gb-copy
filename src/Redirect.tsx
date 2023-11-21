import React, { useEffect, useState } from "react";
import "./App.css";

const Redirect = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    window.location.replace("/")
  }, []);

  return (
    <div>
     
    </div>
  );
};
export default Redirect;

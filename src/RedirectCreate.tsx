import React, { useEffect, useState } from "react";
import "./App.css";

const RedirectCreate = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    window.location.replace("/createordie")
  }, []);

  return (
    <div>
     
    </div>
  );
};
export default RedirectCreate;

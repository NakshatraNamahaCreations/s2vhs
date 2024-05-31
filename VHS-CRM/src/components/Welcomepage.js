import React from "react";
import { useEffect } from "react";

function Welcomepage() {
  useEffect(() => {
    setTimeout(() => {
      window.location.assign("login");
    }, 10000);
  }, []);

  return (
    <div>
      <div style={{ position: "absolute", top: 150, left: 100 }}>
        <img src="/images/logo.png" style={{ width: "130px" }} />
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "80px",
            marginTop: "20px",
          }}
        >
          MAWIDDI <br /> Hospital Login
        </h1>
      </div>
      <div>
        <img src="/images/bg2.jpg" style={{ width: "100%", height: "100vh" }} />
      </div>
    </div>
  );
}

export default Welcomepage;


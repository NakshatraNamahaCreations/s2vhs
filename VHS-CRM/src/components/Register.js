import React from "react";
import { Button, Card } from "react-bootstrap";

function Register() {
  return (
    <div style={{ backgroundColor: "#0d6efd", height: "100vh" }}>
      <div
        className="row justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div className="col-10" style={{ marginTop: "15px" }}>
          <Card style={{ boxShadow: "0px 0px 5px 2px lightgray" }}>
            <div style={{ display: "flex" }}>
              <div className="col-6 ">
                <img
                  src="/images/r1.jpg"
                  style={{ width: "100%", height: "625px" }}
                />
              </div>
              <div className="col-6 " style={{ backgroundColor: "#d3d3d359" }}>
                <div
                  style={{
                    display: "flex",
                   marginLeft:"110px",
                    marginTop: 10,
                  }}
                >
                  <img src="/images/logo.png" style={{ width: "50px" }} />
                  <h2
                    style={{
                      color: "#0d6efd",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    MAWIDDI
                  </h2>
                </div>
                
                <div className="inputlogin">
                  <div class="input-group mb-4 mt-3" style={{display:"block",width:"100%"}}>
                    <h4 style={{color:"#0d6efd",marginLeft:"110px"}}>Register</h4>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Hospital Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",borderRadius:"10px"}}
                    />
                    <input
                      type="number"
                      class="form-control "
                      placeholder="Contact No"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",marginTop:"5px",borderRadius:"10px"}}
                    />
                      <input
                      type="email"
                      class="form-control"
                      placeholder="Email id"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",borderRadius:"5px",marginTop:"10px"}}
                    />
                    <input
                      type="password"
                      class="form-control "
                      placeholder="Password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",marginTop:"5px",borderRadius:"10px"}}
                    />
                      <input
                      type="password"
                      class="form-control"
                      placeholder="Confirm password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",borderRadius:"5px",marginTop:"10px"}}
                    />
                    <input
                      type="password"
                      class="form-control "
                      placeholder="Password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",marginTop:"5px",borderRadius:"10px"}}
                    />
                      <textarea  rows="3"
                      type="text"
                      class="form-control"
                      placeholder="Hospital Bio"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",borderRadius:"5px",marginTop:"10px"}}
                    />
                    <input
                      type="text"
                      class="form-control "
                      placeholder="Specialist"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",marginTop:"5px",borderRadius:"10px"}}
                    />
                     <input
                      type="text"
                      class="form-control "
                      placeholder="Verification Documents"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{width:"60%",marginLeft:"20%",marginTop:"5px",borderRadius:"10px"}}
                    />
                  </div>
                  <div class="input-group mb-3"></div>
                </div>
                <div style={{textAlign:"center"}}>
                  <Button style={{width:"200px",padding:"4px",marginTop:"-20px"}}>Register</Button>
            
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;

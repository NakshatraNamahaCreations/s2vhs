import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../layout/Header";
import Nav from "../Nav1";


function Quotationformat() {
  const [category, setcategory] = useState("");
  const [data, setdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getcategory();
  
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setdata(res.data?.category);
      console.log(res.data?.category);
    }
  };

  const next =() =>{
    sessionStorage.setItem("category", category);
    window.location.assign("/quotationformat1")
  }
  return (
    <div className="web">
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
         
          <div className="card" style={{ marginTop: "50px" }}>
            <div className="card-body p-3">
            
             <div className="mt-5">
                <form>
                  <div className="row ">
                    <div className="col-md-4 ">
                      <div className="vhs-input-label">Category</div>
                      <div className="group pt-1">
                        <select
                          className="vhs-input-value col-md-12"
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          <option>--select--</option>
                          {data.map((item) => (
                            <option value={item.category}>
                              {item.category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                   
                  </div>
                </form>
              </div>
              <div className="row pt-3 ">
                <div className="col-md-2">
                  {!category ? (
                    <>
                      {" "}
                      <button className="vhs-button">Next</button>
                    </>
                  ) : (
                   
                      <button className="vhs-button" onClick={next}>Next</button>
                   
                  )}
                </div>
               
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
}

export default Quotationformat;

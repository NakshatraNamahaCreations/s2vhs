import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Customernav from "../Customernav";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

function Customerimport() {
  const [customerdata, setcustomerdata] = useState([]);
  const [excel, setExcel] = useState();
  const [importXLSheet, setImportXLSheet] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getcustomer();
  }, []);

  const getcustomer = async () => {
    let res = await axios.get(apiURL + "/getcustomer");
    if (res.status === 200) {
      setcustomerdata(res.data?.customers);
     
    }
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this user?`
    );
    if (confirm) {
      try {
        const responce = await axios.post(apiURL + "/deletetercustomer/" + id);
   
        alert("Deleted successfully");
        window.location.reload();
      } catch (error) {

        alert("Something went wrong");
      }
    }
  };

  const columns = [
    {
      name: "Sl  No",
      cell: (row, i) => <div>{i + 1}</div>,
    },
    {
      name: "Card No",
      selector: (row) => row.cardNo,
    },
    {
      name: "Customer name",
      selector: (row) => row.customerName,
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactPerson,
    },
    {
      name: "Contact",
      selector: (row) => row.mainContact,
    },
    {
      name: "Address",
      cell: (row) => (
        <div>
          <p>
            {row.rbhf} {row.cnap} {row.lnf}
          </p>
        </div>
      ),
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mainContact,
    },
    {
      name: "Customer type",
      selector: (row) => row.customerType,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            style={{
              border: 0,
              backgroundColor: "#a9042e",
              color: "white",
              borderRadius: "5px",
              padding: "8px 15px",
            }}
            onClick={() => deleteUser(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (excel && importXLSheet.length === 0) {
      readFile();
    }
  }, [excel, importXLSheet]);

  function readFile() {
    var name = excel.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
    
      setImportXLSheet(JSON.parse(convertToJson(data)));
    };
    reader.readAsBinaryString(excel);
  }

  function convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  const handleImport = async () => {
    if (importXLSheet.length > 0) {
      try {
        const res = await axios.post(
          apiURL + "/addcustomersviaexcelesheet",
          importXLSheet
        );
        if (res.status === 200) {
          alert("File uploaded successfully");
          window.location.reload();
          console.log("Data stored in the database successfully");
          setcustomerdata((prevData) => [...prevData, ...importXLSheet]);
          setExcel(null);
          setImportXLSheet([]);
        }
      } catch (error) {
        console.error(`Error while uploading file ${error}`);
      }
    }
  };

  return (
    <div className="web">
      <Header />
      <Customernav />
      <div className="row m-auto">
        <div className="col-md-12">
          <h6>All Customer Data</h6>
        </div>
        <div className="mt-2">
          <CSVLink data={customerdata} filename={"customer.csv"}>
            {" "}
            <Button
              className="btn btn-danger"
              style={{ backgroundColor: "#a9042e", border: 0 }}
            >
              Export
            </Button>
          </CSVLink>
          <input
            accept=".xlsx,.xls,.csv"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={(e) => setExcel(e.target.files[0])}
          />{" "}
          <label
            className="btn btn-outline-danger "
            style={{ borderColor: "#a9042e" }}
            htmlFor="icon-button-file"
          >
            {" "}
            Import Excel
          </label>{" "}
          {excel && (
            <Button
              className="btn btn-danger"
              style={{ backgroundColor: "#a9042e", border: 0 }}
              onClick={handleImport}
            >
              Upload
            </Button>
          )}
        </div>
        <div className="mt-1 border">
          <DataTable
            columns={columns}
            data={customerdata}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default Customerimport;
import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import B2Bnav from "../B2Bnav";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

function Importexport() {
  const [b2bdata, setb2bdata] = useState([]);
  const [excel, setExcel] = useState();
  const [importXLSheet, setImportXLSheet] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getb2b();
  }, []);

  const getb2b = async () => {
    let res = await axios.get(apiURL + "/getB2B");
    if ((res.status = 200)) {
      console.log("b2bData", res);
      setb2bdata(res.data?.B2B);
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "B2B name",
      selector: (row) => row.b2bname,
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactperson,
    },
    {
      name: "maincontact",
      selector: (row) => row.maincontact,
    },
    {
      name: "Alternate number",
      selector: (row) => row.alternateno,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gst",
      selector: (row) => row.gst,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "B2B type",
      selector: (row) => row.b2btype,
    },
    {
      name: "city",
      selector: (row) => row.city,
    },
    {
      name: "Instructions",
      selector: (row) => row.instructions,
    },
    {
      name: "Approach",
      selector: (row) => row.approach,
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
      console.log("Data>>>" + data); // shows that excel data is read
      console.log(convertToJson(data)); // shows data in json format
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
        const res = await axios.post(apiURL + "/storeB2B", importXLSheet);
        if (res === 200) {
          alert("File uploaded successfully");
          console.log("Data stored in the database successfully");
          setb2bdata((prevData) => [...prevData, ...importXLSheet]);
          setExcel(null);
          setImportXLSheet([]);
          window.location.reload();
          alert("File uploaded successfully");
        }
      } catch (error) {
        console.error(`Error while uploading file ${error}`);
      }
    }
  };

  return (
    <div className="web">
      <Header />
      <B2Bnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <h6>All B2B Data</h6>
        </div>
        <div className="mt-2">
          <CSVLink data={b2bdata} filename={"B2b.csv"}>
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
            data={b2bdata}
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

export default Importexport;

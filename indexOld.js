const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;
const tempFile = require("./scripts/tempFile");
const fs = require("fs");
const path = require("path");
const process = require("process");
const javaRunner = require("./scripts/generate");
// const process = require("process");
const generate = require("./scripts/generate");
const nano = require("nanoseconds");
const perf_hooks = require("perf_hooks");
const { TokenClass } = require("typescript");

process.chdir(__dirname);

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(fileUpload());
app.use(express.json());

var progressStatus = "default";
var statusMap = {};
var jobs = {};

app.get("/", (req, res) => {
  console.log(__dirname + " dir");
  // res.sendFile(__dirname + "\\index.html");
  res.sendFile(__dirname + "/index.html");
});

app.get("/check", (req, res) => {
  req.query.token;

  let status = getStatus(token);
  if (status) {
  }
});

app.post("/generate", (req, res) => {
  const pdfFilePath = req.body.pdfFilePath;
  const xlsxFilePath = req.body.xlsxFilePath;
  const parentDir = path.basename(path.dirname(pdfFilePath));
  const jsonFilePath = `static/${parentDir}/jsonData.json`;
  const jsonData = req.body.jsonData;

  fs.writeFile(jsonFilePath, jsonData, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

  const now = () => {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
  };

  const token = now();

  statusMap = {
    token: progressStatus,
  };
  const zipFileDir = `static/${parentDir}/archival`;
  fs.mkdirSync(zipFileDir);

  javaRunner(token, zipFileDir, pdfFilePath, xlsxFilePath, jsonFilePath);

  setTimeout(() => {
    const data = {
      archivalPath: zipFileDir + "/compressed.zip",
    };

    res.json(JSON.stringify(data));
  }, 10000);
});

app.post("/", (req, res) => {
  const uploadDirectory = tempFile();
  const pdfFilePath = uploadDirectory + "/sample.pdf";
  const xlsxFilePath = uploadDirectory + "/sample.xlsx";
  const pdfFile = req.files.file[0];
  const xlsxFile = req.files.file[1];

  pdfFile.mv(pdfFilePath, function (err) {
    if (err) {
      res.send(err);
    }
  });
  xlsxFile.mv(xlsxFilePath, function (err) {
    if (err) {
      res.send(err);
    }
  });

  const data = {
    pdfFilePath: pdfFilePath,
    xlsxFilePath: xlsxFilePath,
    jsonFilePath: "./static/sample/sample.json",
  };

  res.json(JSON.stringify(data));
});

app.get("/downloadArchival", (req, res) => {
  const file = req.query.archivalPath;
  res.download(file); // Set disposition and send it.
});

app.get("/fileLoaded", (req, res) => {
  // res.
});

app.post("/upload", (req, res) => {
  res.send("ok");
});

app.post("/statuscheck", (req, res) => {
  setInterval(() => {
    var result = statusCheck(token);
    if (result == "ready") {
    }
  }, 1000);

  // counter += 1;
  // if (counter % 5 == 0) {
  //   res.send("ready");
  // } else {
  //   res.send("pending");
  // }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

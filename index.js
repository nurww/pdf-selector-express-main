const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;
const tempFile = require("./scripts/tempFile");
const fs = require("fs");
const path = require("path");
const process = require("process");
const javaRunner = require("./scripts/generate");

process.chdir(__dirname);
generator = javaRunner();

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(fileUpload());
app.use(express.json());

var progressStatus = "default";
var statusMap = {};
var jobs = {};

generator.emitter.on("ready", (data, p) => {
    console.log("ready", data);
    statusMap[data] = "ready";
    jobs[data] = p;
});

generator.emitter.on("failed", (data) => {
    console.log("ready", data);
    statusMap[data] = "failed";
});

app.get("/", (req, res) => {
    console.log(__dirname + " dir");
    // res.sendFile(__dirname + "\\index.html");
    res.sendFile(__dirname + "/index.html");
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

    // function makes nano token
    const now = () => {
        const hrTime = process.hrtime();
        return hrTime[0] * 1000000000 + hrTime[1];
    };
    const token = now();

    statusMap = {
        token: progressStatus,
    };

    const zipFileDir = `static/${parentDir}/archival`;
    const archivalPath = `${zipFileDir}/compressed.zip`;
    fs.mkdirSync(zipFileDir);

    console.log(zipFileDir, pdfFilePath, xlsxFilePath, jsonFilePath);

    generator.generate(
        token,
        zipFileDir,
        pdfFilePath,
        xlsxFilePath,
        jsonFilePath
    );

    res.send({token: token, archivalPath: archivalPath});
});

app.post("/", (req, res) => {
    console.log("in upload back");

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

    // const removeWorkingPath = (path) => fs.rmSync(path, {recursive: true});
    // setTimeout(() => {
    //     removeWorkingPath(uploadDirectory)
    // }, 2000)


    res.json(JSON.stringify(data));
});

app.get("/downloadArchival", (req, res) => {
    const file = req.query.archivalPath;
    res.download(file); // Set disposition and send it.
});

app.post("/statuscheck", (req, res) => {
    let token = req.body["token"];
    let status = statusMap[token];
    if (status == "ready") {
        res.send({status: status, path: jobs[token]});
    } else {
        res.send({status: status});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
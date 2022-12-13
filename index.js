const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;
const tempFile = require("./static/scripts/tempFile");
const fs = require('fs');
const path = require('path');


const javaRunner = require("./static/scripts/generate");

let counter = 0;

app.use("/static", express.static("static"));
app.use(fileUpload());
app.use(express.json())

app.get("/", (req, res) => {
    console.log(__dirname + " dir");
    res.sendFile(__dirname + "\\index.html");
});


app.post("/generate", (req, res) => {

    const pdfFilePath = req.body.pdfFilePath;
    const xlsxFilePath = req.body.xlsxFilePath;
    const parentDir = path.basename(path.dirname(pdfFilePath));
    const jsonFilePath = `static/${parentDir}/jsonData.json`;
    const jsonData = req.body.jsonData;

    fs.writeFile(jsonFilePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });


    const zipFileDir = `static/${parentDir}/archival`;
    fs.mkdirSync(zipFileDir);
    javaRunner(zipFileDir, pdfFilePath, xlsxFilePath, jsonFilePath)

    // res.redirect("/");
    const data = {
        archivalPath: zipFileDir + "/compressed.zip"
    }
    console.log(data.archivalPath + " data.archivalPathdata.archivalPathdata.archivalPathdata.archivalPathdata.archivalPathdata.archivalPathdata.archivalPath")

    res.json(JSON.stringify(data));
});

app.post("/", (req, res) => {
    const uploadDirectory = tempFile();
    const pdfFilePath = uploadDirectory + "/sample.pdf";
    const xlsxFilePath = uploadDirectory + "/sample.xlsx";
    const pdfFile = req.files.file[0];
    const xlsxFile = req.files.file[1];

    console.log(pdfFile)
    console.log(xlsxFile)

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
        pdfFilePath: pdfFilePath, xlsxFilePath: xlsxFilePath, jsonFilePath: "./static/sample/sample.json"
    }

    res.json(JSON.stringify(data));
});

app.get("/downloadArchival", (req, res) => {
    console.log("WE ARE DOWNLOADING SOME FILES OR ARCHIVAL")
    console.log(req.query.archivalPath)
    const file = req.query.archivalPath;
    res.download(file); // Set disposition and send it.

})

app.get("/fileLoaded", (req, res) => {
    // res.
})

app.post("/upload", (req, res) => {
    console.log(req.POST);
    console.log(req.files);
    res.send("ok");
});

app.post("/check_status", (req, res) => {
    console.log(req.POST);
    counter += 1;
    console.log(counter);
    if (counter % 5 == 0) {
        res.send("ready");
    } else {
        res.send("pending");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
console.log("test")

// module.exports = { exec };
// export {exec }
// exec("ls -la", (error, stdout, stderr) => {
//   if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//   }
//   if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//   }
//   console.log(`stdout: ${stdout}`);
// });



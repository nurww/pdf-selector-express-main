let filesForm = document.getElementById("filesUploadForm");

let excelUploader = document.getElementById("xlsxFile");
let pdfUploader = document.getElementById("pdfFile");
let fileUpload = document.getElementById("fileUpload");
let jsonUploader = document.getElementById("jsonFileUpload");

excelUploader.addEventListener("change", ValidateExcel);
pdfUploader.addEventListener("change", ValidatePdf);
jsonUploader.addEventListener("change", ValidateJson);

function ValidateExcel() {
  let myFile = this.files[0];
  let isExcel = myFile.name.match("xlsx*");
  if (!isExcel) {
    alert("Please upload excel file in .xlsx format");
    excelUploader.value = "";
    return;
  }
}

function ValidatePdf() {
  let myFile = this.files[0];
  let isPdf = myFile.type.match("pdf*");
  var reader = new FileReader();
  reader.readAsBinaryString(myFile);
  reader.onloadend = function () {
    var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
    console.log("Number of Pages:", count);
    if (!isPdf || count !== 1) {
      alert("Please upload 1 paged PDF file in .pdf format", count);
      pdfUploader.value = "";
      return;
    }
  };
}

function ValidateJson() {
  let myFile = this.files[0];
  let isJson = myFile.type.match("json*");
  if (!isJson) {
    alert("Please upload excel file in .json format");
    jsonUploader.value = "";
    return;
  }
}

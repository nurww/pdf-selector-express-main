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
  console.log(myFile);
  if (!isExcel) {
    alert("Please upload excel file in .xlsx format");
    excelUploader.value = "";
    return;
  }
  checkform();
}

function ValidatePdf() {
  let myFile = this.files[0];
  let isPdf = myFile.type.match("pdf*");
  if (!isPdf) {
    alert("Please upload excel file in .pdf format");
    pdfUploader.value = "";
    return;
  }
  checkform();
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

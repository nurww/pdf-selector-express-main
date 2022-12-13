const form = document.querySelector("#filesUploadForm");

form.addEventListener("submit", e => {
    e.preventDefault();
    const filesFormData = new FormData();
    const pdfFile = document.querySelector("#pdfFile")
    const xlsxFile = document.querySelector("#xlsxFile")

    filesFormData.append('file', pdfFile.files[0]);
    filesFormData.append('file', xlsxFile.files[0]);

    uploadFiles(filesFormData);
})

const uploadFiles = (formData) => {
    console.log("Uploading files");

    fetch("/", {
        method: 'POST', body: formData,

    }).then(res => res.json())
        .then(json => {
            const data = JSON.parse(json)

            localStorage.setItem("pdfFilePath", data.pdfFilePath);
            localStorage.setItem("xlsxFilePath", data.xlsxFilePath);

        })
}

jsonData = {
    "33123": {
        "_id": "33123", "title": "School", "body": {"x": 89, "y": 316}, "fontSize": "12", "fontFamily": "Arial"
    },
    "68236": {
        "_id": "68236", "title": "Birthyear", "body": {"x": 91, "y": 369}, "fontSize": "12", "fontFamily": "Arial"
    },
    "69924": {"_id": "69924", "title": "Name", "body": {"x": 302, "y": 124}, "fontSize": "12", "fontFamily": "Arial"},
    "84478": {
        "_id": "84478", "title": "Surname", "body": {"x": 409, "y": 122}, "fontSize": "12", "fontFamily": "Arial"
    },
    "99519": {"_id": "99519", "title": "Grade", "body": {"x": 89, "y": 344}, "fontSize": "12", "fontFamily": "Arial"}
}

const generate = document.querySelector("#generate")

generate.addEventListener("click", () => {
    const filesObj = {
        pdfFilePath: localStorage.getItem("pdfFilePath"),
        xlsxFilePath: localStorage.getItem("xlsxFilePath"),
        jsonData: JSON.stringify(jsonData)
    }
    console.log("GENERATE CLICKED")
    console.log(filesObj.pdfFilePath)
    console.log(filesObj.xlsxFilePath)
    fetch("/generate", {
        method: 'POST', // body: JSON.stringify(jsonData),
        body: JSON.stringify(filesObj), headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(json => {
            const data = JSON.parse(json)
            localStorage.setItem("archivalPath", data.archivalPath);
            console.log(localStorage.getItem("archivalPath") + " localStorage.getItem(\"archivalPath\")localStorage.getItem(\"archivalPath\")localStorage.getItem(\"archivalPath\")localStorage.getItem(\"archivalPath\")localStorage.getItem(\"archivalPath\")")

        })
})

const download = document.querySelector("#download")

download.addEventListener("click", () => {
    console.log("DOWNLOAD CLICKED")

    fetch(`/downloadArchival?archivalPath=${localStorage.getItem("archivalPath")}`).then(res => res.blob())
        .then(blob => {
            const file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        });
})

// import { getCords } from './scriptcopy';

// var frm = $('#fileUploader');
// var modal = $("#myModal");
// var pending =$("#pend");
// var completed = $('#completed');
// var errormsg = $('#error');
// var errorsCount = 0;

//  let element = document.getElementById('gen')
// element.addEventListener('click',generate())
// function generate(){
//   const exec = require('child_process').exec;
//   const childPorcess = exec('java -jar pdf-generator.jar', function(err, stdout, stderr) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(stdout+ "sdsd")
//   })
//   module.exports = childPorcess;

// }

// frm.submit(function (e) {

//   e.preventDefault();

//   function validateForm() {
//     $('#fileUploader').val()==="";
//     if($('#jsonFileUpload').val()===""||$('#excelFileUpload').val()===""||$('#pdfFileUpload').val()==="" ){
//       return false;
//     }
//     return true;
//   }
//   let isValid = validateForm();
//   // потом поменять надо
//   if(!isValid){
//     data = new FormData();
//     data.append("excelFileUpload", $('#excelFileUpload')[0].files[0]);
//     data.append("pdfFileUpload", $("#pdfFileUpload")[0].files[0]);
//     data.append("jsonFileUploader", getCords());
//     // data.append('jsonCoeds',getCords())
//     console.log(getCords());

//     $.ajax({
//       type: frm.attr('method'),
//       url: frm.attr('action'),
//       data: data,
//       enctype: 'multipart/form-data',
//       processData: false,
//       contentType: false,
//       success: function (data) {

//         showModal();
//         progressCheckAjax();
//         console.log('Uploading was successful.'+ data.length);
//         console.log(data);
//       },
//       error: function (data) {
//           console.log('An error occurred.');
//           console.log(data);
//       },
//     });
//   }
//   else{
//     alert('Please upload all files');
//   }
// });
// var modal = document.getElementById("myModal");
// var btn = document.getElementById("myBtn");
// var span = document.getElementsByClassName("close")[0];

// function showModal() {
//   modal.style.display = "block";  
// }

// function progressCheckAjax(){
//   function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
//   $(document).on("keydown", disableF5);
//   completed.hide();   
//   pending.show();
//   let intervalID = setTimeout(async () => {   
//     let url = 'http://localhost:3000/check_status';
//     $.ajax({
//       type: frm.attr('method'),
//       url: url,
//       data: data,
//       processData: false,
//       contentType: false,
//       success: function (data) {
//         console.log('ready or pending'+ data.length);
//         console.log(data);
//         if(data == 'ready'){
//           pending.hide();   
//           completed.show();   
//           span.onclick = function() {
//             modal.style.display = "none";
//           }
//         }else{
//           span.onclick = function() {  
//             let conf = confirm("Вы точно хотите покинуть окно? Процесс будет потерян");
//             if(conf){
//               modal.style.display = "none";
//             }
//           }
//           if(modal.style.display != "block"){
//             clearInterval(intervalID);
//           }
//           else{            
//             progressCheckAjax();
//           }                
//         }
//       },
//       error: function (data) {
//         console.log('An error occurred.');
//         errorsCount++;
//         if(errorsCount>3){
//           pending.hide()
//           errormsg.show();
//         }
//         else{
//           progressCheckAjax();
//         }               
//       },      
//     })
//   }, 1000);
// }

const form = document.querySelector("#filesUploadForm");

let isValid = function checkform() {
    var inputs = form.getElementsByTagName("input");
    if (inputs[0].value == "" || inputs[1].value == "") {
        alert("Please fill all required fields");
        return false;
    }
    return true;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let tof = isValid();
    if (tof == true) {
        console.log("dfdf");
        const filesFormData = new FormData();
        const pdfFile = document.querySelector("#pdfFile");
        const xlsxFile = document.querySelector("#xlsxFile");

        filesFormData.append("file", pdfFile.files[0]);
        filesFormData.append("file", xlsxFile.files[0]);

        uploadFiles(filesFormData);
    }
    return false;
});

const uploadFiles = (formData) => {
    console.log("Uploading files");

    fetch("/", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((json) => {
            const data = JSON.parse(json);
            localStorage.setItem("pdfFilePath", data.pdfFilePath);
            localStorage.setItem("xlsxFilePath", data.xlsxFilePath);
        }).finally(() => {
        renderPdf(localStorage.getItem("pdfFilePath"));
    });
};

// let pdfPath = localStorage.getItem("pdfFilePath");
//
// if (!!pdfPath) {
//     renderPdf(pdfPath);
// }

const generate = document.querySelector("#generate");
generate.addEventListener("click", () => {
    let jsonData = getCords();
    console.log(jsonData);

    const filesObj = {
        pdfFilePath: localStorage.getItem("pdfFilePath"),
        xlsxFilePath: localStorage.getItem("xlsxFilePath"),
        jsonData: jsonData,
    };

    console.log(filesObj);

    fetch("/generate", {
        method: "POST",
        body: JSON.stringify(filesObj),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(JSON.stringify(data));

            const token = data["token"];
            const archivalPath = data["archivalPath"];
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("archivalPath", archivalPath);

            $("#pend").show();
            $("#myModal").show();

            const checkStatus = function () {
                fetch("/statuscheck", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data["status"] == "ready") {
                            console.log(data);
                            $("#pend").hide();
                            $("#completed").show();
                            return;
                        } else if (data["status"] == "failed") {
                            console.log("failed");
                            $("#myModal").hide();
                        } else {
                            console.log("pending...");
                            setTimeout(checkStatus, 1000);
                        }
                    });
            };

            checkStatus();
        });
});

const download = document.querySelector("#download");

const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
    $("#myModal").hide();
    $("#completed").hide();
});

download.addEventListener("click", () => {
    fetch(
        `/downloadArchival?archivalPath=${localStorage.getItem("archivalPath")}`
    )
        .then((res) => res.blob())
        .then((blob) => {
            const file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        })
        .finally(() => {
            $("#myModal").hide();
        });
});




//
// const form = document.querySelector("#filesUploadForm");
//
// let isValid = function checkform() {
//   var inputs = form.getElementsByTagName("input");
//   if (inputs[0].value == "" || inputs[1].value == "") {
//     alert("Please fill all required fields");
//     return false;
//   }
//   return true;
// };
//
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let tof = isValid();
//   if (tof == true) {
//     console.log("dfdf");
//     const filesFormData = new FormData();
//     const pdfFile = document.querySelector("#pdfFile");
//     const xlsxFile = document.querySelector("#xlsxFile");
//
//     filesFormData.append("file", pdfFile.files[0]);
//     filesFormData.append("file", xlsxFile.files[0]);
//
//     uploadFiles(filesFormData);
//   }
//   return false;
// });
//
//
//
// const uploadFiles = (formData) => {
//   console.log("Uploading files");
//
// <<<<<<< HEAD
//     fetch("/", {
//         method: 'POST', body: formData,
//
//     }).then(res => res.json())
//         .then(json => {
//             const data = JSON.parse(json);
//             console.log(data);
//
//             localStorage.setItem("pdfFilePath", data.pdfFilePath);
//             localStorage.setItem("xlsxFilePath", data.xlsxFilePath);
//
//         }).finally(() => {
//         renderPdf(localStorage.getItem("pdfFilePath"));
//     })
// }
//
// let pdfPath = localStorage.getItem("pdfFilePath");
//
// if (!!pdfPath) {
//     renderPdf(pdfPath);
// }
//
//
// // jsonData = {
// //     "29458": {
// //         "_id": "29458",
// //         "title": "Birthyear",
// //         "body": {
// //             "x": 74,
// //             "y": 267
// //         },
// //         "fontSize": "22",
// //         "fontFamily": "Arial"
// //     },
// //     "36650": {
// //         "_id": "36650",
// //         "title": "Grade",
// //         "body": {
// //             "x": 74,
// //             "y": 304
// //         },
// //         "fontSize": "22",
// //         "fontFamily": "Verdana"
// //     },
// //     "43292": {
// //         "_id": "43292",
// //         "title": "School",
// //         "body": {
// //             "x": 74,
// //             "y": 285
// //         },
// //         "fontSize": "22",
// //         "fontFamily": "Tahoma"
// //     },
// //     "59625": {
// //         "_id": "59625",
// //         "title": "Name",
// //         "body": {
// //             "x": 253,
// //             "y": 103
// //         },
// //         "fontSize": "22",
// //         "fontFamily": "Times New Roman"
// //     },
// //     "76898": {
// //         "_id": "76898",
// //         "title": "Surname",
// //         "body": {
// //             "x": 352,
// //             "y": 105
// //         },
// //         "fontSize": "33",
// //         "fontFamily": "Trebuchet MS"
// //     }
// // }
//
//
// const generate = document.querySelector("#generate")
// // console.log(jsonData)
// generate.addEventListener("click", () => {
//
//     let jsonData = getCords();
//
//     const filesObj = {
//         pdfFilePath: localStorage.getItem("pdfFilePath"),
//         xlsxFilePath: localStorage.getItem("xlsxFilePath"),
//         jsonData: jsonData
//         // jsonData: JSON.stringify(jsonData)
//     }
//
//     console.log(filesObj)
//
//     fetch("/generate", {
//         method: 'POST', // body: JSON.stringify(jsonData),
//         body: JSON.stringify(filesObj), headers: {
//             'Accept': 'application/json', 'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//         .then(json => {
//             const data = JSON.parse(json)
//             localStorage.setItem("archivalPath", data.archivalPath);
// =======
//   fetch("/", {
//     method: "POST",
//     body: formData,
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       const data = JSON.parse(json);
//       localStorage.setItem("pdfFilePath", data.pdfFilePath);
//       localStorage.setItem("xlsxFilePath", data.xlsxFilePath);
//     });
// };
//
// const generate = document.querySelector("#generate");
// generate.addEventListener("click", () => {
//   let jsonData = getCords();
//   console.log(jsonData);
//
//   const filesObj = {
//     pdfFilePath: localStorage.getItem("pdfFilePath"),
//     xlsxFilePath: localStorage.getItem("xlsxFilePath"),
//     jsonData: jsonData,
//   };
//
//   console.log(filesObj);
//
//   fetch("/generate", {
//     method: "POST",
//     body: JSON.stringify(filesObj),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(JSON.stringify(data));
//
//       const token = data["token"];
//       const archivalPath = data["archivalPath"];
//       localStorage.setItem("token", JSON.stringify(token));
//       localStorage.setItem("archivalPath", archivalPath);
//
//       $("#pend").show();
//       $("#myModal").show();
//
//       const checkStatus = function () {
//         fetch("/statuscheck", {
//           method: "POST",
//           body: JSON.stringify(data),
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
// >>>>>>> 6c4f2b10cda7f96617441f8148e9fb46e86ba860
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data["status"] == "ready") {
//               console.log(data);
//               $("#pend").hide();
//               $("#completed").show();
//               return;
//             } else if (data["status"] == "failed") {
//               console.log("failed");
//               $("#myModal").hide();
//             } else {
//               console.log("pending...");
//               setTimeout(checkStatus, 1000);
//             }
//           });
//       };
//
//       checkStatus();
//     });
// });
//
// const download = document.querySelector("#download");
//
// const closeModal = document.querySelector("#closeModal");
//
// closeModal.addEventListener("click", () => {
//   $("#myModal").hide();
//   $("#completed").hide();
// });
//
// download.addEventListener("click", () => {
// <<<<<<< HEAD
//
//     fetch(`/downloadArchival?archivalPath=${localStorage.getItem("archivalPath")}`).then(res => res.blob())
//         .then(blob => {
//             const file = window.URL.createObjectURL(blob);
//             window.location.assign(file);
//         });
// })
//
//
// showMe()
// =======
//   fetch(
//     `/downloadArchival?archivalPath=${localStorage.getItem("archivalPath")}`
//   )
//     .then((res) => res.blob())
//     .then((blob) => {
//       const file = window.URL.createObjectURL(blob);
//       window.location.assign(file);
//     })
//     .finally(() => {
//       $("#myModal").hide();
//     });
// });
// >>>>>>> 6c4f2b10cda7f96617441f8148e9fb46e86ba860

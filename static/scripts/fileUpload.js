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
            const data = JSON.parse(json);
            console.log(data);

            localStorage.setItem("pdfFilePath", data.pdfFilePath);
            localStorage.setItem("xlsxFilePath", data.xlsxFilePath);

        }).finally(() => {
        renderPdf(localStorage.getItem("pdfFilePath"));
    })
}

let pdfPath = localStorage.getItem("pdfFilePath");

if (!!pdfPath) {
    renderPdf(pdfPath);
}


// jsonData = {
//     "29458": {
//         "_id": "29458",
//         "title": "Birthyear",
//         "body": {
//             "x": 74,
//             "y": 267
//         },
//         "fontSize": "22",
//         "fontFamily": "Arial"
//     },
//     "36650": {
//         "_id": "36650",
//         "title": "Grade",
//         "body": {
//             "x": 74,
//             "y": 304
//         },
//         "fontSize": "22",
//         "fontFamily": "Verdana"
//     },
//     "43292": {
//         "_id": "43292",
//         "title": "School",
//         "body": {
//             "x": 74,
//             "y": 285
//         },
//         "fontSize": "22",
//         "fontFamily": "Tahoma"
//     },
//     "59625": {
//         "_id": "59625",
//         "title": "Name",
//         "body": {
//             "x": 253,
//             "y": 103
//         },
//         "fontSize": "22",
//         "fontFamily": "Times New Roman"
//     },
//     "76898": {
//         "_id": "76898",
//         "title": "Surname",
//         "body": {
//             "x": 352,
//             "y": 105
//         },
//         "fontSize": "33",
//         "fontFamily": "Trebuchet MS"
//     }
// }


const generate = document.querySelector("#generate")
// console.log(jsonData)
generate.addEventListener("click", () => {

    let jsonData = getCords();

    const filesObj = {
        pdfFilePath: localStorage.getItem("pdfFilePath"),
        xlsxFilePath: localStorage.getItem("xlsxFilePath"),
        jsonData: jsonData
        // jsonData: JSON.stringify(jsonData)
    }

    console.log(filesObj)

    fetch("/generate", {
        method: 'POST', // body: JSON.stringify(jsonData),
        body: JSON.stringify(filesObj), headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(json => {
            const data = JSON.parse(json)
            localStorage.setItem("archivalPath", data.archivalPath);
        })
})

const download = document.querySelector("#download")

download.addEventListener("click", () => {

    fetch(`/downloadArchival?archivalPath=${localStorage.getItem("archivalPath")}`).then(res => res.blob())
        .then(blob => {
            const file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        });
})


showMe()
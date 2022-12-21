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
            console.log("______________________________________________________________________")
            console.log(data)
            console.log("______________________________________________________________________")

            localStorage.setItem("pdfFilePath", data.pdfFilePath);
            localStorage.setItem("xlsxFilePath", data.xlsxFilePath);

        })
}

// jsonData = {
//     "33123": {
//         "_id": "33123", "title": "School", "body": {"x": 89, "y": 316}, "fontSize": "12", "fontFamily": "Arial"
//     },
//     "68236": {
//         "_id": "68236", "title": "Birthyear", "body": {"x": 91, "y": 369}, "fontSize": "12", "fontFamily": "Arial"
//     },
//     "69924": {"_id": "69924", "title": "Name", "body": {"x": 302, "y": 124}, "fontSize": "12", "fontFamily": "Arial"},
//     "84478": {
//         "_id": "84478", "title": "Surname", "body": {"x": 409, "y": 122}, "fontSize": "12", "fontFamily": "Arial"
//     },
//     "99519": {"_id": "99519", "title": "Grade", "body": {"x": 89, "y": 344}, "fontSize": "12", "fontFamily": "Arial"}
// }


const generate = document.querySelector("#generate")
// console.log(jsonData)
generate.addEventListener("click", () => {

    let jsonData = getCords();

    const filesObj = {
        pdfFilePath: localStorage.getItem("pdfFilePath"),
        xlsxFilePath: localStorage.getItem("xlsxFilePath"),
        jsonData: jsonData
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
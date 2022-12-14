const form = document.querySelector("#filesUploadForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const filesFormData = new FormData();
  const pdfFile = document.querySelector("#pdfFile");
  const xlsxFile = document.querySelector("#xlsxFile");

  filesFormData.append("file", pdfFile.files[0]);
  filesFormData.append("file", xlsxFile.files[0]);

  uploadFiles(filesFormData);
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
    });
};
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
    method: "POST", // body: JSON.stringify(jsonData),
    body: JSON.stringify(filesObj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const data = JSON.parse(json);
      localStorage.setItem("archivalPath", data.archivalPath);
    });
});

const download = document.querySelector("#download");

download.addEventListener("click", () => {
  fetch(
    `/downloadArchival?archivalPath=${localStorage.getItem("archivalPath")}`
  )
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    });
});

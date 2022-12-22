const form = document.querySelector("#filesUploadForm");
const download = document.querySelector("#download");
const closeModal = document.querySelector("#closeModal");

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
    })
    .finally(() => {
      renderPdf(localStorage.getItem("pdfFilePath"));
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
      $("#completed").hide();
    });
});

var stat = $("#status");

stat.submit(function (e) {
  e.preventDefault();

  data = new FormData();

  $.ajax({
    type: frm.attr("method"),
    url: frm.attr("action"),
    data: data,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("Uploading was successful.");
      console.log(data);
    },
    error: function (data) {
      console.log("An error occurred.");
      console.log(data);
    },
  });
});

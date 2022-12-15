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

// const process = require('process');
// const generate = require("./static/scripts/generate");
// const nano = require('nanoseconds');
// const perf_hooks = require('perf_hooks');

// console.log("____________________________________________________")
// setInterval(() => {
//     let hrTime = process.hrtime()
//     let now = new Date().getMilliseconds()
//     let ms = hrTime[0] * 1000 + hrTime[1] / 1000000
//     let ns = hrTime[0] * 1000 + hrTime[1] / 1000000 + hrTime[1] / 1000000000
//     console.log(hrTime[1] / 1000000)
//     console.log(perf_hooks.performance.now() + " console.log(perf_hooks.performance.now()console.log(perf_hooks.performance.now()console.log(perf_hooks.performance.now()")
//     console.log(new Date(Date.now()), process.hrtime((process.hrtime()), 'ns') + ' ns')
//     let test = new Date(ns)
//     console.log(test, now, "Time in millisecond is: ", ms, ns, process.hrtime())
// }, 500)
// console.log("____________________________________________________")

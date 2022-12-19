const events = require("events");

const emitter = new events.EventEmitter();

const { spawn } = require("child_process");

function generate(token, ...list) {
  console.log(token);
  const child = spawn("java", [
    "-jar",
    "static/scripts/pdf-generator.jar",
    ...list,
  ]);

  child.stdout.on("data", (data) => {
    console.log(`stdout:\n${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  let scriptOutput = "";

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", function (data) {
    console.log("stdout: " + data);
    data = data.toString();
    scriptOutput += data;
  });
  // check status request will work like this

  child.on("close", function (code) {
    if (code == 0) {
      emitter.emit("ready", token, list[0]);
    } else {
      emitter.emit("failed", token);
    }
    console.log(
      "___________________________________________________________________________________________________"
    );
    console.log("closing code: " + code);
    console.log("Full output of script: ", scriptOutput);
    console.log(
      "___________________________________________________________________________________________________"
    );
  });
  // showModal();
}

module.exports = function () {
  return {
    generate: generate,
    emitter: emitter,
  };
};

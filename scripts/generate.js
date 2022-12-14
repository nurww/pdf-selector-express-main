exports = module.exports = generate;

const { spawn } = require("child_process");
function generate(...list) {
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
    //Here is where the output goes

    console.log("stdout: " + data);

    data = data.toString();
    scriptOutput += data;
  });

  obj = {
    finished: false,
  };

  setInterval(() => {
    console.log(obj.finished);
  }, 500);

  child.on("close", function (code) {
    obj.finished = true;

    //Here you can get the exit code of the script
    console.log(
      "________________________________________________________________________________________________________________________"
    );
    console.log(
      "________________________________________________________________________________________________________________________"
    );
    console.log(
      "________________________________________________________________________________________________________________________"
    );
    console.log("closing code: " + code);

    console.log("Full output of script: ", scriptOutput);
    console.log(
      "________________________________________________________________________________________________________________________"
    );
    console.log(
      "________________________________________________________________________________________________________________________"
    );
    console.log(
      "________________________________________________________________________________________________________________________"
    );
  });
}

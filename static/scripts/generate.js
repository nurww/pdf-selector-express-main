exports = module.exports = generate;

const { spawn } = require("child_process");
function generate(...list) {
  const child = spawn("java", ["-jar", "static/scripts/pdf-generator.jar", ...list]);

  child.stdout.on("data", (data) => {
    console.log(`stdout:\n${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
}
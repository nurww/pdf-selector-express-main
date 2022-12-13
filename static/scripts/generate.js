// const { exec } = require("child_process");
// const { spawn } = require("child_process");

exports = module.exports = generate;

const { spawn } = require("child_process");
function generate(...list) {
  const child = spawn("java", ["-jar", "static/scripts/pdf-generator.jar", ...list]);
  console.log(...list)
  // const child = spawn("java", ["-jar", "static/scripts/pdf-generator.jar", "static/sample/results", "static/sample/sample.pdf", "static/sample/sample.xlsx", "static/sample/sample.json"]);

  child.stdout.on("data", (data) => {
    console.log(`stdout:\n${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
}

// function generate(a) {
//   // console.log("test " + a);
//   const jar = spawn("java", ["-jar", "static/scripts/pdf-generator.jar"]);

//   jar.stdout.on("data", (data) => {
//     console.log() `stdout: ${data}`;
//   });

//   jar.stderr.on("data", (data) => {
//     return `stderr: ${data}`;
//   });

//   jar.on("error", (error) => {
//     return `error: ${error.message}`;
//   });

//   jar.on("close", (code) => {
//     return `child process exited with code ${code}`;
//   });
// }
// generate();

// function generate() {
//   exec(
//     "java -jar static/scripts/pdf-generator.jar",
//     (error, stdout, stderr) => {
//       if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//     }
//   );
// }

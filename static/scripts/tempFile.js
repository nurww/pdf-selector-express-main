const fs = require("fs");
const {stdout} = require("nodemon/lib/config/defaults");

exports = module.exports = useTemp;

function useTemp() {
  const getWorkingPath = () => fs.mkdtempSync("static/temp-");

  const removeWorkingPath = (path) => fs.rmSync(path, { recursive: true });

  return getWorkingPath();


  // setTimeout(() => {
  //   removeWorkingPath(workingPath)
  // }, 2000)
}

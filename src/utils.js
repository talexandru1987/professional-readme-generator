const path = require("path");
const fs = require("fs");

//this function will read the data from a file
const readFromFile = (filePath) => {
  // build the absolute file path
  const file = path.join(__dirname, filePath);

  console.log(file);

  // check if file exists
  const fileExists = fs.existsSync(file);

  if (fileExists) {
    // get the data from the file in to JS
    const data = fs.readFileSync(file, { encoding: "utf8" });

    return data;
  } else {
    console.error("File does not exist");
  }
};

//this function will write data to a file
const writeToFile = (filePath, payload) => {
  // write data to file
  fs.writeFileSync(filePath, payload);
};

// export task here
module.exports = {
  readFromFile,
  writeToFile,
};

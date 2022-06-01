// 1. import inquirer
const inquirer = require("inquirer");

// import utils module
const utils = require("./utils");

// 2. declare your questions array
const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "Please enter the project title:",
  },
  {
    type: "input",
    name: "projectDescription",
    message: "Please enter a project description:",
  },
  {
    type: "confirm",
    name: "confirmInstall",
    message: "Do you need installation details:",
  },
  {
    when: "confirmInstall",
    type: "input",
    name: "installDetails",
    message: "Please enter installation details:",
  },
  {
    type: "input",
    name: "usageDetails",
    message: "Please enter the usage details:",
  },
  {
    type: "input",
    name: "licenseDetails",
    message: "Please enter the license details:",
  },
  {
    type: "input",
    name: "contributingDetails",
    message: "Please enter the contributing details:",
  },
  {
    type: "confirm",
    name: "confirmTest",
    message: "Do you need test details:",
  },
  {
    when: "confirmTest",
    type: "input",
    name: "testDetails",
    message: "Please enter test details:",
  },
  {
    type: "confirm",
    name: "confirmQuestions",
    message: "Do you need a questions section:",
  },
  {
    when: "confirmQuestions",
    type: "input",
    name: "questionsDetails",
    message: "Please enter the questions details:",
  },
];

// 3. declare your init function to ask questions
const init = async () => {
  // get answers for first set of questions
  const answers = await inquirer.prompt(questions);

  // display answers
  console.log(answers);

  const readmeContent = `# Project Title ![MIT](https://img.shields.io/badge/MIT-License-green)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Installation

Please follow the instructions below:

\`\`\`
npm install
\`\`\`

## Usage

Please follow the instructions below:

\`\`\`
npm run start
\`\`\`

## License

MIT License

## Contributing

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

## Tests

Please follow the instructions below:

\`\`\`
npm run test
\`\`\`

## Questions

Please contact me on my email: myemail@email.com

Visit my GitHub profile [here](https://github.com/surajverma2587)`;

  utils.writeToFile("./README.md", readmeContent);
};

// 4. start your application
init();

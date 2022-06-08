// 1. import inquirer
const inquirer = require("inquirer");

// import utils module
const utils = require("./utils");

// 2. declare your questions array
const questions = [
  {
    type: "input",
    name: "username",
    message: "Please enter the you're GitHub username:",
    validate(answer) {
      if (!answer) {
        return "Please, fill your username!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "projectTitle",
    message(answers) {
      return `Hi ${answers.username}.Please enter you're project title:`;
    },
    validate(answer) {
      if (!answer) {
        return "Please, enter a project title!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email address:",
    validate(answer) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(answer)) {
        return "You have to provide a valid email address!";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "projectBadge",
    message(answers) {
      return `Please choose a license badge for project ${answers.projectTitle}:`;
    },
    choices: ["GPLv3", "GPLv2", "Apache", "BSD", "MIT"],
    validate(answer) {
      if (!answer) {
        return "Please, choose a license badge!";
      }
      return true;
    },
  },
  {
    type: "editor",
    name: "projectDescription",
    message(answers) {
      return `Please enter a description for the project ${answers.projectTitle}!`;
    },
    validate(answer) {
      if (!answer) {
        return `The description of project "${answers.projectTitle}" cannot be blank!`;
      }
      return true;
    },
  },
  {
    type: "confirm",
    name: "confirmInstall",
    message: "Do you need installation details:",
    default: false,
  },
  {
    type: "input",
    name: "installDetails",
    message: "Please enter installation details:",
    when(answers) {
      return answers.confirmInstall;
    },
  },
  {
    type: "input",
    name: "usageDetails",
    message: "Please enter the usage details:",
    validate(answer) {
      if (!answer) {
        return "Usage details cannot be blank!";
      }
      return true;
    },
  },
  {
    type: "editor",
    name: "licenseDetails",
    message: "Please enter the license details:",
    validate(answer) {
      if (!answer) {
        return "License details cannot be blank!";
      }
      return true;
    },
  },
  {
    type: "editor",
    name: "contributingDetails",
    message: "Please enter the contributing details:",
    validate(answer) {
      if (!answer) {
        return "Contributing details cannot be blank!";
      }
      return true;
    },
  },
  {
    type: "confirm",
    name: "confirmTest",
    message: "Do you need test details:",
    default: false,
  },
  {
    type: "input",
    name: "testDetails",
    message: "Please enter test details:",
    when(answers) {
      return answers.confirmTest;
    },
  },
  {
    type: "confirm",
    name: "confirmQuestions",
    message: "Do you need a questions section:",
    default: false,
  },
  {
    type: "input",
    name: "questionsDetails",
    message: "Please enter the questions details:",
  },
];

//questions used in the loop
const createQuestion = (question) => {
  return [
    {
      type: "confirm",
      name: "questionConfirm",
      message: `${question}`,
      default: false,
    },
    {
      type: "input",
      name: "answerValue",
      message: "Please enter the details:",
      validate(answer) {
        if (!answer) {
          return "Details cannot be blank!";
        }
        return true;
      },
      when(answers) {
        return answers.questionConfirm;
      },
    },
  ];
};

// 3. declare your init function to ask questions
const init = async () => {
  //array that will contain all the test details values
  let testDetails = [];
  //variable used to exit the while loop
  let exitLoop = true;
  // get answers for first set of questions
  const answers = await inquirer.prompt(questions);
  //create the test section
  let testDetailsString = "";

  while (exitLoop) {
    let testAnswers = await inquirer.prompt(createQuestion("Do you need extra test details?"));
    //change the exit variable
    exitLoop = testAnswers.questionConfirm;
    //if not empty push answer to array
    if (testAnswers.answerValue) {
      testDetails.push(testAnswers.answerValue);
    }
  }

  //if not blank
  if (answers.testDetails) {
    //push first test section answers to the array
    testDetails.push(answers.testDetails);
    //iterate through the array
    testDetails.map((testDetail) => {
      testDetailsString = testDetailsString + testDetail + "\n";
    });
  }

  const readmeContent = `# ${answers.projectTitle} ![${
    answers.projectBadge
  }](https://img.shields.io/badge/${answers.projectBadge}-License-green)

## Table of Contents

- [Description](#description)
${answers.installDetails ? "- [Installation](#installation)" : ""}
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
${testDetails.length > 0 ? "- [Tests](#tests)" : ""}
${answers.questionsDetails ? "- [Questions](#questions)" : ""}


## Description

${answers.projectDescription}


${
  answers.installDetails
    ? `## Installation

Please follow the instructions below:

\`\`\`
${answers.installDetails}
\`\`\``
    : ""
}


## Usage

Please follow the instructions below:

\`\`\`
${answers.usageDetails}
\`\`\`

## License

${answers.projectBadge} License

${answers.licenseDetails}


## Contributing

${answers.contributingDetails}


${
  testDetails.length > 0
    ? `## Tests

Please follow the instructions below:

\`\`\`
${testDetailsString}
\`\`\``
    : ""
}


${
  answers.installDetails
    ? `## Questions

${answers.questionsDetails}

Please contact me on my email: ${answers.email}

Visit my GitHub profile [here](https://github.com/${answers.username})`
    : ""
}`;

  utils.writeToFile("./README.md", readmeContent);
};

// 4. start your application
init();

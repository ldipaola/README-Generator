const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {

  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Project title:"
    },
    {
      type: "input",
      name: "description",
      message: "Description:"
    },
    {
      type: "input",
      name: "installation",
      message: "How to install:"
    },
    {
      type: "input",
      name: "usage",
      message: "Usage:"
    },
    {
      type: "list",
      name: "license",
      message: "How to install:",
      choices: ["MIT", "Apache", "GPL"]
    },
    {
      type: "input",
      name: "contributing",
      message: "Contributing:"
    },
    {
      type: "input",
      name: "tests",
      message: "Tests:"
    },
    {
      type: "input",
      name: "github",
      message: "Git Hub Account:"
    },
    {
      type: "input",
      name: "email",
      message: "Email:"
    }
  ]);
}

function generateMD(answers) {
  return `
  # Title
  ${answers.title}

  ## Description
  ${answers.description}

  ##### Table of Contents  
  [Installation](#Installation)  
  [Usage](#Usage)  
  [License](#License)  
  [Contributing](#Contributing)  
  [Tests](#Tests)  
  [Questions](#Questions)  
   



  ## Installation
  ${answers.installation}

  ## Usage
  ${answers.usage}

  ## License
  ${answers.license}

  ## Contributing
  ${answers.contributing}

  ## Tests
  ${answers.tests}

  ## Questions
  ${answers.github}
  ${answers.email}
`;
}

promptUser()
  .then(function(answers) {
    const readme = generateMD(answers);

    return writeFileAsync("test.MD", readme);
  })
  .then(function() {
    console.log("Successfully wrote file");
  })
  .catch(function(err) {
    console.log(err);
  });


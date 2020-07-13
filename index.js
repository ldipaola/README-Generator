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
      message: "License:",
      choices: ["MIT", "Apache-2.0", "GPL-3.0", "BSD-2-Clause", "BSD-3-Clause"]
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
    let license = ""
  if (answers.license === "MIT" ) {
        license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
  } else if (answers.license === "Apache-2.0"){
         license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
  } else if (answers.license === "GPL-3.0") {
    license = "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)"
  } else if (answers.license === "BSD-2-Clause") {
    license = "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)"
  } else if (answers.license === "BSD-3-Clause") {
    license = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
  } 
  return `
  # Title
  ${answers.title}

  ## Description
  ${answers.description}

  ${license}

  ## Table of Contents  
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
  Github: ${answers.github}
  Email: ${answers.email}
`;
}

promptUser()
  .then(function(answers) {
    const readme = generateMD(answers);

    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log("Successfully wrote file");
  })
  .catch(function(err) {
    console.log(err);
  });


var inquirer = require('inquirer');

var Grid = require('./src/grid.js');
var Robot = require('./src/robot.js');

inquirer.prompt([
    {
        type: 'input',
        name: 'grid',
        message: 'Enter Grid size (ex. "5 5"):',
        validate: function(value) {
            if (value.match(/^(\d+) (\d+)$/))
                return true;
            else
                return 'Invalid input';
        },
        filter: function(value) {
            return value.split(' ').map(function(value) { return parseInt(value, 10); });
        }
    }
], function(answers) {

    var grid = new Grid(answers.grid[0], answers.grid[1]);

    function askForRobot() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'start',
                message: 'Enter start location and facing direction (ex. "1 1 N"):',
                validate: function(value) {
                    if (value.match(/^(\d+) (\d+) (N|W|E|S)$/i))
                        return true;
                    else
                        return 'Invalid input';
                },
                filter: function(value) { return value.toUpperCase(); }
            },
            {
                type: 'input',
                name: 'instructions',
                message: 'Enter robot instructions:',
                filter: function(value) { return value.toUpperCase(); }
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Do you want to add another robot?',
                default: true
            }
        ], function(answers) {

            var robot = new Robot(answers.start.split(' ')[0], answers.start.split(' ')[1], answers.start.split(' ')[2]);
            var result = grid.passInstructions(robot, answers.instructions);

            console.log(result);

            if (answers.askAgain) {
                askForRobot();
            }
        });
    }

    askForRobot();
});
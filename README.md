
# Toy Robot Simulator
## Setup and Running the app
- run `npm i` to install the dependencies
- run `npm run start` to start up the app
- run `npm run test:silent` to execute the unit tests

## Example Commands

Please refer to *test_commands.txt* for test commands to move the robot around the table and back to the start

### Valid Facing Values
- NORTH
- EAST
- SOUTH
- WEST

### Placing and moving the robot
- `PLACE 0,0,NORTH`
- `MOVE`
- `REPORT`
- *Output: 0,1,NORTH*

### Placing and rotating the robot
- `PLACE 0,0,NORTH`
- `LEFT`
- `REPORT`
- *Output: 0,0,WEST*
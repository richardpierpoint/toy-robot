export const printMessage = () => {
    console.log('Robot Simulator');
    console.log('===============');
    console.log('The following commands are supported: \n\n');
    console.log('- PLACE x,y,f\nPlaces the robot at the given coordinates and facing the given direction. eg: PLACE 1,3,NORTH\nThis command needs to be executed first\n');
    console.log('- LEFT\nRotates the robot to left\n');
    console.log('- RIGHT\nRotates the robot to right\n');
    console.log('- MOVE\nMoves the robot one place in the direction it is facing\n');
    console.log('- REPORT\nReports the robots current position\n');
}
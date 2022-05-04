
import { ErrorEnum } from "./models/ErrorEnum";
import { CommandEnum } from "./models/CommandEnum";
import { CompassEnum } from "./models/CompassEnum";
import { Axis } from "./models/types";
import { getFacing, getFormattedPosition, isValidFacing, isValidRange, validFacings } from "./util";

export default class Controller {
    public currCoordinates: Map<Axis, number>;
    public facingIndex: number;

    execute = (command: string, position: string = null) => {
        try {
            if (command !== CommandEnum.PLACE && this.currCoordinates === undefined) {
                throw new Error(ErrorEnum.NOT_ON_TABLE);
            }
            switch (command) {
                case CommandEnum.PLACE:
                    this.handlePlace(position);
                    break;
                case CommandEnum.LEFT:
                    this.handleLeft();
                    break;
                case CommandEnum.RIGHT:
                    this.handleRight();
                    break;
                case CommandEnum.MOVE:
                    this.handleMove();
                    break;
                case CommandEnum.REPORT:
                    console.log(getFormattedPosition(this.currCoordinates, this.facingIndex));
                    break;
                default:
                    console.warn('Command not supported.');
                    break;
            }
        }
        catch (e: any) {
            this.handleError(e.message);
        }
    }

    /**
     * Initialises the currCoordinates and facingIndex
     * @param position 
     */
    handlePlace = (position: string) => {
        if (position === null) {
            throw new Error(ErrorEnum.INVALID_PLACE);
        }
        const [xAxisString, yAxisString, facing] = position.split(',');
        const xAxis = parseInt(xAxisString);
        const yAxis = parseInt(yAxisString);
        if (isValidRange(xAxis) && isValidRange(yAxis) && isValidFacing(facing)) {
            this.currCoordinates = new Map<Axis, number>();
            this.currCoordinates.set("xAxis", xAxis);
            this.currCoordinates.set("yAxis", yAxis);
            this.facingIndex = validFacings.indexOf(facing);
        } else {
            throw new Error(ErrorEnum.INVALID_POSITION);
        }
    }

    /**
     * Rotates the robot left
     */
    handleLeft = () => {
        this.facingIndex--;
        if (this.facingIndex < 0) {
            this.facingIndex = validFacings.length - 1;
        }
    }

    /**
     * Rotates the robot right
     */
    handleRight = () => {
        this.facingIndex++;
        if (this.facingIndex > validFacings.length - 1) {
            this.facingIndex = 0;
        }
    }

    /**
     * Updates the currCoordinates with the movement of 1 unit based on the facing.
     */
    handleMove = () => {
        let newX = this.currCoordinates.get("xAxis");
        let newY = this.currCoordinates.get("yAxis");
        const facing = getFacing(this.facingIndex)
        switch (facing) {
            case CompassEnum.EAST:
                newX++;
                break;
            case CompassEnum.WEST:
                newX--;
                break;
            case CompassEnum.NORTH:
                newY++;
                break;
            case CompassEnum.SOUTH:
                newY--;
                break;
            default:
                break;
        }
        if (isValidRange(newX) && isValidRange(newY)) {
            this.currCoordinates.set("xAxis", newX);
            this.currCoordinates.set("yAxis", newY);
        } else {
            throw new Error(ErrorEnum.INVALID_MOVE);
        }
    }

    /**
     * Handles the error types defined within the app
     * @param message 
     */
    handleError = (message: ErrorEnum): void => {
        switch (message) {
            case ErrorEnum.NOT_ON_TABLE:
                console.warn('Use the "PLACE x,y,f" command to place the robot first.');
                break;
            case ErrorEnum.INVALID_PLACE:
                console.warn('The PLACE command is malformed. Use template "PLACE x,y,f" command to place the robot.');
                break;
            case ErrorEnum.INVALID_POSITION:
                console.warn('The placement is out of bounds of the table or has an invalid facing.');
                break;
            case ErrorEnum.INVALID_MOVE:
                console.warn('The current move will force the robot off the table.');
                break;
            default:
                console.error(`Oh No: ${message}`);
                break;
        }
    }
}
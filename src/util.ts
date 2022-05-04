import { Axis } from "./models/types";

export const validFacings: string[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

/**
 * Determines if the passed value falls within the valid range of the table
 * @param value
 * @returns boolean
 */
export const isValidRange = (value: number): boolean => {
    // TODO: expose this value range to be something that can be passed in or defined more globally
    if (value < 0 || value > 4) {
        return false;
    }
    return true;
}

/**
 * Determines if the passed facing value falls within the valid facing range
 * @param value 
 * @returns boolean
 */
export const isValidFacing = (value: string): boolean => {
    if (validFacings.indexOf(value) > -1) {
        return true;
    }
    return false;
}

/**
 * Gets the facing value based on the index
 * @param index 
 * @returns string
 */
export const getFacing = (index: number): string => {
    return validFacings[index];
}

/**
 * Formats the coordinates and facing into a string that can be output
 * @param coordinates 
 * @param facingIndex 
 * @returns formatted string of coordinates and facing
 */
export const getFormattedPosition = (coordinates: Map<Axis, number>, facingIndex: number): string => {
    const xAxis = coordinates.get("xAxis");
    const yAxis = coordinates.get("yAxis");
    const facing = getFacing(facingIndex);
    if (xAxis !== undefined && yAxis !== undefined && facing !== undefined) {
        return `${xAxis},${yAxis},${facing}`;
    }
    return 'invalid';
}
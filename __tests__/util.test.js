import { isValidRange, isValidFacing, getFormattedPosition } from '../src/util'

describe('util tests', () => {
    const validFacings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    describe('isValidRange', () => {
        it('The range is valid and falls between 0 and 4', () => {
            for (let i = 0; i < 5; i++) {
                const result = isValidRange(i);
                expect(result).toBeTruthy();
            }
        })
        it('The range is out of bounds and is not valid', () => {
            const lowerResult = isValidRange(-1);
            expect(lowerResult).toBeFalsy();
            const higherResult = isValidRange(5);
            expect(higherResult).toBeFalsy();
        })
    })
    describe('isValidFacing', () => {
        it('The facing is valid and is one of NORTH, EAST, SOUTH, WEST', () => {

            for (let i = 0; i < validFacings.length; i++) {
                const result = isValidFacing(validFacings[i]);
                expect(result).toBeTruthy();
            }
        })
        it('The facing is not valid', () => {
            const result = isValidFacing('X');
            expect(result).toBeFalsy();
        })
    })
    describe('getFacing', () => {
        it('The facing is valid and is one of N, E, S, W', () => {
            for (let i = 0; i < validFacings.length; i++) {
                const result = isValidFacing(validFacings[i]);
                expect(result).toBeTruthy();
            }
        })
        it('The facing is not valid', () => {
            const result = isValidFacing('X');
            expect(result).toBeFalsy();
        })
    })
    describe('getFormattedPosition', () => {
        it('Gets the full name of the facing', () => {
            const coordinates = new Map();
            coordinates.set('xAxis', 2);
            coordinates.set('yAxis', 3);
            const result = getFormattedPosition(coordinates, 1);
            expect(result).toBe('2,3,EAST');
        })
        it('returns "invalid" if params are incorrect', () => {
            const coordinates = new Map();
            const result = getFormattedPosition(coordinates, 1);
            expect(result).toBe('invalid');
        })
    })
})
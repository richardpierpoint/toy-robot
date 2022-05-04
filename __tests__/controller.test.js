import Controller from '../src/controller'

describe('controller tests', () => {
    describe('handlePlace', () => {
        it('Places the robot at the given coordinates and facing', () => {
            const controller = new Controller();
            controller.handlePlace('1,2,NORTH');
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(xAxis).toBe(1);
            expect(yAxis).toBe(2);
            expect(controller.facingIndex).toBe(0);
        });
        it('Throws INVALID_POSITION if values are not valid', () => {
            const controller = new Controller();

            expect(() => {
                controller.handlePlace('6,2,NORTH');
            }).toThrow('INVALID_POSITION');
            expect(() => {
                controller.handlePlace('1,6,NORTH');
            }).toThrow('INVALID_POSITION');
            expect(() => {
                controller.handlePlace('1,2,X');
            }).toThrow('INVALID_POSITION');
        });
    });
    describe('handleLeft', () => {
        it('Works down the facing index to determine the facing', () => {
            const controller = new Controller();
            controller.facingIndex = 1;
            controller.handleLeft();
            expect(controller.facingIndex).toBe(0);
        });
        it('Goes to last index if the bottom of the index is reached', () => {
            const controller = new Controller();
            controller.facingIndex = 0;
            controller.handleLeft();
            expect(controller.facingIndex).toBe(3);
        });
    });
    describe('handleRight', () => {
        it('Works up the facing index to determine the facing', () => {
            const controller = new Controller();
            controller.facingIndex = 1;
            controller.handleRight();
            expect(controller.facingIndex).toBe(2);
        });
        it('Goes to last index if the bottom of the index is reached', () => {
            const controller = new Controller();
            controller.facingIndex = 3;
            controller.handleRight();
            expect(controller.facingIndex).toBe(0);
        });
    });
    describe('handleMove', () => {
        it('Moves the robot 1 unit up on yAxis', () => {
            const controller = new Controller();
            controller.facingIndex = 0; // North
            controller.currCoordinates = new Map();
            controller.currCoordinates.set('xAxis', 0);
            controller.currCoordinates.set('yAxis', 0);
            controller.handleMove();
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(xAxis).toBe(0);
            expect(yAxis).toBe(1);
            expect(controller.facingIndex).toBe(0);
        });
        it('Moves the robot 1 unit down on yAxis', () => {
            const controller = new Controller();
            controller.facingIndex = 2; // South
            controller.currCoordinates = new Map();
            controller.currCoordinates.set('xAxis', 2);
            controller.currCoordinates.set('yAxis', 2);
            controller.handleMove();
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(xAxis).toBe(2);
            expect(yAxis).toBe(1);
            expect(controller.facingIndex).toBe(2);
        });
        it('Moves the robot 1 unit down on xAxis', () => {
            const controller = new Controller();
            controller.facingIndex = 1; // East
            controller.currCoordinates = new Map();
            controller.currCoordinates.set('xAxis', 2);
            controller.currCoordinates.set('yAxis', 2);
            controller.handleMove();
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(xAxis).toBe(3);
            expect(yAxis).toBe(2);
            expect(controller.facingIndex).toBe(1);
        });
        it('Moves the robot 1 unit up on xAxis', () => {
            const controller = new Controller();
            controller.facingIndex = 3; // West
            controller.currCoordinates = new Map();
            controller.currCoordinates.set('xAxis', 2);
            controller.currCoordinates.set('yAxis', 2);
            controller.handleMove();
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(xAxis).toBe(1);
            expect(yAxis).toBe(2);
            expect(controller.facingIndex).toBe(3);
        });
        it('Out of bounds moves throw error', () => {
            const controller = new Controller();
            controller.currCoordinates = new Map();
            controller.currCoordinates.set('xAxis', 0);
            controller.currCoordinates.set('yAxis', 0);
            expect(() => {
                controller.facingIndex = 2; // South
                controller.handleMove();
            }).toThrow('INVALID_MOVE');

            expect(() => {
                controller.facingIndex = 3; // WEST
                controller.handleMove();
            }).toThrow('INVALID_MOVE');

            controller.currCoordinates.set('xAxis', 4);
            controller.currCoordinates.set('yAxis', 4);
            expect(() => {
                controller.facingIndex = 0; // North
                controller.handleMove();
            }).toThrow('INVALID_MOVE');

            expect(() => {
                controller.facingIndex = 1; // East
                controller.handleMove();
            }).toThrow('INVALID_MOVE');
        });
    });
    describe('execute', () => {
        it('Throws error if place command is not first', () => {
            const controller = new Controller();
            const message = 'Use the "PLACE x,y,f" command to place the robot first.';
            const warnSpy = jest.spyOn(console, 'warn');
            controller.execute('LEFT');
            expect(warnSpy).toHaveBeenCalledWith(message);
            warnSpy.mockReset();
            controller.execute('RIGHT');
            expect(warnSpy).toHaveBeenCalledWith(message);
            warnSpy.mockReset();
            controller.execute('REPORT');
            expect(warnSpy).toHaveBeenCalledWith(message);
            warnSpy.mockReset();
            controller.execute('MOVE');
            expect(warnSpy).toHaveBeenCalledWith(message);
            warnSpy.mockReset();
        });
        it('PLACE command', () => {
            const controller = new Controller();
            controller.execute('PLACE', '0,0,NORTH');
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(controller.facingIndex).toBe(0);
            expect(xAxis).toBe(0);
            expect(yAxis).toBe(0);
        });
        it('multiple PLACE command', () => {
            const controller = new Controller();
            controller.execute('PLACE', '0,0,NORTH');
            let xAxis = controller.currCoordinates.get('xAxis');
            let yAxis = controller.currCoordinates.get('yAxis');
            expect(controller.facingIndex).toBe(0);
            expect(xAxis).toBe(0);
            expect(yAxis).toBe(0);

            controller.execute('PLACE', '3,3,SOUTH');
            xAxis = controller.currCoordinates.get('xAxis');
            yAxis = controller.currCoordinates.get('yAxis');
            expect(controller.facingIndex).toBe(2);
            expect(xAxis).toBe(3);
            expect(yAxis).toBe(3);
        });
        it('LEFT command', () => {
            const controller = new Controller();
            controller.execute('PLACE', '0,0,NORTH');
            controller.execute('LEFT');
            expect(controller.facingIndex).toBe(3);
        });
        it('MOVE command', () => {
            const controller = new Controller();
            controller.execute('PLACE', '0,0,NORTH');
            controller.execute('MOVE');
            const xAxis = controller.currCoordinates.get('xAxis');
            const yAxis = controller.currCoordinates.get('yAxis');
            expect(controller.facingIndex).toBe(0);
            expect(xAxis).toBe(0);
            expect(yAxis).toBe(1);
        });
        it('REPORT command', () => {
            const controller = new Controller();
            controller.execute('PLACE', '0,0,NORTH');
            const logSpy = jest.spyOn(console, 'log');
            controller.execute('MOVE');
            controller.execute('REPORT');
            expect(logSpy).toHaveBeenCalledWith('0,1,NORTH');
            logSpy.mockReset();
        });
    });
});
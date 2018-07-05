import * as helperFunctions from './helperFunctions';

describe('Helper functions', () => {

    const apps = [{
        id: 'this is a hash',
        name: 'app 1',
    },
    {
        id: 'this is another hash',
        name: 'app 2'
    }, {
        id: 'this is a third hash',
        name: 'app 3'
    }];
    const appObj = {
        0: {
            id: 'this is a hash',
            name: 'app 1',
        },
        1: {
            id: 'this is another hash',
            name: 'app 2'
        }, 2: {
            id: 'this is a third hash',
            name: 'app 3'
        }
    };


    describe('getAppsById Funtion', () => {
        it('Should return apps with the right hashes from an array', () => {
            expect(helperFunctions
                .getAppsById(
                    ['this is a hash', 'this is another hash'], apps))
                .toEqual({
                    0: {
                        id: 'this is a hash',
                        name: 'app 1',
                    },
                    1: {
                        id: 'this is another hash',
                        name: 'app 2'
                    },
                });
        });

        it('Should return apps with the right hashes from an object', () => {
            expect(helperFunctions
                .getAppsById(
                    ['this is a hash', 'this is another hash'], appObj))
                .toEqual({
                    0: {
                        id: 'this is a hash',
                        name: 'app 1',
                    },
                    1: {
                        id: 'this is another hash',
                        name: 'app 2'
                    },
                });
        });

        it('should throw an error if passed incorrect inputs', () => {
            expect(() => helperFunctions.getAppsById({}, apps)).toThrowError(Error);
        });
        it('should throw an error if missing inputs', () => {
            expect(() =>helperFunctions.getAppsById([])).toThrowError(Error);
        });
        it('should throw an error given extra inputs', () => {
            expect(() => helperFunctions.getAppsById([], apps, {})).toThrowError(Error);
        });
        it('should return an empty object if no apps have id', () => {
            expect(helperFunctions.getAppsById([1], apps)).toEqual({});
        });
    });

    describe('Filter function', () => {
        it('should throw an error if arguments are null', () => {
            expect(() => helperFunctions.filter(null, null)).toThrowError(Error);
        });
        it('should throw an error if predicate is not a function', () => {
            expect(() => helperFunctions.filter(null, null)).toThrowError(Error);
        });
        it('should return no outputs for a true predicate', () => {
            expect(helperFunctions.filter(apps, () => true)).toEqual({});
        });
        it('should return all objects for a false predicate', () => {
            expect(() => helperFunctions.filter(appObj, () => false)).not.toEqual({});
        });
    });

    describe('toAppUrl function', () => {
        it('should accept string inputs', () => {
            expect(() => helperFunctions.toAppUrl("https://www.google.com")).not.toThrowError(Error);
        });
        it('shouldn\'t accept non string inputs', () => {
            expect(() => helperFunctions.toAppUrl(3)).toThrowError();
            expect(() => helperFunctions.toAppUrl({url: 'this not a url'})).toThrowError(Error);
        });
        it('should throw an error on null string inputs', () => {
            expect(() => helperFunctions.toAppUrl(null)).toThrowError(Error);
        });
    });

});
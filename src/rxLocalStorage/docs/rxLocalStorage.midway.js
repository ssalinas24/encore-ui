var rxLocalStorage = encore.rxLocalStorage;

describe('rxLocalStorage', function () {

    before(function () {
        demoPage.go('#/components/rxLocalStorage');
    });

    it('should set and return a string', function () {
        var aString = 'hello world';

        rxLocalStorage.setItem('aString', aString);
        expect(rxLocalStorage.getItem('aString')).to.eventually.equal(aString);
    });

    it('should set and return an int', function () {
        var anInt = 42;

        rxLocalStorage.setItem('anInt', anInt);
        expect(rxLocalStorage.getItem('anInt')).to.eventually.equal(anInt);
    });

    it('should set and return a float', function () {
        var aFloat = 42.0000002;

        rxLocalStorage.setItem('aFloat', aFloat);
        expect(rxLocalStorage.getItem('aFloat')).to.eventually.equal(aFloat);
    });

    it('should set and return an array', function () {
        var anArray = [1, 'cat', 3];

        rxLocalStorage.setItem('anArray', anArray);
        expect(rxLocalStorage.getItem('anArray')).to.eventually.deep.equal(anArray);
    });

    it('should set and return an object', function () {
        var anObject = {
            'foo': 'bar',
            'life': 42
        };

        rxLocalStorage.setItem('anObject', anObject);
        expect(rxLocalStorage.getItem('anObject')).to.eventually.deep.equal(anObject);
    });

    it('should set and return an array of objects', function () {
        var anArrayOfObjects = [
            {
                'foo': {
                    'bar': 1,
                    'baz': 2
                }
            },
            {
                'fizz': {
                    'buzz': 'fizzbuzz'
                }
            }
        ];

        rxLocalStorage.setItem('anArrayOfObjects', anArrayOfObjects);
        expect(rxLocalStorage.getItem('anArrayOfObjects')).to.eventually.deep.equal(anArrayOfObjects);
    });

    it('should remove something that has been set', function () {
        rxLocalStorage.setItem('something', 42);
        rxLocalStorage.removeItem('something');
        expect(rxLocalStorage.exists('something')).to.eventually.be.false;
    });

    it('should return true if key exists', function () {
        rxLocalStorage.setItem('cortana', 123);
        expect(rxLocalStorage.exists('cortana')).to.eventually.be.true;
    });

    it('should return false if a key does not exist', function () {
        expect(rxLocalStorage.exists('masterChief')).to.eventually.be.false;
    });

});

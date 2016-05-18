var _ = require('lodash');

// replace this with _.repeat if/when lodash is upgraded to 3.0+
var repeat = function (character, times) {
    return _.times(times, _.constant(character)).join('');
};

module.exports = function (grunt) {
    grunt.registerTask('squirrel', 'Logs a shipit squirrel', function () {
        // uniform bubble sizes, regardless of version number
        var shipIt = grunt.template.process('| Ship it! v<%= pkg.version %>  |');
        var topBubble = repeat('_', shipIt.length - 5);
        var topAir = ['/', repeat(' ', shipIt.length - 3), '\\'].join('');
        var bottomBubble = [repeat('_', shipIt.length - 3), '/'].join('');

        var squirrels = [
            ['         _-------_        ' + topBubble,
             '       .\'  ..::. `\\     ' + topAir,
             '      /  .::\' `\'` /     ' + shipIt,
             '     / .::\' .--.=;     / ' + bottomBubble,
             '     | ::\' /  C ..\\   / /',
             '     | :: |   \\  _.) <_/',
             '      \\ \':|   /  \\',
             '       \'-, \\./ \\)\\)',
             '          `-|   );/',
             '             \'--\'-\'\''],
            ['                     ^',
             '         _-------_  /T\\      ' + topBubble,
             '       .\'  ..::. `\\ |||    ' + topAir,
             '      /  .::\' `\'` / |||    ' + shipIt,
             '     / .::\' .--.=;  |||   / ' + bottomBubble,
             '     | ::\' /  C ..\\ |||  / /',
             '     | :: |   \\  _.)||| <_/',
             '      \\ \':|   /  \\  |||',
             '       \'-, \\./ \\)\\_0===0',
             '          `-|   );/  |',
             '             \'--\'-\'\' U']
        ];

        var squirrel = grunt.template.process(_.sample(squirrels).join('\n'));
        console.log(squirrel);
    });
};

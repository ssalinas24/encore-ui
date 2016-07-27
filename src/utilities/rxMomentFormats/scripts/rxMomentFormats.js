angular.module('encore.ui.utilities')
.value('rxMomentFormats', {
    date: {
        long: 'MMMM D, YYYY',
        short: 'YYYY-MM-DD'
    },
    time: {
        long: 'h:mmA (UTCZ)',
        short: 'HH:mmZ'
    },
    dateTime: {
        long: 'MMM D, YYYY @ h:mmA (UTCZ)',
        short: 'YYYY-MM-DD @ HH:mmZ'
    },
    month: {
        long: 'MMMM YYYY',
        short: 'MM / YYYY',
        micro: 'MM / YY'
    }
});

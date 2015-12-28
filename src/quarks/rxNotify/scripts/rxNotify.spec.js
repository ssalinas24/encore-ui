/* jshint node: true */
describe('rxNotify', function () {
    var scope, rootScope, notifySvc, interval;
    var messageText1 = 'My Message 1';
    var messageText2 = 'My Message 2';
    var defaultStack = 'page';
    var otherStack = 'other';

    beforeEach(function () {
        module('encore.ui.quarks');

        inject(function ($rootScope, $interval, rxNotify) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            notifySvc = rxNotify;
            interval = $interval;
        });
    });

    describe('service: rxNotify', function () {
        it('should add to default stack', function () {
            // create message w/o an options
            notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
        });

        it('should not add message if `text` is empty', function () {
            // create message w/o text
            notifySvc.add('');

            // validate message not added
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // test that if someone really wants an empty message, they can get it
            // create message w/ a single space
            notifySvc.add(' ');

            // validate message added
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
        });

        it ('should not add message if `repeat` is false and message already in stack', function () {
            //create message w text
            notifySvc.add(messageText1, { repeat: false });

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // create another message w same text
            notifySvc.add(messageText1, { repeat: false });

            // expect stack to only have one message
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
        });

        it ('should treat messages with same text and different types as different', function () {
            //create message w text
            notifySvc.add(messageText1, { repeat: false, type: 'error' });

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // create another message w same text
            notifySvc.add(messageText1, { repeat: false });

            // expect stack to only have one message
            expect(notifySvc.stacks[defaultStack].length).to.equal(2);
        });

        it('should add unique id to message and return it on add', function () {
            // create message
            var msg = notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].id).to.eql(msg.id);
        });

        it('should allow type specification', function () {
            var defaultType = 'info';

            // create message with no type
            notifySvc.add(messageText1);

            // validate message in stack of default type
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][0].type).to.equal(defaultType);

            // create message with different type
            var messageType = 'warning';
            notifySvc.add(messageText2, {
                type: messageType
            });

            // validate message in stack of type
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);
            expect(notifySvc.stacks[defaultStack][1].type).to.equal(messageType);
        });

        it('should add to new stack', function () {
            // create message w/specified stack
            notifySvc.add(messageText1, {
                stack: otherStack
            });

            // validate message in new stack
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText1);

            // validate message not in default stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should delete old messages from stack on clear', function () {
            // add message to default stack
            notifySvc.add(messageText1);

            // add message to different stack
            notifySvc.add(messageText2, {
                stack: otherStack
            });

            // validate messages in stacks
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText2);

            // run 'clear' method
            notifySvc.clear(defaultStack);

            // validate first message not in default stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // validate other message still on other stack
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText2);
        });

        it('should not throw errors when clearing non existent stacks', function () {
            // validate clear not throw error on non existent stack
            var clearNonexistent = function () {
                notifySvc.clear('nonexistent');
            };

            var clearExistent = function () {
                notifySvc.clear(defaultStack);
            };

            expect(notifySvc.stacks[defaultStack]).to.be.an.array;
            expect(notifySvc.stacks.nonexistent).to.be.undefined;
            expect(clearNonexistent).to.not.throw(Error);
            expect(clearExistent).to.not.throw(Error);
        });

        it('should be dismissable', function () {
            // add message to be dismissed
            var msg = notifySvc.add(messageText1);

            // add other message
            notifySvc.add(messageText2);

            // validate both in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // wait until before timeout
            interval.flush(650);

            // validate dismissed message not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // validate other message is still in stack and in first position
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText2);
        });

        it('should fire ondismiss function if set', function () {
            // add message to be dismissed
            var dismissedResultA = false;
            var dismissedResultB = false;

            var msg = notifySvc.add(messageText1, {
                ondismiss: function () {
                    dismissedResultA = true;
                }
            });

            // add other message
            notifySvc.add(messageText2, {
                ondismiss: function () {
                    dismissedResultB = true;
                }
            });

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // wait until before timeout
            interval.flush(650);

            // validate dismissed message not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // validate other message is still in stack and in first position
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText2);

            // validate ondismiss only ran for A, not B
            expect(dismissedResultA).to.be.true;
            expect(dismissedResultB).to.be.false;
        });

        it('should disappear after a timeout', function () {
            // add message w/ 1 second timeout
            notifySvc.add(messageText1, {
                timeout: 1
            });

            // wait until before timeout
            interval.flush(650);

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // wait until after timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should wait until shown to start timeout', function () {
            // add message w/ 1 second timeout and show on route change
            notifySvc.add(messageText1, {
                timeout: 1,
                show: 'next'
            });

            // wait until timeout expires (if it were shown immediately)
            interval.flush(1500);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate now in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // wait until after timeout
            interval.flush(1001);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should remain if timeout not set', function () {
            // add message w/o timeout
            notifySvc.add(messageText1);

            // flush timeouts crazy amount of time (can't pass in nothing otherwise it throws error)
            interval.flush(100000);

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
        });

        it('should dismiss on routeChange', function () {
            // add message
            var msg = notifySvc.add(messageText1);

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should only dismiss manually when manual', function () {
            // add message with hide set to 'manual'
            var msg = notifySvc.add(messageText1, {
                dismiss: 'manual'
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // wait until before timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should dismiss on variable == true', function () {
            // set expression to equal true (showing)
            scope.loaded = false;

            // add message w/ dismiss property
            var msg = notifySvc.add(messageText1, {
                dismiss: [scope, 'loaded']
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // change variable to true
            scope.loaded = true;
            scope.$digest();

            // wait until before timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should dismiss message waiting on scope update if scope destroyed', function () {
            // set expression to equal true (showing)
            scope.loaded = false;

            // add message w/ dismiss property
            var msg = notifySvc.add(messageText1, {
                dismiss: [scope, 'loaded']
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            scope.$destroy();

            // wait until before timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on next on routeChange when set', function () {
            // add message with show set to 'next'
            var msg = notifySvc.add(messageText1, {
                show: 'next'
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate another route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on variable == true', function () {
            // set expression to equal false
            scope.error = false;

            // add message w/ show expression
            var msg = notifySvc.add(messageText1, {
                show: [scope, 'error']
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // change variable to true
            scope.error = true;
            scope.$digest();

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate a route change to dismiss message
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });
    });
});

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Component built to gather and send user feedback

## Default Submission Function

The `rxFeedback` component sends feedback to `/api/encore/feedback`, which routes feedback to `encoreui@lists`.
For the **Feedback Type** of "Feature Request", we will open up a new window redirecting the user to the **GET Feedback** website, which will now host all internal requests for features.

This endpoint also supports a `product` parameter `/api/encore/feedback/:product` for sending feedback to a
product-specific mailing list.

Adding a custom endpoint is managed in `encore-service-pillar`. Once configured
you can override the default endpoint with `rxFeedbackSvc.setEndpoint`.

```javascript
// To be put in the run section of your application
.run(function (rxFeedbackSvc) {
    rxFeedbackSvc.setEndpoint('/api/encore/feedback/cloud');
});
```

## Custom Submission Function

The `rxFeedback` component allows you to define an `on-submit` attribute that points to a custom function for the
purposes of overriding the default submission logic.  This function should accept a single argument for a
feedback object with the following definition:

```javascript
// feedback object structure
{
  "type": {
    "label": "(string)",
    "placeholder": "(string) placeholder text",
    "prompt": "(string) UI text used to describe the `description` field"
  },
  "description": "(string) user-submitted feedback"
}
```

## Feedback Redirect Integration

To obtain the Feedback Redirect integration, please update `encore-ui-svcs` to version `0.11.0` or above.  Once you have done so include
`'encore.svcs.feedback'` in the list of dependencies for your application:

```
angular.module('myApplication', ['ngRoute', 'ngResource', 'encore.svcs.feedback'])
```

### Production
To manually include the Feedback changes without updating your version of Encore UI (but after updating `encore-ui-svcs`), please include the following:

Add the following script in your `index.html` (after `encore-ui` and `encore-ui-svcs` **or** after injected dependencies):

[http://3bea8551c95f45baa125-a22eac1892b2a6dcfdb36104c0e925de.r46.cf1.rackcdn.com/feedback-override.js](http://3bea8551c95f45baa125-a22eac1892b2a6dcfdb36104c0e925de.r46.cf1.rackcdn.com/feedback-override.js)

```javascript
<!-- inject:js -->
<!-- endinject -->
<!-- or -->
<script src="bower_components/encore-ui/encore-ui-tpls.min.js"></script>
<script src="bower_components/encore-ui-svcs/dist/encore-ui-svcs.js"></script>
<!-- ... -->
<script src="https://6618f7541d71c1a404be-a22eac1892b2a6dcfdb36104c0e925de.ssl.cf1.rackcdn.com/feedback-override.js"></script>
```

-- OR --

Include in your `app.js` is the following snippet:

```javascript
// jscs:disable
// jshint ignore:start
angular.module('encore.ui.rxFeedback').controller("rxFeedbackController",["$scope","$modalInstance","$rootScope","$injector",function(a,b,c,d){a.submit=function(){b.close(a)},a.cancel=b.dismiss,c.$on("$routeChangeSuccess",b.dismiss),d.has("FeedbackService")&&d.get("FeedbackService").initialize(a,b)}]);
angular.module("templates/feedbackForm.html",[]).run(["$templateCache",function(a){a.put("templates/feedbackForm.html",'<rx-modal-form rx-form title="Submit Feedback" submit-text="Send Feedback" class="rx-feedback-form" ng-switch="state"><rx-form-section><strong class="title">We want to hear your voice.</strong><rx-field><rx-field-name class="title subdued">Choose a topic:</rx-field-name><rx-field-content><rx-input><select rx-select id="selFeedbackType" ng-model="fields.type" ng-options="opt as opt.label for opt in feedbackTypes" ng-init="fields.type = feedbackTypes[0]" required></select></rx-input><rx-help-text ng-if="state === \'redirect\'">You\'ll be redirected to a new window</rx-help-text></rx-field-content></rx-field></rx-form-section><div class="redirect-description well" ng-show="fields.type" ng-switch-when="redirect">Popup Blocker? <a href="{{ route }}" target="_blank">Go to the page directly.</a></div><rx-form-section ng-show="fields.type" ng-switch-default><rx-field><rx-field-name class="subdued feedback-description">{{fields.type.prompt}}:</rx-field-name><rx-field-content><rx-input><textarea rows="8" placeholder="{{fields.type.placeholder}}" required ng-model="fields.description" class="feedback-textarea"></textarea></rx-input></rx-field-content></rx-field></rx-form-section></rx-modal-form><rx-modal-footer state="redirect"><button class="button submit" ng-click="cancel()">Continue</button> <button class="button cancel" ng-click="cancel()">Cancel</button></rx-modal-footer>')}]);
angular.module("templates/rxFeedback.html",[]).run(["$templateCache",function(a){a.put("templates/rxFeedback.html",'<div class="rx-feedback"><rx-modal-action controller="rxFeedbackController" pre-hook="setCurrentUrl(this)" post-hook="sendFeedback(fields)" template-url="templates/feedbackForm.html">Submit Feedback</rx-modal-action></div>')}]);
// jshint ignore:end
// jscs:enable

```

### Development
For development purposes, you may want to include one of the two following configurations depending on which type of project you have:

*The latest version of the [Encore generator](https://github.com/rackerlabs/generator-encore) will include this proxy*

**Gulp**: `gulp/util/prism.js`
```javascript
prism.create({
    name: 'encorefeedback',
    context: '/encore/feedback',
    host: 'staging.encore.rackspace.com',
    port: 443,
    https: true,
    changeOrigin: false
});
```

**Grunt**: `tasks/util/config`
```javascript
{
    context: '/encore/feedback',
    host: 'staging.encore.rackspace.com',
    port: 443,
    https: true,
    protocol: 'https',
    changeOrigin: false
}
```

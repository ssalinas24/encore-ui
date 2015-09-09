[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Service (rxNotify) and Directives (rxNotification and rxNotifications) for displaying status messages on a page.

[API Documentation](ngdocs/index.html#/api/rxNotify.service:rxNotify)


## Displaying an rxNotification as a State Message

There may be situations where you will need to use the styling/markup of
rxNotify's messaging queue in status messages of your own - for example,
a modal window which asks if you want to delete an object, with the
appropriate warning or error flags. If this is the case, we recommend
using the `rx-notification` directive in your views.  Please note, this
differs from `rx-notifications` (plural).

```html
<rx-notification type="warning">
  This is a warning message!
</rx-notification>
```

The type attribute can be any type supported by `options.type` for the `add()`
function in the [rxNotify service](ngdocs/index.html#/api/rxNotify.service:rxNotify).


## Stacks

Stacks are just separate notification areas. Normally, all messages created will
go to the 'page' stack, which should be displayed at the top of the page. The
'page' stack is used for page-level messages.


### Using the Page Stack

The default notification stack is added by default to the rxPage template, so it
should be ready to use without any work (unless your app uses a custom template).
The rxNotifications directive will gather all notifications for a particular
stack into a single point on the page.  By default, this directive will collect
all notifications in the 'page' stack.

```html
<rx-notifications></rx-notifications>
```
See the [rxNotifications API](ngdocs/index.html#/api/rxNotify.directive:rxNotifications)
for more details.


### Using a Custom Stack

You can also create custom stacks for specific notification areas. Say you have
a form on your page that you want to add error messages to. You can create a
custom stack for this form and send form-specific messages to it.

See "Using a Custom Stack" in the [API Docs](ngdocs/index.html#/api/rxNotify.service:rxNotify)
in the API Docs.


## Adding an rxNotification to the Default Stack
If you need to add a notification via your Angular template, just set
the `stack` parameter on the opening `<rx-notification>` tag.  This
will allow the notification to be added via the `rxNotify.add()` function.

```html
<rx-notification type="error" stack="page">
  This is an error message being added to the "page" stack with <strong>Custom</strong> html.
</rx-notification>
```

## Adding a New Message Queue via rxNotify
To add a new message to a stack, inject 'rxNotify' into your Angular function and run:

```javascript
rxNotify.add('My Message Text');
```

This will add a new message to the default stack ('page') with all default
options set.  To customize options, pass in an object as the second argument
with your specific options set:

```javascript
rxNotify.add('My Message Text', {
   stack: 'custom',
   type: 'warning'
});
```

More examples can be found in the [rxNotify API Docs](ngdocs/index.html#/api/rxNotify.service:rxNotify).


## Dismissing a message programatically

Most messages are dismissed either by the user, a route change or using the
custom 'dismiss' property.  If you need to dismiss a message programmaticaly,
you can run **`rxNotify.dismiss(message)`**, where *message* is the object
returned from `rxNotify.add()`.


## Clearing all messages in a stack

You can clear all messages in a specific stack programmatically via the
`rxNotify.clear` function. Simply pass in the name of the stack to clear:

```javascript
rxNotify.clear('page')
```


## rxPromiseNotifications
It is a common pattern with API requests that you'll show a loading message,
followed by either a success or failure message depending on the result of
the call. `rxPromiseNotifications` is the service created for this pattern.

For more information on how to call/use rxPromiseNotifications, please see
the [API Docs](ngdocs/index.html#/api/rxNotify.service:rxPromiseNotifications).

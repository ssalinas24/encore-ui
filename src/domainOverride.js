// Currently this is the prefix we will use for all encore applications loaded in an iframe
var prefix = 'apps.';
// Let's get the hostname only (no port information)
var host = window.location.hostname;
// Find out if we this hostname is prefixed
var index = host.indexOf(prefix);
// Get the domain without the prefix if it includes it
var domain = host.substr((index < 0) ? 0 : index + prefix.length);
// Override the documnet.domain that allows for explicit iframe communication
if (domain !== 'localhost') {
    document.domain = domain;
}

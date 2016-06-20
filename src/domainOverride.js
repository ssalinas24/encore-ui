// Currently this is the prefix we will use for all encore applications loaded in an iframe
var prefix = 'apps.';
// Let's get the hostname only (no port information)
var host = window.location.hostname;
// Find out if we this hostname is prefixed
var index = host.indexOf(prefix);
// Get the domain without the prefix if it includes it
var domain = host.substr((index < 0) ? 0 : index + prefix.length);
// Override the document.domain that allows for explicit iframe communication
// **** Must Read: ****
// * by setting document.domain to the same domain on the window that contains
// * an iframe,and the content of the iframe, both parent and child can
// * communicate and access each other's javascript environments, allowing us
// * with the ability to not just create an API for encore applications to
// * communicate with origin but perhaps even figure out a way to share stuff
// * between the two.
// * https://www.nczonline.net/blog/2009/09/15/iframes-onload-and-documentdomain/
// * https://jcubic.wordpress.com/2014/06/20/cross-domain-localstorage/
if (domain !== 'localhost') {
    document.domain = domain;
}

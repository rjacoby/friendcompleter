fb-friendcompleter
===
fb-friendcompleter is a simple Javascript library that implements an
autocompleter for Facebook friends which populates the Facebook ID into
a hidden field. This could be used for passing a friend ID into the
[Facebook Feed Dialog] (http://developers.facebook.com/docs/reference/dialogs/feed/)
for posting on their wall, or any other use where you need to select an ID from the friend list.

Dependencies
---
* [Facebook Javascript SDK](http://developers.facebook.com/docs/reference/javascript/)
* [jQuery UI] (http://jqueryui.com/)

How It Works (and Why It May Not)
---
*This plugin is kind of a crazy idea.*

A designer wanted to do the old-school "post to your friend's wall"
thing. Facebook's JS SDK dialogs still support this, if you know the
friend's Facebook ID. But there's no blessed picker anymore for that,
so...

What it does:

* Uses the current FB object to make a graph call and get the current
  user's friends
* Converts that JSON into a structure that jQuery UI's autocomplete
  likes
* Provides functions that let autocomplete use the local friend list as
  a source.

This is really an experiment. Is the browser the right place to pull
down thousands of friends from Facebook and search through them?
Probably not - but we can do it anyway, without any server backend.

Does It Scale?
---
Short answer: maybe.

While jQuery's site tells you not to autocomplete against 100+ items
locally, Chrome and Firefox seem to be pretty good at this. I've tested
it with a user that has 1500+ friends, and it was quite snappy.

How will IE handle it? Not tested yet...

Also, it only caches the friend list for the life of the current page.
This could be really horrible!

Assumptions
---
* User is logged in to Facebook.
* Application has permission to get user's friend list.

Usage
---
* Add to your included scripts, after Facebook and jQuery UI.
* Add a call to `setupFbAutocompleter();` after Facebook JS has been initialized. One place to do this is inside the recommended `window.fbAsyncInit` function.

Todo
---
* Modularize the autocompleter, taking an argument of element to use.

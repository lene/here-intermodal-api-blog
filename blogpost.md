# Routing across the boundaries with the HERE Intermodal Routing API <or something with PnR since that's our only option now>

< TODO SOMEBODY ELSE nice title pic (I have no idea what) >

As announced in the post [HERE launches Intermodal Routing API](http://developer.here.com/blog/here-launches-intermodal-routing-api), 
HERE has recently released the Intermodal Routing API. Intermodal routing is a novel capability that allows
users to find routes across different modes of transportation, such as < TODO LENE insert examples here >. 
< TODO LENE Insert blurb here how great that is and that nobody else (check that!) currently does it >.
  
One very common application for intermodal routing, which has been requested from HERE a lot, is Park and 
Ride. Because of this, we have implemented intermodal routing as the first application of the Intermodal 
Routing API. With it you can do things ranging from calculating your personal best route to reach your office 
using Park and Ride, via showing customers a comfortable Park and Ride solution to reach your headquarters in 
a crowded city, to < TODO LENE enterprise-scale example >.  

< TODO LENE Only in specific locations, see the 
[Coverage Information](http://developer.here.com/documentation/park-and-ride/topics/coverage-information.html)
for currently supported cities >

< TODO LENE explain why this is hard and cool >

## Down to business!

So without further ado, let's show you how to implement a map using the HERE Intermodal Routing API on your
website.

First of all, we will quickly show you how to set up the HERE Maps Javascript API. This post does not go into 
details of the HERE Maps API, but if you find anything unclear, check out our 8-part in-depth tutorial for the
HERE Maps Javascript API:
* [Part 1: Basic Map Set-up](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-1-basic-map-set-up) 
* [Part 2: Geolocation](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-2-geolocation) 
* [Part 3: Basic Routing](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-3-basic-routing) 
* [Part 4: Advanced Routing](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-4-advanced-routing)
* [Part 5: Refactoring](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-5-refactoring) 
* [Part 6: Reacting to outside influences](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-6-reacting-to-outside-influences) 
* [Part 7: Traffic](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-7-traffic) 
* [Part 8: Wrapping Up](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-8-wrapping-up)

So, let's go! 

Before you can work with any HERE API, you need to get yourself a pair of **credentials**. They consist of an 
app id and an app code. You can get your own set of credentials by signing up on 
[developer.here.com](http://developer.here.com). There's a 90 day free trial available that provides all of 
our routing features, including the Intermodal Routing API < TODO LENE check if true >. If you have already signed
up, you can access your credentials on your projects page.

Now that you have your HERE API credentials, you can go ahead and render a map:

< TODO THORSTEN code setting up the map - something along the lines of: >
```javascript
var platform = new H.service.Platform({
  app_id: '{YOUR_APP_ID}', // // <-- ENTER YOUR APP ID HERE
  app_code: '{YOUR_APP_CODE}', // <-- ENTER YOUR APP CODE HERE
});

var defaultLayers = platform.createDefaultLayers();
var mapPlaceholder = document.getElementById('map-container');

var map = new H.Map(mapContainer, defaultLayers.normal.map);
```

< TODO THORSTEN here goes a screenshot of your beautiful map >

< TODO THORSTEN code setting up the start point selector, and for simplicity's sake let's just hardcode the 
destination to the Chicago HERE office, 41.884238/-87.638862 >

Now that you have a start point and a destination, you are ready for the big moment already: Firing off a 
request to the HERE Intermodal Routing API. 

```bash
https://mobility.cit.api.here.com/v1/route
  ?app_id={YOUR_APP_ID}
  &app_code={YOUR_APP_CODE}
  &profile=parkandride
  &dep={YOUR_START_POINT}
  &arr=41.884238,-87.638862
  &time=2017-12-18T07:30:00
```

< TODO explanation of the request parameters and some more extra ones >

And here is what you get in response:

< TODO explanation of the response >

For a depiction of the full response, see the [Park and Ride Routing Example](https://developer.here.com/documentation/park-and-ride/topics/examples-routing.html)
from the documentation.

Let's do it from Javascript:

< TODO THORSTEN yeah, it's boring to repeat it in Javascript, but let's try to create a fully working app here :-) >

Now finally we want our routing response nicely visualized on the map. 

< TODO THORSTEN code visualizing the route >

< TODO THORSTEN screenshot of visualized route (maybe with explanations?) >

< TODO LENE compare to public transit API and routing API >

< TODO LENE Caveats? >

< TODO LENE Some background ? >
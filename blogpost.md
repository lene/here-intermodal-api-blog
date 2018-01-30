# Park and Ride Routing with the HERE Intermodal Routing API

< TODO SOMEBODY ELSE nice title pic (I have no idea what) >

As announced in the post [HERE launches Intermodal Routing API](http://developer.here.com/blog/here-launches-intermodal-routing-api), 
HERE has recently released the Intermodal Routing API. Intermodal routing is a novel capability that allows
users to find routes across different modes of transportation, such as combining air and ground travel, 
rail and bike share, or public transit and taxi services. 

Current routing services can only route across a single mode of transport - for example, car routing, public 
transit routing or bike routing. The possibility to combine modes really opens new possibilities. 
  
One very common application for intermodal routing, which has been requested from HERE a lot, is Park and 
Ride. Because of this, we have implemented Park and Ride routing as the first application of the Intermodal 
Routing API. With it you can do things ranging from calculating your personal best route to reach your office 
using Park and Ride, via showing customers a map with comfortable Park and Ride solutions to reach your 
company headquarters in a congested city, to < TODO LENE come up with an enterprise-scale example >.

Please note that HERE is offering Park and Ride Routing only in specific locations, see the 
[Coverage Information](http://developer.here.com/documentation/park-and-ride/topics/coverage-information.html)
for currently supported cities. This list of supported cities is growing as we collect the necessary data for
more and more destinations.

So without further ado, let's show you how to implement a map using the HERE Intermodal Routing API on your
website.

## What you need

First of all, we will quickly show you how to set up the HERE Maps Javascript API. This post does not go into 
details of how to use the HERE Maps API, but if you find anything unclear, check out our 8-part in-depth 
tutorial for the HERE Maps Javascript API:
* [Part 1: Basic Map Set-up](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-1-basic-map-set-up) 
* [Part 2: Geolocation](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-2-geolocation) 
* [Part 3: Basic Routing](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-3-basic-routing) 
* [Part 4: Advanced Routing](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-4-advanced-routing)
* [Part 5: Refactoring](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-5-refactoring) 
* [Part 6: Reacting to outside influences](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-6-reacting-to-outside-influences) 
* [Part 7: Traffic](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-7-traffic) 
* [Part 8: Wrapping Up](http://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-8-wrapping-up)

In this tutorial we will create a Javascript program that displays a map of Chicago and lets you select a 
start point, from where a Park and Ride route to the HERE offices in Chicago, which is situated at the 
coordinates 41.884238/-87.638862, is calculated. It should be easy for you to choose a different destination,
or extend the script so you can select both origin and destination for your journey freely. 

So, let's go! 

To work with any HERE API, you need to get yourself a pair of **credentials**. They consist of an app id and 
an app code. You can get your own set of credentials by signing up on [developer.here.com](http://developer.here.com).
After signing up for our account you create a new application to generate an app ID and an app code. If you 
have already signed up, you can access your credentials on your projects page. 
There's a 90-day Free Trial and also a free Public Plan available. Due to licensing issues, if you use one of 
those, to use the Intermodal Routing API you must also contact the HERE Sales Team via the 
[Contact Us](http://developer.here.com/contact-us) page and request < TODO LENE (pending Sales Team's response) 
that your application is enabled for the Intermodal Routing API. Please state that you are not a public 
transit company in order to circumvent the licensing restrictions. It should take no more than XXXX hours for 
your application to be allowed to use the Intermodal Routing API. >

## Finally: some code!

Now that you have your HERE API credentials, you can go ahead and create a Javascript script to render a map:

< TODO TORSTEN code setting up the map - something along the lines of: >
```javascript
var platform = new H.service.Platform({
  app_id: '{YOUR_APP_ID}', // // <-- ENTER YOUR APP ID HERE
  app_code: '{YOUR_APP_CODE}', // <-- ENTER YOUR APP CODE HERE
});

var defaultLayers = platform.createDefaultLayers();
var mapPlaceholder = document.getElementById('map-container');

var map = new H.Map(mapContainer, defaultLayers.normal.map);

// ... (display the map)
```

< TODO TORSTEN here goes a screenshot of your beautiful map >

Let's just very quickly add in some code to select a point on the map to start our route from:

< TODO TORSTEN code setting up the start point selector, and for simplicity's sake let's just hardcode the 
destination to the Chicago HERE office, 41.884238/-87.638862 >

Now that you have a start point and a destination, you are ready for the big moment already: Firing off a 
request to the HERE Intermodal Routing API. The request will look like this:

```bash
http://mobility.api.here.com/v1/route
  ?app_id={YOUR_APP_ID}
  &app_code={YOUR_APP_CODE}
  &profile=parkandride
  &dep={YOUR_START_POINT}
  &arr=41.884238,-87.638862
  &time=2018-02-01T07:30:00
```

The request parameters are the app ID and app code you set up earlier, the parameter `profile` you use to 
specify you want a Park and Ride route, `dep` and `arr` to specify the coordinates of your start and end point,
and a `time` for which you want the route to be calculated.

And here is (an edited version of) what the response will look like. Actually, you'll get a much longer 
response, but we are limiting ourselves to the bits interesting for this tutorial. For a depiction of the 
full response, see the 
[Park and Ride Routing Example](http://developer.here.com/documentation/park-and-ride/topics/examples-routing.html)
from the documentation.  

```json
{
  "Res": {
    "Connections": {
      "Connection": [
        {
          "@duration": "PT2H3M33S",
          "@transfers": "2",
          "Sections": {
            "Sec": [
              {
                "Dep": {
                  "@time": "2018-02-01T07:47:27",
                  "Addr": {
                    "@x": "-88.0815593", "@y": "41.5246995"
                  }
                },
                "Arr": {
                  "@time": "2018-02-01T08:28:54",
                  "Addr": {
                    "@x": "-87.6507079", "@y": "41.7211479",
                    "@name": "Metra 95th St. Longwood Station",
                    "At": [
                      {
                        "@id": "category",
                        "$": "parking"
                      },
                      {
                        "@id": "PnR",
                        "$": "1"
                      }
                    ]
                  },
                  "Activities": {
                    "Act": [
                      {
                        "@duration": "PT5M",
                        "@type": "parking"
                      }
                    ]
                  }
                },
                "Graph": "41.795175,-87.618325 41.795175,-87.618325 41.797036,-87.618361 ... 41.885705,-87.641778"                
              },
              ...
            ]
          }
        }
      ]
    }
  }
}
```
The response gives us a JSON list of three `Connection` objects (of which only one is shown here), each of 
which contains a list of `Sec` object (again, we are only showing the first one). The `Sec` objects represent
parts of the journey between which the vehicle is switched. Most importantly for us here, they also contain 
the `Graph` object, which we will use to visualize the route on the map. < TODO LENE pending Torsten's actual
code :-) >

Let's call the API from Javascript:

< TODO TORSTEN yeah, it's boring to repeat it in Javascript, but let's try to create a fully working app here :-) >

Now finally we want our routing response nicely visualized on the map. 

< TODO TORSTEN code visualizing the route >

And just with that you have requested and displayed a Park and Ride route on a map. 

< TODO TORSTEN screenshot of visualized route (maybe with explanations?) >

Now you can go forth and modify the code to suit your needs! 

## Summary

We have implemented a map doing Park and Ride Routing in < TODO XXX > lines of code, but of course there is 
more to it. The [Intermodal Routing API Documentation](http://developer.here.com/documentation/park-and-ride/)
is there to help you. Or, if you run into a problem the documentation cannot solve, try asking on
[Stack Overflow](https://stackoverflow.com/questions/tagged/here-api).

Happy coding!
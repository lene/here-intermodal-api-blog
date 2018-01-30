# Routing across the boundaries with the HERE Intermodal Routing API <or something with PnR since that's our only option now>

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

< TODO TORSTEN code setting up the start point selector, and for simplicity's sake let's just hardcode the 
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

< TODO LENE explanation of the request parameters and some more extra ones >

And here is (an edited version of) what you get in response. Actually, you get more (much more), but we have 
removed many bits which are unnecessary for this tutorial. For a depiction of the full response, see the 
[Park and Ride Routing Example](https://developer.here.com/documentation/park-and-ride/topics/examples-routing.html)
from the documentation.  

```json
{
  "Res": {
    "Connections": {
      "Connection": [
        {
          "@duration": "PT2H3M33S",
          "@transfers": "2",
          "Dep": {
            "@time": "2018-01-29T16:47:27",
            "Addr": {
              "@x": "-88.0815593", "@y": "41.5246995"
            }
          },
          "Arr": {
            "@time": "2018-01-29T18:51:00",
            "Addr": {
              "@x": "-87.638578", "@y": "41.885705"
            }
          },
          "Sections": {
            "Sec": [
              {
                "Dep": {
                  "@time": "2018-01-29T16:47:27",
                  "Addr": {
                    "@x": "-88.0815593", "@y": "41.5246995"
                  }
                },
                "Arr": {
                  "@time": "2018-01-29T17:28:54",
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
                }
              }
            ]
          }
        }
      ],
      "Operators": {
        "Op": [
          {
            "@name": "Chicago Transit Authority",
            "Link": [
              {
                "@type": "website",
                "@href": "http://transitchicago.com",
                "$": "Chicago Transit Authority"
              }
            ]
          }
        ]
      }
    }
  }
}
```
< TODO explanation of the response >


Let's call the API from Javascript:

< TODO TORSTEN yeah, it's boring to repeat it in Javascript, but let's try to create a fully working app here :-) >

Now finally we want our routing response nicely visualized on the map. 

< TODO TORSTEN code visualizing the route >

< TODO TORSTEN screenshot of visualized route (maybe with explanations?) >

And just with that you have requested and displayed a Park and Ride route on a map. Now you can go forth and 
modify the code to suit your needs! 
 
< TODO LENE compare to public transit API and routing API >

< TODO LENE Caveats and additional parameters >
* Response time
* number of responses: limited to 3
* strategies
* details, graph, maneuvers?

< TODO LENE Some background ? >
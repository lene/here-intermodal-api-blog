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

## Down to business!

So without further ado, let's show you how to implement a map using the HERE Intermodal Routing API on your
website.

First of all, we will quickly show you how to set up the HERE Maps Javascript API. This post does not go into 
details of how to use the HERE Maps API, but if you find anything unclear, check out our 8-part in-depth 
tutorial for the HERE Maps Javascript API:
* [Part 1: Basic Map Set-up](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-1-basic-map-set-up) 
* [Part 2: Geolocation](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-2-geolocation) 
* [Part 3: Basic Routing](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-3-basic-routing) 
* [Part 4: Advanced Routing](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-4-advanced-routing)
* [Part 5: Refactoring](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-5-refactoring) 
* [Part 6: Reacting to outside influences](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-6-reacting-to-outside-influences) 
* [Part 7: Traffic](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-7-traffic) 
* [Part 8: Wrapping Up](https://developer.here.com/blog/who-wants-ice-cream-a-here-maps-api-for-javascript-tutorial-part-8-wrapping-up)

So, let's go! 

In this tutorial we will create a Javascript program that displays a map of Chicago and lets you select a 
start point, from where a Park and Ride route to the HERE offices in Chicago, which is situated at the 
coordinates 41.884238/-87.638862, is calculated. It should be easy for you to choose a different destination,
or extend the script so you can select both origin and destination for your journey freely. 

To work with any HERE API, you need to get yourself a pair of **credentials**. They consist of an app id and 
an app code. You can get your own set of credentials by signing up on [developer.here.com](http://developer.here.com).
After signing up for our account you create a new application to generate an app ID and an app code. If you 
have already signed up, you can access your credentials on your projects page. 
There's a 90-day Free Trial and also a free Public Plan available. Due to licensing issues, if you use one of 
those, to use the Intermodal Routing API you must also contact the HERE Sales Team via the 
[Contact Us](https://developer.here.com/contact-us) page and request < TODO LENE (pending Sales Team's response) 
that your application is enabled for the Intermodal Routing API. Please state that you are not a public 
transit company in order to circumvent the licensing restrictions. It should take no more than XXXX hours for 
your application to be allowed to use the Intermodal Routing API. >

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
https://mobility.api.here.com/v1/route
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
                "Graph": "41.795175,-87.618325 41.795175,-87.618325 41.795678,-87.618334 41.797036,-87.618361 41.799328,-87.618451 41.801557,-87.618496 41.802087,-87.618505 41.802096,-87.618505 41.803921,-87.618577 41.805791,-87.618604 41.806088,-87.618622 41.806214,-87.61864 41.806366,-87.618676 41.806483,-87.618703 41.806744,-87.618765 41.809207,-87.618828 41.810591,-87.618855 41.812704,-87.618918 41.814753,-87.618981 41.816461,-87.619035 41.816461,-87.619035 41.818691,-87.619089 41.820956,-87.619161 41.821136,-87.619161 41.821333,-87.619161 41.821468,-87.619197 41.821585,-87.619269 41.821675,-87.61935 41.821747,-87.619476 41.821792,-87.619592 41.821828,-87.619745 41.821846,-87.620024 41.821819,-87.621372 41.821819,-87.621462 41.821792,-87.623539 41.821765,-87.624429 41.821756,-87.624806 41.821765,-87.625049 41.821783,-87.625166 41.821837,-87.62531 41.821909,-87.625471 41.82199,-87.625543 41.822053,-87.625588 41.822151,-87.625633 41.822457,-87.625669 41.824785,-87.625705 41.827851,-87.625786 41.830979,-87.625867 41.83168,-87.625876 41.83168,-87.625876 41.853119,-87.626397 41.853317,-87.626406 41.855376,-87.626442 41.856463,-87.62646 41.858072,-87.626487 41.858387,-87.626451 41.858755,-87.626415 41.860158,-87.626469 41.861884,-87.626496 41.865731,-87.626559 41.867403,-87.626586 41.869974,-87.626712 41.873615,-87.626793 41.873785,-87.626793 41.873893,-87.626802 41.874001,-87.626802 41.8741,-87.626775 41.874217,-87.62673 41.874325,-87.626676 41.874469,-87.626586 41.874577,-87.626514 41.874702,-87.626397 41.874783,-87.626325 41.8749,-87.626218 41.87499,-87.626164 41.875107,-87.626101 41.87526,-87.626011 41.875386,-87.625993 41.875691,-87.625975 41.876968,-87.626029 41.878307,-87.626056 41.879512,-87.626101 41.879512,-87.626101 41.882029,-87.626155 41.883224,-87.626191 41.883224,-87.626191 41.884438,-87.626218 41.885346,-87.626253 41.885525,-87.626253 41.88557,-87.626253 41.885615,-87.626271 41.88566,-87.626298 41.885687,-87.626343 41.885723,-87.626424 41.885732,-87.626505 41.885732,-87.62655 41.885741,-87.626613 41.885741,-87.626829 41.885741,-87.627836 41.885741,-87.628869 41.885741,-87.629481 41.885741,-87.629813 41.885741,-87.629921 41.885741,-87.63011 41.885741,-87.6302 41.885741,-87.630883 41.885741,-87.632043 41.885732,-87.632843 41.885723,-87.633912 41.885723,-87.635153 41.885714,-87.637202 41.885705,-87.638838 41.885705,-87.641769 41.885705,-87.641778"                
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
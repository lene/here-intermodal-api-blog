        var platform = new H.service.Platform({
            useCIT: true,
            app_id: 'DemoAppId01082013GAL',
            app_code: 'AJKnXv84fjrb0KIHawS0Tg'
        });
        var maptypes = platform.createDefaultLayers();

        var map = new H.Map(document.getElementById('map'), maptypes.terrain.map, {
            zoom: 10,
            center: { lat: 41.884238, lng: -87.638862 }
        });

        var ui = H.ui.UI.createDefault(map, maptypes);

        /* ADD MAPEVENTS AND BEHAVIOR*/
        var mapevents = new H.mapevents.MapEvents(map);
        var behavior = new H.mapevents.Behavior(mapevents);

        var mobility = new H.Mobility({
            map: map,
            app_id: 'xWb5KmTI7pgCAFxf9d9P',
            app_code: 'DNMfZLpeUUiLYolfwWKK9A'
        });

        var ui = mobility.createDefaultUI();

        mobility.route({
            dep: [41.994238,-88.728862],
            arr: [41.844238,-87.638862],
            time: '2018-03-08T07:30:00',
            graph: 1,
            maneuvers: 1
        });

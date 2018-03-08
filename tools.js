(function(NS) {

    var ACCESS_ID = "bb072ce65aa1ad322c116b828fb1a226";

    function Mobility(options) {
        this.map = options.map;
    }

    Mobility.prototype = {
        on: function(name, handler) {
            this._events = this._events || {};
            this._events[name] = this._events[name] || [];
            this._events[name].push(handler);
        },
        emit: function(name, arg1, arg2, arg3) {
            var handlers = this._events && this._events[name] || [];
            for (var i=0, l=handlers.length; i<l; i++) {
                handlers[i].call(this, arg1, arg2, arg3);
            };
        },

        route: function(params) {
            var that = this;
            var url = "https://mobility.api.here.com/v1/route.json?accessId="+ACCESS_ID+"&profile=parkandride&dep="+params.dep.join(",")+"&arr="+params.arr.join(",")+"&time="+params.time+"&graph="+params.graph+"&maneuvers="+params.maneuvers;

            $.get(url, function(resp) {
                that.emit("response", resp);
            });
        },

        createDefaultUI: function() {
            new NS.ui.Logic(this);
            new NS.ui.Route(this);
            new NS.ui.Markers(this);
        },

    }


    function Logic(provider) {
        provider.on("response", function(resp) {
            console.log(resp);
            provider.emit("connection", resp.Res.Connections.Connection[0], resp.Res.Guidance && resp.Res.Guidance.Maneuvers);
        });
    }

    function Route(provider) {
        var that = this;
        provider.on("connection", function(conn, maneuvers) {
            var graphs = that._maneuversToGraphs(maneuvers);

            conn.Sections.Sec.forEach(function(sec) {
                var arr       = sec.Arr.Addr || sec.Arr.Stn,
                    dep       = sec.Dep.Addr || sec.Dep.Stn,
                    graph     = (graphs[sec.id] || sec.graph || "").split(" "),
                    transport = sec.Dep.Transport || {},
                    style     = NS.Mobility.routeStyles[sec.mode] || {},
                    color     = (transport.At || {}).color || "black";

                // Create a linestring to use as a point source for the route line
                var linestring = new H.geo.LineString();
                linestring.pushLatLngAlt(dep.y, dep.x);
                for (var i=0, point; point=graph[i]; i++) {
                    point = point.split(",");
                    linestring.pushLatLngAlt(point[0], point[1]);
                }
                linestring.pushLatLngAlt(arr.y, arr.x);

                // Create a polyline to display the route:
                var routeLine = new H.map.Polyline(linestring, {
                    style: { strokeColor: color || style.color, lineWidth: style.lineWidth || 7, lineDash: style.lineDash || [] },
                });

                // Add the route polyline and the two markers to the map:
                map.addObjects([routeLine]);
            });
        });
    }

    Route.prototype._maneuversToGraphs = function(maneuvers) {
        var graphs = {};
        if (maneuvers) {
            for (var i=0, maneuver; (maneuver=maneuvers[i]); i++) {
                var graph = maneuver.Maneuver.reduce(function(acc, curr) {
                    acc.push(curr.graph);
                    return acc;
                }, []).join(" ");
                maneuver.sec_ids.split(" ").forEach(function(secId) {
                    graphs[secId] = graph;
                });
            }
        }
        return graphs;
    }


    function Markers(provider) {
        var depMarker = new H.map.Marker({lat: 0, lng: 0}, {
            icon: NS.TRIP_START_ICON,
            data: {"name": "dep"},
        });

        var arrMarker = new H.map.Marker({lat: 0, lng: 0}, {
            icon: NS.TRIP_START_ICON,
            data: {"name": "arr"},
        });
        provider.map.addObjects([arrMarker, depMarker]);

        provider.on("connection", function(conn) {
            var dep = conn.Dep.Stn || conn.Dep.Addr;
            var arr = conn.Arr.Stn || conn.Arr.Addr;
            depMarker.setPosition({lat: dep.y, lng: dep.x});
            arrMarker.setPosition({lat: arr.y, lng: arr.x});
        });
    }


    NS.Mobility = Mobility;
    NS.ui = NS.ui || {};
    NS.ui.Logic = Logic;
    NS.ui.Route = Route;
    NS.ui.Markers = Markers;

    NS.Mobility.routeStyles = {
        21: { strokeColor: "black", lineWidth: 3, lineDash: [5, 5] },  // car
        20: { strokeColor: "black", lineWidth: 5, lineDash: [1, 5]},   // walk
    }


}(window.H = window.H || {}))

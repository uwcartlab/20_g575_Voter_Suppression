//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){

    //map frame dimensions
    var width = 700,
        height = 460;

    //create new svg container for the map
    var map = d3.select("div.mapContainer")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

        //create custom d3 albers projection specific for the US
        var projection = d3.geoAlbersUsa()
            .scale(950)
            .translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);

    //use Promise.all to parallelize asynchronous data loading
    var promises = [];
    promises.push(d3.csv('data/State_Voting_Laws_Updated.csv')); //Load CSV attributes
    promises.push(d3.json("data/USAFinalProjectTopo.json"));    //load choropleth spatial data
    promises.push(d3.json("data/GreatLakesTopo.json"));         //loads great lakes layers
    Promise.all(promises).then(callback);

    function callback(data){
      	csvData = data[0];
      	usa = data[1];
        bigLakes = data[2];

        //translate US TopoJSON
        var usaStates = topojson.feature(usa, usa.objects.USAFinalProject).features,
            greatLakes = topojson.feature(bigLakes, bigLakes.objects.GreatLakes);
            //examine the results
            console.log(greatLakes);
            console.log(usaStates);

            //add states to map
            var states = map.selectAll(".states")
                .data(usaStates)
                .enter()
                .append("path")
                .attr("class", function(d){
                    return "State: " + d.properties.name;
                })
                .attr("d", path);

            //add great lakes to map
            var lakes = map.append("path")
                .datum(greatLakes)
                .attr("class", "lakes")
                .attr("d", path);

    };

};

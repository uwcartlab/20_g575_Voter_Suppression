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
        // join csv data to GeoJSON data
        usaStates = joinData(usaStates, csvData);

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

function joinData(usaStates, csvData){
    // variables for data join from csv
    var attrArray = ["Online Reg Implement Yr", "Early Voting Status", "Voter ID Requirement", "Election Day Vote Centers", "Rights Lost to Felons", "Incorrectly Cast Provisional Vote"];
    // assign csv attributes to GeoJSON with each loop
    for (var i=0; i<csvData.length; i++){
        // index states
        var csvState = csvData[i];
        // name is joining field
        var csvKey = csvState.name;

        // loop through GeoJSON states to find correct one
        for (var a=0; a<usaStates.length; a++){
            var geojsonProps = usaStates[a].properties,
                geojsonKey = geojsonProps.name;

            // conditional statement transferring data when names match
            if (geojsonKey == csvKey){
                // when condition met, assign attributes and values
                attrArray.forEach(function(attr){
                    // make variable equal to csv value
                    var val = parseFloat(csvState[attr]);
                    // assign value to GeoJSON
                    geojsonProps[attr] = val;
                });
            };

        };
    };
    return usaStates;
};

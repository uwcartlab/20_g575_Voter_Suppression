//begin script when window loads
window.onload = setMap();

// variables for data join from csv
var attrArray = ["Online Reg Implement Yr", "Early Voting Status", "Voter ID Requirement", "Election Day Vote Centers", "Rights Lost to Felons", "Incorrectly Cast Provisional Vote"];
var expressed = attrArray[0]; //initial attribute

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

        // join csv data to GeoJSON data
        usaStates = joinData(usaStates, csvData);

        var colorScale = makeColorScale(csvData)

        //add enumeration units to the map
        setEnumerationUnits(usaStates, map, path, colorScale);

        //add great lakes to map
        var lakes = map.append("path")
            .datum(greatLakes)
            .attr("class", "lakes")
            .attr("d", path);

    };

};

function joinData(usaStates, csvData){
    // assign csv attributes to GeoJSON with each loop
    for (var i=0; i<csvData.length; i++){
        // index states
        var csvState = csvData[i];
        // name is joining field
        var csvKey = csvState.name;

        // loop through GeoJSON states to find correct one
        for (var a=0; a<usaStates.length; a++){
            var geojsonProps = usaStates[a].properties,
                geojsonKey = geojsonProps.StateAbb;

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

//function to create color scale generator
function makeColorScale(data){

    // DARK BLUE COLOR SCALE
    var colorClasses = [
        "#f1eef6",
        "#bdc9e1",
        "#74a9cf",
        "#2b8cbe",
        "#045a8d"
    ];

        // NATURAL BREAKS SCALE
    //create color scale generator
    var colorScale = d3.scaleThreshold()
    .range(colorClasses);

    //build array of all values of the expressed attribute
    var domainArray = [];
    for (var i=0; i<data.length; i++){
    var val = parseFloat(data[i][expressed]);
    domainArray.push(val);
    };

    //cluster data using ckmeans clustering algorithm to create natural breaks
    var clusters = ss.ckmeans(domainArray, 5);
    //reset domain array to cluster minimums
    domainArray = clusters.map(function(d){
    return d3.min(d);
    });
    //remove first value from domain array to create class breakpoints
    domainArray.shift();

    //assign array of last 4 cluster minimums as domain
    colorScale.domain(domainArray);

    return colorScale;
};

function setEnumerationUnits(usaStates, map, path, colorScale){
    //add states to map
    var states = map.selectAll(".states")
        .data(usaStates)
        .enter()
        .append("path")
        .attr("class", function(d){
            return "State: " + d.properties.StateAbb;
        })
        .attr("d", path)
          .on("mouseover", function(d){
              highlight(d.properties);
          })
          .on("mouseout", function(d){
              dehighlight(d.properties);
          });

      //dehighlight for stroke
      var desc = states.append("desc")
          .text('{"stroke": "#fff", "stroke-width": ".1px"}');

      //alternate dehighlight for fill
      // var desc = states.append("desc")
      //     .text('{"fill": "blue"}');
};


function highlight(props){
                //change STROKE highlight method
    var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
        .style("stroke", "#ffffcc") //highlight color
        .style("stroke-width", "2px"); //highlight width
};

//function to reset the element style on mouseout
function dehighlight(props){
              // STROKE DEHIGHLIGHT
  var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
        .style("stroke", function(){
            return getStyle(this, "stroke")
        })
        .style("stroke-width", function(){
            return getStyle(this, "stroke-width")
        });

    function getStyle(element, styleName){
        var styleText = d3.select(element)
            .select("desc")
            .text();

        var styleObject = JSON.parse(styleText);

        return styleObject[styleName];
        };

};

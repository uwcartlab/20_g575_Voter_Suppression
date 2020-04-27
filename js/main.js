//begin script when window loads
window.onload = setMap();

// variables for data join from csv
var attrArray = ["Online Reg Implement Yr", "Early Voting Status", "Voter ID Requirement", "Election Day Vote Centers", "Rights Lost to Felons", "Incorrectly Cast Provisional Vote", "Rating", "Grade"];
var expressed = attrArray[7]; //initial attribute

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
        //add enumeration units to the map
        setEnumerationUnits(usaStates, map, path);

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
        csvKey = csvKey.replace(" ", "_").trim();

        // loop through GeoJSON states to find correct one
        for (var a=0; a<usaStates.length; a++){
            var geojsonProps = usaStates[a].properties,
            geojsonKey = geojsonProps.name;
            geojsonKey = geojsonKey.replace(" ", "_").trim();

            // conditional statement transferring data when names match
            if (geojsonKey == csvKey){
                // when condition met, assign attributes and values
                attrArray.forEach(function(attr){
                    // make variable equal to csv value, check if float or string
                    var val = csvState[attr];
                    if(!isNaN(csvState[attr])) {
                      val=parseFloat(csvState[attr]);
                    }
                    // assign value to GeoJSON
                    geojsonProps[attr] = val;
                });
            };

        };
    };
    return usaStates;
};

//function to create color scale generator
function findFill(data){

    // DARK BLUE COLOR SCALE
    var colorClasses = [
        "#f1eef6",
        "#bdc9e1",
        "#74a9cf",
        "#2b8cbe",
        "#045a8d"
    ];

    if(data.properties.Grade == "A") {
      return colorClasses[0];
    } else if(data.properties.Grade == "B") {
      return colorClasses[1];
    } else if(data.properties.Grade =="C") {
      return colorClasses[2];
    } else if(data.properties.Grade =="D"){
      return colorClasses[3];
    } else {
      return colorClasses[4];
    }
};

function setEnumerationUnits(usaStates, map, path){
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
          })
        .attr("fill", function(d) {
          return findFill(d);
        });
        

      //dehighlight for stroke
      // var desc = states.append("desc")
      //     .text('{"stroke": "#fff", "stroke-width": ".1px"}');

      //alternate dehighlight for fill
      var desc = states.append("desc")
          .text('{"fill": "#000"}');
};

function highlight(props){
    //             //change STROKE highlight method
    var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
        .style("stroke", "#ffffcc") //highlight color
        .style("stroke-width", "2px"); //highlight width
    //Call setlabel to create label
    setLabel(props);
};

//function to reset the element style on mouseout
function dehighlight(props){
  //             // STROKE DEHIGHLIGHT
  var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
        .style("stroke-width", "0px");
  //
  //   function getStyle(element, styleName){
  //       var styleText = d3.select(element)
  //           .select("desc")
  //           .text();
  //
  //       var styleObject = JSON.parse(styleText);
  //
  //       return styleObject[styleName];
  //       };

                        //FILL DEHIGHLIGHT
    // var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
    //     .transition()
    //     .duration(200)
    //     .style("fill", function(){
    //         return getStyle(this, "fill")
    //     });
    //
    // function getStyle(element, styleName){
    //     var styleText = d3.select(element)
    //         .select("desc")
    //         .text();
    //
    //     var styleObject = JSON.parse(styleText);
    //
    //     return styleObject[styleName];
    //     };
    //
    // // remove label on dehighlight
    // d3.select(".infolabel")
    //     .remove();

};

//function to create dynamic label
function setLabel(props){

    //Choosing text that appears in label
    var labelAttribute = "<center><h1>" + props[expressed] + "</h1></center>";

    //create info label div
    var infolabel = d3.select("div.retrievePanel")
        .append("infolabel")
        .attr("class", "infolabel")
        .attr("id", props.name.replace(/\s+/g, '') + "_label")
        .html(labelAttribute);

    var stateName = infolabel.append("div.retrievePanel")
        .attr("class", "labelname")
        .html(props.name);
};

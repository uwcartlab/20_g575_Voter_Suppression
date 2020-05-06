//begin script when window loads
window.onload = setMap();

// variables for data join from csv
var attrArray = ["OnlineRegImplementYr", "EarlyVotingStatus", "VoterIDRequirement", "ElectionDayVoteCenters", "RightsLosttoFelons", "IncorrectlyCastProvisionalVote", "Rating", "Grade"];
var expressed = attrArray[7]; //initial attribute
var colorClasses;
// var rectA;
// var rectB;
// var rectC;
// var rectD;
// var rectF;

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


// Constructor to create fill functions
// Function called depending on expanded panel
// function Fill(data, colorClasses) {
//   this.data = data;
//   this.colorClasses = [
//     "#f2f0f7",
//     "#cbc9e2",
//     "#9e9ac8",
//     "#756bb1",
//     "#54278f"
//   ];
// }
//function to create color scale generator
// function findFill(data){
    // PURPLE COLOR SCALE

function fillOnline(data, colorClasses) {
    if(!isNaN(data.properties.OnlineRegImplementYr)) {
      return colorClasses[0];
    } else {
      return colorClasses[4];
    }
  };

function fillEarly(data, colorClasses) {
    if(data.properties.EarlyVotingStatus == "Early Voting") {
      return colorClasses[0];
    } else if(data.properties.EarlyVotingStatus == "In-person absentee") {
      return colorClasses[1];
    } else if(data.properties.EarlyVotingStatus =="All-mail with EV options") {
      return colorClasses[2];
    } else if(data.properties.EarlyVotingStatus =="Enacted EV, not implemented"){
      return colorClasses[3];
    } else {
      return colorClasses[4];
    }
  };

  function fillID(data, colorClasses) {
    if(data.properties.VoterIDRequirement == "None") {
      return colorClasses[0];
    } else if(data.properties.VoterIDRequirement == "ID Requested (General)") {
      return colorClasses[1];
    } else if(data.properties.VoterIDRequirement =="Photo ID Requested") {
      return colorClasses[2];
    } else if(data.properties.VoterIDRequirement =="Strict Proof of Identity"){
      return colorClasses[3];
    } else {
      return colorClasses[4];
    }
  };

  function fillCenter(data, colorClasses) {
    if(data.properties.ElectionDayVoteCenters == "Yes") {
      return colorClasses[0];
    } else if(data.properties.ElectionDayVoteCenters =="Sometimes") {
      return colorClasses[2];
    } else {
      return colorClasses[4];
    }
  };

  function fillProvisional(data, colorClasses) {
    if(data.properties.IncorrectlyCastProvisionalVote == "Full Count") {
      return colorClasses[0];
    } else if(data.properties.IncorrectlyCastProvisionalVote == "Partial Count") {
      return colorClasses[1];
    } else if(data.properties.IncorrectlyCastProvisionalVote =="Does Not Count") {
      return colorClasses[2];
    } else {
      return colorClasses[4];
    }
  };

  function fillGrade(data, colorClasses) {
    console.log(colorClasses);
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
              highlight(d.properties, usaStates);
          })
          .on("mouseout", function(d){
              dehighlight(d.properties, usaStates);
          })
        .attr("fill", function(d) {
          return fillGrade(d);
        });


      //dehighlight for stroke
      // var desc = states.append("desc")
      //     .text('{"stroke": "#fff", "stroke-width": ".1px"}');

      //alternate dehighlight for fill
      var desc = states.append("desc")
          .text('{"fill": "#000"}');
};

// function setLegend() {
//   var x = 20,
//       width = 50,
//       height = 30;
//   var gradeArray = [
//     "A",
//     "B",
//     "C",
//     "D",
//     "F"
//   ];
//   var colorArray = [
//     "#f2f0f7",
//     "#cbc9e2",
//     "#9e9ac8",
//     "#756bb1",
//     "#54278f"
//   ];
//   var legend = d3.select(".panel-body")
//     .append("svg")
//     .attr("width", 350)
//     .attr("height", 300);
//
//   for(var i=0; i<gradeArray.length; i++) {
//     legend.append("rect")
//       .attr("x", x)
//       .attr("y", 50 * (i +1))
//       .attr("width", width)
//       .attr("height", height)
//       .style("fill", colorArray[i]);
//     legend.append("text")
//       .attr("x", x + 2 * width)
//       .attr("y", (50 * (i +1) + 20))
//       .text(gradeArray[i])
//       .attr("font", "Quicksand")
//       .attr("font-size", "20px")
//       .attr("fill", "black");
//   };
//
//   var gradeTitle = legend.append("text")
//     .attr("x", x)
//     .attr("y", 35)
//     .text("Composite Grade")
//     .attr("font", "Quicksand")
//     .attr("font-size", "24px")
//     .attr("fill", "black")
//     .attr("font-weight", "bold");
// };
// setLegend();

// Reexpress based on expanded panel
function reexpress(data) {

  colorClasses = [
    "#f2f0f7",
    "#cbc9e2",
    "#9e9ac8",
    "#756bb1",
    "#54278f"
];

  // Make variables for legend panels
  var gradePanel = d3.select("div.collapse1"),
    earlyPanel = d3.select("div.collapse2"),
    provisionalPanel = d3.select("div.collapse3"),
    onlinePanel = d3.select("div.collapse4"),
    idPanel = d3.select("div.collapse5"),
    centersPanel = d3.select("div.collapse6"),
    felonPanel = d3.select("div.collapse7");

  // Make conditional statements that call appropriate color fill functions
  gradePanel.onclick = function() {
    fillGrade(data, colorClasses)
  };

}

function highlight(props, usaStates){
    //             //change STROKE highlight method
    //Call setlabel to create label
    for(var i =0; i < usaStates.length; i++) {
      var tempStr = "." + usaStates[i].properties.StateAbb.replace(/\s+/g, '');
      d3.selectAll(tempStr)
        .style("opacity", "0.5");
    }
    var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
        .style("stroke", "#00FFFF") //highlight color
        .style("stroke-width", "2px")
        .style("opacity", "1"); //highlight width
    setLabel(props);
};

//function to reset the element style on mouseout
function dehighlight(props, usaStates, rectA, rectB, rectC, rectD, rectF){
  //             // STROKE DEHIGHLIGHT
  for(var i =0; i < usaStates.length; i++) {
    var tempStr = "." + usaStates[i].properties.StateAbb.replace(/\s+/g, '');
    d3.selectAll(tempStr)
      .style("opacity", "1");
  }
  var selected = d3.selectAll("." + props.StateAbb.replace(/\s+/g, ''))
        .style("stroke-width", "1.1px")
        .style("stroke", "#fff");
  defaultPanel();
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

  //Update retrieve panel inner HTML with hover
  var textBox = props.name +"<br/>" + "Grade: " + props.Grade + "<br/>";
  if(isNaN(props["OnlineRegImplementYr"])) {
    textBox+= "Online Registration: No<br/>";
  } else {
    textBox+= "Online Registration: Yes<br/>";
  };
  textBox+="Early Voting Status: " + props["EarlyVotingStatus"] + "<br/>" + "Voter ID Requirement: " + props["VoterIDRequirement"] + "<br/>";
  textBox+= "Election Day Vote Centers: " + props["ElectionDayVoteCenters"] + "<br/>";
  textBox+= "Voting Rights Lost to Felons: " + props["RightsLosttoFelons"] + "<br/>";
  textBox+= "Incorrectly Cast Provisional Vote: " + props["IncorrectlyCastProvisionalVote"] + "<br/>";

  document.getElementById("retrieveTitle").innerHTML=textBox;
  d3.select("#retrieveTitle")
    .style("size", "14pt")
    .style("color", "white"); //retrieve text color

};
function defaultPanel() {
  document.getElementById("retrieveTitle").innerHTML="No State Selected";
};

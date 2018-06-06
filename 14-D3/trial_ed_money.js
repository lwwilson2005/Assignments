// # Hair Metal Conclusion

// * Reading and understanding others' code is a big part of programming.  
//  In this activity, you will work in pairs to parse through code that allows
//   a user to click on an x-axis label and see smooth, dynamic changes in the graph.

// ## Instructions

// * Your task for the remainder of the class will be to pair up with a partner 
//   to discuss and dissect the code in `app.js`. Doing so will put you in a 
//   very good place to tackle the more difficult version of the homework assignment.


var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
//and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// Initial Params
var chosenXAxis = "college"
var chosenYAxis = "above_50000"

// ----------------------------------------------------------------------------------------------------------------
// ****X-AXIS**** function updates x-scale var upon click on axis label
function xScale(graphData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(graphData, d => d[chosenXAxis]) * 0.8,
    d3.max(graphData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width])

  return xLinearScale
};

// ****Y-AXIS**** function updates y-scale var upon click on axis label
function yScale(graphData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(graphData, d => d[chosenYAxis]) * 0.8,
    d3.max(graphData, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0])

  return yLinearScale
};

// ------------------------------------------------------------------------------------------------------------------------
// ****X-AXIS****function to update xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale)

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis)

  return xAxis
}

// ****Y-AXIS****function to update yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale)

  yAxis.transition()
    .duration(1000)
    .call(leftAxis)

  return yAxis
}

// -------------------------------------------------------------------------------------------------------------------
// ****X-AXIS****Update circlesGroup with a transition to new circle positions with axis label click
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1500)
    .attr("cx", d => newXScale(d[chosenXAxis]))

  return circlesGroup
};

// ****Y-AXIS****Update circlesGroup with a transition to new circle positions with axis label click
function renderYCircles(circlesGroup, newYScale, chosenYaxis) {

  circlesGroup.transition()
    .duration(1500)
    .attr("cy", d => newYScale(d[chosenYAxis]))

  return circlesGroup
};

// --------------------------------------------------------------------------------------------------------------------
// ****X-AXIS & (MAYBE Y-AXIS TOGETHER??????)****Function to update circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis == "college") {
    var label = "College Graduates"
  } else if (chosenXAxis == "male") {
    var label = "Males over 25";
  } else if (chosenXAxis == "female") {
    var label = "Females over 25";
  } else {
    var label = "Health Coverage"
  }

  if (chosenYAxis == "above_50000") {
    var ylabel = "Earning Over $50,000:";
  } else if (chosenYAxis == "under_50000") {
    var ylabel = "Earning Under $50,000:";
  } else if (chosenYAxis == "male") {
    var ylabel = "Who are males over 25:";
  } else if (chosenYAxis == "female") {
    var ylabel = "Who are females over 25:";
  } else {
    var ylabel = "Living Below Poverty Line:"
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>${label}<br>${ylabel}<br>${d[chosenXAxis]}%`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data);
  })
    // on mouseout event
    // .on("mouseout", function (data, index) {
    //   toolTip.hide(data);
    // });

  return circlesGroup
}


// Retrieve data from the CSV file and execute everything below
d3.csv("./data/2014_education_vs_50000_income.csv", function (err, graphData) {
  if (err) throw err;

  // parse data
  graphData.forEach(function (data) {
    data.college = +data.college;
    data.above_50000 = +data.above_50000;
    data.below_50000 = +data.below_50000;
    data.male = +data.male;
    data.female = +data.female;
    data.poverty = +data.poverty;
    data.health_insurance = +data.health_insurance;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(graphData, chosenXAxis)
  // var yLinearScale = yScale(graphData, chosenYAxis)
  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(graphData, d => d[chosenYAxis])])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale)

  var leftAxis = d3.axisLeft(yLinearScale)

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .attr("transform", `translate(${height, 0})`)
    .call(leftAxis)

  console.log(chosenXAxis)
  console.log(chosenYAxis)

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(graphData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "orange")
    .attr("opacity", ".3")
  // ---------------------------------------------------------------------------------------------------------------------------------
  // Create group for multiple y-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)

  // creates x-axis label to click on
  var collegeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("value", "college") //value to grab for event listener
    .classed("active", true)
    .text("Graduated College");

  var male_label = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .attr("value", "male") //value to grab for event listener
    .classed("inactive", true)
    .text("Males 25+");

  var female_label = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("text-anchor", "middle")
    .attr("value", "female") //value to grab for event listener
    .classed("inactive", true)
    .text("Females 25+");

  var health_insurance_label = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("text-anchor", "middle")
    .attr("value", "health_insurance") //value to grab for event listener
    .classed("inactive", true)
    .text("Health Insurance Coverage");


  // Create group for multiple y-axis labels
  var labelsyGroup = chartGroup.append("g")
    .attr("transform", `translate(${margin.left - 150}, ${margin.top + 20})`)

  // creates y-axis label to click on
  var above_50000_Label = labelsyGroup.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -60 - margin.left / 2)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "above_50000") //value to grab for event listener
    .classed("active", true)
    .text("Income Over $50,000");

  var below_50000_label = labelsyGroup.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -60 - margin.left / 2 + 20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "below_50000") //value to grab for event listener
    .classed("inactive", true)
    .text("Income Under $50,000");

  var poverty_label = labelsyGroup.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -60 - margin.left / 2 + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "poverty") //value to grab for event listener
    .classed("inactive", true)
    .text("Below Poverty Line");

  var male_label_y = labelsyGroup.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -60 - margin.left / 2 + 60)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "male") //value to grab for event listener
    .classed("inactive", true)
    .text("Males 25+");

  var female_label_y = labelsyGroup.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -60 - margin.left / 2 + 80)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "female") //value to grab for event listener
    .classed("inactive", true)
    .text("Females 25+");



  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup)

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      var value = d3.select(this).attr("value")
      if (value != chosenXAxis) {

        // replaces chosenXaxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)



        // functions here found above csv import

        // updates x scale for new data
        xLinearScale = xScale(graphData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


        if (chosenXAxis == "college") {
          collegeLabel
            .classed("active", true)
            .classed("inactive", false)
          male_label
            .classed("active", false)
            .classed("inactive", true)
          female_label
            .classed("active", false)
            .classed("inactive", true)
          health_insurance_label
            .classed("active", false)
            .classed("inactive", true)
        }
        else if (chosenXAxis == "male") {
          collegeLabel
            .classed("active", false)
            .classed("inactive", true)
          male_label
            .classed("active", true)
            .classed("inactive", false)
          female_label
            .classed("active", false)
            .classed("inactive", true)
          health_insurance_label
            .classed("active", false)
            .classed("inactive", true)
        }
        else if (chosenXAxis == "female") {
          collegeLabel
            .classed("active", false)
            .classed("inactive", true)
          male_label
            .classed("active", false)
            .classed("inactive", true)
          female_label
            .classed("active", true)
            .classed("inactive", false)
          health_insurance_label
            .classed("active", false)
            .classed("inactive", true)
        }
        else {
          collegeLabel
            .classed("active", false)
            .classed("inactive", true)
          male_label
            .classed("active", false)
            .classed("inactive", true)
          female_label
            .classed("active", false)
            .classed("inactive", true)
          health_insurance_label
            .classed("active", true)
            .classed("inactive", false)
        };
      };

      // ----------------------------------------------------------------------------

      labelsyGroup.selectAll("text")
        .on("click", function () {
          // get value of Selection
          var value = d3.select(this).attr("value")
          if (value != chosenYAxis) {


            chosenYAxis = value;

            console.log(chosenYAxis)

            // functions here found above csv import

            // updates y scale for new data
            yLinearScale = yScale(graphData, chosenYAxis);

            // updates y axis with transition
            yAxis = renderYAxes(yLinearScale, yAxis);

            // updates circles with new y values
            circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

            if (chosenYAxis == "above_50000") {
              above_50000_Label
                .classed("active", true)
                .classed("inactive", false)
              below_50000_label
                .classed("active", false)
                .classed("inactive", true)
              poverty_label
                .classed("active", false)
                .classed("inactive", true)
              male_label_y
                .classed("active", false)
                .classed("inactive", true)
              female_label_y
                .classed("active", false)
                .classed("inactive", true)
            }
            else if (chosenYAxis == "below_50000") {
              above_50000_Label
                .classed("active", false)
                .classed("inactive", true)
              below_50000_label
                .classed("active", true)
                .classed("inactive", false)
              poverty_label
                .classed("active", false)
                .classed("inactive", true)
              male_label_y
                .classed("active", false)
                .classed("inactive", true)
              female_label_y
                .classed("active", false)
                .classed("inactive", true)
            }
            else if (chosenYAxis == "poverty") {
              above_50000_Label
                .classed("active", false)
                .classed("inactive", true)
              below_50000_label
                .classed("active", false)
                .classed("inactive", true)
              poverty_label
                .classed("active", true)
                .classed("inactive", false)
              male_label_y
                .classed("active", false)
                .classed("inactive", true)
              female_label_y
                .classed("active", false)
                .classed("inactive", true)
            }
            else if (chosenYAxis == "male") {
              above_50000_Label
                .classed("active", false)
                .classed("inactive", true)
              below_50000_label
                .classed("active", false)
                .classed("inactive", true)
              poverty_label
                .classed("active", false)
                .classed("inactive", true)
              male_label_y
                .classed("active", true)
                .classed("inactive", false)
              female_label_y
                .classed("active", false)
                .classed("inactive", true)
            }
            else {
              above_50000_Label
                .classed("active", false)
                .classed("inactive", true)
              below_50000_label
                .classed("active", false)
                .classed("inactive", true)
              poverty_label
                .classed("active", false)
                .classed("inactive", true)
              male_label_y
                .classed("active", false)
                .classed("inactive", true)
              female_label_y
                .classed("active", true)
                .classed("inactive", false)

            }



          };
        });
      // ----------------------------------------------------------------------------

    });
});


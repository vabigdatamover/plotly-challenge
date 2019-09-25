function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  
  const metadataURL = "/metadata/" +sample;
  d3.json(metadataURL).then((data) => {
 
  // Use d3 to select the panel with id of `#sample-metadata`
  metadatapanel = d3.select("#sample-metadata");
  
  
  // Use `.html("") to clear any existing metadata
  metadatapanel.html("");

  // Use `Object.entries` to add each key and value pair to the panel
  Object.entries(data).forEach(([key, value]) => {
    metadatapanel.append("p").text(`${key}: ${value}`);

});
buildGauge(data.WFREQ);
});

}
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

//     var data = [
//       {
//         domain: { x: [0, 1], y: [0, 1] },
//         value: 270,
//         title: { text: "Speed" },
//         type: "indicator",
//         mode: "gauge+number"
//       }
//     ];
    
//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot(gd, data, layout);
// }

// function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  const sampleDataURL = "/samples/" +sample;
  d3.json(sampleDataURL).then((data)=> {

    // @TODO: Build a Bubble Chart using the sample data

    

    // @TODO: Build a Pie Chart

    results = [];
    for (var i = 0; i < data.otu_ids.length; i++){
      results.push({"otu_ids":data.otu_ids[i], "otu_labels": data.otu_labels[i], "sample_values":data.sample_values[i] });

    };
    results.sort((a,b) => b.sample_values - a.sample_values);
    results =results.slice(0,10);
    console.log(results);
    // Trace for the sample data
    var trace1 ={
      values:results.map(row => row.sample_values),
      labels:results.map(row => row.otu_ids),
      hovertext: results.map(row => row.otu_labels),
      hoverinfo: "hovertext",
      type:"pie"
      //orientation: "h"

    };
    var pieChart = [trace1];
    Plotly.newPlot("pie", pieChart);


    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

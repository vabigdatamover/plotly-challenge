//GB setup code to get into the right environment
// conda deactivate
// env\Scripts\activate.bat
// 

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
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    Object.entries(data).forEach(([key, value]) => {
      metadatapanel.append("p").text(`${key}: ${value}`);

});
  buildGauge(data.WFREQ);
});
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  const sampleDataURL = "/samples/" +sample;
  d3.json(sampleDataURL).then((data)=> {

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      y:data.otu_ids,
      x:data.sample_values,
      type: "scatter",
      mode: 'markers',
      marker: {
        size:data.sample_values,
        color: data.otu_ids 
      },
      text: data.otu_labels
    };

    var bubbleChart = [trace1];
    Plotly.newPlot("bubble", bubbleChart);
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(`/samples/${sample}`).then(function(data) {  
      var pie_values = data.sample_values.slice(0,10);
        var pie_labels = data.otu_ids.slice(0,10);
        var pie_hover = data.otu_labels.slice(0,10);
        var data = [{
          values: pie_values,
          labels: pie_labels,
          hovertext: pie_hover,
          type: 'pie'
        }];
        Plotly.newPlot('pie', data);
      });
  })
}
// Wire Gauge Feature

function buildGauge(wfreq) {
  var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Scrubs per week" },
        type: "indicator",
        mode: "gauge+number"
    }
];
var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);
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
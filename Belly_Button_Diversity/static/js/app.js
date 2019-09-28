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
//buildGauge(data.WFREQ);
});
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      y: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      mode: 'markers',
      marker: {
        size: 40,
        color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Scatter Plot with a Color Dimension'
    };
    
    Plotly.newPlot('myDiv', data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var data = [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('myDiv', data, layout);

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
    // buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

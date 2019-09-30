function buildMetadata(sample) {
    ​
          // @TODO: Complete the following function that builds the metadata panel
          // Use `d3.json` to fetch the metadata for a sample
          // Use d3 to select the panel with id of `#sample-metadata`
      const metadataURL = "/metadata/" +sample;
      d3.json(metadataURL).then((data) => {
        metadatapanel = d3.select("#sample-metadata");
    ​
          // Use `.html("") to clear any existing metadata
        metadatapanel.html("");
    ​
          // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(data).forEach(([key, value]) => {
          metadatapanel.append("p").text(`${key}: ${value}`);
    ​
        buildGauge(data.WFREQ);
    ​
        });
      });
    ​
        // BONUS: Build the Gauge Chart
       // buildGauge(data.WFREQ);
       
    ​
    }
    ​
    ​
    function buildCharts(sample) {
    ​
        // @TODO: Use `d3.json` to fetch the sample data for the plots
      d3.json(`/samples/${sample}`).then(function(data) {
    ​
        // @TODO: Build a Bubble Chart using the sample data
        const otu_ids = data.otu_ids;
        const otu_labels = data.otu_labels;
        const sample_values = data.sample_values;
    ​
    ​
        var bubbleData = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
            color: otu_ids,
            size: sample_values
          } 
        };
      
        var data = [bubbleData];
    ​
        var layout = {
          xaxis: { title: "OTU ID"},
        };
    ​
        Plotly.newPlot('bubble', data, layout);
       
    ​
        // @TODO: Build a Pie Chart
        d3.json(`/samples/${sample}`).then(function(data) {  
        var pie_values = data.sample_values.slice(0,10);
          var pie_labels = data.otu_ids.slice(0,10);
          var pie_hover = data.otu_labels.slice(0,10);
    ​
          var data = [{
            values: pie_values,
            labels: pie_labels,
            hovertext: pie_hover,
            type: 'pie'
          }];
    ​
          Plotly.newPlot('pie', data);
    ​
        });
    ​
    ​
    ​
         
    ​
      });
    ​
    ​
    ​
    }
    ​
    ​
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
    ​
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
    }
    ​
    ​
    function init() {
      // Grab a reference to the dropdown select element
      var selector = d3.select("#selDataset");
    ​
      // Use the list of sample names to populate the select options
      d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    ​
        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
    }
    ​
    function optionChanged(newSample) {
      // Fetch new data each time a new sample is selected
      buildCharts(newSample);
      buildMetadata(newSample);
    }
    ​
    // Initialize the dashboard
    init();
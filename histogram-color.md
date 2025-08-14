## Histogram 

Source: <https://chat.openai.com/?model=gpt-4>


<svg width="500" height="500" id="histogram"></svg>



<script>

import d3 from "https://d3js.org/d3.v6.min.js"

// Let's assume this is your data.
const data = [10, 20, 21, 30, 33, 24, 32, 16, 25, 34, 45, 38, 30, 25, 33, 29, 45, 55, 60, 52, 70, 65];

// Set the dimensions and margins of the graph
const margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// Append SVG
const svg = d3.select(lively.query(this, "#histogram"))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create a scale for X & Y
const x = d3.scaleLinear()
    .domain([0, d3.max(data)]) // Input
    .range([0, width]); // Output

const y = d3.scaleLinear()
    .range([height, 0]); // Output

// Create a color scale
const color = d3.scaleLinear()
    .domain([0, d3.max(data)]) // Input (domain of your data)
    .range(["#69b3a2", "#404080"]); // Output (color range you want)

// Create a histogram generator
const histogram = d3.histogram()
    .value(d => d) // We're just using the value
    .domain(x.domain()) // Then the domain of the graphic
    .thresholds(x.ticks(10)); // The number of bins

const bins = histogram(data);

y.domain([0, d3.max(bins, d => d.length)]); // Scale the range of the data in the y domain

// Append the bar rectangles to the SVG element
svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 1)
    .attr("transform", d => "translate(" + x(d.x0) + "," + y(d.length) + ")")
    .attr("width", d => x(d.x1) - x(d.x0) - 1)
    .attr("height", d => height - y(d.length))
    .style("fill", d => color(d.x0)); // Apply color scale here

// Add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));
""  
</script>
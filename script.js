// Set dimensions 
const width = 5000;  //
const height = 350000;

// Append the SVG object to the body
const svg = d3.select("#tree-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50,0)");


// Create the tree layout
const tree = d3.tree().size([height, width - 3000]);  // Reduce width for tree layout to leave more space for labels

// Load JSON data
d3.json("output_data.json").then(data => {
  const root = d3.hierarchy(data);

  // Assign the tree layout to the data
  tree(root);

  // Links
  svg.selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2)
    .attr("d", d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x));

  // Nodes
  const node = svg.selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
  .attr("r", 5)
  .attr("fill", d => {
    if (d.data.risk === "high") return "red";
    else if (d.data.risk === "medium") return "orange";
    else return "green";
  });
  
  // Adjust label positioning with more space
  node.append("text")
    .attr("dy", 3)
    .attr("x", d => d.children ? -10 : 40)  // Further increase spacing for right-side labels
    .style("text-anchor", d => d.children ? "end" : "start")
    .style("font-size", "11px")
    .text(d => d.data.name);
}).catch(error => {
  console.error("Error loading the data:", error);
});

// Add colored circles for each risk level
legendData.forEach((d, i) => {
  legend.append("circle")
    .attr("cx", 0)
    .attr("cy", 30 + i * 20)
    .attr("r", 5)
    .attr("fill", d.color);

  legend.append("text")
    .attr("x", 15)
    .attr("y", 30 + i * 20)
    .attr("dy", "0.35em")
    .text(d.label);
});

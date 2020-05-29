var data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];
var chart_width = 800;
var chart_height = 400;

// create svg element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Create circles 
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => {
        return d[0];
    })
    .attr('cy', d => {
        return d[1];
    })
    .attr('r', d => {
        return d[1] / 10;
    })
    .attr('fill', '#D1AB0E');

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => {
        return '[' + d.join(']-[') + ']';
    })
    .attr('x', d => d[0])
    .attr('y', d => d[1]);
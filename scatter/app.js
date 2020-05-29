const data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];
const chart_width = 800;
const chart_height = 400;
const min_radius = 5;
const max_radius = 40;

const padding = 50;

// create svg element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Create Scales
const x_scale = d3.scaleLinear()
    .domain([
        d3.min(data, d => d[0]),
        d3.max(data, d => d[0])
    ])
    .range([padding, chart_width - padding]);

const y_scale = d3.scaleLinear()
    .domain([
        d3.min(data, d => d[1]),
        d3.max(data, d => d[1])
    ])
    .range([chart_height - padding, padding]);

const r_scale = d3.scaleLinear()
    .domain([
        d3.min(data, d => d[1]),
        d3.max(data, d => d[1])
    ])
    .range([min_radius, max_radius])

// Create circles 
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => {
        return x_scale(d[0]);
    })
    .attr('cy', d => {
        return y_scale(d[1]);
    })
    .attr('r', d => {
        return r_scale(d[1]);
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
    .attr('text-anchor', 'middle')
    .attr('x', d => x_scale(d[0]))
    .attr('y', d => y_scale(d[1]));
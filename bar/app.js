var data = [];
for (var i = 0; i < d3.randomUniform(1, 800)(); i++) {
    var num = Math.floor(d3.randomUniform(1, Math.random() * 200)());
    data.push(num);
}

var chart_width = 800;
var chart_height = 400;
var bar_padding = chart_width / data.length * 0.2;
var bar_width = chart_width / data.length - bar_padding;


// create svg element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// bind data and create bars   
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return i * (chart_width / data.length);
    })
    .attr('y', d => {
        return chart_height - d;
    })
    .attr('width', bar_width)
    .attr('height', d => {
        return d;
    })
    .attr('fill', '#7ED26D');

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => {
        return i * (chart_width / data.length) + bar_width / 2;
    })
    .attr('y', d => {
        return chart_height - d + 15;
    })
    .attr('text-anchor', 'middle')
    .attr('font-size', 11)
    .attr('font-weight', 900)
    .attr('fill', '#fff');
const series = [];
for (let i = 0; i < d3.randomUniform(1, 800)(); i++) {
    const num = Math.floor(d3.randomUniform(1, Math.random() * 200)());
    series.push(num);
}

const chart_width = 800;
const chart_height = 400;
const graph_paddingY = 15;
const graph_paddingX = 0.5;
const bar_padding = 0.25;

// create svg element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);



// Create Scales
const x_scale = d3.scaleBand()
    .domain(d3.range(series.length))
    .rangeRound([0, chart_width])
    //.rangeRound([0, chart_width])
    .paddingInner(bar_padding)
    .paddingOuter(graph_paddingX);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(series, d => d)])
    .range([graph_paddingY, chart_height - graph_paddingY]);

// bind series and create bars   
svg.selectAll('rect')
    .data(series)
    .enter()
    .append('rect')
    .attr('x', (d, i) => x_scale(i))
    .attr('y', d => chart_height - y_scale(d))
    .attr('width', x_scale.bandwidth())
    .attr('height', d => y_scale(d) - graph_paddingY)
    .attr('fill', '#7ED26D');

// create labels
svg.selectAll('text')
    .data(series)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
    .attr('y', d => chart_height - y_scale(d) + 15)
    .attr('text-anchor', 'middle')
    .attr('font-size', 11)
    .attr('font-weight', 900)
    .attr('fill', '#fff');
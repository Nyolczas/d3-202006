const series = [];
for (let i = 0; i < d3.randomUniform(1, 800)(); i++) {
    const num = Math.floor(d3.randomUniform(1, Math.random() * 200)());
    series.push(num);
}

const chart_width = 800;
const chart_height = 400;
const bar_padding = chart_width / series.length * 0.2;
const bar_width = chart_width / series.length - bar_padding;
const chart_xPadding = bar_width / 2;
const chart_yPadding = chart_xPadding;

// create svg element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Create Scales
const y_scale = d3.scaleLinear()
    .domain([0, d3.max(series, d => d)])
    .range([chart_yPadding, chart_height - chart_yPadding]);

// bind series and create bars   
svg.selectAll('rect')
    .data(series)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return i * ((chart_width - chart_xPadding * 2) / series.length) +
            chart_xPadding +
            bar_padding / 2;
    })
    .attr('y', d => {
        return chart_height - y_scale(d);
    })
    .attr('width', bar_width)
    .attr('height', d => {
        return y_scale(d);
    })
    .attr('fill', '#7ED26D');

// create labels
svg.selectAll('text')
    .data(series)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => {
        return i * (((chart_width - chart_xPadding * 2) / series.length)) +
            chart_xPadding +
            bar_padding / 2 +
            bar_width / 2;
    })
    .attr('y', d => {
        return chart_height - y_scale(d) + 15;
    })
    .attr('text-anchor', 'middle')
    .attr('font-size', 11)
    .attr('font-weight', 900)
    .attr('fill', '#fff');
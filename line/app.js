const maxValue = Math.random() * 15002;
const series = [];
let day = 0;
let month = 6;
for (var i = 0; i < Math.round(Math.random() * 60) + 1; i++) {
    day++;
    if (day < 10) {
        series.push({
            date: `${month}/0${day}/2020`,
            val: Math.round(d3.randomUniform(1, maxValue)())
        })
    } else if (day > 30) {
        month++;
        day = 1;
        series.push({
            date: `${month}/0${day}/2020`,
            val: Math.round(d3.randomUniform(1, maxValue)())
        })
    } else {
        series.push({
            date: `${month}/${day}/2020`,
            val: Math.round(d3.randomUniform(1, maxValue)())
        })
    }
}


const time_parse = d3.timeParse('%m/%d/%Y');
const time_format = d3.timeFormat('%b, %e'); //https://github.com/d3/d3-time-format 

const chart_width = d3.select('#chart1').node().getBoundingClientRect().width;
const chart_height = chart_width * 0.618;

const xAxis_height = 19;
// yAxis with calculation
const oneCharacterWidth = 5;
const yAxisCaracterConut = (d3.max(series, d => d.val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).length;
const yAxis_width = 10 + oneCharacterWidth * yAxisCaracterConut;
const plot_yPadding = 8;
const plot_xPadding = 15;

// format date
series.forEach((e, i) => {
    series[i].date = time_parse(e.date);
});

// Scales
const x_scale = d3.scaleTime()
    .domain([
        d3.min(series, d => d.date),
        d3.max(series, d => d.date)
    ])
    .range([yAxis_width + plot_xPadding, chart_width - yAxis_width]);

const y_scale = d3.scaleLinear()
    .domain([
        d3.min(series, d => d.val),
        d3.max(series, d => d.val)
    ])
    .range([
        chart_height - xAxis_height - plot_yPadding, plot_yPadding
    ]);

// append the svg object to the body of the page
const svg = d3.select('#chart1')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Add X axis --> it is a date format
const x_axis = d3.axisBottom(x_scale)
    //.attr('width', x_scale)
    .ticks(4)
    .tickFormat(time_format);

const y_axis = d3.axisLeft(y_scale)
    .ticks(5);

svg.append('g')
    .attr('transform', `translate(0,${chart_height - xAxis_height})`)
    .call(x_axis);
svg.append('g')
    .attr('transform', `translate(${yAxis_width}, 0)`)
    .call(y_axis);

//Create Line Chart
const line = d3.line()
    .x(d => x_scale(d.date))
    .y(d => y_scale(d.val));

svg.append('path')
    .datum(series)
    .attr('fill', 'none')
    .attr('stroke', '#00A6FD')
    .attr('stroke-width', 3)
    .attr('d', line);
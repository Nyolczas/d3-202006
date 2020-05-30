const chart_width = 800;
const chart_height = 400;
const min_radius = 5;
const max_radius = 40;

const padding = 50;

const series = [{
        date: '06/01/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/02/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/03/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/04/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/05/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/06/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/07/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/08/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/09/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/10/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/11/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/12/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/13/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/14/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
    {
        date: '06/15/2020',
        num: Math.round(d3.randomUniform(1, 500)())
    },
];

const time_parse = d3.timeParse('%m/%d/%Y');
const time_format = d3.timeFormat('%b, %e'); //https://momentjs.com/  https://github.com/d3/d3-time-format

// Loop through each date 
series.forEach((e, i) => {
    series[i].date = time_parse(e.date);
});
//--------------------------------------------------------------------
// create svg element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);
//--------------------------------------------------------------------
// Create Scales
const x_scale = d3.scaleTime()
    .domain([
        d3.min(series, d => d.date),
        d3.max(series, d => d.date)
    ])
    .range([padding, chart_width - padding]);

const y_scale = d3.scaleLinear()
    .domain([
        d3.min(series, d => d.num),
        d3.max(series, d => d.num)
    ])
    .range([chart_height - padding, padding]);

const a_scale = d3.scaleSqrt()
    .domain([
        d3.min(series, d => d.num),
        d3.max(series, d => d.num)
    ])
    .range([min_radius, max_radius]);

//--------------------------------------------------------------------
// Create Axis
const x_axis = d3.axisBottom(x_scale)
    .ticks(4);

// .tickValues([
//     'Wed 03', 'Sat 13'
// ]);

svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
    .call(x_axis);


const y_axis = d3.axisLeft(y_scale)
    .ticks(5)
    .tickFormat(d => d + ' %');

svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(y_axis);

//--------------------------------------------------------------------
// Create circles 
svg.selectAll('circle')
    .data(series)
    .enter()
    .append('circle')
    .attr('cx', d => {
        return x_scale(d.date);
    })
    .attr('cy', d => {
        return y_scale(d.num);
    })
    .attr('r', d => {
        return a_scale(d.num);
    })
    .attr('fill', '#D1AB0E');


// Create Labels
svg.append('g').selectAll('p')
    .data(series)
    .enter()
    .append('text')
    .text(d => {
        return time_format(d.date);
    })
    .attr('text-anchor', 'middle')
    .attr('x', d => x_scale(d.date))
    .attr('y', d => y_scale(d.num));
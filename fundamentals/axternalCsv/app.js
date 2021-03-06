d3.csv('data.csv').then(data => {
    console.log(data);
    //generate(data.columns)
})

const generate = (dataset) => {
    var el = d3.select('body')
        .selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(function (d) {
            return 'Ez a ' + d + '. sor';
        })
        .classed('font-weight-bold', true)
        .classed('framed', function (d) {
            return d % 2 == 0;
        })
        .style('color', function (d) {
            if (d % 2 == 0) {
                return 'red';
            } else {
                return 'green';
            }
        });

    console.log(el);
}
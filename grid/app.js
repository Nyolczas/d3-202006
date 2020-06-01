// generate data 

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
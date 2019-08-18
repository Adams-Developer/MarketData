const moment = require('moment');

const marketPositions = [
    {"date": "10-07-2019", "close": 68.55, "open": 74.55},
    {"date": "09-07-2019", "close": 74.55, "open": 69.55},
    {"date": "08-07-2019", "close": 69.55, "open": 62.55},
    {"date": "07-07-2019", "close": 62.55, "open": 56.55},
    {"date": "06-07-2019", "close": 56.55, "open": 59.55},
    {"date": "07-07-2019", "close": 59.86, "open": 65.86},
    {"date": "06-07-2019", "close": 62.62, "open": 65.62},
    {"date": "03-07-2019", "close": 64.48, "open": 60.48},
    {"date": "02-07-2019", "close": 60.98, "open": 55.98},
    {"date": "01-07-2019", "close": 58.13, "open": 53.13},
    {"date": "30-06-2019", "close": 68.55, "open": 74.55},
    {"date": "29-06-2019", "close": 74.55, "open": 69.55},
    {"date": "28-06-2019", "close": 69.55, "open": 62.55},
    {"date": "27-06-2019", "close": 62.55, "open": 56.55},
    {"date": "26-06-2019", "close": 56.55, "open": 59.55},
    {"date": "25-06-2019", "close": 59.86, "open": 65.86},
    {"date": "24-06-2019", "close": 62.62, "open": 65.62},
    {"date": "23-06-2019", "close": 64.48, "open": 60.48},
    {"date": "22-06-2019", "close": 60.98, "open": 55.98},
    {"date": "21-06-2019", "close": 58.13, "open": 53.13}
];

let counter = 0;

//Socket.IO serves data in real time(simulated) updating every 5 secs.

//Generate random number every time its called to add it ot or subtract from
function updateMarket() {
    const diff = Math.floor(Math.random() * 1000) / 100;
    
    const lastDay = moment(marketPositions[0].date, 'DD-MM-YYYY').add(1, 'days');

    let open;
    
    let close;

    if (counter % 2 === 0) {
        open = marketPositions[0].open + diff;
        close = marketPositions[0].close + diff;
    } else {
        open = Math.abs(marketPositions[0].open - diff);
        close = Math.abs(marketPositions[0].close - diff);
    }

    marketPositions.unshift({
        date: lastDay.format('DD-MM-YYYY'),
        open,
        close
    });

    counter++;
}

module.exports = {
    marketPositions,
    updateMarket,
};
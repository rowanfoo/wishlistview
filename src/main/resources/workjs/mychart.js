
var seriesCounter = 0;
var chart;
var date = new Date();



/**
 * Create the chart when all data is loaded
 * @returns {undefined}
 */
function createChart(name ,seriesOptions , volume) {

    // create the chart
    // chart = new  Highcharts.StockChart('container', {
    chart = new Highcharts.StockChart(name, {

        chart: {
            width: 1100,
            height: 808
        },


        legend: {
            align: 'right',
            enabled: false
        },

        xAxis: {
            min: Date.UTC(date.getFullYear() - 1, 1, 1, 16, 00), //previous day  at 16.00
            max: new Date().getTime() //get actual time
        },
        yAxis: [{

            title: {
                text: 'OHLC'
            },
            top: 100,
            height: 550,

        },
        {
            labels: {
                align: 'right',
                x: -1
            },
            title: {
                text: 'Volume'
            },
            top: 600,
            height: 100,

            lineWidth: 2
        }
        ],






        rangeSelector: {
            enabled: false
        },

        navigator: {
            enabled: false
        },

        tooltip: {
            split: true
        },

        series: [{
            type: 'ohlc',
            name: 'AAPL',
            id: 'aapl',
            data: seriesOptions
        },
            {
                type: 'sma',
                name: 'sma50',
                linkedTo: 'aapl',
                color: 'Aqua',
                params: {
                    period: 50
                }
            },

        {
            type: 'column',
            name: 'Volume',
            id: 'volume',
            data: volume,
            color:'grey',
            yAxis: 1
         },

        ]
    });
};


function  chartfunc($http ,$rootScope , code ) {

    var date = new Date();
    var year = date.getFullYear() - 1;
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

//    var myurl = "http://localhost:8070/data?code=" + code+ "&date=" + year + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
//    $rootScope.config.data

    var myurl = $rootScope.config.data+'?code=' + code+ "&date=" + year + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);


    console.log('------------myurlsss------------ ' + myurl);

    var mydate=[];
    $http.get(myurl).then(function (data) {
        // console.log(JSON.stringify(data, null, "    "));

        var seriesOptions = [];
        var volume = [];
        for (i in data.data) {

            var mycolor='silver';
            if(data.data[i].changepercent  < -0.04){
                mycolor='darkred';
            }

            seriesOptions.push(
                {
                    x: new Date(data.data[i].date).getTime(), // the date
                    open: data.data[i].open_price, // open
                    high: data.data[i].day_high_price, // high
                    low: data.data[i].day_low_price, // low
                    close: data.data[i].last_price,// close
                    color: mycolor
                }
            );


            if(data.data[i].changepercent > 0){
                volume.push( {x:new Date(data.data[i].date).getTime(),y: data.data[i].volume,color:'LIGHTGREEN'});

            }else
            {
                volume.push( { x:new Date(data.data[i].date).getTime(),y: data.data[i].volume, color:'#CC0033' });
            }






        }
        console.log('------------DONE------------ ');
        createChart('container1', seriesOptions,volume);
        chart.series.forEach(function (ser) {
            ser.update({
                dataGrouping: {
                    units: [['day', [1]]],
                    groupPixelWidth: 10
                }
            }, false);
        });





        chart.redraw();

    });
}//end http

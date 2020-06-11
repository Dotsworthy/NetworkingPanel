import React from 'react';
import Chart from 'react-google-charts';

const options = {
        animation: {
            startup: 'true',
            duraction: 50,
            easing: 'in',
        },
        title: 'Total Upload & Downloads',
        titleTextStyle: {
            fontName: 'Nunito',
        },
        // height: '100%',
        // width: '100%',
        backgroundColor: { fill: 'transparent'},
        colors: ['#FF1053', '#B3EFB2'],
        lineWidth: 3,
        legend: { 
            position: 'top',
            textStyle: {
                fontName: 'Nunito',
            },
        } ,
        hAxis: { 
            title: 'Time', 
            titleTextStyle: {
                 color: 'parent',
                 fontName: 'Nunito',
                },
                textStyle: {
            fontSize: 9,
            fontName: 'Nunito'
        } },
        vAxis: {
            title: 'Mbs',
            titleTextStyle: {
                fontName: 'Nunito',
            },
            textStyle: {
                fontName: 'Nunito',
            },
            minValue: 0 },
        series: {
            1: { curveType: 'function' },
        },
}



const TotalDataChart = (props) => {

    return(
     <div>
        <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={ props.chartData }
            options={options}
        />
    </div>
    )
}

export default TotalDataChart;
import React from 'react';
import Chart from 'react-google-charts';

const lightOptions = {
        animation: {
            startup: 'true',
            duraction: 50,
            easing: 'in',
        },
        title: 'Total Upload & Downloads',
        titleTextStyle: {
            fontName: 'Nunito',
        },
        height: '100%',
        width: '100%',
        backgroundColor: { fill: 'transparent'},
        colors: ['#FF1053', '#B3EFB2'],
        lineWidth: 3,
        legend: { 
            position: 'bottom',
            textStyle: {
                fontName: 'Nunito',
            },
        } ,
        hAxis: { 
            title: 'Time', 
            titleTextStyle: {
                 color: '#333',
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

const darkOptions = {
    title: 'Total Upload & Downloads',
    titleTextStyle: {
        color: 'white',
        fontName: 'Nunito',
    },
    height: '100%',
    width: '100%',
    backgroundColor: { fill: 'transparent'},
    colors: ['#FAA916', '#C8D3D5'],
    lineWidth: 3,
    legend: { 
        position: 'bottom',
        textStyle: {
            fontName: 'Nunito',
            color: 'white',
        },
    } ,
    hAxis: {
        title: 'Time', 
        titleTextStyle: {
             color: 'white',
             fontName: 'Nunito',
            },
        gridlines: {
            color: '#F2F3F4'
        }, 
        textStyle: {
        fontSize: 9,
        color: 'white',
        fontName: 'Nunito',
        } 
    },
    vAxis: { 
        title: 'Mbs',
        titleTextStyle: {
            color: 'white',
            fontName: 'Nunito',
        },
        textStyle: {
            color: 'white',
            fontName: 'Nunito',
        }, 
        minValue: 0 
    },
    series: {
        1: { curveType: 'function' },
    },
}



const TotalDataChart = (props) => {

    return(
     <div>
        <Chart className = "chart"
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={ props.chartData }
            options={props.darkMode ? darkOptions : lightOptions }
        />
    </div>
    )
}

export default TotalDataChart;
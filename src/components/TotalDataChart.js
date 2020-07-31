import React from 'react';
import Chart from 'react-google-charts';

const lightOptions = {
    animation: {
        startup: 'true',
        duraction: 50,
        easing: 'in',
    },
    titleTextStyle: {
        fontName: 'Nunito',
    },
    height: '100%',
    width: '100%',
    backgroundColor: { fill: 'transparent'},
    colors: ['#FF1053', '#69E067'],
    lineWidth: 2,
    legend: { 
        position: 'top',
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
        },
        showTextEvery: 5,
    },
    vAxis: {
        title: 'Mbs',
        titleTextStyle: {
            fontName: 'Nunito',
        },
        textStyle: {
            fontName: 'Nunito',
        },
        minValue: 0,
        viewWindow: {
            min: 0
        },
     },
    series: {
        1: { curveType: 'function' },
    },
}

const darkOptions = {
titleTextStyle: {
    color: 'white',
    fontName: 'Nunito',
},
height: '100%',
width: '100%',
backgroundColor: { fill: 'transparent'},
colors: ['#FF1053', '#69E067'],
lineWidth: 2,
legend: { 
    position: 'top',
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
    },
    showTextEvery: 5, 
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
    minValue: 0,
    viewWindow: {
        min: 0
    },
},
series: {
    1: { curveType: 'function' },
},
}




const TotalDataChart = (props) => {

    return(
     <div>
        <Chart
            chartType="LineChart"
            loader={<div
            style= {{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch"
            }}    
            >
            Loading Chart
            </div>
            }
            data={ props.chartData }
            options={props.darkState ? darkOptions : lightOptions }
        />
    </div>
    )
}

export default TotalDataChart;
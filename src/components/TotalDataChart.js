import React from 'react';
import Chart from 'react-google-charts';

const TotalDataChart = (props) => {

    return(
     <div>
        <Chart className = "chart"
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={ props.chartData }
            options={{
                title: 'Total Upload & Downloads',
                height: '100%',
                width: '100%',
                backgroundColor: { fill: 'transparent'},
                hAxis: { title: 'Time', titleTextStyle: { color: '#333'}, textStyle: {
                    fontSize: 9
                } },
                vAxis: { title: 'Mbs', minValue: 0 },
                series: {
                    1: { curveType: 'function' },
                },
            }}
        />
    </div>
    )
}

export default TotalDataChart;
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
                backgroundColor: { fill: 'transparent'},
                hAxis: { title: 'Time', titleTextStyle: { color: '#333'} },
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
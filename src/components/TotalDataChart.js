import React from 'react';
import Chart from 'react-google-charts';

const TotalDataChart = (props) => {

    // const chartData = this.state.dynamicDevices.map((timeStamp, index) => {
    //     return chartData;
    // })

    // Need to loop through dunamicDevices.timestamp

    // Then loop through and reduce the uploadSpeed & downloadSpeed

    return(
        <div>
            <Chart className = "chart"
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={ props.chartData }
                options={{
                    title: 'Total Upload & Downloads',
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
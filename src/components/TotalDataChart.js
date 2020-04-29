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
            <Chart
                width={400}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[ // { chartData }
                    ['Time', 'Upload Mbs', 'Download Mbs'],
                    ['Start', 467, 690],
                    ['', 354, 1009],
                    ['', 265, 2781],
                    ['', 478, 893],
                    ['', 354, 1009],
                    ['', 757, 1677],
                    ['', 667, 4788],
                    ['End', 655, 1743],
                ]}
                options={{
                    title: 'Total Upload & Downloads',
                    hAxis: { title: 'Time', titleTextStyle: { color: '#333'} },
                    vAxis: { title: 'Mbs', minValue: 0 },
                    series: {
                        1: { curveType: 'function' },
                    },
                    // chartArea: { width: '50%', height: '70%' },
                }}
            />
        </div>
    )
}

export default TotalDataChart;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import ChartBox from '../chartBox/ChartBox';
import chartColorGenerator from '../../../themes/chartTheme';
import renderColorfulLegendText from '../partials/partials';

function DataSynchronizedAreaChart({ data, charts }) {
  const [chartColors, setChartColors] = useState({});
  const [formatedData, setFormatedData] = useState([]);

  useEffect(() => {
    setFormatedData(Object.values(data));
  }, [data]);

  useEffect(() => {
    if (
      formatedData.length &&
      (!Object.keys(chartColors).length ||
      chartColors.fill.length !== formatedData.length)
    ) {
      setChartColors(chartColorGenerator(Object.keys(formatedData[0]).length));
    }
  }, [formatedData]);

  return (
    formatedData.length > 0 && (
      <ChartBox height="auto">
        {
          Object.keys(chartColors).length &&
          charts.map((chart) => (
            <div key={`${chart.key}`}>
              <h4>{chart.label}</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={formatedData}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  {
                    chart.areas.map((area, index) => {
                      let fill = chartColors.fill[index];
                      let stroke = chartColors.stroke[index];

                      if (area.fill) {
                        switch (area.fill) {
                          case 'none':
                            fill = 'transparent';
                            break;
                          case 'success':
                            fill = chartColors.success.fill;
                            break;
                          default:
                            break;
                        }
                      }
                      if (area.stroke) {
                        switch (area.stroke) {
                          case 'none':
                            stroke = 'transparent';
                            break;
                          case 'success':
                            stroke = chartColors.success.stroke;
                            break;
                          default:
                            break;
                        }
                      }
                      return (
                        <Area key={`${area}-${area.dataKey}`} type="monotone" dataKey={area.dataKey} stroke={stroke} fill={fill} strokeWidth={2} />
                      );
                    })
                  }
                  <Legend align="center" formatter={renderColorfulLegendText} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ))
        }
      </ChartBox>
    )
  );
}

DataSynchronizedAreaChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  charts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataSynchronizedAreaChart;

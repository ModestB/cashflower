import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
} from 'recharts';
import { ucFirst } from '../../../shared/utilities';
import ChartBox from '../chartBox/ChartBox';
import chartColorGenerator from '../../../themes/chartTheme';
import renderColorfulLegendText from '../partials/partials';

function DataBarChart({
  data,
  types,
  bars,
  barsColors,
}) {
  const [dataByType, setDataByType] = useState([]);
  const [chartColors, setChartColors] = useState({});

  useEffect(() => {
    const nextDataByType = {};

    Object.keys(data)
      .forEach(key => {
        const type = types[data[key].type].label;

        if (type) {
          if (nextDataByType[type]) {
            bars.forEach(bar => {
              nextDataByType[type][bar] += parseInt(data[key][bar], 10);
            });
          } else {
            let barsValues = {};
            bars.forEach(bar => {
              barsValues = {
                ...barsValues,
                [bar]: parseInt(data[key][bar], 10) || 0,
              };
            });
            nextDataByType[type] = {
              type: ucFirst(type),
              ...barsValues,
            };
          }
        }
      });
    setDataByType(Object.values(nextDataByType));
  }, [data, types, bars]);

  useEffect(() => {
    if (
      dataByType.length &&
      (!Object.keys(chartColors).length ||
      chartColors.fill.length !== dataByType.length)
    ) {
      if (bars.length > 1) {
        setChartColors(chartColorGenerator(bars.length));
      } else {
        setChartColors(chartColorGenerator(dataByType.length));
      }
    }
  }, [dataByType, bars]);

  return (
    <ChartBox>
      {
        dataByType.length &&
        Object.keys(chartColors).length && (
          <ResponsiveContainer height="99%" width="100%">
            <BarChart data={dataByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              {
                bars.map((bar, index) => {
                  if (bars.length > 1) {
                    let fill = chartColors.fill[index];
                    if (barsColors[bar]) fill = chartColors[barsColors[bar]].fill;
                    return <Bar key={`bar-${bar}`} dataKey={bar} fill={fill} />;
                  }
                  return (
                    <Bar dataKey={bar} key={`bar-${bar}`}>
                      {
                        dataByType.map((entry, i) => (
                          <Cell key={`cell-${entry}`} fill={chartColors.fill[i]} />
                        ))
                      }
                    </Bar>
                  );
                })
              }
              {
                bars.length > 1 && (
                  <Legend align="center" formatter={renderColorfulLegendText} />
                )
              }
            </BarChart>
          </ResponsiveContainer>
        )
      }

    </ChartBox>
  );
}

DataBarChart.defaultProps = {
  barsColors: {},
};

DataBarChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  types: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bars: PropTypes.arrayOf(PropTypes.string).isRequired,
  barsColors: PropTypes.oneOfType([PropTypes.object]),
};

export default DataBarChart;

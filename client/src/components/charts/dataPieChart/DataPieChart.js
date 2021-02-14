import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import ChartBox from '../chartBox/ChartBox';
import randomChartColorGenerator from '../../../themes/chartTheme';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  const radius = props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5;
  const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
  const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);
  let label = null;

  if (props.percent > 0) {
    label = (
      <g>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > props.cx ? 'start' : 'end'}
          dominantBaseline="central"
          fontSize="16px"
          fontWeight="700"
        >
          {props.name}
        </text>
        <text
          x={x}
          y={y + 18}
          textAnchor={x > props.cx ? 'start' : 'end'}
          dominantBaseline="central"
          fill="black"
          fontSize="14px"
        >
          {`(${(props.percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  }
  return label;
};

function DataPieChart({ data, types, valueKey }) {
  const [formatedData, setFormatedData] = useState([]);
  const [charColors, setChartColors] = useState([]);

  useEffect(() => {
    const nextFormatedData = Object.keys(data).map((key) => ({
      value: data[key][valueKey],
      name: types[data[key].type].label,
    }));
    setFormatedData(nextFormatedData);
  }, [data]);

  useEffect(() => {
    if (formatedData.length && !charColors.length) {
      setChartColors(randomChartColorGenerator(formatedData.length));
    }
  }, [formatedData]);

  return (
    <ChartBox>
      {
        charColors.length && (
          <ResponsiveContainer height="99%" width="100%">
            <PieChart
              margin={{
                top: 5, right: 0, left: 0, bottom: 5,
              }}
            >
              <Pie
                data={formatedData}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="100%"
                fill="#8884d8"
              >
                {
                  formatedData.map((entry, index) => (
                    <Cell key={entry.name} fill={charColors[index]} />
                  ))
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )
      }

    </ChartBox>
  );
}

DataPieChart.defaultProps = {
  valueKey: 'amount',
};

DataPieChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  types: PropTypes.oneOfType([PropTypes.object]).isRequired,
  valueKey: PropTypes.string,
};

export default DataPieChart;

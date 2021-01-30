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
} from 'recharts';
import { ucFirst } from '../../../shared/utilities';
import ChartBox from '../chartBox/ChartBox';

function ChartByType({
  data,
  types,
}) {
  const [dataByType, setDataByType] = useState({});

  useEffect(() => {
    const nextDataByType = {};

    Object.keys(data)
      .forEach(key => {
        const type = types[data[key].type].label;

        if (type) {
          if (nextDataByType[type]) {
            nextDataByType[type].amount += parseInt(data[key].amount, 10);
          } else {
            nextDataByType[type] = {
              amount: parseInt(data[key].amount, 10),
              type: ucFirst(type),
            };
          }
        }
      });
    setDataByType(nextDataByType);
  }, [data]);

  return (
    <ChartBox>
      <ResponsiveContainer height="99%" width="100%">
        <BarChart data={Object.values(dataByType)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3f51b5" />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

ChartByType.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  types: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ChartByType;

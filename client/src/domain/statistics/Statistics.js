import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getStatisticsData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import DataSynchronizedAreaChart from '../../components/charts/dataSynchronizedAreaChart/DataSynchronizedAreaChart';

const Statistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(state => state.statistics.data);

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Statistics'));
    if (!Object.keys(statistics).length) {
      dispatch(getStatisticsData());
    }
  };

  useEffect(onInitLoad, []);

  return (
    <TableChartGrid>
      <DataSynchronizedAreaChart
        data={statistics}
        charts={[
          {
            label: 'Income change',
            key: 'stats-income',
            areas: [
              {
                dataKey: 'income',
                fill: 'none',
              },
            ],
          },
          {
            label: 'Investments change',
            key: 'stats-investment',
            areas: [
              {
                dataKey: 'goal',
                fill: 'none',
              },
              {
                dataKey: 'investment',
                fill: 'none',
              },
              {
                dataKey: 'return',
                fill: 'success',
                stroke: 'success',
              },
            ],
          },
        ]}
      />
    </TableChartGrid>
  );
};

export default Statistics;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getOverviewData, addInfoAlert } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import DataSynchronizedAreaChart from '../../components/charts/dataSynchronizedAreaChart/DataSynchronizedAreaChart';
import Material from '../../shared/material';
import LinearProgress from '../../components/progress/linearProgress/LinearProgress';

const Overview = () => {
  const dispatch = useDispatch();
  const overviewData = useSelector(state => state.overview.data);
  const infoAlertMsg = useSelector(state => state.general.alerts.info);
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [hasData, setHasData] = useState(false);
  let content = <LinearProgress />;

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Overview'));
    if (!Object.keys(overviewData).length) {
      dispatch(getOverviewData());
    }
  };

  useEffect(onInitLoad, []);

  useEffect(() => {
    setHasData(Object.keys(overviewData).length > 0);
  }, [overviewData]);

  useEffect(() => {
    if (!hasData) {
      setTimeout(() => {
        dispatch(addInfoAlert('No Data', 'To see overview you need to add income, investment or investment goal'));
        setShowInfoAlert(true);
      }, 1000);
    } else {
      setShowInfoAlert(false);
    }
  }, [hasData]);

  if (hasData) {
    content = (
      <DataSynchronizedAreaChart
        data={overviewData}
        charts={[
          {
            label: 'Income change',
            key: 'overview-income',
            areas: [
              {
                dataKey: 'income',
                fill: 'none',
              },
            ],
          },
          {
            label: 'Investments change',
            key: 'overview-investment',
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
    );
  } else if (showInfoAlert) {
    content = (
      <Material.Alert
        severity="info"
      >
        <Material.AlertTitle>
          {infoAlertMsg.title}
        </Material.AlertTitle>
        {infoAlertMsg.text}
      </Material.Alert>
    );
  }

  return (
    <TableChartGrid>
      { content }
    </TableChartGrid>
  );
};

export default Overview;

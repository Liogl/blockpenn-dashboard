import React, { useState, useEffect, useCallback } from 'react';
import { useDataProvider, useVersion } from 'react-admin';
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

export const Dashboard = (props) => {
  const [state, setState] = useState({});
  const version = useVersion();
  const dataProvider = useDataProvider();

  const fetchTrxs = useCallback(async () => {
    const { data: recentTrxs } = await dataProvider.getList('trx-rates', {
      filter: {},
      sort: { field: 'Time', order: 'DESC' },
      pagination: { page: 1, perPage: 50 }
    });
    setState((state) => ({
      ...state,
      recentTrxs
    }));
  }, [dataProvider]);

  useEffect(() => {
    fetchTrxs();
  }, [version]);

  const { recentTrxs } = state;
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <TrxChart trxs={recentTrxs} />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  }
}));

const TrxChart = ({ trxs }) => {
  const [graphData, setData] = useState([]);

  useEffect(() => {
    if (trxs) {
      setData(trxs);
    }
  }, []);

  const filteredData = (data, filterBy) => {
    const previous = moment().subtract(1, filterBy);
    return data.filter((d) => moment(d.id) >= previous);
  };

  const applyFilter = (selection) => {
    let filtered = [];
    switch (selection) {
      case 'month':
        filtered = filteredData(trxs, 'months');
        break;
      case 'week':
        filtered = filteredData(trxs, 'weeks');
        break;
      case 'day':
        filtered = filteredData(trxs, 'days');
        break;
      case 'hour':
        filtered = filteredData(trxs, 'hours');
        break;
      default:
        filtered = trxs;
    }
    setData(filtered);
  };

  if (!trxs) return null;

  return (
    <Card>
      <CardHeader title="Transaction rate for last 12 hours" />
      <FilterChart applyFilter={applyFilter} />
      <CardContent>
        <div style={{ width: '100%' }}>
          <ReactApexChart
            options={{
              chart: {
                height: 450,
                type: 'line',
                zoom: {
                  enabled: false
                },
                stacked: true,
                dropShadow: {
                  enabled: true,
                  enabledSeries: [0],
                  top: -2,
                  left: 2,
                  blur: 5,
                  opacity: 0.06
                }
              },
              theme: {
                palette: 'palette3' // upto palette10
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight',
                width: 2
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.2
                },
                padding: {
                  left: 30, // or whatever value that works
                  right: 30 // or whatever value that works
                }
              },
              tooltip: {
                x: {
                  format: 'dd hh:mm'
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left'
              },
              xaxis: {
                type: 'datetime',
                labels: {
                  show: true,
                  trim: true,
                  format: 'dd/MM',
                  formatter: function (value, _) {
                    return moment(value).toDate();
                  }
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  type: 'horizontal',
                  shadeIntensity: 0.5,
                  gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 50, 100],
                  colorStops: []
                }
              }
            }}
            series={[
              {
                name: 'Transaction rate',
                data: formatGraphData(graphData)
              }
            ]}
            type="line"
            height={450}
          />
        </div>
      </CardContent>
    </Card>
  );
};

function formatGraphData(list) {
  let result = [];
  list.forEach(function (item, index, array) {
    result.push({
      x: new Date(item.id).getTime(),
      y: item.Value
    });
  });
  return result;
}

const FilterChart = ({ applyFilter }) => {
  const classes = useStyles();
  const [selection, setFilter] = useState('none');
  const selections = [
    { label: 'month', value: '1 Month' },
    { label: 'week', value: '1 Week' },
    { label: 'day', value: '1 Day' },
    { label: 'hour', value: '1 Hour' }
  ];

  useEffect(() => {
    setFilter('none');
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setFilter(value);
    applyFilter(value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Filter</InputLabel>
        <Select value={selection} onChange={handleChange} label="filter">
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          {selections.map((selection, i) => (
            <MenuItem key={i} value={selection.label}>
              {selection.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

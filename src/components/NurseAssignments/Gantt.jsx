// GanttChart.js
import React from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = ({ data }) => {
  const columns = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'string', label: 'Resource' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ];

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px"
      data={[columns, ...data]}
      options={{
        height: 400,
        gantt: {
          trackHeight: 30,
        },
      }}
    />
  );
};

export default GanttChart;

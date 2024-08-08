import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Text, Flex } from '@chakra-ui/react';

const CapacityGraph = ({ className }) => {
  const series = [{
    name: 'Chair Time Utilization',
    data: [70, 75, 73, 76, 78, 81, 80] // Example data points
  }];

  const options = {
    chart: {
      height: 150, // Adjust height to make the box shorter
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#172667']
    },
    xaxis: {
      type: 'category',
      categories: ['5/24', '5/25', '5/26', '5/27', '5/28', '5/29', '5/30'], // Adjust to realistic times or values
      labels: {
        style: {
          colors: '#6B7280', // Grey color
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280', // Grey color
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      x: {
        format: 'HH:mm'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#172667",
            opacity: 0.7
          },
          {
            offset: 100,
            color: "#172667",
            opacity: 0.1
          }
        ]
      }
    },
    grid: {
      show: false
    },
    colors: ['#172667']
  };

  return (
    <Box className={`${className} h-full`} p={4} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
      <Text fontSize="lg" fontWeight="bold" mb={2}>Chair Time Utilization</Text>
      <Flex justify="space-between" align="center" mb={2}>
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">81%</Text>
          <Text fontSize="sm" color="gray.500">Today</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold" color="green.500">7% ↑</Text>
          <Text fontSize="sm" color="gray.500">Trend</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">75%</Text>
          <Text fontSize="sm" color="gray.500">Goal</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">70%</Text>
          <Text fontSize="sm" color="gray.500">Baseline</Text>
        </Box>
      </Flex>
      <ReactApexChart options={options} series={series} type="area" height={150} />
    </Box>
  );
};

export default CapacityGraph;
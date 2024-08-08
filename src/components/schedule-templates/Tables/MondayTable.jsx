import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text } from '@chakra-ui/react';
import styles from './Table.module.css';

const MondayTable = ({ className }) => {
  const data = [
    { time: "8:00", "0-1": 1, "1-3": 1, "3-5": 1, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: 5 },
    { time: "8:15", "0-1": 1, "1-3": 1, "3-5": null, appStats: 1, appFinishes: 0, expectedPatients: 1, totalStarts: null },
    { time: "8:30", "0-1": 1, "1-3": null, "3-5": 1, appStats: 1, appFinishes: 0, expectedPatients: 1, totalStarts: null },
    { time: "8:45", "0-1": 1, "1-3": 1, "3-5": null, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: null },
    { time: "9:00", "0-1": 1, "1-3": null, "3-5": 1, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: 5 },
    { time: "9:15", "0-1": 1, "1-3": null, "3-5": null, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: null },
    { time: "9:30", "0-1": 1, "1-3": null, "3-5": null, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: null },
    { time: "9:45", "0-1": 1, "1-3": 1, "3-5": null, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: null },
    { time: "10:00", "0-1": 1, "1-3": 1, "3-5": 1, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: 4 },
    { time: "10:15", "0-1": 1, "1-3": null, "3-5": null, appStats: 2, appFinishes: 0, expectedPatients: 2, totalStarts: null },
    { time: "10:30", "0-1": null, "1-3": null, "3-5": null, appStats: 0, appFinishes: 0, expectedPatients: 0, totalStarts: null },
    { time: "10:45", "0-1": null, "1-3": null, "3-5": null, appStats: 0, appFinishes: 0, expectedPatients: 0, totalStarts: null },
    { time: "11:00", "0-1": 1, "1-3": 1, "3-5": null, appStats: 1, appFinishes: 1, expectedPatients: 1, totalStarts: 3 },
    { time: "11:15", "0-1": 1, "1-3": null, "3-5": null, appStats: 1, appFinishes: 1, expectedPatients: 1, totalStarts: null },
    { time: "11:30", "0-1": null, "1-3": null, "3-5": 1, appStart: 1, appFinishes: 1, expectedPatients: 1, totalStarts: null },
    { time: "11:45", "0-1": null, "1-3": null, "3-5": null, appStats: 0, appFinishes: 0, expectedPatients: 0, totalStarts: null },
  ];

  const getBackgroundColor = (value) => {
    if (value === "blue.200") return "#749CFC";
    if (value === "blue.300") return "#1B4ADE";
    if (value === "blue.500") return "#081B60";
    return "transparent";
  };

  const getTextColor = (value) => {
    return value ? "white" : "black";
  };

  return (
    <Box className={`${styles.tableContainer} ${className}`} p={4} borderRadius="md" boxShadow="2xl" bg="white">
      <TableContainer>
        <Table variant="simple" size="sm" className={styles.customTable}>
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>(0-1)</Th>
              <Th>(1-3)</Th>
              <Th>(3-5)</Th>
              <Th>Appt Starts</Th>
              <Th>Appt Finishes</Th>
              <Th>Expected Patients</Th>
              <Th>Total Starts/hr</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr key={index}>
                <Td>{row.time}</Td>
                <Td bg={row["0-1"] ? getBackgroundColor("blue.200") : "transparent"} color={getTextColor(row["0-1"])}>{row["0-1"] && <Text textAlign="center">{row["0-1"]}</Text>}</Td>
                <Td bg={row["1-3"] ? getBackgroundColor("blue.300") : "transparent"} color={getTextColor(row["1-3"])}>{row["1-3"] && <Text textAlign="center">{row["1-3"]}</Text>}</Td>
                <Td bg={row["3-5"] ? getBackgroundColor("blue.500") : "transparent"} color={getTextColor(row["3-5"])}>{row["3-5"] && <Text textAlign="center">{row["3-5"]}</Text>}</Td>
                <Td>{row.appStats}</Td>
                <Td>{row.appFinishes}</Td>
                <Td>{row.expectedPatients}</Td>
                <Td>{row.totalStarts}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MondayTable;
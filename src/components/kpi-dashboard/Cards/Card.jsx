import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { CurrencyDollarIcon } from '@heroicons/react/solid'; // Ensure you have heroicons installed

const Card = ({ title, todayValue, goalValue, lastYearValue }) => {
  return (
    <Box className="h-full" p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center">
          <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <Text fontSize="md" fontWeight="bold" ml={2}>{title}</Text>
        </Flex>
      </Flex>
      <Box borderBottomWidth={1} borderBottomColor="gray.200" mb={4} />
      <Flex justify="space-between" align="center">
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">{todayValue}</Text>
          <Text fontSize="sm" color="gray.500">Today</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">{goalValue}</Text>
          <Text fontSize="sm" color="gray.500">Goal</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">{lastYearValue}</Text>
          <Text fontSize="sm" color="gray.500">Last Yr.</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;
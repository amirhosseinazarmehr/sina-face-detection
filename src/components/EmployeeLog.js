import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function EmployeeLog({ time, type }) {
  return (
    <Card className="my-1 p-2">
      <View className="flex-row justify-between">
        <Text className="font-bold">{time}</Text>
        <Text className="text-gray-600">{type}</Text>
      </View>
    </Card>
  );
}

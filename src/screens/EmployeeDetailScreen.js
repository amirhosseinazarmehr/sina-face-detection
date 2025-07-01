import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput, Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmployeeLog from '../components/EmployeeLog';
import { employees } from '../data/mockEmployee';

export default function EmployeeDetailScreen({ onBack }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView className="p-4">
      <Button mode="outlined" icon="arrow-left" onPress={onBack} className="mb-4">
        Back to Dashboard
      </Button>
      <TextInput
        label="Search Employee"
        value={query}
        onChangeText={setQuery}
        className="mb-2"
        left={<TextInput.Icon icon="magnify" />}
      />
      {filtered.map(emp => (
        <Chip
          key={emp.id}
          className="mb-1 self-start"
          icon="account"
          onPress={() => {
            setSelected(emp);
            setQuery(emp.name);
          }}
        >
          {emp.name}
        </Chip>
      ))}
      {selected && (
        <View className="mt-4">
          <Text className="text-2xl font-bold mb-4">{selected.name}</Text>
          <Card className="mb-4 p-4">
            <View className="relative h-52 justify-center items-center bg-gray-100">
              <Icon name="camera" size={64} color="#888" />
              {selected.faceDetected ? (
                <View className="absolute top-5 left-5 border-2 border-green-500 p-1">
                  <Text className="text-green-600 font-bold">{selected.name}</Text>
                </View>
              ) : (
                <Text className="absolute bottom-2 text-red-600 font-bold">
                  {selected.name.split(' ')[0]} is not in the camera view (Absent)
                </Text>
              )}
            </View>
          </Card>
          <View className="mb-2">
            <Text className="text-lg">
              Status:{' '}
              {selected.isPresent ? (
                <Text className="text-green-600">✔ Present</Text>
              ) : (
                <Text className="text-red-600">✘ Absent</Text>
              )}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Chip icon="timer" className="mr-2">
              Presence: {selected.presenceDuration}
            </Chip>
            <Chip icon="timer">
              In Front of Camera: {selected.activityDuration}
            </Chip>
          </View>
          <Text className="text-lg font-bold mb-2">Today Logs</Text>
          {selected.logs.map((log, idx) => (
            <EmployeeLog key={idx} time={log.time} type={log.type} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

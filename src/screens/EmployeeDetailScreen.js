import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <Button mode="outlined" icon="arrow-left" onPress={onBack} style={styles.backButton}>
        Back to Dashboard
      </Button>
      <TextInput
        label="Search Employee"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
        left={<TextInput.Icon icon="magnify" />}
      />
      {filtered.map(emp => (
        <Chip
          key={emp.id}
          style={styles.chip}
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
        <View style={styles.detailContainer}>
          <Text style={styles.header}>{selected.name}</Text>
          <Card style={styles.cameraCard}>
            <View style={styles.cameraMock}>
              <Icon name="camera" size={64} color="#888" />
              {selected.faceDetected ? (
                <View style={styles.faceBox}>
                  <Text style={styles.faceText}>{selected.name}</Text>
                </View>
              ) : (
                <Text style={styles.absentText}>
                  {selected.name.split(' ')[0]} is not in the camera view (Absent)
                </Text>
              )}
            </View>
          </Card>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>
              Status:{' '}
              {selected.isPresent ? (
                <Text style={styles.present}>✔ Present</Text>
              ) : (
                <Text style={styles.absent}>✘ Absent</Text>
              )}
            </Text>
          </View>
          <View style={styles.timers}>
            <Chip icon="timer" style={styles.timerChip}>
              Presence: {selected.presenceDuration}
            </Chip>
            <Chip icon="timer" style={styles.timerChip}>
              In Front of Camera: {selected.activityDuration}
            </Chip>
          </View>
          <Text style={styles.logTitle}>Today Logs</Text>
          {selected.logs.map((log, idx) => (
            <EmployeeLog key={idx} time={log.time} type={log.type} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  search: {
    marginBottom: 8,
  },
  chip: {
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  detailContainer: {
    marginTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cameraCard: {
    marginBottom: 16,
    padding: 16,
  },
  cameraMock: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  faceBox: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderColor: 'green',
    borderWidth: 2,
    padding: 4,
  },
  faceText: {
    color: 'green',
    fontWeight: 'bold',
  },
  absentText: {
    position: 'absolute',
    bottom: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  statusRow: {
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
  },
  present: {
    color: 'green',
  },
  absent: {
    color: 'red',
  },
  timers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timerChip: {
    marginRight: 8,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function EmployeeLog({ time, type }) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: 'bold',
  },
  type: {
    color: '#555',
  },
});

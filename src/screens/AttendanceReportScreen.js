import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Menu,
  TextInput,
  DataTable,
} from 'react-native-paper';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { reports } from '../data/mockReport';

export default function AttendanceReportScreen() {
  const [dateVisible, setDateVisible] = useState(false);
  const [employeeVisible, setEmployeeVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [selectedEmployee, setSelectedEmployee] = useState('All Employees');

  const dates = Array.from(new Set(reports.map(r => r.date)));
  const employees = Array.from(new Set(reports.map(r => r.name)));

  const filtered = useMemo(() => {
    return reports.filter(r => {
      const matchDate =
        selectedDate === 'All Dates' || r.date === selectedDate;
      const matchEmp =
        selectedEmployee === 'All Employees' || r.name === selectedEmployee;
      return matchDate && matchEmp;
    });
  }, [selectedDate, selectedEmployee]);

  const exportExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    const uri = FileSystem.cacheDirectory + 'report.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Menu
          visible={dateVisible}
          onDismiss={() => setDateVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setDateVisible(true)}
              style={styles.filterButton}
            >
              {selectedDate}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedDate('All Dates');
              setDateVisible(false);
            }}
            title="All Dates"
          />
          {dates.map(d => (
            <Menu.Item
              key={d}
              onPress={() => {
                setSelectedDate(d);
                setDateVisible(false);
              }}
              title={d}
            />
          ))}
        </Menu>

        <Menu
          visible={employeeVisible}
          onDismiss={() => setEmployeeVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setEmployeeVisible(true)}
              style={styles.filterButton}
            >
              {selectedEmployee}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedEmployee('All Employees');
              setEmployeeVisible(false);
            }}
            title="All Employees"
          />
          {employees.map(e => (
            <Menu.Item
              key={e}
              onPress={() => {
                setSelectedEmployee(e);
                setEmployeeVisible(false);
              }}
              title={e}
            />
          ))}
        </Menu>

        <Button mode="contained" onPress={exportExcel} style={styles.export}>
          Export to Excel
        </Button>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>Entry</DataTable.Title>
          <DataTable.Title numeric>Exit</DataTable.Title>
          <DataTable.Title numeric>Attendance</DataTable.Title>
          <DataTable.Title numeric>Activity</DataTable.Title>
        </DataTable.Header>
        {filtered.map(row => (
          <DataTable.Row key={row.id}>
            <DataTable.Cell>{row.name}</DataTable.Cell>
            <DataTable.Cell>{row.date}</DataTable.Cell>
            <DataTable.Cell numeric>{row.entry}</DataTable.Cell>
            <DataTable.Cell numeric>{row.exit}</DataTable.Cell>
            <DataTable.Cell numeric>{row.attendance}</DataTable.Cell>
            <DataTable.Cell numeric>{row.activity}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  export: {
    marginLeft: 'auto',
    marginBottom: 8,
  },
});

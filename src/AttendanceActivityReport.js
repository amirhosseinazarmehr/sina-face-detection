import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button, Menu, Provider } from 'react-native-paper';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const mockData = [
  { name: 'Ali Rezaei', date: '2023/07/01', entry: '08:10', exit: '17:01', attendance: '08:51', activity: '07:42' },
  { name: 'Sara Moradi', date: '2023/07/01', entry: '09:12', exit: '12:50', attendance: '03:38', activity: '02:45' },
  { name: 'Ali Rezaei', date: '2023/07/02', entry: '08:05', exit: '17:08', attendance: '09:03', activity: '08:10' },
  { name: 'Sara Moradi', date: '2023/07/02', entry: '09:00', exit: '12:40', attendance: '03:40', activity: '02:55' }
];

export default function AttendanceActivityReport() {
  const [dateFilter, setDateFilter] = useState('');
  const [employee, setEmployee] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const employees = useMemo(() => Array.from(new Set(mockData.map(d => d.name))), []);

  const filteredData = mockData.filter(d => {
    const matchDate = dateFilter ? d.date === dateFilter : true;
    const matchEmployee = employee ? d.name === employee : true;
    return matchDate && matchEmployee;
  });

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    if (Platform.OS === 'web') {
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      saveAs(blob, 'attendance_report.xlsx');
    } else {
      console.warn('Excel export is implemented for web only.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.entry}</Text>
      <Text style={styles.cell}>{item.exit}</Text>
      <Text style={styles.cell}>{item.attendance}</Text>
      <Text style={styles.cell}>{item.activity}</Text>
    </View>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.filters}>
          <DatePicker
            style={styles.datePicker}
            date={dateFilter}
            mode="date"
            placeholder="Select date"
            format="YYYY/MM/DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={setDateFilter}
          />

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Button onPress={() => setMenuVisible(true)}>{employee || 'Select Employee'}</Button>}
          >
            {employees.map(emp => (
              <Menu.Item key={emp} onPress={() => { setEmployee(emp); setMenuVisible(false); }} title={emp} />
            ))}
          </Menu>

          <Button mode="contained" onPress={exportExcel} style={styles.exportBtn}>
            Export to Excel
          </Button>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.header]}>Name</Text>
          <Text style={[styles.cell, styles.header]}>Date</Text>
          <Text style={[styles.cell, styles.header]}>Entry Time</Text>
          <Text style={[styles.cell, styles.header]}>Exit Time</Text>
          <Text style={[styles.cell, styles.header]}>Total Attendance</Text>
          <Text style={[styles.cell, styles.header]}>Total Activity</Text>
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  datePicker: {
    width: 150,
    marginRight: 8,
  },
  exportBtn: {
    marginLeft: 'auto',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  header: {
    fontWeight: 'bold',
  },
});

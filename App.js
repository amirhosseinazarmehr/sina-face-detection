import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import AttendanceReportScreen from './src/screens/AttendanceReportScreen';

export default function App() {
  return (
    <PaperProvider>
      <EmployeeDetailScreen onBack={() => {}} />
      <AttendanceReportScreen />
    </PaperProvider>
  );
}

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';

export default function App() {
  return (
    <PaperProvider>
      <EmployeeDetailScreen onBack={() => {}} />
    </PaperProvider>
  );
}

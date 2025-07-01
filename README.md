# Sina Face Detection React Components

This repository contains React Native for Web components. The `AttendanceActivityReport` component provides a responsive attendance and activity report page with filtering and Excel export functionality.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Import and use the component:
   ```javascript
   import AttendanceActivityReport from './src/AttendanceActivityReport';
   
   export default function App() {
     return <AttendanceActivityReport />;
   }
   ```

The component uses **react-native-paper** for UI elements, **react-native-datepicker** for selecting dates, and **xlsx** for exporting data to Excel.

## Features

- Filter attendance records by date and employee name.
- Display results in a table built with `FlatList`.
- Export the filtered data to an Excel file.

The included mock data can be replaced with real API calls to integrate with your backend.

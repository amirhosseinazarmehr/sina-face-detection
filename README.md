# sina-face-detection

This project contains a minimal Expo setup with React Native for Web for a sample admin dashboard screen used in an employee attendance system. Styling is done with **Tailwind CSS** via the NativeWind library.

## Components

- `EmployeeDetailScreen` – shows an employee's status with a simulated camera preview and logs.
- `EmployeeLog` – reusable row component for displaying log entries.
- `AttendanceReportScreen` – shows a filterable table of attendance and
  activity data with an option to export to Excel.

## Running with Expo

1. Install dependencies (requires internet access):
   ```bash
   npm install
   ```
2. Start Expo:
   ```bash
   npm start
   ```
3. Follow the instructions to open on web or your mobile device.

Tailwind classes are compiled using [NativeWind](https://www.nativewind.dev/). Configuration is in `tailwind.config.js` and `babel.config.js`.

Mock data is defined in `src/data/mockEmployee.js` and `src/data/mockReport.js`
and can be modified for testing.

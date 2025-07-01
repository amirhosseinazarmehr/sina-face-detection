export const employees = [
  {
    id: 1,
    name: 'Ali Rezaei',
    logs: [
      { time: '08:15', type: 'Entry' },
      { time: '10:05', type: 'Exit' },
      { time: '10:35', type: 'Entry' },
      { time: '12:55', type: 'Exit' },
    ],
    presenceDuration: '06:50',
    activityDuration: '06:10',
    isPresent: true,
    faceDetected: true,
  },
  {
    id: 2,
    name: 'Sara Ahmadi',
    logs: [],
    presenceDuration: '00:00',
    activityDuration: '00:00',
    isPresent: false,
    faceDetected: false,
  },
];

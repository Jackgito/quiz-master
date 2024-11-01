const LeaderboardSchema = {
  playerId: {
    type: "objectId or string",
    required: true,
    unique: true
  },
  score: {
    type: "number",
    required: true
  },
  rank: {
    type: "number",
    required: true
  },
  timestamp: {
    type: "date",
    default: () => new Date()
  },
  period: {
    type: "string",
    enum: ['daily', 'monthly', 'allTime'],
    required: true,
},
};
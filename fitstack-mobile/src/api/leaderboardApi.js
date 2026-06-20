import client from './client';

export function getLeaderboard(period = 'week') {
  return client.get('/leaderboard', {
    params: {
      period,
    },
  });
}

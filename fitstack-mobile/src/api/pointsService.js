import { DeviceEventEmitter } from 'react-native';
import client from './client';

export const POINTS_UPDATED_EVENT = 'fitstack:pointsUpdated';

function extractMessage(error) {
  const data = error.response?.data;
  if (data && typeof data.message === 'string') return data.message;
  if (error.code === 'ECONNABORTED') return 'İstek zaman aşımına uğradı.';
  if (error.message === 'Network Error') {
    return 'Sunucuya ulaşılamıyor. Backend çalışıyor mu kontrol edin.';
  }
  return 'Beklenmeyen bir hata oluştu.';
}

function wrapAxiosError(error) {
  if (error.response) return new Error(extractMessage(error));
  if (error instanceof Error) return error;
  return new Error(extractMessage(error));
}

/**
 * @returns {Promise<{ totalPoints: number, userId: number, updatedAt: string }>}
 */
export async function fetchPointsSummary() {
  try {
    const { data } = await client.get('/users/points');
    if (!data?.success) {
      throw new Error(data?.message || 'Puan bilgisi alınamadı.');
    }
    return {
      totalPoints: Number(data.totalPoints) || 0,
      userId: data.userId,
      updatedAt: data.updatedAt || '',
    };
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {number|string} workoutId
 * @param {number} [points] varsayılan sunucu tarafında 50
 */
export async function awardWorkoutPoints(workoutId, points) {
  try {
    const body = {};
    if (points != null && !Number.isNaN(Number(points))) {
      body.points = Number(points);
    }
    const { data } = await client.put(`/workouts/${encodeURIComponent(workoutId)}/points`, body);
    if (!data?.success) {
      throw new Error(data?.message || 'Puan eklenemedi.');
    }
    const payload = {
      gainedPoints: Number(data.gainedPoints) || 0,
      totalPoints: Number(data.totalPoints) || 0,
      workoutId: Number(workoutId),
    };
    DeviceEventEmitter.emit(POINTS_UPDATED_EVENT, payload);
    return payload;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

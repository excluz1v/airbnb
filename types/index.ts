import type { Timestamp } from '@firebase/firestore-types';

export type FirebaseId = {
  id: string;
};

// collection `flats`
export type Flat = FirebaseId & {
  address: string;
  latitude: number;
  longitude: number;
  cityName: string;
  description?: string;
  dailyPriceUsd: number;
  photoUrl: string;
  publishedAt: Timestamp;
};

export type ShowAlertParams = {
  type: 'info' | 'warning' | 'error';
  mess: string;
};

export type ThandleSignInparams = {
  email: string;
  password: string;
};

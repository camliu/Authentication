import API from '@/config/apiClient';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ResetPasswordData = {
  verificationCode: string;
  password: string;
};

type GetUserResponse = {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SessionData = {
  _id: string;
  userId: string;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
  isCurrent: boolean;
};

export const login = async (data: LoginData) => API.post('/auth/login', data);
export const logout = async () => API.get('/auth/logout');
export const register = async (data: RegisterData) =>
  API.post('/auth/register', data);
export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email: string) =>
  API.post('/auth/password/forgot', { email });
export const resetPassword = async ({
  verificationCode,
  password,
}: ResetPasswordData) =>
  API.post('/auth/password/reset', { verificationCode, password });
export const getUser = async (): Promise<GetUserResponse> => API.get('/user');
export const getSessions = async (): Promise<SessionData[]> =>
  API.get('/sessions');
export const deleteSession = async (id: string) =>
  API.delete(`/sessions/${id}`);

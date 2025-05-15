export interface AuthState {
  accessToken: string | null;
  expiredAt: Date | null;
  isAuthenticated: boolean;
}

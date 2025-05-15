export interface SignUpRequest {
  phoneNumber: string;
  password: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

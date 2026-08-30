export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  statusCode?: number;
  success?: boolean;
  message: string;
  data?: any;
}

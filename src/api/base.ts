import auth from "../store/auth";

export const SERVER_URL = "http://localhost:7000";
export const API_URL = `${SERVER_URL}/api/v1`;

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export const isErrorResponse = (response: any): response is ErrorResponse => {
  return !!response.error;
};

export const api = async <T>(
  path: string,
  options?: RequestInit
): Promise<T | ErrorResponse> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: auth.token,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  return data;
};

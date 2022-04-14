import auth from "../store/auth";

export const SERVER_URL = "http://localhost:7000";
export const API_URL = `${SERVER_URL}/api/v1`;

export const api = async <Response>(
  path: string,
  options?: RequestInit
): Promise<Response> => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: auth.token, "Content-Type": "application/json" },
    ...options,
  });

  return await response.json();
};

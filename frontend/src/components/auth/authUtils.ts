import { AuthData } from "./authSharedTypes";
export function getAxiosAuthOptions(data: AuthData) {
  return [
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  ];
}

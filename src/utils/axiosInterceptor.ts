import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { localStorageItems } from "../constants/localStorageDataDictionary";

interface AxiosInterceptorProps {
  method: string;
  url: string;
  query?: any;
  data?: any;
}

const isObject = (value: any): value is Record<string, any> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const convertQueryString = (object: any): string => {
  if (!object || !isObject(object) || !Object.values(object).length) return "";

  const queryParameters: string[] = [];

  for (const key in object) {
    if (!object[key]) continue;
    if (typeof object[key] !== "string") continue;
    queryParameters.push(`${key}=${object[key]}`);
  }

  return queryParameters.length ? "?" + queryParameters.join("&") : "";
};

export default async function axiosInterceptor({
  method,
  url,
  query,
  data,
}: AxiosInterceptorProps): Promise<any> {
  try {
    if (!method) throw new Error("Method not provided");
    if (!url) throw new Error("Url not provided");

    const apiMethod = method.toLowerCase().trim();
    let apiUrl = "http://192.168.0.135:3011/api";
    // let apiUrl = "http://192.168.15.92:3011/api";
    // let apiUrl = "http://localhost:3011/api";
    // let apiUrl = "https://charter-backend.lambaharsh01.in/api";
    apiUrl += url.trim() + convertQueryString(query);

    const axiosInstance: AxiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(localStorageItems.token);
        if (token) req.headers.Authorization = `Bearer ${token}`;
        return req;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => res,
      (error) => Promise.reject(error)
    );

    let response: AxiosResponse;

    switch (apiMethod) {
      case "get":
        response = await axiosInstance.get(apiUrl);
        break;
      case "post":
        response = await axiosInstance.post(apiUrl, data);
        break;
      case "put":
        response = await axiosInstance.put(apiUrl, data);
        break;
      case "delete":
        response = await axiosInstance.delete(apiUrl);
        break;
      default:
        throw new Error("Method not identified");
    }

    return response.data;
  } catch (error: any) {
    let statusMessage: string;
    const errorCode = error?.response?.status ?? 405;

    switch (errorCode) {
      case 400:
        statusMessage = "Bad Request";
        break;
      case 401:
        statusMessage = "Unauthorized";
        break;
      case 402:
        statusMessage = "Payment Required";
        break;
      case 403:
        statusMessage = "Forbidden";
        break;
      case 404:
        statusMessage = "Not Found";
        break;
      case 405:
        statusMessage = "Method Not Allowed";
        break;
      case 406:
        statusMessage = "Not Acceptable";
        break;
      case 407:
        statusMessage = "Proxy Authentication Required";
        break;
      case 408:
        statusMessage = "Request Timeout";
        break;
      case 409:
        statusMessage = "Conflict";
        break;
      case 413:
        statusMessage = "Payload Too Large";
        break;
      case 414:
        statusMessage = "URI Too Long";
        break;
      case 429:
        statusMessage = "Too Many Requests";
        break;
      default:
        statusMessage = "Network Error";
        break;
    }

    if (errorCode === 401 && !url.includes("/auth")) {
      alert("Session expired, please log in again");
      localStorage.removeItem(localStorageItems.token);
      window.location.href = "/";
    }

    const errorMessage =
      error?.response?.data?.error ?? error?.error ?? statusMessage;

    throw new Error(errorMessage);
  }
}

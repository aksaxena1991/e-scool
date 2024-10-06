import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "../utils";

export class HttpClient {
    instance: AxiosInstance;

    constructor(baseUrl: string) {
        this.instance = axios.create({ baseURL: baseUrl });
        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = (): void => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _initializeRequestInterceptor = (): void => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError,
        );
    };

    private _handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const authToken = atob(getCookie(btoa("e-scool.token")));
        if (authToken) {
            if (config.data instanceof FormData) {
                config.headers["Content-Type"] = "multipart/form-data";
            } else {
                config.headers["Content-Type"] = "application/json; charset=utf-8";
            }
            config.headers["token"] = authToken;
        }
        return config;
    };

    private _handleResponse = ({ data }: AxiosResponse): any => data;

    private _handleError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);
}

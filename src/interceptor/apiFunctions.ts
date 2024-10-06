import { AxiosResponse } from "axios";
import { HttpClient } from "./httpClient";

export default class ApiFunction extends HttpClient {
    private static classInstance: ApiFunction | null = null;
    private baseUrl: string;

    constructor() {
        super(`${process.env.REACT_APP_API_PATH}`);
        this.baseUrl = `${process.env.REACT_APP_API_PATH}`;
    }

    public static getInstance = (): ApiFunction => {
        if (!ApiFunction.classInstance) {
            ApiFunction.classInstance = new ApiFunction();
        }
        return ApiFunction.classInstance;
    };

    // ** POST **
    public post = async <T>(data: T, uri: string): Promise<AxiosResponse> => {
        return this.instance.post(`${this.baseUrl}${uri}`, data);
    };

    // ** GET **
    public get = async (uri: string): Promise<AxiosResponse> => {
        return this.instance.get(`${this.baseUrl}${uri}`);
    };

    // ** PATCH **
    public update = async <T>(data: T, uri: string): Promise<AxiosResponse> => {
        return this.instance.patch(`${this.baseUrl}${uri}`, data);
    };

    // ** PUT **
    public put = async <T>(data: T, uri: string): Promise<AxiosResponse> => {
        return this.instance.put(`${this.baseUrl}${uri}`, data);
    };

    // ** DELETE **
    public delete = async (uri: string): Promise<AxiosResponse> => {
        return this.instance.delete(`${this.baseUrl}${uri}`);
    };
}
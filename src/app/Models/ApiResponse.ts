export class ApiResponse {
    public Successful: boolean = false;
    public Errors: Array<string> | null = null;
}

export class ApiResponseWithBody<TData> extends ApiResponse {
    public Body: TData | null = null;
}

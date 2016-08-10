export interface ApiResponse<T> {
    /** Status of the response, if it failed, errored or succeeded. */
    status: string,
    /** Status code for the response. */
    statusCode: number,
    /** Additional messages for the response. */
    message: string,
    /** Data sent by the server. */
    data: T
}
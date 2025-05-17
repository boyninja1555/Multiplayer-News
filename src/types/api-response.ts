export default interface ApiResponse {
    status: boolean
    message?: string
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data?: any
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFoundError'
    }

    statusCode() {
        return 404
    }
}
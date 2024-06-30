class ServiceResponse {
    constructor(status, data = null, msg = null) {
        this.status = status;
        this.data = data;
        this.msg = msg;
    }
}

module.exports = {ServiceResponse};
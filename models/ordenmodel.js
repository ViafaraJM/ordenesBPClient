class ApiClient {
    constructor() {
        this.api = axios.create({
        baseURL: 'https://orders-system-api.onrender.com/api/v1/',});
        this.chain = new HandlesChain();
    }

    async getOrdenes() {
        const response = await this.api.get('ordenes');
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }

    async crearOrden(orden) {
        const response = await this.api.post('ordenes', orden);
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }

    async eliminarOrden(idOrden) {
        const response = await this.api.delete(`ordenes/${idOrden}`);
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }

    async editarOrden(idOrden, orden) {
        const response = await this.api.put(`ordenes/${idOrden}`, orden);
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }
}
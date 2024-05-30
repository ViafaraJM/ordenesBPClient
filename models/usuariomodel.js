class ApiClient {
    constructor() {
        this.api = axios.create({
        baseURL: 'https://orders-system-api.onrender.com/api/v1/',});
        this.chain = new HandlesChain();
    }

    async getUsuario() {
        const response = await this.api.get('usuarios');
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }

    async crearUsuario(usuario) {
        const response = await this.api.post('usuarios', usuario);
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }

    async eliminarUsuario(idUsuario) {
        const response = await this.api.delete(`usuarios/${idUsuario}`);
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }

    async editarUsuario(idUsuario, usuario) {
        const response = await this.api.put(`usuarios/${idUsuario}`, usuario);
        const request = new Request(response.data);
        this.chain.handle(request);
        return request;
    }
}
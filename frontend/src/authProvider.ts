const authProvider = {
    // Called when the user attempts to log in
    login: async ({ email, password }: { email: string, password: string }) => {
        const request = new Request('https://localhost:5001/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Login failed');
        }

        const { token, role } = await response.json();  // Asegúrate de que el backend envíe el token y el rol
        localStorage.setItem('token', token);  // Almacenar el token JWT
        localStorage.setItem('role', role);  // Almacenar el rol del usuario
    },


    
    // Called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');  // Eliminar el token
        return Promise.resolve();
    },
    
    // Called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    
    // Called to check if the user is authenticated
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    
    // Called to get the user's permissions
    getPermissions: () => {
        const role = localStorage.getItem('role');  // Obtener el rol desde localStorage
        return role ? Promise.resolve(role) : Promise.reject();
    },
};

export default authProvider;
import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';

const LoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password }).catch(() => notify('Invalid email or password'));
    };

    return (
        <form onSubmit={submit}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
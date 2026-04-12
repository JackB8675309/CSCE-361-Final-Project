import { useState } from 'react';
import '../styles/auth.css';

export default function AuthPage({ setPage }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');

        // Validation cơ bản
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Sau này đồng đội backend sẽ thay phần này bằng API call thật
        console.log(isLogin ? 'Logging in...' : 'Registering...', { email, password });
        setPage('home'); // Tạm thời chuyển về home sau khi login
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</h2>
                <p>{isLogin ? 'Welcome back!' : 'Join us today.'}</p>

                {error && <div className="auth-error">{error}</div>}

                <input
                    className="auth-input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {!isLogin && (
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                )}

                <button className="btn-auth" onClick={handleSubmit}>
                    {isLogin ? 'SIGN IN' : 'REGISTER'}
                </button>

                <div className="auth-switch">
                    {isLogin ? (
                        <p>Don't have an account? <span onClick={() => { setIsLogin(false); setError(''); }}>Register</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => { setIsLogin(true); setError(''); }}>Sign In</span></p>
                    )}
                </div>
            </div>
        </div>
    );
}
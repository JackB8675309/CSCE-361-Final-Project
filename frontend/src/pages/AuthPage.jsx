import { useState } from 'react';
import '../styles/auth.css';

export default function AuthPage({ setPage, setCurrentUserId }) {
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

        // Determine which C# Web API endpoint we are talking to
        const endpoint = isLogin ? 'login' : 'create-account';
        const url = `http://localhost:5000/user/${endpoint}`;

        // Send the HTTP POST Request
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => {
                if (!response.ok) {
                    // If it's a 401 Unauthorized or 400 BadRequest
                    return response.json().then(err => { throw new Error(err.message || 'Login Failed'); });
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                if (data.userId) {
                    setCurrentUserId(data.userId);
                }
                setPage('home'); // Now send them home
            })
            .catch(err => {
                console.error("Backend Error:", err);
                setError(err.message || "Failed to connect to the backend server.");
            });
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
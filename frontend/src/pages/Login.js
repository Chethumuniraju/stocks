import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Link, Container, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await login(formData);
            console.log('Login response:', response);
            if (response.token && response.user) {
                authLogin(response.user, response.token);
                navigate('/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data || 'Login failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Sign in</Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login; 
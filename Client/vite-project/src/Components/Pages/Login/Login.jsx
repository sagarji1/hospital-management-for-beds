import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminContext from '../../store/admin-context';

const Login = () => {
    const navigate = useNavigate();
    const { loginAdminMutation, loginDoctorMutation } = useContext(AdminContext);
    const [loginType, setLoginType] = useState('admin'); // admin or doctor

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            username: data.get('username'),
            password: data.get('password')
        };

        if (loginType === 'admin') {
            loginAdminMutation.mutate(user);
        } else {
            loginDoctorMutation.mutate(user);
        }
    };

    // Handle success and error cases
    if (loginAdminMutation.isSuccess || loginDoctorMutation.isSuccess) {
        toast.success('Logged In Successfully', {
            position: "top-left"
        });
        navigate('/dashboard'); // Adjust to the appropriate route for admin/doctor dashboard
    }

    if (loginAdminMutation.isError || loginDoctorMutation.isError) {
        toast.error('Error logging in', {
            position: "top-left"
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AddCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {loginType === 'admin' ? 'Admin Login' : 'Doctor Login'}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Button 
                        variant={loginType === 'admin' ? 'contained' : 'outlined'}
                        onClick={() => setLoginType('admin')}
                        sx={{ mr: 1 }}
                    >
                        Admin Login
                    </Button>
                    <Button 
                        variant={loginType === 'doctor' ? 'contained' : 'outlined'}
                        onClick={() => setLoginType('doctor')}
                    >
                        Doctor Login
                    </Button>
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

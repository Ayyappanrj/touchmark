import * as React from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import usersData from '../../json/users.json';
import { useState } from 'react';
import { Alert } from '@mui/material';

const Copyright = (props: any) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="https://touchmarkdes.com/" target="_blank">
          Touchmark
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userLogin(data);
    };

    const userLogin = (data: any) => {
        const email = data.get('email');
        const password = data.get('password');
        const user: any = usersData.users.find((user) => user.email == email && user.password == password);
        if(user) {
            navigate("/dashboard", { replace: true });
            localStorage.setItem("LOGIN",JSON.stringify(user));
        } else {
            setError('Invalid username or password');
        }
    }
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 4px 8px 0px rgba(0, 0, 0, 0.5)',
                        padding: "40px"
                    }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        className="cus-bor"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    { error && <Alert severity="error">{error}</Alert> }
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Login
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link to="#">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="#">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login;
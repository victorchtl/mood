import React, { useState } from 'react'
import './Register.css'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import Typography from '@mui/material/Typography';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AuthDataService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from '../../actions/auth';
import { registerProfilImgColors } from './RegisterProfilImgColors';
import SnackBarAlert from '../shared/snackbar/SnackBarAlert';
import { Link as RouterLink } from 'react-router-dom';

function Register() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, severity: null, message: null })
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(register({ username, email, password }))
                .then(res => {
                    setSnackbar({ ...snackbar, open: true, severity: 'success', message: 'Registration successful ! You can now Login' })
                    setTimeout(() => { navigate("/login", { replace: true }) }, 3000);
                })
                .catch(e => {
                    setSnackbar({ ...snackbar, open: true, severity: 'error', message: 'Registration failed !' })
                })
            setTimeout((setSnackbar({ ...snackbar, open: false, severity: null, message: null })), 3000)
        } else {
            alert("Your password does not match the confirm password!");
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }



    }

    return (
        <div className='login'>

            {snackbar.open && <SnackBarAlert severity={snackbar.severity} message={snackbar.message} />}

            <Container maxWidth="sm">

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <BubbleChartIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register to Mood!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Sign In
            </Button> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item xs textAlign='center'>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    {"Already have an account? Log In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </div>
    )
}

export default Register
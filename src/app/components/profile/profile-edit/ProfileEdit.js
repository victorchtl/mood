import React from 'react'
import { Container, Button, Grid, TextField, Avatar, TextareaAutosize, Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileEdit() {

    const { user: currentUser } = useSelector((state => state.auth))

    return (
        <div>
            <Container maxWidth="sm">
                <Box
                mt={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Avatar
                        alt={currentUser.username}
                        src={currentUser.profilImg}
                        sx={{ width: 56, height: 56, bgcolor: currentUser.profilImg }}
                    />
                    <Link component={RouterLink} to="/login" variant="caption">
                        {"Edit Profile Picture"}
                    </Link>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            type="text"
                            name="username"
                            value={currentUser.username}
                        // onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bio"
                            label="Biography"
                            type="text"
                            name="biography"
                            value={currentUser.bio}
                        // onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={currentUser.password}
                        // onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmPassword"
                            value={currentUser.password}
                        // onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        // onClick={handleRegister}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>

            </Container>
        </div>
    )
}

export default ProfileEdit
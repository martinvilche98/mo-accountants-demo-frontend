'use client';
import './LoginForm.styles.css';

import { useState, useRef } from 'react'
import {Card, Grid, TextField, FormControl, InputAdornment, Alert} from '@mui/material'
import {AccountCircle} from '@mui/icons-material';

import PasswordField from '../../PasswordField/PasswordField';
import SubmitFormButton from '../../buttons/SubmitFormButton';

function LoginForm({}) {

    const [errorMessage, setErrorMessage] = useState('')

    return <>
        <Card id="login-form-container" className='bg-base'>
            <Grid container item xs={12} padding={2}>
                <Grid item xs={4}>
                    <img id="MO-logo-login" src={'static/img/mo_logo.png'} alt="mo accountants logo"/>
                </Grid>
                <Grid item xs={8}>
                    <h1>Welcome</h1>
                </Grid>
                <Grid id="login-form-inputs-container" container item xs={12} direction="column" alignItems="center" justifyContent="center">
                    <FormControl fullWidth sx={{ mt:2 }}>
                        <TextField 
                            id="login-form-username-field" 
                            label="E-Mail" 
                            variant="outlined" 
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <PasswordField id="login-form-username-password" />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <SubmitFormButton 
                        btnLabel='Log in' 
                        onSubmit={()=>{}}
                        errorMessage={errorMessage}
                    />
                </Grid>
            </Grid>
        </Card>
    </>
}
export default LoginForm
'use client';
import './LoginForm.styles.css';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {Card, Grid, TextField, FormControl, InputAdornment, Alert} from '@mui/material'
import Fade from '@mui/material/Fade';
import {AccountCircle} from '@mui/icons-material';
import CommonApi from '../../../backend/common_api'

import PasswordField from '../../PasswordField/PasswordField';
import SubmitFormButton from '../../buttons/SubmitFormButton';

function LoginForm({}) {
    const router = useRouter()

    const [isLoading, setLoading] = useState(false)
    const [isFaded, setFaded] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const handleLoginSubmit = async () => {
        if(!isLoading){
            setLoading(true)
            await CommonApi.login(emailInput, passwordInput).then(body => {
                localStorage.setItem('access', body.access)
                setTimeout(()=>{setFaded(true)},200)
                setTimeout(()=>{router.push('/home')},500)
                setTimeout(()=>{setLoading(false)},1000)
            })
        }
    }

    useEffect(() => {
        const isLogged = localStorage.getItem('access')
        if(isLogged){
            setTimeout(()=>{router.push('/home')},100)
            return
        }
        else{
            localStorage.removeItem('user_group')
            setTimeout(()=>{setFaded(false)},300)
        }
    }, []);

    return <>
        <Fade in={!isFaded}>
            <div>
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
                                    value={emailInput} 
                                    disabled={isLoading}
                                    onChange={e => setEmailInput(e.target.value)}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                <PasswordField 
                                    id="login-form-username-password" 
                                    disabled={isLoading}
                                    onKeyUp={(e:any) => setPasswordInput(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <SubmitFormButton 
                                btnLabel='Log in' 
                                loading={isLoading}
                                onSubmit={handleLoginSubmit}
                                errorMessage={errorMessage}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </Fade>
    </>
}
export default LoginForm
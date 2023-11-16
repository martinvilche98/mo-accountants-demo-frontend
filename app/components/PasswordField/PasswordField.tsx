'use client';
import { useState, useEffect, MutableRefObject } from 'react'

import {TextField, InputAdornment, IconButton} from "@mui/material"
import {Visibility, VisibilityOff, Key} from "@mui/icons-material"

function PasswordField(props:{id: string, onKeyUp: Function, disabled: boolean}) {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickPasswordIcon = () => setShowPassword((show) => !show);

    return  <TextField 
        id="login-form-username-password"
        label="Password" 
        variant="outlined" 
        sx={{ mt:2 }}
        type={showPassword ? 'text' : 'password'}
        onKeyUp={(v) => props.onKeyUp(v)}
        disabled={props.disabled || false}
        InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <Key />
            </InputAdornment>
        ),
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                  onClick={handleClickPasswordIcon}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        ),
        }}
    />  

}
export default PasswordField
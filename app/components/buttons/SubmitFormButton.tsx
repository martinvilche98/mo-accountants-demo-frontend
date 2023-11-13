'use client';
import { useState, useEffect } from 'react'

import {Grid, Button, Alert} from '@mui/material'
import {ArrowRight, Height} from '@mui/icons-material';

function SubmitFormButton(props:{btnLabel: string, onSubmit: Function, errorMessage: string}) {

    const [isLoading, SetLoading] = useState(false)

    return <>
        <Grid container item xs={12}>
            <Grid item xs={8} container alignItems={'center'} sx={{pl:1}}>
                {
                    (!props.errorMessage || props.errorMessage.length == 0) ? '' :
                    <span id="login-form-error-message" className="txt-red ">{props.errorMessage}</span>
                }
            </Grid>
            <Grid item xs={4} container justifyContent={'end'}>
                <Button variant="contained" size="small" className='bg-primary'>
                    {props.btnLabel}
                    <ArrowRight/>
                </Button>
            </Grid>
        </Grid>
    </>
}
export default SubmitFormButton
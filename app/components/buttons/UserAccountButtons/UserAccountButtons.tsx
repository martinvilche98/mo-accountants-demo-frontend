'use client';

import { useRouter } from 'next/navigation'
import {Grid, Button} from '@mui/material'
import {useState, useEffect } from 'react'
import {Logout, AccountCircle} from '@mui/icons-material';
import CommonApi from '../../../backend/common_api'

function UserAccountButtons({}) {
    const router = useRouter()
    let requestedMe = false;
    const [isLoading, setLoading] = useState(true)
    const [userFullname, setUserFullname] = useState("")

    const handleLogout = () => {
        localStorage.removeItem('access')
        setTimeout(()=>{router.push('/')},300)
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access')
        if(!accessToken || accessToken == 'undefined' || accessToken == 'null'){
                localStorage.removeItem('access')
                window.location.assign('/')
        }
        else if(requestedMe==false){
            requestedMe = true
            CommonApi.getMeUser(accessToken).then(body => {
                setUserFullname(`${body.user.first_name} ${body.user.last_name}`)
                localStorage.setItem('user_group', body.user.group)
            })
        }
        setTimeout(()=>{setLoading(false)},400)
    }, []);

    return <Grid id="user-account-buttons-container" container item direction={'row'} alignItems={'center'} justifyContent={'end'} xs={12}>
            <Grid item  xs={7} container justifyContent={'end'} alignItems={'center'} sx={{pr:1}}>
                <AccountCircle sx={{pr: 1}}/>
                {userFullname}
            </Grid>
            <Grid item container justifyContent={'end'} xs={3}>
                <Button 
                    variant="contained"
                    size="small"
                    className='bg-primary'
                    onClick={()=>{handleLogout()}}
                >
                    <Logout/>
                    Log out
                </Button>
            </Grid>
        </Grid>
}
export default UserAccountButtons
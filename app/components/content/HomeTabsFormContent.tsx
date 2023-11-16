'use client';

import { useState, useEffect, SyntheticEvent } from 'react'
import {Grid, Card, Tabs, Tab, FormControl, TextField} from '@mui/material'
import HomeSubmitReceiptForm from '../forms/homeSubmitReceiptForm/HomeSubmitReceiptForm';
import HomePendingReceipts from '../forms/homePendingReceipts/HomePendingReceipts';


function HomeTabs({}) {

    const [currentTab, setCurrentTab] = useState(0)

    const handleTabChange = (evn: SyntheticEvent, value: number) => {
        setCurrentTab(value)
    }

    return <Grid container item xs={12} justifyContent={'center'}>
        <Grid container item xs={12} justifyContent={'center'}>
            <Tabs value={currentTab} onChange={handleTabChange}  aria-label="Home Tabs">
                <Tab label="Submit Receipts" />
                <Tab label="Pending Approval" />
            </Tabs>
        </Grid>
        <Grid container item xs={9} justifyContent={'center'}>
            {
                currentTab == 0 ? 
                    <Card id="home-submit-receipt-form-container" sx={{p:3, pt:0, mt:2}}>
                        <HomeSubmitReceiptForm/>
                    </Card>
                    :
                    <HomePendingReceipts
                        
                    />
                }
        </Grid>
    </Grid>
}
export default HomeTabs
'use client';

import { useState, useEffect } from 'react'

import {AddCircle, CloseRounded, CheckCircle, CheckCircleOutline} from '@mui/icons-material';
import {Card, Grid, Box, Tabs, Tab, FormControl, TextField, Button, CircularProgress, Snackbar, Alert} from '@mui/material'
import CommonAPI from '@/app/backend/common_api';


function HomePendingReceipts({}) {

    let receiptsFetched = false

    const [wasSubmitted, setWasSubmitted] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [pendingReceipts, setPendingReceipts] = useState([])

    const fetchPendingReceipts = async () => {
        const authToken = localStorage.getItem('access')
        await CommonAPI.retrievePendingReceipts(authToken || "").then(body => {
            setLoading(false)
            setPendingReceipts(body.receipts)
        })
    }

    const submitReceiptApproval = async (receipt_id: number) => {
        const authToken = localStorage.getItem('access')
        console.log(receipt_id)
        await CommonAPI.approveReceipt(authToken || "", `${receipt_id}`).then(() => {
            setWasSubmitted(true)
            setTimeout(()=>{
                fetchPendingReceipts()
            },300)
            setTimeout(()=>{
                setWasSubmitted(false)
            },3300)
        })
    }

    useEffect(() => {
        if (receiptsFetched==false){
            receiptsFetched=true
            fetchPendingReceipts()
        }
    }, []);

    return <Grid item container xs={5} justifyContent={'center'} direction={'column'} sx={{p:2}}>
        { 
            isLoading ? 
            <CircularProgress size={40}/> : 

            pendingReceipts.map((rep , index) => 
                {return <Card className='pending-receipt-item' key={`pendingrep-${index}`} sx={{p:2, mb:2}}>
                    <Grid item container xs={12} sx={{mt:-3}}>
                        <h3>{rep.company_name}</h3>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={4}>
                            <b>Fiscal Number</b>
                        </Grid>
                        <Grid item xs={4}>
                            <b>Customer Number</b>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={4}>
                            {rep.fiscal_number}
                        </Grid>
                        <Grid item xs={4}>
                            {rep.customer_number}
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sx={{mt:2}}>
                        <Grid item xs={4}>
                            <h6 className='pending-receipt-item-text'>Emitted At:</h6>
                        </Grid>
                        <Grid item xs={4}>
                            <h6 className='pending-receipt-item-text'>Tax Amount $:</h6>
                        </Grid>
                        <Grid item xs={4}>
                            <h6 className='pending-receipt-item-text'>Tax Percentage %:</h6>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={4}>
                            <span className='pending-receipt-item-text'>{rep.emitted_at}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className='pending-receipt-item-text'>${rep.tax_amount}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className='pending-receipt-item-text'>{rep.tax_percentage}%</span>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent={'end'}>
                        {rep.is_approved == true ? 
                            <span>
                                <CheckCircleOutline sx={{mr:1}}/>
                                Approved
                            </span>
                            :
                            <Button 
                                variant="contained"
                                size="small"
                                className='bg-primary'
                                onClick={()=>submitReceiptApproval(rep.id)}
                            >
                                <CheckCircle sx={{mr:1}}/>
                                Approve
                            </Button>
                        }
                    </Grid>
                </Card>}
            )
        }
        <Snackbar
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            open={wasSubmitted}
            autoHideDuration={6000}
        >
            <Alert severity="success" sx={{ width: '100%' }}>
                Receipt approved Successfully
            </Alert>
        </Snackbar>
    </Grid>

}
export default HomePendingReceipts
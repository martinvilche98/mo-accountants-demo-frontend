import { useState, useEffect } from 'react'

import {AddCircle, CloseRounded} from '@mui/icons-material';
import {Card, Grid, Box, Tabs, Tab, FormControl, TextField, Button, Snackbar, Alert} from '@mui/material'
import SubmitFormButton from '../../buttons/SubmitFormButton';
import CommonAPI from '@/app/backend/common_api';


class CompanyReceipt{

    constructor(date: string, tax_amount: string, tax_percentage: string){
        this.emitted_at = date
        this.tax_amount = tax_amount
        this.tax_percentage = tax_percentage
    }

    emitted_at: string = "";
    tax_amount: string = "";
    tax_percentage: string = "";
}

function HomeSubmitReceiptForm({}) {

    const [wasSubmitted, setWasSubmitted] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isAddingReceipt, setAddingReceipt] = useState(false)
    const [errorMessage, serErrorMessage] = useState("")

    const [companyName, setCompanyName] = useState("")
    const [companyFiscalNumber, setCompanyFiscalNumber] = useState("")
    const [companyCustomerNumber, setCompanyCustomerNumber] = useState("")

    const [companyReceipts, SetCompanyReceipts] = useState(Array<CompanyReceipt>)
    const [receiptDate, setReceiptDate] = useState("")
    const [receiptTaxPercentage, setReceiptTaxPercentage] = useState("")
    const [receiptTaxAmount, setReceiptTaxAmount] = useState("")

    const handleCompanyReceiptsSubmit = async () => {
        if(!isLoading){
            setLoading(true)
            const authToken = localStorage.getItem('access')
            await CommonAPI.submitCompanyReceipts(
                authToken || "",
                companyName,
                companyFiscalNumber,
                companyCustomerNumber,
                companyReceipts
            ).then(body => {
                setWasSubmitted(true)
                setLoading(false)
                setCompanyName("")
                setCompanyFiscalNumber("")
                setCompanyCustomerNumber("")
                SetCompanyReceipts([])
                handleCancelNewReceipt()
                setTimeout(()=>{setWasSubmitted(false)},3300)
            })
        }
    }

    const handleClickNewReceipt = () => {
        setAddingReceipt(true)
    }

    const handleCancelNewReceipt = () =>{
        setReceiptDate("")
        setReceiptTaxAmount("")
        setReceiptTaxPercentage("")
        setAddingReceipt(false)
    }

    const removeReceiptFromCompany = (item_index: number) => {
        let temp = Object.assign([], companyReceipts)
        temp.splice(item_index, 1)
        SetCompanyReceipts(temp)
    }

    const addReceiptToCompany = () => {
        let temp = Object.assign([], companyReceipts)
        temp.push(new CompanyReceipt(
            receiptDate,
            receiptTaxAmount,
            receiptTaxPercentage,
        ))
        SetCompanyReceipts(temp)
        handleCancelNewReceipt()
    }

    return <FormControl fullWidth sx={{p:0, m:0}}>
        <Grid item xs={12}>
            <h5>Company Information</h5>
        </Grid>
        <TextField 
            id="login-form-username-field" 
            label="Company Name" 
            variant="outlined" 
            value={companyName} 
            disabled={isLoading}
            onChange={e => setCompanyName(e.target.value)}
        />
        <Grid item container xs={12} sx={{mt:2}}>
            <TextField 
                id="login-form-username-field" 
                label="Fiscal ID" 
                variant="outlined" 
                value={companyFiscalNumber} 
                disabled={isLoading}
                placeholder='123-456-789'
                onChange={e => setCompanyFiscalNumber(e.target.value)}
            />
            <TextField 
                id="login-form-username-field" 
                label="Customer Number" 
                variant="outlined" 
                value={companyCustomerNumber} 
                disabled={isLoading}
                onChange={e => setCompanyCustomerNumber(e.target.value)}
                sx={{ml:2}}
            />
        </Grid>
        <Grid item xs={12}>
            <h6>Receipts</h6>
            {
                companyReceipts.map((e,index)=>{
                    return <Card key={`receipt-${index}`} sx={{mb:2, p:1}}>
                        <Grid item container direction={'row'} justifyContent={'space-between'}>
                            <Grid item xs={4}>
                                {e.emitted_at}
                            </Grid>
                            <Grid item xs={3}>
                                {e.tax_percentage}%
                            </Grid>
                            <Grid item xs={4}>
                                $ {e.tax_amount}
                            </Grid>
                            <Grid item xs={1}>
                                <Grid item xs={12} container justifyContent={'center'}>
                                    <CloseRounded  sx={{cursor:'pointer'}} onClick={()=>{
                                        removeReceiptFromCompany(index)
                                    }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                })
            }
            {
                !isAddingReceipt ?
                <Grid item xs={12} container justifyContent={'start'}>
                    <Button 
                        variant="contained"
                        size="small"
                        className='bg-primary'
                        onClick={()=>handleClickNewReceipt()}
                    >
                        <AddCircle/>
                        Add Receipt
                    </Button>
                </Grid>
                :
                <Card sx={{p:0, m:0, pr:2}}>
                    <Grid item container xs={12} sx={{mt:2}}>
                        <Grid item xs={4}>
                            <TextField 
                                id="login-form-username-field" 
                                label="Date" 
                                variant="outlined" 
                                value={receiptDate} 
                                disabled={isLoading}
                                placeholder='YYYY-MM-DD'
                                onChange={e => setReceiptDate(e.target.value)}
                                sx={{ml:2}}
                            />
                        </Grid>
                        
                        <Grid item xs={4}>
                            <TextField 
                                id="login-form-username-field" 
                                label="Tax Percentage" 
                                variant="outlined" 
                                placeholder='% Tax Percentage'
                                value={receiptTaxPercentage} 
                                disabled={isLoading}
                                onChange={e => setReceiptTaxPercentage(e.target.value)}
                                sx={{ml:2}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                id="login-form-username-field" 
                                label="Tax Amount" 
                                variant="outlined" 
                                placeholder='$ Tax Amount'
                                value={receiptTaxAmount} 
                                disabled={isLoading}
                                onChange={e => setReceiptTaxAmount(e.target.value)}
                                sx={{ml:2}}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent={'end'} sx={{mt:1, pb:1}}>
                        <Button 
                            variant="contained"
                            size="small"
                            className='bg-primary'
                            onClick={()=>addReceiptToCompany()}
                            sx={{mr:1}}
                        >
                            <Grid item xs={12} container justifyContent={'center'}>
                                <AddCircle sx={{mr:1}}/>
                                Add
                            </Grid>
                        </Button>
                        <Button 
                            variant="contained"
                            size="small"
                            onClick={()=>handleCancelNewReceipt()}
                            className='bg-red'
                        >
                            <Grid item xs={12} container justifyContent={'center'}>
                                <CloseRounded/>
                            </Grid>
                        </Button>
                    </Grid>
                </Card>
            }
        </Grid>
        <Grid item xs={12} sx={{mt:4}}>
            {
                isAddingReceipt ? '' :
                <SubmitFormButton 
                    btnLabel='Submit Report' 
                    loading={isLoading}
                    onSubmit={()=>handleCompanyReceiptsSubmit()}
                    errorMessage={errorMessage}
                />
            }
        </Grid>
        <Snackbar
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            open={wasSubmitted}
            autoHideDuration={3300}
        >
            <Alert severity="success" sx={{ width: '100%' }}>
                Receipt approved Successfully
            </Alert>
        </Snackbar>
    </FormControl>
}
export default HomeSubmitReceiptForm
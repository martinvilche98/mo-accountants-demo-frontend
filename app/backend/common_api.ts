

const COMMON_API_URL = "http://127.0.0.1:3000/"

export default class CommonAPI{

    static async login(email:string, password:string){
        const response = await fetch(`${COMMON_API_URL}auth/token`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });
        return response.json()
    }

    static async getMeUser(authToken: string){
        const response = await fetch(`${COMMON_API_URL}users/me`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json",
            },
            body: null
        });
        return response.json()
    }

    static async submitCompanyReceipts(
        authToken: string,
        companyName: string,
        companyFiscalNumber: string,
        companyCustomerNumber: string,
        companyReceipts: any,
    ){
        const response = await fetch(`${COMMON_API_URL}receipts/submit`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_name: companyName,
                fiscal_number: companyFiscalNumber,
                customer_number: companyCustomerNumber,
                receipts: companyReceipts,
            })
        });
        return response.json()
    }

    static async retrievePendingReceipts(authToken: string){
        const response = await fetch(`${COMMON_API_URL}receipts/pending`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json",
            },
            body:null
        });
        return response.json()
    }

    static async approveReceipt(authToken: string, receiptId: string){
        const response = await fetch(`${COMMON_API_URL}receipts/approve/${receiptId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json",
            },
            body:null
        });
        return response.json()
    }

}
import './home.css';
import {Grid} from '@mui/material'
import UserAccountButtons from '../components/buttons/UserAccountButtons/UserAccountButtons'
import HomeTabsFormContent from '../components/content/HomeTabsFormContent';

function HomeComponent({}) {

    return <>
        <div>
            <Grid container item xs={12} sx={{px:2, pt:1}}>
                <Grid item container direction={'row'} alignItems={'center'} xs={8}>
                    <Grid item xs={1}>
                        <img id="MO-logo-header" src={'static/img/mo_logo.png'} alt="mo accountants logo"/>
                    </Grid>
                    <Grid item xs={8}>
                        <h2>M&O Accountants</h2>
                    </Grid>
                </Grid>
                <Grid item container xs={4} justifyContent={'end'} alignItems={'center'}>
                    <UserAccountButtons/>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{px:2, pt:1}}>
                <HomeTabsFormContent />
            </Grid>
            
        </div>
    </>
}
export default HomeComponent
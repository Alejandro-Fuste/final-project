import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    color: {
        backgroundColor: '#A5A4BF',
        color: '#43425D'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        color: '#A5A4BF'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        backgroundColor: '#43425D',
        color: '#A5A4BF',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create([ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none',
        color: '#A5A4BF'
    },
    title: {
        flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240
    }
}));

function Watchlist() {
    const classes = useStyles();
    /* The Watchlist will have a useEffect that will do a get request to the Mongo Database */
    return (
        <Grid container spacing={3}>
                <React.Fragment>
                    <Grid item xs={12}>
                        <Typography style={{ alignSelf: 'center' }} variant="h4">
                            Watchlist Page
                        </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography variant='h4'>Company Name</Typography>
                        <Paper className={classes.paper}>
                            Graded Info
                        </Paper>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography variant='h4'>Another Company</Typography>
                        <Paper className={classes.paper}>
                            Graded Info
                        </Paper>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography variant='h4'>Different Company</Typography>
                        <Paper className={classes.paper}>
                            Graded Info
                        </Paper>
                    </Grid>
                </React.Fragment>
        </Grid>
    )
}

export default Watchlist;
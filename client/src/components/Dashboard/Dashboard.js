import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MainListItems from './listItems';
import Avatar from '@material-ui/core/Avatar';
import { TextField } from '@material-ui/core';

import { Switch, Route } from 'react-router-dom';
import Search from '../pages/Search';
import Portfolio from '../pages/Portfolio';
import Watchlist from '../pages/WatchList';
import API from '../../utils/API';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
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
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
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
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		color: '#fff',
		backgroundColor: '#43425D',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9)
		}
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

export default function Dashboard() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [ searchStock, setSearchStock ] = useState();
	const searchRef = useRef();

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		API.getStock({
			ticker: 'AAPL'
		}).then(res => {
			let data = {
				name: res.data.quoteType.shortName,
				symbol: res.data.symbol,
				year: res.data.earnings.financialsChart.yearly[3].date,
				revenue: res.data.earnings.financialsChart.yearly[3].revenue.fmt,
				grossProfit: res.data.financialData.grossMargins.fmt,
				operatingIncome: res.data.financialData.profitMargins.fmt,
				netIncome: res.data.earnings.financialsChart.yearly[3].earnings.fmt,
				netIncomeProfitMargin: res.data.financialData.profitMargins.fmt,
				earningsPerShare: res.data.defaultKeyStatistics.trailingEps.fmt,
				totalCash: res.data.financialData.totalCash.fmt,
				totalDebit: res.data.financialData.totalDebt.fmt,
				debtToEquity: res.data.financialData.debtToEquity.fmt,
				currentRatio: res.data.financialData.currentRatio.fmt,
				quickRatio: res.data.financialData.quickRatio.fmt,
				returnOnAssets: res.data.financialData.returnOnAssets.fmt,
				returnOnEquity: res.data.financialData.returnOnEquity.fmt,
				operatingCashFlow: res.data.financialData.operatingCashflow.fmt,
				freeCashFlow: res.data.financialData.freeCashflow.fmt
			}
			setSearchStock(data);
		}).catch(err => console.log(err));
	}, [])

	const handleSearchStock = (e) => {
		e.preventDefault();
		API.getStock({
			ticker: searchRef.current.value.toUpperCase()
		})
			.then((res) => {
				console.log(res.data);
				setSearchStock(null);
				let data = {
					name: res.data.quoteType.shortName,
					symbol: res.data.symbol,
					year: res.data.earnings.financialsChart.yearly[3].date,
					revenue: res.data.earnings.financialsChart.yearly[3].revenue.fmt,
					grossProfit: res.data.financialData.grossMargins.fmt,
					operatingIncome: res.data.financialData.profitMargins.fmt,
					netIncome: res.data.earnings.financialsChart.yearly[3].earnings.fmt,
					netIncomeProfitMargin: res.data.financialData.profitMargins.fmt,
					earningsPerShare: res.data.defaultKeyStatistics.trailingEps.fmt,
					totalCash: res.data.financialData.totalCash.fmt,
					totalDebit: res.data.financialData.totalDebt.fmt,
					debtToEquity: res.data.financialData.debtToEquity.fmt,
					currentRatio: res.data.financialData.currentRatio.fmt,
					quickRatio: res.data.financialData.quickRatio.fmt,
					returnOnAssets: res.data.financialData.returnOnAssets.fmt,
					returnOnEquity: res.data.financialData.returnOnEquity.fmt,
					operatingCashFlow: res.data.financialData.operatingCashflow.fmt,
					freeCashFlow: res.data.financialData.freeCashflow.fmt
				}
				setSearchStock(data);
				console.log(searchStock);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						zepcap
					</Typography>
					<IconButton color="inherit">
						<Badge badgeContent={4} color="primary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<Avatar
						style={{ marginLeft: '15px' }}
						alt="Remy Sharp"
						src="https://randomuser.me/api/portraits/men/90.jpg"
					/>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<MainListItems />
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />

				<Container maxWidth="lg" className={classes.container}>
					<Switch>
						<Route path="/search">
							<Search />
						</Route>
						<Route path="/portfolio">
							<Portfolio />
						</Route>
						<Route path="/watchlist">
							<Watchlist />
						</Route>
					</Switch>
					<Typography variant="h5" align="inherit" display="block">
						Search for a Stock
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} lg={9}>
							<form onSubmit={handleSearchStock}>
								<TextField style={{ margin: '15px 0px' }} variant="outlined" inputRef={searchRef} />
							</form>
						</Grid>
						{!searchStock ? <p>Something</p> :
							<>
								<Grid item xs={6}>
									<Typography variant="h4">{searchStock.name} {searchStock.symbol}</Typography>
									<Typography variant='h4'>Income Statement</Typography>
									<Paper className={classes.paper}>
										<h5>Year: {searchStock.year}</h5>
										<h5>Revenue: {searchStock.revenue}</h5>
										<h5>Gross Profit: {searchStock.grossProfit}</h5>
										<h5>Operating Income: {searchStock.operatingIncome}</h5>
										<h5>Net Income: {searchStock.netIncome}</h5>
										<h5>Net Income Profit Margin: {searchStock.netIncomeProfitMargin}</h5>
										<h5>Earnings Per Share: {searchStock.earningsPerShare}</h5>
									</Paper>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h4'>Balance Sheet</Typography>
									<Paper className={classes.paper}>
										<h5>Total Cash: {searchStock.totalCash}</h5>
										<h5>Total Debit: {searchStock.totalDebit}</h5>
										<h5>Debt/Equity: {searchStock.debtToEquity}</h5>
										<h5>Current Ratio: {searchStock.currentRatio}</h5>
										<h5>Quick Ratio: {searchStock.quickRatio}</h5>
										<h5>Return on Assets: {searchStock.returnOnAssets}</h5>
										<h5>Return on Equity: {searchStock.returnOnEquity}</h5>
									</Paper>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h4'>Cash Flow Statement</Typography>
									<Paper className={classes.paper}>
										<h5>Operating Cash Flow{searchStock.operatingCashFlow}</h5>
										<h5>Free Cash Flow{searchStock.freeCashFlow}</h5>
									</Paper>
								</Grid>
							</>
						}
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}

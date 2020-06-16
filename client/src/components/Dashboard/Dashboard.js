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
import Button from '@material-ui/core/Button';

import MainListItems from './listItems';
import Avatar from '@material-ui/core/Avatar';
import { OutlinedInput, InputAdornment } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import SearchIcon from '@material-ui/icons/Search';

import { Switch, Route } from 'react-router-dom';
import Portfolio from '../pages/Portfolio';
import Watchlist from '../pages/WatchList';
// import Login from '../pages/Login';
import API from '../../utils/API';
import GradingScale from '../../utils/gradingScale';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from '../private-route/PrivateRoute';
// import Dashboard2 from './Dashboard';
import moment from 'moment';

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
	const [ open, setOpen ] = useState(false);
	const [ searchStock, setSearchStock ] = useState();
	const [ gradeData, setGradeData ] = useState();

	const searchRef = useRef();

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		API.getData({
			ticker: 'AAPL'
		})
			.then((res) => {
				// Trying to destructure this out a bit.
				const { longName, symbol } = res.data;
				console.log(longName, symbol);
				console.log(res.data);

				let data = {
					name: longName,
					symbol,
					year: moment().subtract(365, 'days').format('YYYY'),
					revenue: res.data.financialData.totalRevenue.fmt,
					grossProfit: res.data.financialData.grossMargins.fmt,
					operatingIncome: res.data.financialData.operatingMargins.fmt,
					netIncome: res.data.financialData.profitMargins.fmt,
					earningsGrowth: res.data.financialData.earningsGrowth.fmt,
					totalCash: res.data.financialData.totalCash.fmt,
					totalDebit: res.data.financialData.totalDebt.fmt,
					debtToEquity: res.data.financialData.debtToEquity.fmt,
					currentRatio: res.data.financialData.currentRatio.fmt,
					quickRatio: res.data.financialData.quickRatio.fmt,
					returnOnAssets: res.data.financialData.returnOnAssets.fmt,
					returnOnEquity: res.data.financialData.returnOnEquity.fmt,
					operatingCashFlow: res.data.financialData.operatingCashflow.fmt,
					freeCashFlow: res.data.financialData.freeCashflow.fmt
				};

				let gData = [
					{ property: 'revenue', value: res.data.financialData.totalRevenue.raw },
					{ property: 'grossProfit', value: res.data.financialData.grossMargins.raw },
					{ property: 'operatingIncome', value: res.data.financialData.operatingMargins.raw },
					{ property: 'netIncome', value: res.data.financialData.profitMargins.raw },
					{ property: 'earningsGrowth', value: res.data.financialData.earningsGrowth.raw },
					{ property: 'totalCash', value: res.data.financialData.totalCash.raw },
					{ property: 'totalDebt', value: res.data.financialData.totalDebt.raw },
					{ property: 'debtToEquity', value: res.data.financialData.debtToEquity.raw },
					{ property: 'currentRatio', value: res.data.financialData.currentRatio.raw },
					{ property: 'quickRatio', value: res.data.financialData.quickRatio.raw },
					{ property: 'returnOnAssets', value: res.data.financialData.returnOnAssets.raw },
					{ property: 'returnOnEquity', value: res.data.financialData.returnOnEquity.raw },
					{ property: 'freeCashFlow', value: res.data.financialData.freeCashflow.raw }
				];

				gData.forEach((item, i) => {
					item.letterGrade = GradingScale[item.property](item.value);
				});

				gData.push({ finalGrade: GradingScale.finalGrade(gData) });

				setSearchStock(data);
				setGradeData(gData);
				console.log('Grade Data:');
				console.log(gradeData);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSearchStock = (e) => {
		e.preventDefault();
		API.getData({
			ticker: searchRef.current.value.toUpperCase()
		})
			.then((res) => {
				setSearchStock(null);
				setGradeData(null);
				// Trying to destructure this out a bit.
				const { longName, symbol } = res.data;
				console.log(longName, symbol);
				console.log(res.data);

				let data = {
					name: longName,
					symbol,
					year: moment().subtract(365, 'days').format('YYYY'),
					revenue: res.data.financialData.totalRevenue.fmt,
					grossProfit: res.data.financialData.grossMargins.fmt,
					operatingIncome: res.data.financialData.operatingMargins.fmt,
					netIncome: res.data.financialData.profitMargins.fmt,
					earningsGrowth: res.data.financialData.earningsGrowth.fmt,
					totalCash: res.data.financialData.totalCash.fmt,
					totalDebit: res.data.financialData.totalDebt.fmt,
					debtToEquity: res.data.financialData.debtToEquity.fmt,
					currentRatio: res.data.financialData.currentRatio.fmt,
					quickRatio: res.data.financialData.quickRatio.fmt,
					returnOnAssets: res.data.financialData.returnOnAssets.fmt,
					returnOnEquity: res.data.financialData.returnOnEquity.fmt,
					operatingCashFlow: res.data.financialData.operatingCashflow.fmt,
					freeCashFlow: res.data.financialData.freeCashflow.fmt
				};

				let gData = [
					{ property: 'revenue', value: res.data.financialData.totalRevenue.raw },
					{ property: 'grossProfit', value: res.data.financialData.grossMargins.raw },
					{ property: 'operatingIncome', value: res.data.financialData.operatingMargins.raw },
					{ property: 'netIncome', value: res.data.financialData.profitMargins.raw },
					{ property: 'earningsGrowth', value: res.data.financialData.earningsGrowth.raw },
					{ property: 'totalCash', value: res.data.financialData.totalCash.raw },
					{ property: 'totalDebt', value: res.data.financialData.totalDebt.raw },
					{ property: 'debtToEquity', value: res.data.financialData.debtToEquity.raw },
					{ property: 'currentRatio', value: res.data.financialData.currentRatio.raw },
					{ property: 'quickRatio', value: res.data.financialData.quickRatio.raw },
					{ property: 'returnOnAssets', value: res.data.financialData.returnOnAssets.raw },
					{ property: 'returnOnEquity', value: res.data.financialData.returnOnEquity.raw },
					{ property: 'freeCashFlow', value: res.data.financialData.freeCashflow.raw }
				];
				gData.forEach((item, i) => {
					item.letterGrade = GradingScale[item.property](item.value);
					console.log(item);
				});

				gData.push({ finalGrade: GradingScale.finalGrade(gData) });

				setGradeData(gData);
				setSearchStock(data);
				console.log('Grade Data:');
				console.log(gradeData);
			})
			.catch((err) => console.log(err));
	};

	const addToWatchListHandler = () => {
		API.saveToWatchlist()
			.then((res) => {
				console.log(res.data);
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
						<Route exact path="/dashboard">
							<Grid container spacing={3}>
								{!searchStock || !gradeData ? (
									''
								) : (
									<React.Fragment>
										<Grid item xs={12} md={6}>
											<Typography variant="h5" align="inherit" display="block">
												Search for a Stock
											</Typography>
											<form onSubmit={handleSearchStock}>
												<OutlinedInput
													inputRef={searchRef}
													endAdornment={
														<InputAdornment position="end">
															<SearchIcon />
														</InputAdornment>
													}
													style={{ margin: '20px 0px' }}
												/>
											</form>
										</Grid>
										<Grid item xs={12} md={3}>
											<Typography style={{ alignSelf: 'center' }} variant="h4">
												{searchStock.name} "{searchStock.symbol}" Final Grade:{' '}
												{gradeData[13].finalGrade}
												<Button
													onClick={addToWatchListHandler}
													className={classes.color}
													variant="contained"
													endIcon={<WorkIcon />}
												>
													{' '}
													Add to Watchlist
												</Button>
											</Typography>
										</Grid>
										<Grid item xs={12} md={3} />
										<Grid item lg={6} xs={12}>
											<Typography variant="h4">Income Statement</Typography>
											<Paper className={classes.paper}>
												<h3>Year: {searchStock.year}</h3>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Revenue: {searchStock.revenue}</h3>
													<h3>Grade: {gradeData[0].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Gross Profit: {searchStock.grossProfit}</h3>
													<h3>Grade: {gradeData[1].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Operating Income: {searchStock.operatingIncome}</h3>
													<h3>Grade: {gradeData[2].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Net Income: {searchStock.netIncome}</h3>
													<h3>Grade: {gradeData[3].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>
														Earnings Growth:{' '}
														{!searchStock.earningsGrowth ? (
															'No Growth'
														) : (
															searchStock.earningsGrowth
														)}
													</h3>
													<h3>Grade: {gradeData[4].letterGrade.letter}</h3>
												</div>
											</Paper>
										</Grid>
										<Grid item xs={6}>
											<Typography variant="h4">Balance Sheet</Typography>
											<Paper className={classes.paper}>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Total Cash: {searchStock.totalCash}</h3>
													<h3>Grade: {gradeData[5].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Total Debit: {searchStock.totalDebit}</h3>
													<h3>Grade: {gradeData[6].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Current Ratio: {searchStock.currentRatio}</h3>
													<h3>Grade: {gradeData[8].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Quick Ratio: {searchStock.quickRatio}</h3>
													<h3>Grade: {gradeData[9].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Return on Assets: {searchStock.returnOnAssets}</h3>
													<h3>Grade: {gradeData[10].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Return on Equity: {searchStock.returnOnEquity}</h3>
													<h3>Grade: {gradeData[11].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Debt/Equity: {searchStock.debtToEquity}</h3>
													<h3>Grade: Not Graded</h3>
												</div>
											</Paper>
										</Grid>
										<Grid item xs={6}>
											<Typography variant="h4">Cash Flow Statement</Typography>
											<Paper className={classes.paper}>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Free Cash Flow: {searchStock.freeCashFlow}</h3>
													<h3>Grade: {gradeData[12].letterGrade.letter}</h3>
												</div>
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>
													<h3>Operating Cash Flow: {searchStock.operatingCashFlow}</h3>
													<h3>Grade: Not Graded</h3>
												</div>
											</Paper>
										</Grid>
									</React.Fragment>
								)}
							</Grid>
						</Route>
						<Route path="/portfolio">
							<Portfolio />
						</Route>
						<Route path="/watchlist">
							<Watchlist />
						</Route>
						{/* <Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route> */}
						{/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
					</Switch>

					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}

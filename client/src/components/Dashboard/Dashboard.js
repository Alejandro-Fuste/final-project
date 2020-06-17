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
import API from '../../utils/API';
import GradingScale from '../../utils/gradingScale';
import moment from 'moment';
import Spinner from './Spinner';

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
	items: {
		display: 'flex',
		justifyContent: 'space-between',
		borderTop: '1px solid #eee',
		borderBottom: '1px solid #efefef',
		padding: '7px 20px',
		borderRadius: '6px',
		margin: '10px 0'
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
		API.saveToWatchlist(gradeData)
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
									<Spinner />
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
										<Grid item xs={12} md={6}>
											<h1 style={{ paddingTop: '40px' }}>
												{searchStock.name} "{searchStock.symbol}" Final Grade:{' '}
												{gradeData[13].finalGrade}
											</h1>
										</Grid>
										<Grid item xs={12}>
											<Paper className={classes.paper} style={{ color: '#43425D' }}>
												<h1 style={{ paddingLeft: '20px' }}>Income Statement</h1>
												<div className={classes.items}>
													<h3>
														Year:{' '}
														<span style={{ color: '#797A9F' }}>{searchStock.year}</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Revenue:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.revenue ? 'No Value' : searchStock.revenue}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[0].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Gross Profit:{' '}
														<span style={{ color: '#797A9F' }}>
															{' '}
															{!searchStock.grossProfit ? (
																'No Value'
															) : (
																searchStock.grossProfit
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[1].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Operating Income:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.operatingIncome ? (
																'No Value'
															) : (
																searchStock.operatingIncome
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[2].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Net Income:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.netIncome ? (
																'No Value'
															) : (
																searchStock.netIncome
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[3].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Earnings Growth:{' '}
														<span style={{ color: '#797A9F' }}>
															Earnings Growth:{' '}
															{!searchStock.earningsGrowth ? (
																'No Value'
															) : (
																searchStock.earningsGrowth
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[4].letterGrade.letter}
														</span>
													</h3>
												</div>

												<h1 style={{ paddingLeft: '20px' }}>Balance Sheet</h1>

												<div className={classes.items}>
													<h3>
														Total Cash:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.totalCash ? (
																'No Value'
															) : (
																searchStock.totalCash
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[5].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Total Debit:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.totalDebit ? (
																'No Value'
															) : (
																searchStock.totalDebit
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[6].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Current Ratio:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.currentRatio ? (
																'No Value'
															) : (
																searchStock.currentRatio
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[8].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Quick Ratio:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.quickRatio ? (
																'No Value'
															) : (
																searchStock.quickRatio
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[9].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Return on Assets:{' '}
														<span style={{ color: '#797A9F' }}>
															{' '}
															{!searchStock.returnOnAssets ? (
																'No Value'
															) : (
																searchStock.returnOnAssets
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[10].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Return on Equity:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.returnOnEquity ? (
																'No Value'
															) : (
																searchStock.returnOnEquity
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[11].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Debt/Equity:{' '}
														<span style={{ color: '#797A9F' }}>
															{' '}
															{!searchStock.debtToEquity ? (
																'No Value'
															) : (
																searchStock.debtToEquity
															)}
														</span>
													</h3>
												</div>

												<h1 style={{ paddingLeft: '20px' }}>Cash Flow Statement</h1>

												<div className={classes.items}>
													<h3>
														Free Cash Flow:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.freeCashFlow ? (
																'No Value'
															) : (
																searchStock.freeCashFlow
															)}
														</span>
													</h3>
													<h3>
														Grade:{' '}
														<span style={{ color: '#797A9F' }}>
															{gradeData[12].letterGrade.letter}
														</span>
													</h3>
												</div>
												<div className={classes.items}>
													<h3>
														Operating Cash Flow:{' '}
														<span style={{ color: '#797A9F' }}>
															{!searchStock.operatingCashFlow ? (
																'No Value'
															) : (
																searchStock.operatingCashFlow
															)}
														</span>
													</h3>
												</div>
											</Paper>
											<Grid item xs={12} md={6}>
												<Button
													style={{ margin: '30px 0' }}
													onClick={addToWatchListHandler}
													className={classes.color}
													variant="contained"
													endIcon={<WorkIcon />}
												>
													Add to Watchlist
												</Button>
											</Grid>
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
					</Switch>

					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}

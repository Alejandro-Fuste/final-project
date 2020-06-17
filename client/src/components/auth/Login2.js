import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import loginBg from '../../assets/login-bg.png';

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

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: `url(${loginBg})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const Login = (props) => {
	const classes = useStyles();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState({});

	const emailRef = useRef();

	useEffect((nextProps) => {
		if (props.auth.isAuthenticated) props.history.push('/dashboard');

		if (nextProps.auth.isAuthenticated) props.history.push('/dashboard');

		if (nextProps.errors) {
			setErrors(nextProps.errors);
		}
	}, []);

	// const onChange = (e) => {
	// 	this.setState({ [e.target.name]: e.target.value });
	// };

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: emailRef.current.value,
			password
		};

		// console.log(userData);
		loginUser(userData);
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>

					<form noValidate onSubmit={onSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							inputRef={emailRef}
							// onChange={onChange}
							value={email}
							error={errors.email}
							// type="email"
							className={classnames('', { invalid: errors.email || errors.emailnotfound })}
						/>
					</form>

					<Grid container>
						<Grid item>
							<Link to="register" variant="body2">
								{"Don't have an account? Register"}
							</Link>
						</Grid>
					</Grid>
					<Box mt={5}>
						<Copyright />
					</Box>
				</div>
			</Grid>
		</Grid>
		// <div className="container">
		// 			<form noValidate onSubmit={this.onSubmit}>
		// 				<div className="input-field col s12">
		// 					<input
		// 						onChange={this.onChange}
		// 						value={this.state.email}
		// 						error={errors.email}
		// 						name="email"
		// 						type="email"
		// 						className={classnames('', { invalid: errors.email || errors.emailnotfound })}
		// 					/>
		// 					<label htmlFor="email">Email</label>
		// 					<span className="red-text">
		// 						{errors.email}
		// 						{errors.emailnotfound}
		// 					</span>
		// 				</div>
		// 				<div className="input-field col s12">
		// 					<input
		// 						onChange={this.onChange}
		// 						value={this.state.password}
		// 						error={errors.password}
		// 						name="password"
		// 						type="password"
		// 						className={classnames('', { invalid: errors.password || errors.passwordincorrect })}
		// 					/>
		// 					<label htmlFor="password">Password</label>
		// 					<span className="red-text">
		// 						{errors.password}
		// 						{errors.passwordincorrect}
		// 					</span>
		// 				</div>
		// 				<div className="col s12" style={{ paddingLeft: '11.250px' }}>
		// 					<button
		// 						className="btn btn-large waves-effect waves-light hoverable blue accent-3"
		// 						style={{
		// 							width: '150px',
		// 							borderRadius: '3px',
		// 							letterSpacing: '1.5px',
		// 							marginTop: '1rem'
		// 						}}
		// 						type="submit"
		// 					>
		// 						Login
		// 					</button>
		// 				</div>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

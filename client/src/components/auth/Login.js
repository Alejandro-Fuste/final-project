import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) this.props.history.push('/dashboard');

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		// console.log(userData);
		this.props.loginUser(userData);
	};

	render() {
		const { errors } = this.state;

		return (
			<Container fluid>
				<Row style={{ marginTop: '4rem' }}>
					<Col xs={6}>
						<h3>Picture</h3>
					</Col>
					<Col xs={6}>
						<Form noValidate onSubmit={this.onSubmit}>
							<div>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										onChange={this.onChange}
										value={this.state.email}
										error={errors.email}
										name="email"
										type="email"
										className={classnames('', { invalid: errors.email || errors.emailnotfound })}
									/>
									<span className="red-text">
										{errors.email}
										{errors.emailnotfound}
									</span>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										onChange={this.onChange}
										value={this.state.password}
										error={errors.password}
										name="password"
										type="password"
										className={classnames('', {
											invalid: errors.password || errors.passwordincorrect
										})}
									/>
									<span className="red-text">
										{errors.password}
										{errors.passwordincorrect}
									</span>
								</Form.Group>

								<p>
									Don't have an account? <Link to="/register">Register</Link>
								</p>

								<Button
									variant="primary"
									type="submit"
									style={{
										width: '150px',
										borderRadius: '3px',
										letterSpacing: '1.5px',
										marginTop: '1rem'
									}}
								>
									Login
								</Button>
							</div>
						</Form>
					</Col>
				</Row>

				{/* <form noValidate onSubmit={this.onSubmit}>
					<div className="input-field col s12">
						<input
							onChange={this.onChange}
							value={this.state.email}
							error={errors.email}
							name="email"
							type="email"
							className={classnames('', { invalid: errors.email || errors.emailnotfound })}
						/>
						<label htmlFor="email">Email</label>
						<span className="red-text">
							{errors.email}
							{errors.emailnotfound}
						</span>
					</div>
					<div className="input-field col s12">
						<input
							onChange={this.onChange}
							value={this.state.password}
							error={errors.password}
							name="password"
							type="password"
							className={classnames('', { invalid: errors.password || errors.passwordincorrect })}
						/>
						<label htmlFor="password">Password</label>
						<span className="red-text">
							{errors.password}
							{errors.passwordincorrect}
						</span>
					</div>
					<div className="col s12" style={{ paddingLeft: '11.250px' }}>
						<button
							className="btn btn-large waves-effect waves-light hoverable blue accent-3"
							style={{
								width: '150px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginTop: '1rem'
							}}
							type="submit"
						>
							Login
						</button>
					</div>
				</form> */}
			</Container>
		);
	}
}

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

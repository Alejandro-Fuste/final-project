import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import classnames from 'classnames';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import './style.css';
import Logo from '../../../assets/logo 2.svg';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
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

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		// console.log(newUser);
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<Container fluid>
				<Row style={{ height: '100vh' }}>
					<Col xs={6} className="registerPic" />
					<Col xs={6}>
						<Form noValidate onSubmit={this.onSubmit}>
							<div style={{ margin: '15vh 5vw' }}>
								<div style={{ textAlign: 'center', marginBottom: '15px' }}>
									<Image src={Logo} fluid />
									<span className="logoName">zepcap</span>
								</div>

								<Form.Group controlId="formBasicName">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder="Enter Name"
										onChange={this.onChange}
										value={this.state.name}
										error={errors.name}
										name="name"
										type="name"
										className={classnames('', { invalid: errors.name })}
									/>
									<span className="red-text">{errors.name}</span>
								</Form.Group>

								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										placeholder="Enter email"
										onChange={this.onChange}
										value={this.state.email}
										error={errors.email}
										name="email"
										type="email"
										className={classnames('', { invalid: errors.email })}
									/>
									<span className="red-text">{errors.email}</span>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										placeholder="Password"
										onChange={this.onChange}
										value={this.state.password}
										error={errors.password}
										name="password"
										type="password"
										className={classnames('', { invalid: errors.password })}
									/>
									<span className="red-text">{errors.password}</span>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password2</Form.Label>
									<Form.Control
										placeholder="Password2"
										onChange={this.onChange}
										value={this.state.password2}
										error={errors.password2}
										name="password2"
										type="password"
										className={classnames('', { invalid: errors.password2 })}
									/>
									<span className="red-text">{errors.password2}</span>
								</Form.Group>

								<p>
									Already have an account? <Link to="/login">Login</Link>
								</p>

								<Button
									variant="primary"
									type="submit"
									style={{
										width: '150px',
										borderRadius: '3px',
										letterSpacing: '1.5px',
										marginTop: '1rem',
										backgroundColor: '#A5A4BF',
										borderColor: '#A5A4BF'
									}}
								>
									Sign Up
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

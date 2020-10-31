import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import { Form} from "react-bootstrap"

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    
    return (
        <div className="mt-5">
            <Helmet>
                <title>Bull&Bear - Login</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>
            <h1 className="text-center mb-4 text-info" >Sign In</h1>
            <h3 className='text-center mb-4 text-info'>Sign into your Account</h3>
            <Form className="login text-center border border-light p-5" onSubmit={e => onSubmit(e)}>
                <div className='auth__form__group'>
                    <input 
                        className='form-control mb-4'
                        type='email'
                        placeholder='Email'
                        name='email' value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='auth__form__group'>
                    <input
                        className='form-control mb-4'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                </div>
                <button type="submit" className="btn btn-outline-info">Sign in</button>
            </Form>
            <p className="w-100 text-center mt-2">
                Don't have an account? <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
            </p>
            <p className='w-100 text-center mt-2"'>
            Forgot your Password? <Link to='/forgot-password'>Reset Password</Link>
            </p>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
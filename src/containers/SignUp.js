import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAlert } from '../actions/alert';
import { signup } from '../actions/auth';
import PropTypes from 'prop-types';

const SignUp = ({ setAlert, signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password !== password2)
            setAlert('Passwords do not match', 'error');
        else
            signup({ name, email, password, password2 });
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    
    return (
        <div>
            <Helmet>
                <title>Realest Estate - Sign Up</title>
                <meta
                    name='description'
                    content='sign up page'
                />
            </Helmet>
            <h1 className="text-center mb-4 text-info" >Sign up</h1>
            <h3 className='text-center mb-4 text-info'>Create your Account</h3>
            <form className="text-center border border-light p-5" onSubmit={e => onSubmit(e)}>
                <div class="signup orm-row mb-4">
                        <input 
                            className='form-control mb-4'
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                            required 
                        />
                        <input 
                            className='form-control mb-4'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required 
                        />
                        <input
                            className='form-control mb-4'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                        />
                        <input
                            className='form-control mab-4'
                            type='password'
                            placeholder='Confirm Password'
                            name='password2'
                            value={password2}
                            onChange={e => onChange(e)}
                            minLength='6'
                        />
                    <button class="btn btn-outline-info m-3" type="submit">Sign in</button>
            </div>
            </form>
            <p className="w-100 text-center mt-2">
                Already have an account? <Link className='auth__authtext__link' to='/login'>Sign In</Link>
            </p>
        </div>
    );

};

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, signup })(SignUp);
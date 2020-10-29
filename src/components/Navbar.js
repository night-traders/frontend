import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Alert from './Alert';
import PropTypes from 'prop-types';

const navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <a className="nav-link" onClick={logout} href='#!'>Logout</a>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/signup'>Sign Up</Link>
            </li>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand text-info" to='/'>Bull and Bear</Link>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
                        <li className="nav-item">
                            <NavLink className='nav-link' exact to='/'>Home</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className='nav-link' exact to='/listings'>Stocks</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className='nav-link' exact to='/about'>About</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-info" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <Alert />
        </Fragment>
    );
};

navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(navbar);
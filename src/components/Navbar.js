import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Alert from './Alert';
import PropTypes from 'prop-types';

const navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <NavLink className="nav-link nav-link text-white" onClick={logout} to='/'>Logout</NavLink>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink className="nav-link text-white ml-2 pl-1" to='/login'>Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-white ml-2 pl-1" to='/signup'>Sign Up</NavLink>
            </li>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className=" navbar navbar-expand-md navbar-dark fixed-top bg-info">
                <Link className="text-white font-weight-bold h2 mr-3 text-decoration-none" to="/">Bull & Bear</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="collapse navbar-collapse list-unstyled navbar-nav mr-left" id="navbarCollapse">
                        <li className="nav-item">
                            <NavLink className='nav-link text-white p-2' exact to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link text-white p-2' exact to='/listings'>Watchlist</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link text-white p-2' exact to='/about'>About</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-right">
                        {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2 ml-1" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-info btn-outline-light mt-1" type="submit">Search</button>
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
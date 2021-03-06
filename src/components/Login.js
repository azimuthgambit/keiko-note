import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav className="container login modal-fade">
    <p>Please log in to view and manage your notebook. (3rd party cookies must be enabled.)</p>
    <div className="login-row">
      <button 
        className="login-btn github" 
        onClick={() => props.authenticate('Github')}
      >
        Log In With GitHub
      </button>

      <button 
        className="login-btn twitter" 
        onClick={() => props.authenticate('Twitter')}
      >
        Log In With Twitter
      </button>

      <button 
        className="login-btn facebook" 
        onClick={() => props.authenticate('Facebook')}
        >
        Log In With Facebook
      </button>
    </div>

    <p>Or</p>

    <button 
      className="login-btn guest" 
      onClick={() => props.authenticate('guest')}
      >
      Continue as Guest
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;

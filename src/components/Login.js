import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav className="container login modal-fade">
    <p>Please log in to view and manage your notebook. (3rd party cookies must be enabled for this.)</p>
    <div className="welcome-row">
      <button 
        className="github" 
        onClick={() => props.authenticate('Github')}
      >
        Log In With GitHub
      </button>

      <button 
        className="twitter" 
        onClick={() => props.authenticate('Twitter')}
      >
        Log In With Twitter
      </button>

      <button 
        className="facebook" 
        onClick={() => props.authenticate('Facebook')}
        >
        Log In With Facebook
      </button>
    </div>

    <p>Or</p>

    <button 
      className="guest" 
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

import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav className="container login modal">
    {/* <h3>Login for Joe Pesci hey hey!!!</h3> */}
    <p>Please log in to view and manage your notebook. (3rd party cookies must be enabled for this feature.)</p>
    {/* <p>Log in to manage your lab's notebook.</p> */}
    {/* <button 
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
    </button> */}

    <button 
      className="facebook" 
      onClick={() => props.authenticate('Facebook')}
      >
      Log In With Facebook
    </button>
    <br></br>

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

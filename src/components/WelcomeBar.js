import React from 'react';
import PropTypes from 'prop-types';

class WelcomeBar extends React.Component {
  static propTypes = {
    tagline:PropTypes.string.isRequired,
    byline:PropTypes.string.isRequired,
    href:PropTypes.string.isRequired,
    uid:PropTypes.string,
    randomPaper:PropTypes.func.isRequired,
    loadSamplePapers:PropTypes.func.isRequired,
    togglePaperForm:PropTypes.func.isRequired,
    logout:PropTypes.func.isRequired
  }

  render() {

    const welcomeBar = (
      <div className="container">
        <div className="welcome-row">
          <h3 className="welcome-heading"><span> {this.props.tagline} </span></h3> 
          <p className="welcome-byline"><span> by </span>
            <a href={this.props.href} 
              target="_blank"
              rel="noopener noreferrer"
            >{this.props.byline}</a>
          </p>
        </div>
      </div>
    );

    const addPaperBtn = <button onClick={this.props.togglePaperForm} >ADD PAPER</button>;
    const logoutBtn = <button onClick={this.props.logout}>LOG OUT</button>;

    const buttonsRow = (
      <div className="container buttons-row modal-fade">
        {addPaperBtn}
        {logoutBtn}
      </div>
    );

    if (!this.props.uid) {
        return (
          <div className="welcome">
            {welcomeBar}
          </div>
        );
    } else if (this.props.uid) {
      return (
        <div className="welcome">
          {welcomeBar}
          {buttonsRow}
        </div>
      );
    } else {
      return (
        <div className="welcome">
          {welcomeBar}
          {buttonsRow}
        </div>
      );
    }
  }
}

export default WelcomeBar;
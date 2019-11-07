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
          <h6 className="welcome-byline"><span> by </span>
            <a href={this.props.href} 
              target="_blank"
              rel="noopener noreferrer"
            >{this.props.byline}</a>
          </h6>
        </div>
      </div>
    );

    // const enterPaperBtn = this.props.uid ? <button onClick={this.props.togglePaperForm} >NEW PAPER</button> : <div></div> ;
    // const loadSamplesBtn = this.props.uid ? <button onClick={this.props.loadSamplePapers} >SAMPLE PAPERS</button> : <div></div> ;
    // const logoutBtn = this.props.uid ? <button onClick={this.props.logout}>Log Out</button> : <div></div> ;

    const enterPaperBtn = <button onClick={this.props.togglePaperForm} >ENTER PAPER</button>;
    const randomPaperBtn = <button onClick={this.props.randomPaper} >RANDOM PAPER</button>;
    const loadSamplesBtn = <button onClick={this.props.loadSamplePapers} >SAMPLE PAPERS</button>;
    const logoutBtn = <button onClick={this.props.logout}>LOG OUT</button>;

    const buttonsRow = (
      <div className="container buttons-row modal-fade">
        {enterPaperBtn}
        {randomPaperBtn}
        {loadSamplesBtn}
        {logoutBtn}
      </div>
    );

    if (!this.props.uid) {
        return (
          <div className="welcome">
            {welcomeBar}
          </div>
        );
    // } else if (this.props.uid && !this.state.hidePaperForm) {
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
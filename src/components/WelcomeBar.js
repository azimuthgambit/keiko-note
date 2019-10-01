import React from 'react';
import PropTypes from 'prop-types';
import PaperForm from './PaperForm';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

class WelcomeBar extends React.Component {
  static propTypes = {
    tagline:PropTypes.string.isRequired,
    byline:PropTypes.string.isRequired,
    href:PropTypes.string.isRequired,
    uid:PropTypes.string,
    logout:PropTypes.func.isRequired,
    addPaper:PropTypes.func.isRequired
  }

  state = {
    hidePaperForm: true
  }

  togglePaperForm = () => { this.setState({ hidePaperForm : !this.state.hidePaperForm }) };

  // renderPaperForm = () => {
  //   return (
  //     <CSSTransition
  //       classNames="card"
  //       // key={Date.now()}
  //       timeout={{ enter:500, exit:500 }}
  //     >
  //       <PaperForm 
  //         hidePaperForm={this.state.hidePaperForm}
  //         togglePaperForm={this.togglePaperForm}
  //         addPaper={this.props.addPaper}
  //       />
  //     </CSSTransition>
  //   );
  // }

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

    const logoutBtn = this.props.uid ? <button onClick={this.props.logout}>Log Out</button> : <div></div> ;
    const enterPaperBtn = this.props.uid ? <button onClick={this.togglePaperForm} >Enter New Paper</button> : <div></div> ;
    const loadSamplesBtn = this.props.uid ? <button onClick={this.props.loadSamplePapers} >Load Sample Papers</button> : <div></div> ;

    const buttonsRow = (
      <div className="container buttons-row modal-fade">
        {enterPaperBtn}
        {loadSamplesBtn}
        {logoutBtn}
      </div>
    );

    const paperFormDiv = (
      <PaperForm 
        hidePaperForm={this.state.hidePaperForm}
        togglePaperForm={this.togglePaperForm}
        addPaper={this.props.addPaper}
      />
    );
    
    if (!this.props.uid) {
        return (
          <div className="welcome">
            {welcomeBar}
          </div>
        );
      }
    
    if (this.props.uid && !this.state.hidePaperForm) {
      return (
        <div className="welcome">
          {welcomeBar}
          {buttonsRow}
          {/* <TransitionGroup component="div" className="paper-form">
            {this.renderPaperForm}
          </TransitionGroup> */}
          {paperFormDiv}
        </div>
      );
    }

    return (
      <div className="welcome">
        {welcomeBar}
        {buttonsRow}
        {/* {paperFormDiv} */}
      </div>
    );

  }
}

export default WelcomeBar;
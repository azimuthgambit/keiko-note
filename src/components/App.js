import React from "react";
import firebase from 'firebase/app';
import base, { firebaseApp } from "../base";
// import PropTypes from "prop-types";
import PaperForm from "./PaperForm";
import Login from "./Login";
import Card from "./Card";
import samplePapers from "../sample-papers";

class App extends React.Component {
  state = {
    papers: {},
    uid: null,
    hidePaperForm: true
  };

  continueAsGuest = () => {
    this.setState({ 
      papers: {},
      uid: 'guest',
      hidePaperForm: true
    });    
  }
  
  componentDidMount() {
    // return if running in guest mode
    if (this.state.uid === 'guest') { return; }

    firebase.auth().onAuthStateChanged(user => {
      if(!user) { return }
      else if(user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  authHandler = async (user) => {
    if (!this.state.uid) {
      this.setState({ uid: user.user.uid });
      this.ref = base.syncState(`${this.state.uid}/papers`, {
        context: this,
        state: "papers"
      });
    } 
  }

  logout = async () => {
    if (this.state.uid === 'guest') {
      this.setState({ 
        papers: {},
        uid: null,
        hidePaperForm: true
      });
    } else {
      firebase.auth().signOut();
      await firebase.auth().signOut();
      base.removeBinding(this.ref);
      this.setState({ 
        papers: {},
        uid: null,
        hidePaperForm: true
      });
      // base.reset()
    }
  }

  togglePaperForm = () => { this.setState({ hidePaperForm : !this.state.hidePaperForm }) };
  
  loadSamplePapers = () => { this.setState({ papers: samplePapers }); }

  addPaper = paper => {
    // take a copy of the existing state, do not mutate state
    const papers = { ...this.state.papers };
    // add new paper to papers variable
    papers[`paper${Date.now()}`] = paper;
    // set the new papers object to state
    this.setState({ papers });
  };

  deletePaper = key => {
    // take copy of state
    const papers = {...this.state.papers};
    // when logged in, update the state for firebase
    if (this.state.uid !== 'guest') {
      papers[key] = null;
    // in guest mode, use the delete method
    } else if (this.state.uid === 'guest') {
      delete papers[key];
    }
    this.setState({ papers });
  }

  render() {
    const logoutBtn = this.state.uid? <button onClick={this.logout}>Log Out</button> : <div></div> ;
    const enterPaperBtn = this.state.uid? <button onClick={this.togglePaperForm} >Enter New Paper</button> : <div></div> ;
    const loadSamplesBtn = this.state.uid? <button onClick={this.loadSamplePapers} >Load Sample Papers</button> : <div></div> ;
    
    const welcomeBar = (
      <div className="welcome">
        <div className="container">
          <div className="welcome-row">
            <h3 className="welcome-heading"><span 
              >keiko-note</span></h3> 
            <h6 className="welcome-byline">by Azimuth Gambit</h6>
          </div>
          <div className="buttons-row">
            {enterPaperBtn}
            {loadSamplesBtn}
            {logoutBtn}
          </div>
        </div>
      </div>
    );

    const paperFormDiv = this.state.hidePaperForm ? '' : (
      <PaperForm 
        togglePaperForm={this.togglePaperForm}
        addPaper={this.addPaper}
      />
    );

    const cardSection = (
      <div className="container">
        <ul className="cards-ul">
          {Object.keys(this.state.papers).map(key => (
            <Card
              key={key}
              index={key}
              details={this.state.papers[key]}
              deletePaper={this.deletePaper}
              // cardUp={this.cardUp}
              // cardDn={this.cardDn}
            />
          ))}
        </ul>
      </div>
    );

    // check if logged in
    if (!this.state.uid) {
      return (
        <div>
          {welcomeBar}
          <Login 
            authenticate={this.authenticate}
            continueAsGuest={this.continueAsGuest}
          />
        </div>
      );
    }
    
    return (
      <div>
        {welcomeBar}
        {paperFormDiv}
        {cardSection}
      </div>
    );
  }

}

export default App;
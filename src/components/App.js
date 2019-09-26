import React from "react";
import firebase from 'firebase/app';
import base, { firebaseApp } from "../base";
import Login from "./Login";
import WelcomeBar from "./WelcomeBar";
import CardSection from "./CardSection";
import samplePapers from "../sample-papers";

class App extends React.Component {
  state = {
    papers: {},
    uid: null
  };
  
  componentDidMount() {
    // return and skip Firebase Auth if running in guest mode
    if (this.state.uid === 'guest') { return; }

    firebase.auth().onAuthStateChanged(user => {
      if(!user) { return }
      else if(user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    if (provider === 'guest') {
      this.setState({ uid: 'guest', });
      return;
    }
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
        uid: null
      });
    } else {
      firebase.auth().signOut();
      await firebase.auth().signOut();
      base.removeBinding(this.ref);
      this.setState({ 
        papers: {},
        uid: null
      });
      // base.reset()
    }
  }
  
  addPaper = paper => {
    // take copy of state
    const papers = { ...this.state.papers };
    // add new paper to papers variable
    papers[`paper${Date.now()}`] = paper;
    // set the new papers object to state
    this.setState({ papers });
  };

  deletePaper = key => {
    // get confirmation from user
    if (!window.confirm("Delete this paper?")) { return; }
    // take copy of state
    const papers = {...this.state.papers};
    // when logged in, update the state for firebase
    if (this.state.uid !== 'guest') {
      papers[key] = null;
    // in guest mode, use the delete method
    } else if (this.state.uid === 'guest') {
      delete papers[key];
    }
    // pass to state
    this.setState({ papers });
  }

  loadSamplePapers = () => { 
    // take a copy of state
    const papers = {...this.state.papers};
    // take a copy of the samples
    const samples = {...samplePapers};
    // pop in the samples as duplicates with unique keys
    papers[`paper${Date.now()}`]   = samples.paper1;
    papers[`paper${Date.now()+1}`] = samples.paper2;
    // or use this method to avoid creating duplicates
    // Object.assign(papers, samplePapers);
    // pass to state
    this.setState({ papers });
  }
  

  render() {
    
    const welcomeBar = (
      <WelcomeBar 
          tagline="keiko-note"
          byline="Azimuth Gambit"
          href="http://www.azimuthgambit.com"
          uid={this.state.uid}
          logout={this.logout}
          addPaper={this.addPaper}
          loadSamplePapers={this.loadSamplePapers}
      />
    );

    const login = (
      <Login authenticate={this.authenticate} />
    );

    const cardSection = (
      <CardSection 
        papers={this.state.papers}
        deletePaper={this.deletePaper}
      />
    );

    // check if logged in
    if (!this.state.uid) {
      return (
        <div>
          {welcomeBar}
          {login}
        </div>
      );
    }
    
    return (
      <div>
        {welcomeBar}
        {cardSection}
      </div>
    );
  }

}

export default App;
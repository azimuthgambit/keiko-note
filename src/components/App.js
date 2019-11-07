import React from "react";
import firebase from 'firebase/app';
import base, { firebaseApp } from "../base";
import Login from "./Login";
import WelcomeBar from "./WelcomeBar";
import PaperForm from './PaperForm';
import paperFactory from "../PaperFactory";
import CardSection from "./CardSection";
import samplePapers from "../sample-papers";

class App extends React.Component {
  state = {
    papers: {},
    uid: null,
    hidePaperForm: true
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
    // check if paper ID already exists in database
    if (papers[paper.pubMed]) {
      alert('sorry, this paper has already been added.');
      return;
    }
    // add new paper to papers variable
    // papers[`paper${Date.now()}`] = paper;
    papers[`${paper.pubMed}`] = paper;
    // set the new papers object to state
    this.setState({ papers });
  };

  updatePaper = (pubMed, field, content) => {
    // alert('time to update: ' + pubMed + ' : ' + field + ' : ' + content);
    // take copy of state
    const papers = { ...this.state.papers };
    papers[`${pubMed}`][`${field}`] = content;
    // set the new papers object to state
    this.setState({ papers });
  }

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
    // pass to state
    this.setState({ papers });
  }

  addPaperDelay = async (paper) => {
    // add the paper first
    this.addPaper(paper);
    // then use countdown to allow animation to finish
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve();
      }, 400)
    });
  };

  loadSamplePapers = async () => {
    const sampleKeys = Object.keys(samplePapers);
    for (const k in sampleKeys) {
      const key = sampleKeys[k];
      await this.addPaperDelay(samplePapers[key]);
    }
  }

  togglePaperForm = () => { 
    this.setState({ hidePaperForm : !this.state.hidePaperForm }) 
  };

  randomPaper = () => {
    // range of valid pubmed ID values
    const max = 31696199;
    const min = 17000000;  // or 01200000 alternatively
    const spread = max - min;
    const random = Math.floor(Math.random() * spread) + min;
    this.fetchPaper(random);
  }

  fetchPaper = async (pubMed) => {
    const apiLink = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&id=${pubMed}`; // returns xml
    return (
      fetch(apiLink, {mode: 'cors'})
      .then(response => response.text())
      .then(xml => paperFactory(xml))
      .then(paper => this.addPaper(paper))
      .catch(error => this.fetchError(error))
    );
  }

  fetchError = error => {
    console.log(error);
    this.randomPaper();
    // alert(`Unable to fetch that paper, please try again.`);
  }
  
  render() {
    
    const welcomeBar = (
      <WelcomeBar 
        tagline="keiko-note"
        byline="Azimuth Gambit"
        href="http://www.azimuthgambit.com"
        uid={this.state.uid}
        logout={this.logout}
        randomPaper={this.randomPaper}
        loadSamplePapers={this.loadSamplePapers}
        togglePaperForm={this.togglePaperForm}
      />
    );

    const login = (
      <Login authenticate={this.authenticate} />
    );

    const cardSection = (
      <CardSection 
        papers={this.state.papers}
        deletePaper={this.deletePaper}
        updatePaper={this.updatePaper}
      />
    );

    const newPaperDiv = (
      <PaperForm 
        hidePaperForm={this.state.hidePaperForm}
        togglePaperForm={this.togglePaperForm}
        addPaper={this.props.addPaper}
        fetchPaper={this.fetchPaper}
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
    } else if (this.state.uid && !this.state.hidePaperForm) {
      return (
        <div>
          {welcomeBar}
          {newPaperDiv}
          {cardSection}
        </div>
      );
    } else {
      return (
        <div>
          {welcomeBar}
          {cardSection}
        </div>
      );
    }
    
  }

}

export default App;
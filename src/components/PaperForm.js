import React from "react";
import PropTypes from 'prop-types';

class PaperForm extends React.Component {
  formRef = React.createRef();
  pubMedRef = React.createRef();

  static propTypes = {
    hidePaperForm:PropTypes.bool.isRequired,
    togglePaperForm:PropTypes.func.isRequired,
    addPaper:PropTypes.func.isRequired,
    fetchPaper:PropTypes.func.isRequired,
    loadSamplePapers:PropTypes.func.isRequired,
    randomPaper:PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  handleKeyDown = (key) => {
    if (key.code === 'Escape') {this.cancelForm()};
  }

  enterPaper = (e) => {
    e.preventDefault();
    const paper = this.pubMedRef.current.value;
    if (!paper) {
      alert('PubMed ID is required.');
      return;
    } 
    if (paper.length !== 8) {
      alert('PubMed ID must be 8 digits long.');
      return;
    } 
    this.fadeOutForm();
    // pause to let the form fade out before adding the paper
    setTimeout(() => this.props.fetchPaper(paper), 100);
  }

  randomPaper = () => {
    this.props.randomPaper();
    this.fadeOutForm();
  }

  loadSamplePapers = () => {
    this.props.loadSamplePapers();
    this.fadeOutForm();
  }
  
  cancelForm = () => {
    // get confirmation from user
    // if (!window.confirm("Are you sure you want to cancel?")) { return; }
    this.fadeOutForm();
  }
  
  fadeOutForm = () => {
    this.formRef.current.style.transition = 'opacity 200ms';
    this.formRef.current.style.opacity = 0;
    window.removeEventListener('keydown', this.handleKeyDown);
    // clear the form when toggled off and back on again
    setTimeout(() => this.props.togglePaperForm(), 200);
  }

  render() {

    // const randomPaperBtn = <button onClick={this.props.randomPaper} >RANDOM PAPER</button>;
    // const loadSamplesBtn = <button onClick={this.props.loadSamplePapers} >SAMPLE PAPERS</button>;
    // {randomPaperBtn}
    // {loadSamplesBtn}
     //  e.g. 30072743  or  30559420  or  25081398 

    return (
      <form className="modal" ref={this.formRef} onSubmit={this.enterPaper} >
        <div className="container modal-form">
          <div className="buttons-row">
            <button type="button" className="btn-modal-form" onClick={this.randomPaper} >RANDOM PAPER</button>
            <button type="button" className="btn-modal-form" onClick={this.loadSamplePapers} >SAMPLE PAPERS</button>
            <button type="button" className="btn-modal-form cancel" onClick={this.cancelForm}>Cancel / Close</button>
          </div>
          {/* <br></br><br></br> */}
          <hr></hr><br></br>
          <label>Enter PubMed ID:</label>
          <input name="pubMed" ref={this.pubMedRef} type="text" placeholder="(must be 8 digits)" required />
          <input type="submit" hidden />  
          <div className="buttons-row">
            <button type="button" className="btn-modal-form" onClick={this.enterPaper}>Add Paper</button>
          </div>
        </div>
      </form>
    );
  }
}

export default PaperForm;
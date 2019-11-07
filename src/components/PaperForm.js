import React from "react";
import PropTypes from 'prop-types';

class PaperForm extends React.Component {
  static propTypes = {
    fetchPaper:PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  handleKeyDown = (key) => {
    // if (key.code === 'Enter') {this.enterPaper()};  // causes error, app crashes
    // if (key.code === 'NumpadEnter') {this.enterPaper()};  // causes error, app crashes
    if (key.code === 'Escape') {this.cancelForm()};
  }

  formRef = React.createRef();
  pubMedRef = React.createRef();

  enterPaper = () => {
    const paper = this.pubMedRef.current.value;
    // const paper = {
    //   pubMed: this.pubMedRef.current.value
    // }
    // if (!paper.pubMed) {
      // alert('PubMed ID is required.')
    //   return;
    // }
    this.fadeOutForm();
    // pause to let the form fade out before adding the paper
    setTimeout(() => this.props.fetchPaper(paper), 100);
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

    return (
      <form className={`modal`} ref={this.formRef} >
        <div className="container modal-form">
          <label>Enter a PubMed ID: e.g. 30072743  or  30559420  or  25081398 </label>
          <input name="pubMed" ref={this.pubMedRef} type="text" placeholder="PubMed ID (must be 8 digits)" required />
          <div className="buttons-row">
            <button type="button" className="btn-modal-form" onClick={this.enterPaper}>Add Paper</button>
            {/* <button type="button" className="btn-modal-form" onClick={this.randomPaper}>Random</button> */}
            <button type="button" className="btn-modal-form" onClick={this.cancelForm}>Cancel / Close</button>
          </div>
        </div>
      </form>
    );
  }
}

export default PaperForm;
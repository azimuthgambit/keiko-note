import React from "react";
import PropTypes from 'prop-types';

class PaperForm extends React.Component {
  formRef = React.createRef();
  pubMedRef = React.createRef();

  static propTypes = {
    fetchPaper:PropTypes.func.isRequired
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
    console.log(paper)
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
      <form className={`modal`} ref={this.formRef} onSubmit={this.enterPaper} >
        <div className="container modal-form">
          <label>Enter a PubMed ID: e.g. 30072743  or  30559420  or  25081398 </label>
          <input name="pubMed" ref={this.pubMedRef} type="text" placeholder="PubMed ID (must be 8 digits)" required />
          <input type="submit" hidden />  
          <div className="buttons-row">
            <button type="button" className="btn-modal-form" onClick={this.enterPaper}>Add Paper</button>
            <button type="button" className="btn-modal-form" onClick={this.cancelForm}>Cancel / Close</button>
          </div>
        </div>
      </form>
    );
  }
}

export default PaperForm;
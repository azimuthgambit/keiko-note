import React from "react";

class PaperForm extends React.Component {

  formRef = React.createRef();

  titleRef = React.createRef();
  authorsRef = React.createRef();
  journalRef = React.createRef();
  yearRef = React.createRef();
  pubMedRef = React.createRef();
  keywordsRef = React.createRef();
  findingsRef = React.createRef();
  abstractRef = React.createRef();
  
  enterPaper = (e) => {
    e.preventDefault();
    const paper = {
      title: this.titleRef.current.value,
      authors: this.authorsRef.current.value,
      journal: this.journalRef.current.value,
      year: this.yearRef.current.value,
      timestamp: Date.now(),
      pubMed: this.pubMedRef.current.value,
      keywords: this.keywordsRef.current.value,
      findings: this.findingsRef.current.value,
      abstract: this.abstractRef.current.value
    }
    this.props.addPaper(paper);
    this.props.togglePaperForm();  // clears the form when toggled off and back on again
  }
  render() {
    const formClass = this.props.hidePaperForm ? 'form-hide' : 'form-show';
    return (
      <form className={`container modal-fade ${formClass}`} ref={this.formRef} >
        <label>Title</label>
        <input name="title" ref={this.titleRef} type="text" placeholder="Title" />
        <label>Authors</label>
        <input name="authors" ref={this.authorsRef} type="text" placeholder="Authors, separated by comma" />
        <label>Journal</label>
        <input name="journal" ref={this.journalRef} type="text" placeholder="Journal" />
        <label>Year</label>
        <input name="year" ref={this.yearRef} type="text" placeholder="Year" />
        <label>PubMed ID</label>
        <input name="pubMed" ref={this.pubMedRef} type="text" placeholder="PubMed ID" required />
        <label>Keywords</label>
        <input name="keywords" ref={this.keywordsRef} type="text" placeholder="keywords" />
        <label>Findings</label>
        <input name="findings" ref={this.findingsRef} type="text" placeholder="findings" />
        <label>Abstract</label>
        <input name="abstractMed" ref={this.abstractRef} type="text" placeholder="Abstract" />         
        <div className="buttons-row">
          <button type="button" className="btn-modal" onClick={this.enterPaper}>Add Paper</button>
          <button type="button" className="btn-modal" onClick={this.props.togglePaperForm}>Cancel / Close</button>
        </div>
      </form>  
    );
  }
  
  // componentDidMount() { console.log('paper form mounting!') }

}

export default PaperForm;
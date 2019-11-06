import React from "react";
import { paperFactory } from "../PaperFactory";
import PropTypes from 'prop-types';


class FetchCard extends React.Component {
  static propTypes = {  
    addPaper: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log("FetchCard Mounting");
    this.delayAdder();
  }
  
  fetchPaper = async (pubMed) => {
    const apiLink = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&id=${pubMed}`; // returns xml
    return (
      fetch(apiLink, {mode: 'cors'})
      .then(response => response.text())
      .then(xml => paperFactory(xml))
      .then(paper => this.props.addPaper(paper))
      // .then(paper => this.delayAdder(paper))
      // .then(paper => this.addFetch(paper))
      // .then(paper => console.table(paper))
      .catch(error => console.log(error))
      );
    }
  
  delayAdder = async () => {
    const papersArr = [30072743, 30559420, 25081398];
    for (const k in papersArr) {
      const key = papersArr[k];
      await this.addPaperDelay(key)
    }
  }

  addPaperDelay = async (key) => {
    this.fetchPaper(key)
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve();
      }, 500)
    });
  }

  render() {
    
    return (
      <div className="container">
      </div>
    )
  }
}

export default FetchCard;
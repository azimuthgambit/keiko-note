import React from "react";
import PropTypes from "prop-types";

class Card extends React.Component {
  static propTypes = {
    index: PropTypes.string.isRequired,
    details: PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.string,
      journal: PropTypes.string,
      year: PropTypes.string,
      timestamp: PropTypes.number,
      pubMed: PropTypes.string.isRequired,
      keywords: PropTypes.string,
      findings: PropTypes.string,
      abstract: PropTypes.string
    }),
    deletePaper: PropTypes.func.isRequired
  }

  state = {
    hideAbstract: true
  };

  render() {
    const { title, authors, journal, year, timestamp, pubMed, keywords, findings, abstract} = this.props.details;

    const titleCard = title ? title : '';
    // const authorsCard = authors ? authors : '';
    const journalCard = journal ? journal : '';
    const yearCard = year ? year : '';
    const timestampCard = timestamp ? timestamp : '';
    const pubMedCard = pubMed ? pubMed : '';
    const keywordsCard = keywords ? keywords : '';
    const findingsCard = findings ? findings : '';
    const abstractCard = abstract ? abstract : '';

    // console.log(title);
    // console.log(authors);
    // console.log(journal);
    // console.log(year);
    // console.log(timestamp);
    // console.log(pubMed);
    // console.log(keywords);
    // console.log(findings);
    // console.log(abstract);

    // const authorsFew = authors.split(/[,]/).slice(0,3); // only the first three authors, separated by comma
    const authorsFew = authors ? authors.split(/[,]/).slice(0,3) : '' ; // only the first three authors, separated by comma
    // const pubMedLink = () => 'https://www.ncbi.nlm.nih.gov/pubmed/' + pubMed ;
    const pubMedLink = () => 'https://www.ncbi.nlm.nih.gov/pubmed/' + pubMedCard ;
    const abstractText = this.state.hideAbstract ? '' : abstractCard;
    const toggleAbstract = () => { this.setState({ hideAbstract : !this.state.hideAbstract }) };
    
    // <li className='card' id={timestamp}>
    // <h6 className='bold card-title'>{title}</h6>
    return (
      <li className='card' id={timestampCard}>
        <div>
          <h6 className='bold card-title'>{titleCard}</h6>
          <p className='card-authors'>
            {authorsFew}, et al. 
            <span>   </span> 
            <i>{journalCard}</i> 
            {yearCard} 
            <span>   </span> 
            <a 
              className='card-link' 
              href={pubMedLink()} 
              rel='noopener noreferrer' 
              target='_blank'
            >
              pubmed
            </a> 
          </p>
          <p ><span className='bold card-keywords'>Keywords:</span> {keywordsCard}</p>
          <p ><span className='bold card-findings'>Findings:</span> {findingsCard}</p>
          <span 
            className='bold abstract-toggle'
            onClick={toggleAbstract}
          > Abstract </span>
          <p className='{abstractClass}'>
            {abstractText}
          </p>
        </div>
        <div className='card-btn-col'>
          <button 
            className='card-btn card-delete'
            onClick={() => this.props.deletePaper(this.props.index)}
          >×</button>
          {/* <button 
            className='card-btn card-up card-mid'
            onClick={() => this.props.cardUp(this.props.index)}
            ><strong>↑</strong></button>
          <button 
            className='card-btn card-dn'
            onClick={() => this.props.cardDn(this.props.index)}
          ><strong>↓</strong></button> */}
        </div>
      </li>

    )
  }
}

export default Card;
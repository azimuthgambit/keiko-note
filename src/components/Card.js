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
    hideAbstract: true,
  };

  render() {
    // return if props are null to preclude error
    if (!this.props.details) { return null; } 

    const { title, authors, journal, year, timestamp, pubMed, keywords, findings, abstract} = this.props.details;

    const titleCard = title ? title : '(title)';
    const journalCard = journal ? journal : '(journal)';
    const yearCard = year ? year : '(year)';
    const keywordsCard = keywords ? keywords : '';
    const findingsCard = findings ? findings : '';
    const abstractCard = abstract ? abstract : '';

    // card should display only the first three authors, separated by comma, or placeholder if blank
    const authorsFew = authors ? authors.split(/[,]/).slice(0,3) : '(authors)' ;
    const pubMedLink = () => 'https://www.ncbi.nlm.nih.gov/pubmed/' + pubMed ;
    const abstractText = this.state.hideAbstract ? '' : abstractCard;
    const toggleAbstract = () => { this.setState({ hideAbstract : !this.state.hideAbstract }) };
    
    return (
      <li className='card' id={timestamp}>
        <div>
          <h6 className='bold card-title'>{titleCard}</h6>
          <p className='card-authors'>
            {authorsFew}, et al. 
            <span>   </span> <i>{journalCard}</i> {yearCard} <span>   </span> 
            <a className='card-link' href={pubMedLink()} rel='noopener noreferrer' target='_blank'>pubmed</a> 
          </p>
          <p ><span className='bold card-keywords'>Keywords:</span> {keywordsCard}</p>
          <p ><span className='bold card-findings'>Findings:</span> {findingsCard}</p>
          <span className='bold abstract-toggle' onClick={toggleAbstract} > Abstract </span>
          <p className='{abstractClass}'>{abstractText}</p>
        </div>
        <div className='card-btn-col'>
          <button 
            className='card-btn card-delete'
            onClick={() => this.props.deletePaper(this.props.index)}
          >×</button>
          {/* to do: add card up / card down buttons for sorting */}
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
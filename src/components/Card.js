import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

  cardRef = React.createRef();
  abstractRef = React.createRef();

  state = {
    hideAbstract: true
  };

  renderAbstract = (abstract) => {
    if (!abstract || this.state.hideAbstract) return null;
    return (
      <CSSTransition
        classNames="card"
        key={this.props.index}
        timeout={{ enter:200, exit:220 }}
      >
        <p onClick={this.abstractClick} ref={this.abstractRef} >{abstract}</p>
      </CSSTransition>
    );
  }

  abstractClick = () => {
    console.log(this.abstractRef.current.textContent);
  }

  render() {
    // return if props are null to preclude error
    if (!this.props.details) return null;

    const { title, authors, journal, year, timestamp, pubMed, keywords, findings, abstract} = this.props.details;

    const titleCard = title ? title : '(title)';
    const journalCard = journal ? journal : '(journal)';
    const yearCard = year ? year : '(year)';
    const keywordsCard = keywords ? keywords : '';
    const findingsCard = findings ? findings : '';

    // render only the first three authors, separated by comma, or placeholder if null
    const authorsFew = authors ? authors.split(/[,]/).slice(0,3) : '(authors)' ;
    const pubMedLink = () => 'https://www.ncbi.nlm.nih.gov/pubmed/' + pubMed ;
    const toggleAbstract = () => { this.setState({ hideAbstract : !this.state.hideAbstract }) };
    
    return (
      <div className='card' id={timestamp} ref={this.cardRef}>
        <button className='card-btn card-delete-btn' onClick={this.deleteCard}>×</button>
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
          <TransitionGroup>
            {this.renderAbstract(abstract)}
          </TransitionGroup>
        </div>
      </div>

    )
  }

  deleteCard = () => {
    // get confirmation from user
    if (!window.confirm("Delete this paper?")) { return; }
    // maintain card width while smushing
    const rectWidth = this.cardRef.current.getBoundingClientRect().width;
    this.cardRef.current.style.width = `${rectWidth}px`;
    // set card to fade out
    this.cardRef.current.style.transition = 'opacity 200ms';
    this.cardRef.current.style.opacity = 0;
    // pause to allow fadeout before actually deleting
    setTimeout(() => this.props.deletePaper(this.props.index), 200);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return this.cardRef.current.getBoundingClientRect();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!snapshot) return;
    const rect = this.cardRef.current.getBoundingClientRect();
    const deltaY = snapshot.top - rect.top;
    // console.log(`${this.props.details.timestamp} ${snapshot.top} ${rect.top} ${deltaY}`);
    // console.log(`${deltaY}`);
    if (deltaY === 0) return;

    this.cardRef.current.style.animation = 'cardslide 200ms forwards';
    this.cardRef.current.style.transform = `translateY(${deltaY}px)`;
    this.cardRef.current.addEventListener('animationend',()=>{
      this.cardRef.current.style.animation = '';
      this.cardRef.current.style.transform = '';
    }, {once:true});
  }
}

export default Card;


// to do: add buttons for sorting
// <div className='card-btn-col'>
//   <button className='card-btn card-delete' onClick={() => this.props.deletePaper(this.props.index)}>×</button>
//   {/* to do: add card up / card down buttons for sorting */}
//   {/* <button 
//     className='card-btn card-up card-mid'
//     onClick={() => this.props.cardUp(this.props.index)}
//     ><strong>↑</strong></button>
//   <button 
//     className='card-btn card-dn'
//     onClick={() => this.props.cardDn(this.props.index)}
//   ><strong>↓</strong></button> */}
// </div>
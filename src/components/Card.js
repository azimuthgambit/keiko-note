import React from 'react';
import ContentEditable from './ContentEditable';
import PropTypes from 'prop-types';

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
    deletePaper: PropTypes.func.isRequired,
    updatePaper: PropTypes.func.isRequired
  }

  state = {
    showAbstract: false
  }

  cardRef = React.createRef();
  abstractRef = React.createRef();
  absWrapRef = React.createRef();

  toggleAbstract = () => {
    if (!this.state.showAbstract) {
      // absWrap opens to full height
      setTimeout(() => {
        this.absWrapRef.current.classList.toggle('full');
      }, 10);
      // text fades in
      setTimeout(() => {
        this.abstractRef.current.classList.toggle('hide');
      }, 200)
      this.setState({ showAbstract: true })
    } else if (this.state.showAbstract) {
      // text fades out
      this.abstractRef.current.classList.toggle('hide');
      // absWrap closes to zero height
      setTimeout(() => {
        this.absWrapRef.current.classList.toggle('full');
      }, 200)
      this.setState({ showAbstract: false })
    }
  }

  render() {
    // return if props are null to preclude error
    if (!this.props.details) return null;

    // get card elements from props
    const { title, authors, journal, year, timestamp, pubMed, keywords, findings, abstract} = this.props.details;

    // prepare card elements
    const titleCard = title ? title : '(title)';
    const journalCard = journal ? journal : '(journal)';
    const yearCard = year ? year : '(year)';
    const keywordsCard = keywords ? keywords : '';
    const findingsCard = findings ? findings : '';
    const pubMedLink = () => 'https://www.ncbi.nlm.nih.gov/pubmed/' + pubMed ;

    return (
      <div className='card' id={timestamp} ref={this.cardRef}>
        <button className='card-btn card-delete-btn' onClick={this.deleteCard}>×</button>
        <div>
          <a className='card-link' href={pubMedLink()} rel='noopener noreferrer' target='_blank'>
            <h6 className='bold card-title' >{titleCard}</h6>
          </a> 
          <p className='card-authors'>
            {authors}, et al. 
            <span>   </span> <i>{journalCard}</i> {yearCard} <span>   </span> 
            <span className='bold abstract-toggle' onClick={this.toggleAbstract} > abstract </span>
          </p>
          <p>
            <span className='bold card-keywords'>Keywords: </span>
            <ContentEditable 
              value={keywordsCard}
              pubMed={pubMed}
              field="keywords"
              updatePaper={this.props.updatePaper}
              />
          </p>
          <p>
            <span className='bold card-findings'>Findings: </span>
            <ContentEditable
              value={findingsCard}
              pubMed={pubMed}
              field="findings"
              updatePaper={this.props.updatePaper}
            />
          </p>
          <div className='absWrap' ref={this.absWrapRef}>
            <p className='abstract hide' ref={this.abstractRef} > {abstract} </p>
          </div>
        </div>
      </div>
    )
  }

  deleteCard = () => {
    // get confirmation from user
    if (!window.confirm('Delete this paper?')) { return; }

    // set card to fade out
    this.cardRef.current.style.transition = 'opacity 350ms';
    this.cardRef.current.style.opacity = 0;

    // pause to allow fadeout before actually deleting
    setTimeout(() => this.props.deletePaper(this.props.index), 550);
  }

}

export default Card;


// toggleAbstract = () => {
//   if (!this.state.showAbstract) {
//     // first let the card slide open
//     setTimeout(() => {
//       this.absWrapRef.current.style.maxHeight = `${this.state.absHeight}px`;
//     }, 10);
//     // then have the text fade in
//     setTimeout(() => {
//       this.abstractRef.current.classList.toggle('hide');
//     }, 200)
//     this.setState({ showAbstract: true })
//   } else if (this.state.showAbstract) {
//     // first have the text fade out
//     this.abstractRef.current.classList.toggle('hide');
//     // then have the card slide closed
//     setTimeout(() => {
//       this.absWrapRef.current.style.maxHeight = '0';
//     }, 200)
//     this.setState({ showAbstract: false })
//   }
// }


// state = {
//   absHeight: 0,
//   showAbstract: false
// }

// componentDidMount() {
//   const absHeight = this.abstractRef.current.getBoundingClientRect().height;
//   this.setState({ absHeight });
// }

// getSnapshotBeforeUpdate(prevProps, prevState) {
//   return this.cardRef.current.getBoundingClientRect();
// }

// // maintain card width while smushing
// const rectWidth = this.cardRef.current.getBoundingClientRect().width;
// this.cardRef.current.style.width = `${rectWidth}px`;


// componentDidUpdate(prevProps, prevState, snapshot) {
//   if (!snapshot) return;
//   const cardCurrent = this.cardRef.current;
//   const deltaY = snapshot.top - cardCurrent.offsetTop;
//   if (deltaY === 0) return;
//   // apply FLIP method to animate
//   // cardCurrent.style.animation = 'cardslide 200ms forwards';
//   // cardCurrent.style.transform = `translateY(${deltaY}px)`;
//   // cardCurrent.addEventListener('animationend',()=>{
//   //   cardCurrent.style.animation = '';
//   //   cardCurrent.style.transform = '';
//   // }, {once:true});
// }
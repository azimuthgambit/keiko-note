import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

class CardSection extends React.Component {
  static propTypes = {  
    deletePaper: PropTypes.func.isRequired,
    updatePaper: PropTypes.func.isRequired,
    papers: PropTypes.object,
  }

  renderCardsDiv = (key) => {
    const paper = this.props.papers[key];
    const deletePaper = this.props.deletePaper;
    if(!paper) return null;
    return(
      <Card
      key={key}
      index={key}
      details={paper}
      deletePaper={deletePaper}
      updatePaper={this.props.updatePaper}
      />
    );
  }

  render() {
    const papers = Object.keys(this.props.papers).reverse();
    
    return(
      <div className="container cards-div">
        {papers.map(this.renderCardsDiv)}
      </div>
    );
  }
}

export default CardSection;

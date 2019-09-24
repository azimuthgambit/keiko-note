import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

class CardSection extends React.Component {
  static propTypes = {  
    deletePaper: PropTypes.func.isRequired,
    papers: PropTypes.object,
  }

  renderCards = (key) => {
    return(
      <Card
        key={key}
        index={key}
        details={this.props.papers[key]}
        deletePaper={this.props.deletePaper}
      />
    );
}

render() {
  // console.log(this.props.papers);
  const papers = Object.keys(this.props.papers);
  
  return(
    
    <div className="container">
      {/* <TransitionGroup component="ul" className="cards-ul">
        {papers.map(this.renderCards)}
      </TransitionGroup> */}

      {papers.map(this.renderCards)}
    </div>

    );
  }

}

export default CardSection;
import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class CardSection extends React.Component {
  static propTypes = {  
    deletePaper: PropTypes.func.isRequired,
    papers: PropTypes.object,
  }

  renderCards = (key) => {
    const paper = this.props.papers[key];
    const deletePaper = this.props.deletePaper;
    // const transitionOptions = {
    //   classNames: "card",
    //   key,
    //   timeout:{ enter:500, exit:500 }
    // };
    if(!paper) return null;

    return(
      <CSSTransition
        classNames="card"
        key={key}
        timeout={{ enter:400, exit:200 }}
      >
        <Card
          key={key}
          index={key}
          details={paper}
          deletePaper={deletePaper}
        />
      </CSSTransition>
    );
}

render() {
  const papers = Object.keys(this.props.papers).reverse();
  
  return(
    <div className="container">
      <TransitionGroup component="ul" className="cards-ul">
        {papers.map(this.renderCards)}
      </TransitionGroup>
    </div>
    );
  }

}

export default CardSection;
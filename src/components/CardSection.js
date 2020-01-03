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
    // console.log('yuuuuuge!');
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





  // renderCards = (key) => {
  //   const paper = this.props.papers[key];
  //   const deletePaper = this.props.deletePaper;
  //   if(!paper) return null;

  //   return(
  //     <CSSTransition
  //       classNames="card"
  //       key={key}
  //       timeout={{ enter:500, exit:500 }}
  //     >
  //       <Card
  //         key={key}
  //         index={key}
  //         details={paper}
  //         deletePaper={deletePaper}
  //         updatePaper={this.props.updatePaper}
  //       />
  //     </CSSTransition>
  //   );


  // <div className="container">
  //   <TransitionGroup component="div" className="cards-div">
  //     {papers.map(this.renderCards)}
  //   </TransitionGroup>
  // </div>

  // {Object.keys(this.props.papers).map(key => (
  //   <Card 
  //     key={key} 
  //     index={key}
  //     details={this.state.fishes[key]} 
  //     addToOrder={this.addToOrder} 
  //   />
  // ))}
import React from 'react';
import PropTypes from "prop-types";

// adapted from https://gist.github.com/vraa/e2bbb6ad6db7671581d4e90e45aa2b13

class ContentEditable extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    field: PropTypes.string,
    pubMed: PropTypes.string,
    updatePaper: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  toggleEdit = (e) => {
    e.stopPropagation();
    if (this.state.editing) {
      this.cancel();
    } else {
      this.edit();
    }
  };

  edit = () => {
    this.setState({
      editing: true
    }, () => {
      this.domElm.focus();
    });
  };

  save = () => {
    this.setState({
      editing: false
    }, () => {
      if (this.props.onSave && this.isValueChanged()) {
        console.log('Value is changed', this.domElm.textContent);
      }
    });
    // update paper here!
    this.props.updatePaper(this.props.pubMed, this.props.field, this.domElm.textContent);
  };

  cancel = () => {
    this.setState({
      editing: false
    });
  };

  isValueChanged = () => {
    return this.props.value !== this.domElm.textContent
  };

  handleKeyDown = (e) => {
    const { key } = e;
    switch (key) {
      case 'Enter':
      case 'Escape':
        this.save();
        break;
      default:
        return;
    }
  };

  render() {
    let editOnClick = true;
    const {editing} = this.state;
    if (this.props.editOnClick !== undefined) {
      editOnClick = this.props.editOnClick;
    }
    return (
      <span
        className={editing ? 'editing' : ''}
        onClick={editOnClick ? this.toggleEdit : undefined}
        contentEditable={editing}
        ref={(domNode) => {
          this.domElm = domNode;
        }}
        onBlur={this.save}
        onKeyDown={this.handleKeyDown}
        {...this.props}
      >
        {this.props.value}
      </span>
    )
  }
}

export default ContentEditable;
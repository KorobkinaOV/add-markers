import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { addMarker } from '../../actions';

const StyledInput = styled.input`
  border-radius: 3px;
  padding: 5px;
  border: 1px solid #9a9aaa;
`;

class AddField extends React.Component {
  state = {
    newMarker: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { newMarker } = this.state;
    const { addMarker } = this.props;
    addMarker({name: newMarker});
    this.setState({ newMarker: '' });
  }

  render() {
    const { newMarker } = this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <StyledInput
          onChange={(e) => this.setState({ newMarker: e.target.value })}
          value={ newMarker } />
      </form>
    )
  }
};

const mapDispatchToProps = {
  addMarker,
}

export default connect(null, mapDispatchToProps)(AddField);
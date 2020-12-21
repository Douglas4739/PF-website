import React from 'react';
import {withRouter} from 'react-router-dom';
import './ErrorFolder.css';

class ErrorFolder extends React.Component {
  render() {
    return (
    <div className='error-prompt'>
      <h3>Please choose a folder first!</h3>
      <button onClick={() => this.props.history.push('/')}>OK</button>
    </div>
    );
  };
};

export default withRouter(ErrorFolder);
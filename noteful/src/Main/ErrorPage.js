import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import './ErrorPage.css';

class ErrorPage extends React.Component {
  static propTypes = { show: PropTypes.string.isRequired };

  render() {
    return (
    <div className='error-prompt'>
      <h3>Sorry, that {this.props.show} doesn't exist.</h3>
      <button
        onClick={() => this.props.history.push('/')}
        className='try-again'>
          HOME
      </button>
    </div>
    );
  };
};

export default withRouter(ErrorPage);
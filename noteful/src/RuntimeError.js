import React from 'react';
import ErrorPage from './Main/ErrorPage';
import PropTypes from 'prop-types';

class RuntimeError extends React.Component {
  state = {hasError: false};



  static getDerivedStateFromError() {
    return {hasError: true};
  };

  render() {

    ErrorPage.propTypes = {
      show: PropTypes.string.isRequired
    }

    if (this.state.hasError) {
      return <ErrorPage show={this.props.show} />;
    };
    return this.props.children;
  };
};

export default RuntimeError;
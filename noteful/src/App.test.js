import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from './App';

describe('The App', () => {
  it('renders without fail.', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('shows no breaking changes.', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
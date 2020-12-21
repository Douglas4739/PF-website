import React from 'react';
import {withRouter} from 'react-router-dom';
import AddNote from './AddNote';
import ErrorPage from '../Main/ErrorPage';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import './NotePage.css';

class NotePage extends React.Component {
  state = {contentStatus: true, nameStatus: true};

  static defaultProps = {
    notes: [ {} ],
    note: {name: '', content: '', modified: (new Date()).toISOString()}
  };

  static propTypes = {
    folders: PropTypes.array.isRequired,
    notes: PropTypes.array
  };

  static contextType = NoteContext;

  changeStatus = (nameStatus) => {
    const newState = {...this.state, nameStatus};
    this.setState(newState);
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const nameLink = evt.target.querySelector('#notepageName');
    const contentLink = evt.target.querySelector('#notepageContent');
    const name = nameLink.innerText;
    const content = contentLink.innerText;
    if (name === '') return nameLink.focus();
    if (content === '') return contentLink.focus();
    const id = this.props.match.params.note;
    const note = {
      name,
      content,
      folderId: this.props.match.params.folder
    };

    if (this.props.location.pathname.split('/')[3] === 'new-note') {
      return this.context.addNote(note);
    } else {
      Object.assign(note, {id});
      return this.context.editNote(note);
    };
  };

  render = () => {
    const noteID = this.props.match.params.note;
    let note = this.props.notes.find(note => note.id === noteID);

    if (noteID) {
      if (!note) return <ErrorPage show='note' />;
    };

    return (
      <form
        className='note-page'
        onSubmit={(evt) => this.handleSubmit(evt)}
      >
        <h3>
          {
            this.props.folders.find(folder => {
              return folder.id === this.props.match.params.folder;
            }).name
          }
        </h3>
        <AddNote
          note={note}
          notes={this.props.notes}
          changeStatus={this.changeStatus}
          nameStatus={this.state.nameStatus}
        />
        <div
          id='notepageContent'
          contentEditable
          suppressContentEditableWarning
          onFocus={(evt) => {
            const warningLabel = evt.target.parentElement.querySelector('#content-label');
            return (
              (evt.target.innerText === '')
                ? warningLabel.style.visibility = 'visible'
                : (warningLabel.style.visibility === 'visible')
                  ? warningLabel.style.visibility = 'hidden'
                  : null
            );
          }}
          onBlur={(evt) => {
            const warningLabel = evt.target.parentElement.querySelector('#content-label');
            return (
              (evt.target.innerText === '')
                ? warningLabel.style.visibility = 'visible'
                : (warningLabel.style.visibility === 'visible')
                  ? warningLabel.style.visibility = 'hidden'
                  : null
            );
          }}
          >
          {note.content}
        </div>
      </form>
    );
  };
};

export default withRouter(NotePage);
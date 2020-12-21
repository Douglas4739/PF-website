import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from './NoteContext';
import './AddNote.css';

class AddNote extends React.Component {
  state = {
    status: false,
    name: '',
    content: '',
    empty: false
  };

  static propTypes = {
    note: PropTypes.object.isRequired,
    key: PropTypes.string,
    changeStatus: PropTypes.func,
    nameStatus: PropTypes.bool
  };

  static contextType = NotesContext;

  render = () => {
    const note = this.props.note;
    const newNote = this.props.location.pathname.split('/')[3] === 'new-note'|| this.props.match.params.note;
    const date =
      isNaN(new Date(note.modified))
        ? new Date()
        : new Date(note.modified);

    return (
        <div
          className='note-preview'
        >
          <Link
            id={
              (newNote)
                ? 'notepageName'
                : null
            }
            to={(newNote) ? this.props.location.pathname : `/folders/${note.folderId}/notes/${note.id}`}
            onFocus={(evt) => {
              this.setState({status: true})
              const warningLabel = evt.target.parentElement.querySelector('#name-label');
              return (
                (evt.target.innerText === '')
                  ? warningLabel.style.visibility = 'visible'
                  : (warningLabel.style.visibility === 'visible')
                    ? warningLabel.style.visibility = 'hidden'
                    : null
              );
            }}
            onBlur={(evt) => {
              this.setState({status: false});
              const warningLabel = evt.target.parentElement.querySelector('#name-label');
              return (
                (evt.target.innerText === '')
                  ? warningLabel.style.visibility = 'visible'
                  : (warningLabel.style.visibility === 'visible')
                    ? warningLabel.style.visibility = 'hidden'
                    : null
              );
            }}
            contentEditable={(newNote || this.state.status) ? true : false}
            suppressContentEditableWarning
            style={
              (newNote === true)
                ? {
                    backgroundColor: ' rgba(255, 255, 255, 0.534)',
                    border: 'solid',
                    borderWidth: '1px',
                    borderColor: 'black'
                  }
                : null}
          >
            {note.name}
          </Link>
          <label id='name-label' style={{visibility: 'hidden'}}>* Note name cannot be blank!</label>
          <label id='content-label' style={{visibility: 'hidden'}}>* Note content cannot be blank!</label>
          <p
            onClick={() => this.props.history.push(`/folders/${note.folderId}/notes/${note.id}`)}
          >
            <i>Modified on
              {`${date.toDateString()} ${date.toLocaleTimeString('en-us')}`}
            </i>
          </p>
          <div className='buttons'>
            {
              (this.props.match.params.note || newNote)
                ? <>
                  <button type='submit'>Save</button>
                  <button
                    type='button'
                    className='cancel-button'
                    onClick={() => this.props.history.push(`/folders/${this.props.match.params.folder}`)}
                  >
                    Cancel
                  </button>
                  </>
                : null
            }
            <button
              onClick={() => this.context.deleteNote(note.id)}
              style={{display: (this.props.location.pathname.split('/')[3] === 'new-note') ? 'none' : 'inline'}}
            >
              Delete
            </button>
          </div>
        </div>
    );
  };
};

export default withRouter(AddNote);
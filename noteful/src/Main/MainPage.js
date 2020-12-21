import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Note from '../Notes/AddNote';
import ErrorPage from './ErrorPage';
import './MainPage.css';

class MainPage extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    deleteFolder: PropTypes.func.isRequired
  };

  render() {
    const folderID = this.props.match.params.folder;
    const folderFound = this.props.state.folders.find(folder => folder.id === folderID);
    const notes =
      (!folderID)
      ? this.props.state.notes
      : this.props.state.notes.filter(note => note.folderId === folderID);

      MainPage.propTypes = {
        onClick : PropTypes.string,
        key: PropTypes.number
      }

    if (folderID && !folderFound) return <ErrorPage show='folder' />;

    return (
      <div className='note-list'>
        <h3>{(folderFound) ? folderFound.name : null}</h3>
        <div
          className='active-folder-options'
          style={{visibility: (!folderID) ? 'hidden' : 'visible'}}
        >
          <button
            id='active-edit'
            onClick={() => this.props.history.push(`/editfolder/${folderID}`)}
          >
            Edit
          </button>
          <button
            id='active-delete'
            type='button'
            onClick={() => this.props.deleteFolder(folderID)}
          >
            Delete
          </button>
        </div>
        {
          notes.map(note => {
            return (
              <Note
                note={note}
                key={note.id}
              />
            );
          })
        }
        <Link
          id='add-note'
          to={(folderID) ? `/folders/${folderID}/new-note` : '/choose-folder'}
        >
          Add Note
        </Link>
      </div>
    )
  }
}




export default withRouter(MainPage);
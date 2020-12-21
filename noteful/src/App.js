import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import Header from './Main/Header';
import ErrorPage from './Main/ErrorPage';
import ErrorFolder from './Folders/ErrorFolder';
import RuntimeError from './RuntimeError';
import SideBar from './Main/SideBar';
import MainPage from './Main/MainPage';
import NotePage from './Notes/NotePage';
import AddFolder from './Folders/AddFolder';
import NoteContext from './Notes/NoteContext';
import * as api from './api';
import './App.css';

class App extends React.Component {
  state = { folders: [], notes: [] };

  addFolder = (folderName) => {
    const newState = {...this.state};
    api.addFolder(folderName)
    .then(folderObj => {
      folderObj.id = folderObj.id.toString();
      newState.folders.push(folderObj);
      this.setState({...newState});
      this.props.history.push(`/folders/${folderObj.id}`);
    });
  };

  editFolder = (folderName, folderID) => {
    const newState = {...this.state};
    const folders = newState.folders.map(folder => {
      return (
        (folder.id.toString() === folderID)
          ? Object.assign(folder, {name: folderName})
          : folder
      );
    });
    this.setState({...newState, folders});
    this.props.history.push(`/folders/${folderID}`);
    api.editFolder(folderName, folderID);
  };

  deleteFolder = (folderID) => {
    const folders = [...this.state.folders].filter(folder => folder.id !== folderID);
    const notes = [...this.state.notes].filter(note => note.folderId !== folderID);
    this.setState( {folders, notes} );
    this.props.history.push('/');
    api.deleteFolder(folderID);
  }

  addNote = (note) => {
    const newState = {...this.state};
    Object.assign(note,
      {modified: (new Date()).toISOString()}
    );
    api.addNote(note)
    .then(serverNote => {
      newState.notes.push(serverNote);
      this.setState({...newState});
      this.props.history.push(`/folders/${note.folderId}`);
    });
  };

  editNote = (editedNote) => {
    const newState = {...this.state};
    const newNote = newState.notes.find(note => note.id === editedNote.id);
    Object.assign(newNote,
      editedNote,
      {modified: new Date().toISOString()}
    );
    const notes = newState.notes.map(note => {
      return (
        (note.id === editedNote.id)
          ? newNote
          : note
      );
    });
    this.setState({...newState, notes});
    this.props.history.push(`/folders/${newNote.folderId}`);
    api.editNote(newNote);
  };

  deleteNote = (noteID) => {
    const newState = {...this.state};
    const deletedNote = newState.notes.find(note => note.id === noteID);
    const notes = newState.notes.filter(note => note.id !== noteID);
    this.setState({...newState, notes});
    this.props.history.push(`/folders/${deletedNote.folderId}`);
    api.deleteNote(noteID);
  }

  render() {

    return (
      <main className='App'>
        <RuntimeError show='header'>
          <Header />
        </RuntimeError>
        <div id='main-section'>
          <NoteContext.Provider value={{
            deleteNote: this.deleteNote,
            addNote: this.addNote,
            editNote: this.editNote
          }}>
            <Switch>
              <Route exact path='/folders/:folder/notes/:note' render={() =>
                <RuntimeError show='header'>
                  <SideBar notes={this.state.notes} />
                  <NotePage folders={this.state.folders} notes={this.state.notes} />
                </RuntimeError>
              } />
              <Route exact path={['/', '/folders/:folder/']} render={() => 
                <RuntimeError show='page'>
                  <SideBar folders={this.state.folders} />
                  <MainPage state={this.state} deleteFolder={this.deleteFolder} />
                </RuntimeError>
              } />
              <Route exact path={['/new-folder', '/editfolder/:folder']} render={() => 
                <RuntimeError show='new folder form'>
                  <AddFolder
                    addFolder={this.addFolder}
                    editFolder={this.editFolder}
                    deleteFolder={this.deleteFolder}
                    folders={this.state.folders}
                  />
                </RuntimeError>
              }/>
              <Route exact path='/folders/:folder/new-note' render={() =>
                <RuntimeError show='note page'>
                  <SideBar notes={this.state.notes} />
                  <NotePage folders={this.state.folders}/>
                </RuntimeError>
              } />
              <Route path='/choose-folder' render={() => 
                <RuntimeError show='note page'>
                  <ErrorFolder />
                </RuntimeError>
              } />
              <Route render={() => 
                <ErrorPage show='page' /> 
              }/>
            </Switch>
          </NoteContext.Provider>
        </div>
      </main>
    );
  };

  componentDidMount() {
    api.getData()
    .then(data => {
      const [folders, notes] = data;
      this.setState({folders, notes});
    })
    .catch(error => {
      console.log(`Could not fetch data. Error: ${error.message}`);
    });
  };
};

export default withRouter(App);
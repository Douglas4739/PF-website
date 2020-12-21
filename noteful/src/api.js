const baseURL = 'http://localhost:9090';

const getData = function() {
  return (
    Promise.all([
      fetch(`${baseURL}/folders`),
      fetch(`${baseURL}/notes`)
    ])
    .then(response => Promise.all(response.map(res => {
      if (!res.ok) throw new Error('Could not fetch data.');
      return res.json();
    })))
  );
};

const addFolder = function(folderName) {
  return (
    fetch(`${baseURL}/folders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: folderName})
    })
    .then(res => {
      if (!res.ok) throw new Error('Could not add folder.');
      return res;
    })
    .then(res => res.json())
    .catch(error => console.log(error.message))
  );
};

const editFolder = function(folderName, folderID) {
  return (
    fetch(`${baseURL}/folders/${folderID}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: folderName})
    })
    .then(res => {
      if (!res.ok) throw new Error('Could not edit folder.');
      return res;
    })
    .then(res => res.json())
    .catch(error => console.log(error.message))
  );
};

const deleteFolder = function(folderID) {
  return (
    fetch(`${baseURL}/folders/${folderID}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) throw new Error('Could not delete folder.');
      return res;
    })
    .catch(error => console.log(error.message))
  );
};

const addNote = function(newNote) {
  const {folderId} = newNote;
  return (
    fetch(`${baseURL}/folders/${folderId}/notes/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newNote)
    })
    .then(res => {
      if (!res.ok) throw new Error('Could not add note.');
      return res;
    })
    .then(res => res.json())
    .catch(error => console.log(error.message))
  );
};

const editNote = function(note) {
  return (
    fetch(`${baseURL}/notes/${note.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(note)
    })
    .then(res => {
      if (!res.ok) throw new Error('Could not edit note.');
      return res;
    })
    .catch(error => console.log(error.message))
  );
};

const deleteNote = function(noteID) {
  return (
    fetch(`${baseURL}/notes/${noteID}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) throw new Error('Could not delete folder.');
      return res;
    })
    .catch(error => console.log(error.message))
  );
};

export  {
  getData,
  addFolder,
  editFolder,
  deleteFolder,
  addNote,
  editNote,
  deleteNote
};
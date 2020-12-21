import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AddFolder.css';
import { Local_Server_Endpoint as config } from '../config'
import context from '../context'


class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        folderName: {
        value: "",
        touched: false,
        },
    };
    }
  
  state = {status: 'hidden'};

  static propTypes = {
    addFolder: PropTypes.func.isRequired,
    editFolder: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
    folders: PropTypes.array.isRequired
  };

  static contextType = context;

  updateFolderName = (foldername) => {
  this.setState({
      folderName: {
      value: foldername,
      touched: true,
      },
  });
  };

  handleSubmitFolder = (e) => {
  e.preventDefault();
  let nameError = this.validateName();
  const foldername = this.state.folderName.value;
  if (nameError) {
      this.setState({
      folderName: {
          value: foldername,
          touched: true,
      },
      });
      return;
  }

  fetch(`${config.Local_Server_Endpoint}/folders/`, {
      method: "POST",
      headers: {
      "content-type": "application/json",
      },
      body: JSON.stringify({ name: foldername }),
  })
      .then((res) => res.json())
      .then((data) => {
      this.context.addFolder(data);
      this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };


  validateName() {
    const folderName = this.state.folderName.value.trim();
    if (folderName.length === 0) {
        return "Name is required";
    } else if (folderName.length < 3) {
        return "Name must be at least 3 characters long";
    } 
    }

  render() {
    const activeFolderID = this.props.match.params.folder;
    const foundFolder = this.props.folders.find(folder => folder.id === activeFolderID);
    //const nameError = this.validateName();

    return (
      <form
        id='folderInfo'
        onSubmit={(evt) => {
          evt.preventDefault();
          (activeFolderID)
            ? this.props.editFolder(evt.target.folderName.value, activeFolderID)
            : this.props.addFolder(evt.target.folderName.value)
      }}>
        <label htmlFor='folderName'>Folder Name:</label>
        <input
          required
          autoComplete="off"
          type='text'
          id='folderName'
          onFocus={(evt) => (evt.target.value === '') ? this.setState({status: 'visible'}) : null}
          defaultValue={(activeFolderID) ? (foundFolder) ? foundFolder.name : null : null}
          onChange={(evt) => {
            return (
              (evt.target.value === '')
                ? (this.state.status === 'hidden')
                  ? this.setState({status: 'visible'})
                  : null
                : this.setState({status: 'hidden'})
            );
          }}
        />

        <div className='buttons'>
          <button type='submit'>Save</button>
          <button
            type='button'
            onClick={this.props.history.goBack}
          >
            Cancel
          </button>
          {
            (this.props.location.pathname.includes('new-folder'))
              ? null
              : <button
                  type='button'
                  onClick={() => this.props.deleteFolder(activeFolderID)}
                >
                  Delete
                </button>
          }
        </div>
      </form>
    );
  };
};

export default withRouter(AddFolder);
import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideBar.css';

class SideBar extends React.Component {
  static propTypes = {
    folders: PropTypes.array,
    notes: PropTypes.array
  };

  render() {
    let list = this.props.notes || this.props.folders;
    const activeFolderID = this.props.match.params.folder;

    if (this.props.notes) {
      list = list.filter(note => note.folderId === activeFolderID)
    };

    return (
      <div className='sidebar'>
        <div className='side-previews'>
          {
            list.map(preview => {
              const path =
                (this.props.notes)
                  ? `/folders/${preview.folderId}/notes/${preview.id}`
                  : `/folders/${preview.id}`
              return <Link to={path} key={preview.id}>{preview.name}</Link>;
            })
          }
        </div>
        <div
          className='button'
          style={{height: (this.props.match.params.note) ? '100px' : 'initial'}}
        >
          {
            (this.props.notes)
              ? <Link id='add-note' to={`/folders/${activeFolderID}/new-note`}>Add Note</Link>
              : <Link id='add-folder' to='/new-folder'>Add Folder</Link>
          }
        </div>
      </div>
    );
  };
};

export default withRouter(SideBar);
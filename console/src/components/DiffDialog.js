import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { ReactGhLikeDiff } from 'react-gh-like-diff';

export class DiffDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      closestMatchContentToggled: false,
    };
  }

  toggleClosestMatch() {
    this.setState({ closestMatchContentToggled: !this.state.closestMatchContentToggled });
  }

  render() {
    const { open, close, request, requestMatch } = this.props;
    const matchedRequest = requestMatch ? JSON.stringify(requestMatch.request.request, null, 2) : '';

    return (
      <Dialog
        open={ open }
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle disableTypography style={ styles.dialogTitle }>
          <div style={styles.header}>
            <div style={styles.title}>
              <h2>Compare Requests</h2>
            </div>
            <IconButton onClick={ close }>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent style={ styles.body }>
          <a
            style={ styles.contentToggle }
            href='#'
            onClick={ this.toggleClosestMatch.bind(this) }
          >
            { `${this.state.closestMatchContentToggled ? 'Hide' : 'View'} Closest Match` }
          </a>
          <br/><br/>
          { this.state.closestMatchContentToggled &&
              <textarea
                style={styles.content}
                rows={30}
                readOnly
                value={matchedRequest}
              />
          }
          <ReactGhLikeDiff
            past={ JSON.stringify(request, null, 2) }
            current={ matchedRequest }
          />
        </DialogContent>
      </Dialog>
    )
  }
}

const styles = {
  dialogTitle: {
    paddingBottom: 0,
  },
  title: {
    display: 'flex',
  },
  body: {
    minHeight: '500px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0px',
  },
  content: {
    padding: '10px',
    backgroundColor: '#EEE',
    borderRadius: 3,
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #CCC',
    overflow: 'auto',
    outline: 'none',
    resize: 'none',
    fontFamily: 'Courier New',
    fontSize: '14px',
    marginBottom: '15px'
  },
  contentToggle: {
    color: ' #888'
  }
};



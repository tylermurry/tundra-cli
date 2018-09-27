import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Button from '@material-ui/core/Button/Button';
import Intercept from './Intercept';
import Sockette from 'sockette';
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {DiffDialog} from "./DiffDialog";

let ws;
const defaultState = {
  profileName: '',
  socketConnected: false,
  intercepts: [],
  diffRequest: null,
  diffRequestMatch: null,
  showDiffDialog: false,
};

export class InterceptDialog extends Component {

  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  async onEnter() {
    this.setState(defaultState);

    await fetch('http://localhost:9091/requests', { method: 'DELETE' });
    const settings = await (await fetch('http://localhost:9091/settings')).json();

    ws = new Sockette(`ws://localhost:${settings.socketPort}`, {
      onopen: () => this.setState({ socketConnected: true }),
      onclose: () => this.setState({ socketConnected: false }),
      onerror: e => console.error(e),
      onmessage: this.messageReceived.bind(this),
    });
  }

  onExit() {
    if (ws) ws.close();
  }

  messageReceived(message) {
    const data = JSON.parse(message.data);

    this.setState({
      intercepts: [data, ...this.state.intercepts]
    });
  }

  closeDialog() {
    if (this.props.debugging)
      this.props.close();
    else if(window.confirm('You will lose your captured data. Are you sure you want to close?'))
      this.props.close();
  }

  changeProfileName(event) {
    this.setState({ profileName: event.target.value });
  }

  async saveProfile() {
    if (window.confirm('Stop capturing and save the profile?')) {
      const response = await fetch('http://localhost:9091/requests/save', {
        method: 'POST',
        body: JSON.stringify({
          profileName: this.state.profileName,
          resetProfile: false, // TODO: Hardcoded for now. Add a UI option for this
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('Profile successfully saved.');
        this.props.close();
      } else {
        alert('There was a problem saving the profile.');
      }
    }
  }

  showDiffDialog(request, match) {
    this.setState({
      diffRequest: request,
      diffRequestMatch: match,
      showDiffDialog: true,
    })
  }

  render() {
    const { open, debugging, debugProfileName, callback } = this.props;
    const { intercepts, socketConnected } = this.state;

    return (
      <div>
        <DiffDialog
          open={ this.state.showDiffDialog }
          request={ this.state.diffRequest }
          requestMatch={ this.state.diffRequestMatch }
          close={ () => this.setState({ showDiffDialog: false })}
        />
        <Dialog
          open={ open }
          onEnter={ this.onEnter.bind(this) }
          onExit={ this.onExit.bind(this) }
          fullScreen
        >
          <DialogTitle disableTypography style={ styles.dialogTitle }>
            <div style={styles.header}>
              <div style={styles.title}>
                { debugging
                    ? <h2>Debugging '{ debugProfileName }'</h2>
                    : <div>
                        <FormControl>
                          <InputLabel>Profile Name</InputLabel>
                          <Input
                            name="profileName"
                            value={this.state.profileName}
                            onChange={this.changeProfileName.bind(this)}
                          />
                        </FormControl>
                        <Button
                          style={styles.stopButton}
                          variant='contained'
                          color='primary'
                          onClick={ async () => {
                            await this.saveProfile();
                            await callback();
                          }}
                          disabled={this.state.profileName.length <= 0}
                        >
                          Save
                        </Button>
                      </div>
                }
              </div>
              <IconButton onClick={ this.closeDialog.bind(this) }>
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <h4>{ socketConnected ? `${intercepts.length} Requests Captured` : 'Connecting...' }</h4>
              <LinearProgress color='primary' />
            </div>
          </DialogTitle>
          <DialogContent style={ styles.body }>
            { intercepts.length <= 0
                ? <h3 style={ styles.noRequests }>No requests have been captured yet.<br/>Listening for requests...</h3>
                : <div style={styles.interceptsContainer}>
                    { intercepts.map(intercept =>
                        <Intercept
                          key={ intercept.interceptedOn }
                          intercept={ intercept }
                          debugging={ debugging }
                          showDiffDialog={ this.showDiffDialog.bind(this) }
                        />
                    )}
                  </div>
            }
          </DialogContent>
        </Dialog>
      </div>
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
  spacer: {
    height: '18px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0px',
  },
  stopButton: {
    marginLeft: '10px',
    marginTop: '15px',
    height: '30px'
  },
  noRequests: {
    textAlign: 'center',
    color: '#777',
    marginTop: '75px'
  },
  interceptsContainer: {
    paddingTop: '15px',
  },
};

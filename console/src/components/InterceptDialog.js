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

let ws;

export class InterceptDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      maximized: false,
      socketConnected: false,
      intercepts: []
    };
  }

  async componentWillMount() {
    const settings = await (await fetch('/settings')).json();

    ws = new Sockette(`ws://localhost:${settings.socketPort}`, {
      onopen: () => this.setState({ socketConnected: true }),
      onclose: () => this.setState({ socketConnected: false }),
      onerror: e => console.error(e),
      onmessage: this.messageReceived.bind(this),
    });
  }

  componentWillUnmount() {
    if (ws) ws.close();
  }

  messageReceived(message) {
    const data = JSON.parse(message.data);

    this.setState({
      intercepts: [data, ...this.state.intercepts]
    });
  }

  render() {
    const { open, close } = this.props;
    const { intercepts, socketConnected } = this.state;

    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth='lg'
        fullScreen={ this.state.maximized }
      >
        <DialogTitle disableTypography style={ styles.dialogTitle }>
          <div style={styles.header}>
            <div style={ styles.title }>
              <h2>Capturing Profile</h2>
              <Button
                style={ styles.stopButton }
                variant='contained'
                color='primary'
              >
                Stop
              </Button>
            </div>
            <IconButton onClick={ close }>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <h4>{ socketConnected ? `${intercepts.length} Requests Captured` : 'Connecting...' }</h4>
            <LinearProgress style={styles.progressBar} color='primary' />
          </div>
        </DialogTitle>
        <DialogContent style={ styles.body }>
          { intercepts.length <= 0
              ? <h3 style={ styles.noRequests }>No requests have been captured yet</h3>
              : <div style={styles.interceptsContainer}>
                  { intercepts.map(intercept => <Intercept intercept={ intercept } />) }
                </div>
          }
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

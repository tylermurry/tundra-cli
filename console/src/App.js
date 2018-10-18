import React, { Component } from 'react';
import logo from './logo-full.png';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import {InterceptDialog} from "./components/InterceptDialog";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDebugProfile: '',
      showInterceptDialog: false,
      profileNames: [],
      debugging: false,
    }
  }

  async componentWillMount() {
    await this.refreshProfiles();
  }

  async refreshProfiles() {
    const profileNames = await (await fetch('/profiles')).json();

    this.setState({ profileNames });
  }

  hideInterceptDialog() { this.setState({ showInterceptDialog: false, debugging: false }); }

  async showDebugDialog() {
    this.setState({ showInterceptDialog: true, debugging: true });

    await fetch('/debug', { method: 'DELETE' });
    await fetch(`/debug/profile/${this.state.selectedDebugProfile}`, { method: 'POST' });
  }

  render() {
    return (
      <div style={styles.body}>
        <InterceptDialog
          open={ this.state.showInterceptDialog }
          close={ this.hideInterceptDialog.bind(this) }
          debugging={ this.state.debugging }
          debugProfileName={ this.state.selectedDebugProfile }
          callback={ this.refreshProfiles.bind(this) }
        />

        <div style={styles.header}>
          <img alt="Tundra Server" height={ 262 } width={ 571 } src={ logo } />
        </div>
        <div style={styles.menu}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Debug Profile</h2>
            <p style={styles.sectionDescription}>
              Once a profile is captured, run the debugger to help investigate
              issues with requests not matching.<br/>
              Select the profile you would like to debug against below:
            </p>
            { this.state.profileNames.length > 0
                ? <FormControl style={styles.profileSelector}>
                  <InputLabel>Profile Name</InputLabel>
                  <Select
                    name="profile"
                    value={this.state.selectedDebugProfile}
                    onChange={(e) => this.setState({selectedDebugProfile: e.target.value})}
                  >
                    {this.state.profileNames.map(profileName =>
                      <MenuItem value={ profileName }>{ profileName }</MenuItem>
                    )}
                  </Select>
                </FormControl>
              : <div><b>No profiles found to debug</b></div>
            }
            <div style={styles.sectionButtonContainer}>
              <Button
                style={styles.sectionButton}
                variant="contained"
                color="primary"
                disabled={ !this.state.selectedDebugProfile || this.state.profileNames.length <= 0 }
                onClick={ this.showDebugDialog.bind(this) }
              >
                Debug Profile
              </Button>
            </div>
          </div>
          <div style={styles.divider} />
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Capture New Profile</h2>
            <p style={styles.sectionDescription}>
              This will start capturing all requests made by the target application.
              Ensure that you have a Tundra client installed and initialized,
              then click the button below to start capturing.
            </p>
            <div style={styles.sectionButtonContainer}>
              <Button
                style={styles.sectionButton}
                variant="contained"
                color="primary"
                onClick={ () => this.setState({ showInterceptDialog: true })}
              >
                Start Capture
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  body: {
    padding: '50px',
    paddingTop: '100px',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    paddingTop: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  section: {
    width: '500px',
    padding: '30px',
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionDescription: {
    color: '#AAA',
    fontSize: '18px',
    lineHeight: 1.5,
  },
  divider: {
    width: '1px',
    backgroundColor: '#CCC',
  },
  sectionTitle: {
    color: '#555'
  },
  sectionButtonContainer: {
    marginTop: 'auto',
  },
  sectionButton: {
    padding: '15px 30px',
    marginTop: '30px',
    fontSize: '18px',
  },
  profileSelector: {
    width: '300px'
  }
};

export default App;

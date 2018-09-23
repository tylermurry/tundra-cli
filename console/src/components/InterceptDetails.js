import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";

export default class InterceptDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'Header',
    }
  }

  render() {
    const { title, headers, body } = this.props;
    const { selectedTab } = this.state;

    return (
      <div style={ styles.container }>
        <h4 style={ styles.title }>{ title }</h4>
        <div style={ styles.selectionButtons }>
          <Button
            style={ styles.headerButton }
            size="small"
            variant='contained'
            color={ selectedTab === 'Header' ? 'primary' : 'default' }
            onClick={ () => this.setState({ selectedTab: 'Header'}) }
          >
            Headers
          </Button>
          <Button
            style={ styles.bodyButton }
            size="small"
            variant='contained'
            color={ selectedTab === 'Body' ? 'primary' : 'default' }
            onClick={ () => this.setState({ selectedTab: 'Body'}) }
          >
            Body
          </Button>
        </div>
        <textarea style={ styles.content } rows={30} readOnly value={
          selectedTab === 'Header'
            ? headers ? JSON.stringify(headers, null, 2) : ''
            : body ? JSON.stringify(body, null, 2) : ''
        }/>
      </div>
    );
  }
}

const styles = {
  title: {
    marginBottom: '10px',
  },
  selectionButtons: {
    marginBottom: '10px',
  },
  container: {
    flexGrow: 1,
  },
  headerButton: {
    width: '120px',
    boxShadow: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    border: '1px solid #CCC'
  },
  bodyButton: {
    width: '120px',
    boxShadow: 'none',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    border: '1px solid #CCC'
  },
  contentContainer: {
    padding: '10px',
    backgroundColor: '#EEE',
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
  }
};

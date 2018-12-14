import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Chip from "@material-ui/core/Chip/Chip";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CardHeader from "@material-ui/core/CardHeader";
import InterceptDetails from "./InterceptDetails";
import Button from "@material-ui/core/Button/Button";
import ErrorOutline from '@material-ui/icons/ErrorOutline'

export default class Intercept extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    }
  }

  render() {
    const { intercept, debugging } = this.props;
    const unmatched = intercept.type === 'unmatched';
    const { request, response } = intercept.data;
    const { closestMatch } = intercept;

    return (
      <Card style={ styles.container }>
        <CardHeader
          disableTypography
          style={ styles.cardHeader }
          onClick={ () => this.setState({ expanded: !this.state.expanded }) }
          title={
            <div style={ styles.content }>
              <Chip label={ request.method } color="primary"/>
              { debugging && unmatched && <Chip style={ styles.unmatchedChip } label="UNMATCHED" /> }
              <span style={styles.url}>{ request.url }</span>
              <ExpandMore style={ styles.expandIcon }/>
            </div>
          }
        />
        { this.state.expanded &&
            <CardContent style={ styles.cardContent}>
              { debugging && unmatched &&
                <div style={styles.diffMessage}>
                  <ErrorOutline />
                  <span style={styles.diffMessageText}>
                    <b>This request was not matched.&nbsp;</b>
                    { closestMatch
                        ? 'Compare it with the closest match found in the profile for more details'
                        : 'No close matches could be found within the profile.'
                    }
                  </span>
                  { closestMatch &&
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => this.props.showDiffDialog(request, closestMatch)}>
                        View Diff
                      </Button>
                  }
                </div>
              }
              <div style={ styles.status }>
                <b>Status:</b> { response ? response.statusCode : 'No Response' }
              </div>
              <div style={ styles.interceptUrl }>
                <div style={ styles.urlHeader }>URL</div>
                <textarea
                  style={ styles.urlContent }
                  rows={3}
                  readOnly
                  value={ request.url }
                />
              </div>
              <div style={ styles.interceptDetails }>
                <InterceptDetails
                  body={request.content}
                  headers={ request.headers }
                  title='Request'
                />
                <div style={ styles.spacer } />
                <InterceptDetails
                  body={response ? response.content : ''}
                  headers={ response ? response.headers : ''}
                  title='Response'
                />
              </div>
            </CardContent>
        }
      </Card>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#EEE',
    margin: '10px 0px',
  },
  content: {
    padding: '14px 18px',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
  },
  status: {
    float: 'right'
  },
  url: {
    marginLeft: '12px',
    flexGrow: '1',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'inline-block',
  },
  expandIcon: {
    height: '30px',
    width: '30px',
  },
  cardHeader: {
    padding: 0,
    display: 'block',
    cursor: 'pointer',
    backgroundColor: '#EEE',
  },
  unmatchedChip: {
    backgroundColor: '#CC2D14',
    color: 'white',
    marginLeft: '10px',
  },
  cardContent: {
    borderTop: '1px solid #CCC',
    backgroundColor: '#FCFCFC'
  },
  urlHeader: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  interceptUrl: {
    margin: '0px',
    overflowWrap: 'break-word',
  },
  interceptDetails: {
    display: 'flex',
  },
  spacer: {
    width: '15px'
  },
  diffMessage: {
    padding: '10px',
    backgroundColor: '#FFEB91',
    borderRadius: 3,
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #CCC',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  diffMessageText: {
    flexGrow: 1,
    marginLeft: '5px'
  },
  urlContent: {
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

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
    const matchType = intercept.type;
    const { request, response } = intercept.data;

    return (
      <Card style={ styles.container }>
        <CardHeader
          disableTypography
          style={ styles.cardHeader(matchType, debugging) }
          onClick={ () => this.setState({ expanded: !this.state.expanded }) }
          title={
            <div style={ styles.content }>
              <Chip label={ request.method } color="primary"/>
              <span style={styles.url}>{ request.url }</span>
              <ExpandMore style={ styles.expandIcon }/>
            </div>
          }
        />
        { this.state.expanded &&
            <CardContent style={ styles.cardContent}>
              { debugging &&
                <div style={styles.diffMessage}>
                  <ErrorOutline />
                  <span style={styles.diffMessageText}>
                    <b>This request was not fully matched.&nbsp;</b>
                    { intercept.closestMatch
                        ? 'Compare it with the closest match found in the profile for more details'
                        : 'No close matches could be found within the profile.'
                    }
                  </span>
                  { intercept.closestMatch &&
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => this.props.showDiffDialog(request, intercept.closestMatch)}>
                        View Diff
                      </Button>
                  }
                </div>
              }
              <div style={ styles.status }>
                <b>Status:</b> { response.statusCode }
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
                  body={request.body}
                  headers={ request.headers }
                  title='Request'
                />
                <div style={ styles.spacer } />
                <InterceptDetails
                  body={response.content}
                  headers={ response.headers }
                  title='Response'
                />
              </div>
            </CardContent>
        }
      </Card>
    );
  }
}

export const defaultBackground = '#EEE';

export const calculateMatchTypeColor = (matchType, debugging) => {
  if (!matchType || !debugging) return defaultBackground;
  if (matchType.toUpperCase() === 'NORMAL') return defaultBackground;
  if (matchType.toUpperCase() === 'MATCHED') return defaultBackground;
  if (matchType.toUpperCase() === 'PARTIALLY-MATCHED') return '#FEFFBB';
  if (matchType.toUpperCase() === 'UNMATCHED') return '#FFBBBB';

  return defaultBackground;
};

const styles = {
  container: {
    backgroundColor: defaultBackground,
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
  cardHeader: (matchType, debugging) => ({
    padding: 0,
    display: 'block',
    cursor: 'pointer',
    backgroundColor: calculateMatchTypeColor(matchType, debugging)
  }),
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

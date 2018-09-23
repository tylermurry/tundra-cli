import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Chip from "@material-ui/core/Chip/Chip";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CardHeader from "@material-ui/core/CardHeader";

export default class Intercept extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    }
  }

  render() {
    const { intercept } = this.props;
    const matchType = intercept.type;
    const { request, response } = intercept.data;

    console.log(intercept);

    return (
      <Card
        style={ styles.container }
        onClick={ () => this.setState({ expanded: !this.state.expanded }) }
      >
        <CardHeader
          disableTypography
          style={ styles.cardHeader(matchType) }
          title={
            <div style={ styles.content }>
              <Chip label={ request.method } color="primary"/>
              <span style={styles.url}>{ request.url }</span>
              <ExpandMore style={ styles.expandIcon }/>
            </div>
          }
        />
        { this.state.expanded &&
            <CardContent>
              content goes here
            </CardContent>
        }
      </Card>
    );
  }
}

export const defaultBackground = '#EEE';

export const calculateMatchTypeColor = (matchType) => {
  if (!matchType) return defaultBackground;
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
    cursor: 'pointer',
  },
  content: {
    padding: '14px 18px',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
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
  cardHeader: (matchType) => ({
    padding: 0,
    display: 'block',
    backgroundColor: calculateMatchTypeColor(matchType)
  }),
};

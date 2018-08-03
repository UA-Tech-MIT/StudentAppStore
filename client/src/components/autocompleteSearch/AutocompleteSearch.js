import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {searchApps} from '../../actions/AsyncActionCreators';


const isMatch = (entry, searchString) =>  {
  const re = new RegExp(_.escapeRegExp(searchString), 'i');
  let matching = false;
  for(let key in entry) {
    matching = re.test(entry[key]);
    if(matching)
     break;
  }
  return matching;
};

class AutocompleteSearch extends Component {

  constructor(props) {
    super(props);
    // this.state = { disabled: !!this.props.apps, isLoading: false, results: [], value: '' };
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    // this.resetComponent = this.resetComponent.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({disabled: !!this.props.apps, isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent();

        const filteredResults = this.props.apps.filter(app => {
          app.title = app.name; // quick fix for search results
          return isMatch(app, this.state.value);
        });
        debugger;

        this.setState({
          isLoading: false,
          results: {
            app: {
              name: "App",
              results: filteredResults,
            }
          }
        });

    }, 300);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      // <Grid>
      //   <Grid.Column width={8}>
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
          />
        /* </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>
          </Segment>
        </Grid.Column>
      </Grid> */
    );
  }
}

AutocompleteSearch.propTypes =  {
  apps: PropTypes.array
};

const mapStateToProps = (state, {ownProps}) =>  {
  return {
      apps: state.appRepository.apps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteSearch);
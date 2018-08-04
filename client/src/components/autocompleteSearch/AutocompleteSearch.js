import _ from 'lodash';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchApps } from '../../actions/AsyncActionCreators';
import { updateSearch } from '../../actions/ActionCreators';
import { Redirect } from 'react-router';


const isMatch = (entry, searchString) => {
  const re = new RegExp(_.escapeRegExp(searchString), 'i');
  let matching = false;
  for (let key in entry) {
    matching = re.test(entry[key]);
    if (matching)
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
    this.handleEnter = this.handleEnter.bind(this);
    // this.resetComponent = this.resetComponent.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({
      disabled: !!this.props.apps,
      isLoading: false,
      results: [],
      value: '',
      redirect: false,
      //we don't want to render the search bar on the search reults page???
    });
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.name });
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.state.value.length < 1) return this.resetComponent();

      const filteredResults = this.props.apps.filter(app => {
        app.title = app.name; // quick fix for search results
        return isMatch(app, this.state.value);
      });

      this.props.searchApps({ name: filteredResults.map(item => item.name) })
        .then((response) => {
          const {ok, apps, err} = response.data.searchAppsMulti;
          if(ok) {
            this.props.updateSearch(apps);
            if(window.location.pathname.indexOf("search") === -1)
              this.setState({ redirect: true });
          } else {
            this.setState({ redirect: false });
            console.log(err);
          }
        });
    }
  }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const filteredResults = this.props.apps.filter(app => {
        app.title = app.name; // quick fix for search results
        return isMatch(app, this.state.value);
      });

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
    const { isLoading, value, results, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/search" />
      );
    }
    else
      return (
        <Search
          category
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
          onKeyPress={this.handleEnter}
          className="nav-search-bar" 
        />
      );
  }
}

AutocompleteSearch.propTypes = {
  apps: PropTypes.array,
  searchApps: PropTypes.func,
  updateSearch: PropTypes.func,
};

const mapStateToProps = (state, { ownProps }) => {
  return {
    apps: JSON.parse(JSON.stringify(state.appRepository.apps)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchApps,
    updateSearch,
  }, dispatch);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteSearch);
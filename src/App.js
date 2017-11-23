import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const { data: { loading } } = this.props;
    console.log({ loading });
    return <main>See console</main>;
  }
}

const AppWithData = graphql(
  gql`
    query Query {
      echo(delay: 2000)
    }
  `,
  {
    options: {
      pollInterval: 5000,
    },
  }
)(App);

export default class AppWithDataAndChangingProps extends Component {
  constructor(props) {
    super(props);
    this.state = { prop: 'first-value' };
  }

  componentDidMount() {
    // wait until the polled version of the query is waiting
    setTimeout(() => {
      this.setState({ prop: 'second-value' });
    }, 6000);
  }

  render() {
    return <AppWithData prop={this.state.prop} />;
  }
}

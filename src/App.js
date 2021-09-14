import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
// import BestBooks from ('./BestBooks');



class App extends React.Component {
  state = { books: [] };

  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    let apiURL = `${ process.env.REACT_APP_API_URL }/bookRoute`;

    try {
      let results = await axios.get(apiURL);
      this.setState({ books: results.data});
    }
    catch(err) {
      console.log(err);
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;

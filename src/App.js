import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import axios from 'axios';
// import BestBooks from './BestBooks';



class App extends React.Component {
  


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
            <nav>
                <h1>Books - Books - Books</h1>
                <Link to = "/">Home</Link>
                <Link to = "/profile">Profile</Link>
            </nav>

          <Switch>
            <Route exact path="/">
                <h1>Home</h1>
                {/* {this.state.books.length > 0 &&
                    <>
                    <h2>Books!</h2>
                    {this.state.books.map(book => (
                        <p key = {book._id} > {book.title}</p>
                    ))}
                </> */}
                }
            </Route>
            <Route path = "/profile">
                <h1>Profile Page Here</h1>
                <p>Welcome to the book world!</p>
            </Route> 
            <Route path = "/help">
                <h1>Help Me!</h1>
            </Route>
            <Route>
                <h1>Not Found!</h1>
            </Route> 
          </Switch>
            <Header />
            {/* <BestBooks /> */}
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
// import axios from 'axios';
// import BestBooks from './BestBooks';



class App extends React.Component {
  state = { books: null };

  //Run fetch as soon as the component has loaded
  componentDidMount() {
    this.fetchBooks();

   }

   async fetchBooks() {
     let apiURL = `${ process.env.REACT_APP_API_URL }/books`;
     try {
       let results = await axios.get(apiURL);
       this.setState({ books:  results.data });
     }
     catch (err) {
       console.log(err);
     }
   }

  
  // loginHandler = (user) => { this.setState({ user}); };
  // logoutHandler = () => { this.setState({ user: null }); };

  render() {
    return (
      <>
        <Router>
            <nav>
                <h1>Books - Books - Books</h1>
                <Link to = "/">Home</Link>
                {this.state.books && <Link to = "/profile">Profile</Link>}
                {/* <form onSubmit = {this.loginHandler}>
                <Logout onLogout = {this.logoutHandler} /> */}
            </nav>

          <Switch>
            <Route exact path="/">
                {/* <BestBooks user = {user} /> */}
                {/* {this.state.books.length > 0 &&
                    <>
                    <h2>Books!</h2>
                    {this.state.books.map(book => (
                        <p key = {book._id} > {book.title}</p>
                    ))}
                </> */}
                {/* } */}
            </Route>
            <Route path = "/profile">
                <Profile user = {this.state.books} />
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

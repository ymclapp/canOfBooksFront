import React from 'react';
// import Header from './Header';
import Footer from './Footer';
// import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import BestBooks from './BestBooks';
import AddABook from './AddABook';
import LoginButton from './LoginButton';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';

const SERVER = process.env.REACT_APP_API_URL;

class App extends React.Component {
  state = { 
    books: null,
    showAddBook: false,
   };

   toggleShowAddBook = () => {
     this.setState({
       showAddBook: !this.state.showAddBook,
     });
   }

  //Run fetch as soon as the component has loaded
  componentDidUpdate() {
    if(!this.state.books)
    this.fetchBooks();

   }

   async fetchBooks() {
     const { auth0 } = this.props;
     if(!auth0.isAuthenticated) {
       return;  //do nothing if not authenticated
     }

     let claims = await auth0.getIdTokenClaims();
     console.log(claims);
     //Grab the raw JWT
     let jwt = claims.__raw;

     let apiURL = `${ SERVER }/bookRoute`;
     try {
       let results = await axios.get(apiURL, {
         headers: {
           //Use Authorization header for Authentification
           'Authorization': `Bearer ${jwt}`,
         },
       });
       console.log(results);
       this.setState({ books: results.data });
     }
     catch (err) {
       console.log(err);
     }
   }

   handleSave = async bookInfo => {
    let apiURL = `${ SERVER }/bookRoute`;
    let results = await axios.post(apiURL, bookInfo);
    let newBook = results.data;
    console.log(newBook);

    this.setState({
      books: [newBook, ...this.state.books]
    })
    this.fetchBooks();
  }

  handleUpdate = async (bookId, bookInfo) => {
    let apiURL = `${ SERVER }/bookRoute/${bookId}`;
    await axios.put(apiURL, bookInfo);

    await this.fetchBooks();
  }

  handleDelete = async bookId => {
    let apiURL = `${ SERVER }/bookRoute/${bookId}`;
    await axios.delete(apiURL);
    await this.fetchBooks();
  }
  
  // loginHandler = (user) => { this.setState({ user}); };
  // logoutHandler = () => { this.setState({ user: null }); };

  render() {
    // const { isAuthenticated } = this.props.auth0;
    console.log('auth0 in App', this.props);

    return (
      <>
        <Router>
          <nav>
            <h1>Books - Books - Books</h1>
            <Link to="/">Home</Link>
            {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
            {" "}
            <Link to="/profile">Profile</Link>
            
          </nav>
      
      <Switch>
          
          <Route exact path="/">
            <h2>HOME</h2>
            {!this.state.showAddBook &&
            <button onClick = {this.toggleShowAddBook}>
              Add My Book!
              </button>
            } 
            <AddABook 
            show = {this.state.showAddBook}
            onCancel = {this.toggleShowAddBook}
            onSave = {this.handleSave} 
            />
            {this.state.books && this.state.books.length > 0 &&
              <>
                <h2>Books!</h2>
                {this.state.books.map(book => (
                  <BestBooks
                    key={book._id}
                    title={book}
                    description={book.description}
                    onDelete = {this.handleDelete}
                    onUpdate = {this.handleUpdate}
                  />
              ))}
              </>
            }
          </Route>

          <Route path="/profile">
            {/* <Profile user={this.state.books} /> */}
            <h1>This will be the profile page</h1>
          </Route>

          <Route path="/help">
            <h1>Help Me!</h1>
          </Route>

          <Route>
            <h1>Not Found!</h1>
          </Route>


        </Switch>

        <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);

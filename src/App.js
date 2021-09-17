import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
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



class App extends React.Component {
  state = { books: [] };

  //Run fetch as soon as the component has loaded
  componentDidMount() {
    this.fetchBooks();

   }

   async fetchBooks() {
     let apiURL = `${ process.env.REACT_APP_API_URL }/bookRoute`;
     try {
       let results = await axios.get(apiURL);
       console.log(results);
       this.setState({ books: results.data });
     }
     catch (err) {
       console.log(err);
     }
   }

   handleSave = async bookInfo => {
     let apiURL = `${ process.env.REACT_APP_API_URL }/bookRoute`;
     let results = await axios.post(apiURL, bookInfo);
     let newBook = results.data;
     console.log(newBook);

     this.setState({
       books: [newBook, ...this.state.books]
     })
     this.fetchBooks();
   }
  
  // loginHandler = (user) => { this.setState({ user}); };
  // logoutHandler = () => { this.setState({ user: null }); };

  render() {
    return (
      // console.log(book);
      <>
        <Router>
          <nav>
            <h1>Books - Books - Books</h1>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          </nav>
      
      <Switch>
          
          <Route exact path="/">
            <h2>HOME</h2>
            <AddABook onSave={this.handleSave} />
            {this.state.books.length > 0 &&
              <>
                <h2>Books!</h2>
                {this.state.books.map(book => (
                  <BestBooks
                    key={book._id}
                    title={book.title}
                    description={book.description}
                    status={book.status} 
                  />
              ))}
              </>
            }
          </Route>

          <Route path="/profile">
            <Profile user={this.state.books} />
          </Route>

          <Route path="/help">
            <h1>Help Me!</h1>
          </Route>

          <Route>
            <h1>Not Found!</h1>
          </Route>


        </Switch>
        <Header />
        <Footer />
        </Router>
      </>
    )
  }
}

export default App;

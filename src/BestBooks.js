import React from 'react';
import axios from 'axios';



class BestBooks extends React.Component {
  state = { books: null };

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

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */

  render() {
    const books = this.state.books;

    //Simple conditional - show books if there are any
    return (
      <div>
        <h1>Books!</h1>
        {books && books.length > 0 && <ul>{books.map(...)}</ul>}
      </div>
    );
//Single conditional expression (what ? ifTrue : ifFalse)

    /* TODO: render user's books in a Carousel */

    // return (
    //   <>
    //     <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

    //     {this.state.books.length ? (
    //       <p>Book Carousel coming soon</p>
    //     ) : (
    //       <h3>No Books Found :(</h3>
    //     )}
    //   </>
    // )
  }
}

export default BestBooks;

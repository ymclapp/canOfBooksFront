import React from 'react';
import axios from 'axios';
// import AddABook from './AddABook';
import UpdateMyBook from './UpdateMyBook';
import {Button} from 'react-bootstrap';

const SERVER = process.env.REACT_APP_API_URL;

class BestBooks extends React.Component {
  state = { update: false };

  // componentDidMount() {
  //   this.fetchBooks();
  // }

  async fetchBooks() {
    let apiURL = `${ SERVER }/bookRoute`;  //this does not equal bookRoute

    try {
      let results = await axios.get(apiURL);
      this.setState({ books: results.data});
    }
    catch(err) {
      console.log(err);
    }
  }

  // handleSave = async bookInfo => {
  //   let apiURL = `${ SERVER }/bookRoute`;
  //   let bookSave = await axios.post(apiURL, bookInfo);
  //   let newBook = bookSave.data;
  //   console.log(newBook);

  //   this.setState({
  //     books: [newBook, ...this.state.books]
  //   })

  // }

  handleUpdate = async (bookId, bookInfo) => {
    // let apiURL = `${ SERVER }/${bookId}`;
    this.setState({ update: false});
    
    // await axios.put(apiURL, bookInfo);
    
    //Do parent action from props
    await this.props.onUpdate(bookId, bookInfo);
  }
  //   await this.fetchBooks();
  // }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */

  render() {
    // const { BestBooks, onSave } = this.props;
    const { book, onDelete } = this.props;
    
    return (
      <div>
        <Button onClick={() => onDelete(book._id)}>&times;</Button>
        {this.state.update
        ? (
        <>
        <UpdateMyBook book={book} onUpdate={this.handleUpdate} />
        <Button onClick = {() => this.setState({ update: false })}>Cancel</Button>
      </>
    )
      : (
        <>
        {book}
        <Button onClick={() => this.setState({ update: true })}>Edit</Button>
        </>
      )
      }
      </div>
   
    //   <>
    //     {/* <form onSubmit = {this.handleSave}></form>
    //     <ul>{ books.map(...) }</ul> */}
    //     <AddABook onSave = {this.handleSave}/>
    //      ))

    //   </>
    // );
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
    )
  }
}

export default BestBooks;

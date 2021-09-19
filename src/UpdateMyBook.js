import React from 'react';
import { Form, Button } from 'react-bootstrap';

class UpdateMyBook extends React.Component {

    handleSubmit = event => {
        event.preventDefault();

    let elements = event.target.elements;
    let formData = {
        title:  elements.title.value,
        description: elements.description.value,
        status: elements.status.value,
        email: elements.email.value,
    }
    console.log('Ima updating as we speak', formData);

    let id = this.props.book._id
    this.props.onUpdate(id, formData);

    event.target.reset();
    elements.title.focus();
}

render() {
    let { book } = this.props;
    if (!book) return null;

    return (
        <Form method = "post" onSubmit = {this.handleSubmit}>
            <input placeholder = "Title" name = "title" defaultValue = {book.title}/>
            <input placeholder = "Description" name = "title" defaultValue = {book.description}/>
            <input placeholder = "Status" name = "status" defaultValue = {book.status}/>
            <input placeholder = "Email" name = "email" defaultValue = {book.email}/>

            <Button type = "submit">Update My Book!</Button>
        </Form>
    )
}
}

export default UpdateMyBook;

import axios from 'axios';
import React from 'react';
import { Form, Button } from 'react-bootstrap'

const SERVER = process.env.REACT_APP_API_URL;

class AddABook extends React.Component<props> {

    handleSubmit = event => {
        event.preventDefault();

        let elements = event.target.elements;
        let formData = {
            title:  elements.title.value,
            description:  elements.description.value,
            status: elements.description.value,
            email:  elements.email.value,
        }
        console.log('Hold on, I be saving a book', formData);

        let result = axios.post(`${SERVER}/addbook`, formData)

        this.setState({
            bookFormData: result.data
        })
        // this.props.onSave.post(`${SERVER}/addbook`, formData);

        event.target.reset();
        elements.title.focus();
    }

    render() {
        return (
            <Form method = "post" onSubmit = {this.handleSubmit}>
                <input placeholder = "Title" name = "title" />
                <input placeholder = "Description" name = "description" />
                <input placeholder = "Status (In/Out)" name = "status" />
                <input placeholder = "Email" name = "email" />
                
                <Button type = "submit">Save That Book!!!</Button>
            </Form>
        )
    }
}

export default AddABook;
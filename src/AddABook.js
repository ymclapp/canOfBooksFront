import React from 'react';

class AddABook extends React.Component {
    handleSubmit = event => {
        event.preventDefault();

        let elements = event.target.elements;
        let formData = {
            title:  elements.title.value,
            description:  elements.description.value,
            status: elements.description.value,
            email:  elements.email.value
        }
        console.log('Hold on, I be saving a book', formData);

        this.props.onSave(formData);

        event.target.reset();
        // elements.name.focus();
    }

    render() {
        return (
            <form method = "post" onSubmit = {this.handleSubmit}>
                <input placeholder = "Title" name = "title" />
                <input placeholder = "Description" name = "description" />
                <input placeholder = "Status (In/Out)" name = "status" />
                <input placeholder = "Email" name = "email" />
                <button type = "submit">
                    Save That Book!!!
                </button>
            </form>
        )
    }
}

export default AddABook;
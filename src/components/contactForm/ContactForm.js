import { Component } from 'react';
import PropTypes from 'prop-types';

import contactForm from './ContactForm.module.css';

class ContactForm extends Component {
  constructor(props) {
    super(props); // constructor because of props
    this.state = {
      name: '',
      number: '',
    };
  }

  handleInput = (e, inputName) => {
    this.setState(() => {
      return {
        [inputName]: e.target.value,
      };
    });
  };

  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  render() {
    const { name, number } = this.state;
    const { onAddContact } = this.props; // props

    return (
      <form
        onSubmit={e => onAddContact(e, name, number)}
        className={contactForm.form}
      >
        <label htmlFor="name">Name</label>
        <input
          className={contactForm.input}
          onChange={e => this.handleInput(e, 'name')}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          className={contactForm.input}
          onChange={e => this.handleInput(e, 'number')}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={contactForm.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

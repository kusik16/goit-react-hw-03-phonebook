import { Component } from 'react';
import PropTypes from 'prop-types';

import contactForm from './ContactForm.module.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  render() {
    const { name, number } = this.state;
    const { onAddContact } = this.props;

    return (
      <div className={contactForm.form}>
        <label htmlFor="name">Name</label>
        <input
          className={contactForm.input}
          onChange={e =>
            this.setState(() => {
              return {
                name: e.target.value,
              };
            })
          }
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          className={contactForm.input}
          onChange={e =>
            this.setState(() => {
              return {
                number: e.target.value,
              };
            })
          }
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button
          className={contactForm.btn}
          onClick={() => onAddContact(name, number)}
        >
          Add contact
        </button>
      </div>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

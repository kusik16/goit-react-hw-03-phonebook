import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../contactForm/ContactForm';
import Filter from '../filter/Filter';
import ContactList from '../contactList/ContactList';

import app from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      return this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    }
  }

  onFilter = e => {
    this.setState(() => {
      return {
        filter: e.target.value,
      };
    });
  };

  onAddContact = (e, name, number) => {
    e.preventDefault();
    if (
      this.state.contacts.filter(contact => contact.name === name).length >= 1
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (
      this.state.contacts.filter(contact => contact.number === number).length >=
      1
    ) {
      alert(`${number} is already in contacts`);
      return;
    }

    const newUser = {
      name,
      number,
      id: nanoid(),
    };

    localStorage.setItem(
      'contacts',
      JSON.stringify([newUser, ...this.state.contacts])
    );

    this.setState(() => {
      return {
        contacts: [newUser, ...this.state.contacts],
      };
    });
  };

  onDeleteContact = id => {
    localStorage.setItem(
      'contacts',
      JSON.stringify(this.state.contacts.filter(contact => contact.id !== id))
    );

    this.setState(() => {
      return {
        contacts: this.state.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        (contact.number + '').includes(filter)
    );

    return (
      <div>
        <h1 className={app.title}>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2 className={app.title}>Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;

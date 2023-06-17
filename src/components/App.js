import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  // const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    // After changing the contact list we need to set the new contact list. 
    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>

          <Route path="/" exact element={ <ContactList contacts={contacts} getContactId={removeContactHandler}/>}/>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}/>

          {/* <Route path="/" exact element={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route path="/add" element={(props) => (
              <AddContact 
              {...props} 
              addContactHandler={addContactHandler} />
            )}
          /> */}
          
          {/* Step 1. In V6, we can't use the component prop anymore. It was replaced in favor of element.
          <Route path="/add" component={AddContact}/>
          <Route path="/" component={ContactList}/> */}

          {/* (fix step 1) we should use render in our Routes in order to update our components rather than re-create the component everytime we visit the route url. 
          <Route path="/" element={<ContactList contacts={contacts}/>}/>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}/> */}
        </Routes>
      </Router>
    </div> 
  );
}

export default App;

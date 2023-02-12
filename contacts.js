const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "./contacts.json");

// function listContacts() {

//   fs.readFile(contactsPath, "utf8", (err, data) => {
//     console.table(JSON.parse(data));
//   });
// }

// listContacts();

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}
// listContacts();

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id === contactId))
    .then((contact) => console.table(contact))
    .catch((error) => console.log(error.message));
}
// getContactById("5");

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id !== contactId))
    .then((filteredContacts) => {
      console.table(filteredContacts);
      return filteredContacts;
    })
    .then((filteredContacts) => {
      fs.writeFile(
        contactsPath,
        JSON.stringify(filteredContacts, null, 4)
      ).catch((error) => console.log(error.message));
    });
}
// removeContact('3')

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      contacts.push({
        id: (contacts.length + 1).toString(),
        name,
        email,
        phone,
      });
      return contacts;
    })
    .then((newContacts) => {
      console.table(newContacts);
      return newContacts;
    })
    .then((newContacts) => {
      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4)).catch(
        (error) => console.log(error.message)
      );
    });
}

// addContact("Reuben Henry", "Reuben Henry", 444);

module.exports = { listContacts, getContactById, removeContact, addContact };

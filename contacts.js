const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const contactsPath = path.join("db", "./contacts.json");

// function listContacts() {

//   fs.readFile(contactsPath, "utf8", (err, data) => {
//     console.table(JSON.parse(data));
//   });
// }

// listContacts();

// function listContacts() {
//   fs.readFile(contactsPath)
//     .then((data) => console.table(JSON.parse(data)))
//     .catch((error) => console.log(error.message));
// }
// listContacts();

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return console.table(parsedContacts);
  } catch (error) {
    return console.log(error.message);
  }
}

// listContacts();

// function getContactById(contactId) {
//   fs.readFile(contactsPath, "utf8")
//     .then((data) => JSON.parse(data))
//     .then((contacts) => contacts.filter((contact) => contact.id === contactId))
//     .then((contact) => console.table(contact))
//     .catch((error) => console.log(error.message));
// }
// getContactById("5");

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const contactFilter = parsedContacts.filter(
      (contact) => contact.id === contactId
    );
    return console.table(contactFilter);
  } catch (error) {
    return console.log(error.message);
  }
}

// getContactById("5");

// function removeContact(contactId) {
//   fs.readFile(contactsPath, "utf8")
//     .then((data) => JSON.parse(data))
//     .then((contacts) => contacts.filter((contact) => contact.id !== contactId))
//     .then((filteredContacts) => {
//       console.table(filteredContacts);
//       return filteredContacts;
//     })
//     .then((filteredContacts) => {
//       fs.writeFile(
//         contactsPath,
//         JSON.stringify(filteredContacts, null, 4)
//       ).catch((error) => console.log(error.message));
//     });
// }
// removeContact('3')

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const contactFilter = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactFilter, null, 4));
    return console.table(contactFilter);
  } catch (error) {
    return console.log(error.message);
  }
}

// removeContact("6");

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf8")
//     .then((data) => JSON.parse(data))
//     .then((contacts) => {
//       contacts.push({
//         id: (contacts.length + 1).toString(),
//         name,
//         email,
//         phone,
//       });
//       return contacts;
//     })
//     .then((newContacts) => {
//       console.table(newContacts);
//       return newContacts;
//     })
//     .then((newContacts) => {
//       fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4)).catch(
//         (error) => console.log(error.message)
//       );
//     });
// }

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    
    const contactsAdd = [...parsedContacts,newContact]

    await fs.writeFile(contactsPath, JSON.stringify(contactsAdd, null, 4));
    return console.table(contactsAdd);
  } catch (error) {
    return console.log(error.message);
  }
}

// addContact("Reuben Henry", "Reuben Henry", 444);

module.exports = { listContacts, getContactById, removeContact, addContact };

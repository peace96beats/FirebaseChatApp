'use strict'

const config = {
  apiKey: "AIzaSyDnPsMPeOmNGQkWfR3rg4homLR9IUtmMZE",
  authDomain: "myfirebasechatapp-8a7de.firebaseapp.com",
  databaseURL: "https://myfirebasechatapp-8a7de.firebaseio.com",
  projectId: "myfirebasechatapp-8a7de",
  storageBucket: "myfirebasechatapp-8a7de.appspot.com",
  messagingSenderId: "851794594165"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const collection = db.collection('messages');

const auth = firebase.auth();

const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = document.getElementById('messages');

collection.orderBy('created').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const li = document.createElement('li');
      li.textContent = change.doc.data().message;
      messages.appendChild(li);
    }
  });
});


form.addEventListener('submit', e => {
  e.preventDefault();

  const val = message.value.trim();
  if (val === "") {
    return;
  }

  message.value = '';
  message.focus();

  collection.add({
    message: val,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log(`${doc.id} added!`);
  })
  .catch(error => {
    console.log(error);
  });
});

message.focus();


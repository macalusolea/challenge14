"use strict";

const User = function (name) {
  this.name = name;
};

const Conversation = function () {
  this.users = [];
  this.messages = [];
}

const Message = function (user, content) {
  this.user = user;
  this.content = content;
}

Conversation.prototype.addUsers = function (users) {
  if (!Array.isArray(users)) {
    throw new Error("Cela doit être un tableau !");
  }
  users.forEach((user) => {
    if (!(user instanceof User) || this.users.includes(user)) {
      throw new Error("L'utilisateur n'a pas été ajouté car il existe déjà ou ne peut pas être ajouté.");
    }
    console.log(`L'utilisateur ${user.name} a été ajouté!`);
    this.users.push(user);
  });
  return this;
};

User.prototype.sendMessage = function (conversation, content) {
  if (!conversation.users.includes(this)) {
    throw new Error(`${this.name} ne fait pas partie de cette conversation...`);
  }
  const message = new Message(this, content);
  conversation.messages.push(message);
  message.display();
  return this;
};

Message.prototype.display = function () {
  const className = this.user === currentUser ? "from-me" : "from-them";
  const html = `
  <div>
    <span class="${className}">${this.user.name}</span>
    <p class="${className}">${this.content}</p>
  </div>`;
  document.querySelector(".conversation").insertAdjacentHTML("beforeend", html);
  return this;
};

const anna = new User("Anna");
const bijan = new User("Bijan");
const conv = new Conversation();
const currentUser = anna;
conv.addUsers([anna]).addUsers([bijan]);
<template>
  <div class="chat">
    <p class="connection">
      New Connection:
      <span>{{newUser}}</span>
    </p>
    <h1 class="viewTitle">CHAT</h1>
    <div class="messagesContainer">
      <div class="messages">
        <p class="message" v-for="(msgObj, index) in messages" :key="index">
          <img :src="msgObj.profileImage" />
          <span>{{msgObj.username}}:</span>
          <span class="color">{{msgObj.message}}</span>
        </p>
      </div>
      <form @submit.prevent="sendMsg">
        <input type="text" v-model="newMsg" />
        <button class="sendMsgBtn" type="submit">Send Msg</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "chat",
  data() {
    return {
      socket: io("http://localhost:3000"),
      messages: [],
      newUser: "",
      newMsg: ""
    };
  },
  methods: {
    listen() {
      this.socket.on("shareNewUser", user => {
        this.newUser = user;
      });
      this.socket.on("sendNewMsg", msg => {
        this.messages.push({
          username: msg.username,
          profileImage: msg.profileImage,
          message: msg.message
        });
        const messages = document.querySelector(".messages");
        messages.scrollTop = messages.scrollHeight;
      });
    },
    sendMsg() {
      if (this.newMsg.trim()) {
        this.socket.emit("newMsg", {
          username: this.$store.state.loggedUser.username,
          profileImage: this.$store.state.loggedUser.profileImage,
          message: this.newMsg
        });
        this.newMsg = "";
      }
    }
  },
  mounted() {
    this.socket.emit("newUserConnected", this.$store.state.loggedUser.username);
    this.listen();
  }
};
</script>

<style lang="scss">
.chat {
  color: #fff;
  .connection {
    position: absolute;
    top: 2em;
    right: 2em;
    color: #f7be16;
    span {
      text-transform: uppercase;
    }
  }
  .messagesContainer {
    background-color: #12172c;
    width: 50%;
    margin: 0 auto;
    border-radius: 5px;
    padding: 1em;
    height: 600px;
    display: flex;
    flex-direction: column;
    .messages {
      height: 450px;
      overflow-y: auto;
      .message {
        margin: 0.5em 0;
        display: flex;
        align-items: center;
        img {
          margin-right: 0.5em;
          min-width: 50px;
          max-width: 50px;
          max-height: 50px;
          border-radius: 50%;
        }
        span {
          margin-right: 1em;
        }
        .color {
          color: #f7be16;
        }
        &:first-of-type {
          margin-top: 0;
        }
        &:nth-child(even) {
          background-color: lighten(#12172c, 1%);
        }
        &:last-of-type {
          margin-bottom: 5em;
        }
      }
    }
    form {
      background-color: transparent;
      box-shadow: none;
      margin: auto auto 0 auto;
      padding: 1em 0;
      min-width: 100%;
      input {
        margin-bottom: 1em;
      }
      .sendMsgBtn {
        padding: 0.5em;
      }
    }
  }
}
@media (max-width: 1100px) {
  .chat {
    .messagesContainer {
      width: 70%;
    }
  }
}
@media (max-width: 600px) {
  .chat {
    .connection {
      display: none;
    }
    .messagesContainer {
      width: 100%;
      height: 400px;
      .messages {
        .message {
          padding: 0.3em 0;
          flex-direction: column;
          align-items: flex-start;
          img {
            display: none;
          }
        }
      }
    }
  }
}
</style>
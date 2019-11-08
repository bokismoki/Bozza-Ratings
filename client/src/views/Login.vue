<template>
  <div class="login">
    <h1 class="viewTitle">Login</h1>
    <form @submit.prevent="login">
      <h2 class="error" v-if="errorMsg">{{errorMsg}}</h2>
      <label for="email">Email:</label>
      <input type="email" placeholder="Email*" id="email" v-model="user.email" required />
      <label for="password">Password:</label>
      <input type="password" placeholder="Password*" id="password" v-model="user.password" required />
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.user);
    }
  },
  computed: {
    ...mapGetters(["errorMsg"])
  },
  watch: {
    user: {
      deep: true,
      handler() {
        if (this.$store.state.errorMsg) {
          this.$store.commit("SET_ERROR_MSG", "");
        }
      }
    }
  }
};
</script>
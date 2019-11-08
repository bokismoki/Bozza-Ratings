<template>
  <div class="signup">
    <h1 class="viewTitle">Signup</h1>
    <form @submit.prevent="signup">
      <h2 class="error" v-if="errorMsg">{{errorMsg}}</h2>
      <label for="username">Username:</label>
      <input
        type="text"
        placeholder="Username*"
        id="username"
        v-model="user.username"
        required
        minlength="5"
      />
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
  name: "signup",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signup() {
      this.$store.dispatch("signup", this.user);
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
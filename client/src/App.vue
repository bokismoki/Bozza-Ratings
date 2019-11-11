<template>
  <div class="app">
    <div class="loaderContainer" v-if="isLoading">
      <img src="./assets/25.gif" class="loader" alt="Loading Animation" />
    </div>
    <i class="fa fa-bars fa-2x showNav" @click="navIsOpen = true"></i>
    <nav class="nav" :class="{show: navIsOpen}">
      <i class="fa fa-times fa-2x closeNav" @click="navIsOpen = false"></i>
      <div class="logo">
        <h1 class="logoName">Bozza Ratings</h1>
        <img src="./assets/logo_transparent.png" alt="Bozza Ratings Logo" class="logoImg" />
      </div>
      <div class="links">
        <router-link :to="{name: 'signup'}" v-if="!isLogged">
          <i class="fas fa-user-plus fa-2x"></i>
        </router-link>
        <a class="logout" @click="logout" v-else>
          <i class="fas fa-sign-out-alt fa-2x"></i>
        </a>
        <router-link :to="{name: 'login'}" v-if="!isLogged">
          <i class="fas fa-sign-in-alt fa-2x"></i>
        </router-link>
        <router-link :to="{name: 'movies'}">
          <i class="fas fa-film fa-2x"></i>
        </router-link>
        <router-link :to="{name: 'settings'}" v-if="isLogged">
          <i class="fas fa-cogs fa-2x"></i>
        </router-link>
      </div>
      <button
        class="optionsBtn"
        v-if="routeIsMovies"
        @click="toggleOptions"
      >{{optionsBtn}}</button>
      <div class="options" v-if="optionsIsOpen && routeIsMovies">
        <p>Sort by date:</p>
        <input type="radio" id="new" name="sort" checked @change="applyFilter" />
        <label for="new">New</label>
        <br />
        <input type="radio" id="old" name="sort" @change="applyFilter" />
        <label for="old">Old</label>
        <p>Sort by rating:</p>
        <input type="radio" id="high" name="sort" @change="applyFilter" />
        <label for="high">High</label>
        <br />
        <input type="radio" id="low" name="sort" @change="applyFilter" />
        <label for="low">Low</label>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      navIsOpen: false,
      optionsIsOpen: false
    };
  },
  computed: {
    ...mapGetters(["isLogged", "isLoading"]),
    optionsBtn() {
      return this.optionsIsOpen ? "Hide Options" : "Show Options";
    },
    routeIsMovies() {
      return this.$route.name === "movies";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    applyFilter(event) {
      this.$store.dispatch("sortMovies", event.target.id);
      localStorage.setItem("sortOption", event.target.id);
    },
    toggleOptions() {
      this.optionsIsOpen = !this.optionsIsOpen;
    }
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Times New Roman", Times, serif;
  background: url("./assets/background.jpg") center/cover;
  padding: 1em;
}
.loaderContainer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.showNav {
  position: fixed;
  top: 0.5em;
  left: 0.5em;
  cursor: pointer;
  color: #f7be16;
  z-index: 998;
}
.nav {
  width: 20%;
  min-width: 300px;
  position: fixed;
  top: 0;
  left: calc(-100% - 50px);
  bottom: 0;
  background-color: darken(#293462, 15%);
  transition: left 1000ms;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  &.show {
    left: 0;
  }
  .closeNav {
    color: #293462;
    cursor: pointer;
    position: absolute;
    top: 0.5em;
    right: 1em;
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    background-color: #f7be16;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    .logoName {
      color: #293462;
    }
    .logoImg {
      width: 70px;
    }
  }
  .links {
    padding: 2em 1em;
    display: flex;
    justify-content: space-evenly;
    i {
      color: #fff;
    }
    .logout {
      transform: rotate(180deg);
      cursor: pointer;
    }
    .router-link-exact-active {
      i {
        color: #f7be16;
      }
    }
  }
}
.viewTitle {
  color: #f7be16;
  text-align: center;
  font-size: 4em;
  text-transform: uppercase;
  padding: 1em 0;
}
form {
  background-color: #fff;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 3em 1.5em;
  align-items: center;
  box-shadow: 0 0 10px #000;
  .error {
    color: crimson;
    margin-bottom: 1em;
  }
  label {
    align-self: flex-start;
    margin-bottom: 0.5em;
  }
  input {
    width: 100%;
    margin-bottom: 1.5em;
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #00818a;
    &:hover,
    &:focus {
      border-color: darken(#00818a, 10%);
    }
  }
  button {
    width: 100%;
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #00818a;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    background-color: #00818a;
    color: #fff;
    &:hover {
      background-color: darken(#00818a, 5%);
    }
  }
  textarea {
    font-family: "Times New Roman", Times, serif;
    padding: 0.5em;
    border-radius: 5px;
    max-width: 100%;
    min-width: 100%;
    max-height: 150px;
    min-height: 50px;
    margin-bottom: 1.5em;
    border: 1px solid #00818a;
    &:hover,
    &:focus {
      border-color: darken(#00818a, 10%);
    }
  }
}
.optionsBtn {
  margin-bottom: 1em;
  display: block;
  margin: 0 auto 1em auto;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid #00818a;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  background-color: #00818a;
  color: #fff;
  &:hover {
    background-color: darken(#00818a, 5%);
  }
}
.options {
  background-color: #fff;
  width: 80%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  p {
    margin-bottom: 5px;
    font-size: 1.1em;
  }
  input {
    margin: 0 0.5em 0.5em 0;
    &:nth-of-type(2) {
      margin-bottom: 2em;
    }
  }
}
@media (max-width: 500px) {
  .viewTitle {
    font-size: 2.5em;
  }
}
</style>
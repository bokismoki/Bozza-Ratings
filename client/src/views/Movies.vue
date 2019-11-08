<template>
  <div class="movies">
    <h1 class="viewTitle">Movies</h1>
    <button class="showFormBtn" @click="formActive = !formActive" v-if="isLogged">{{formBtn}}</button>
    <form v-if="formActive && isLogged" @submit.prevent="addMovie">
      <h2 class="error" v-if="errorMsg">{{errorMsg}}</h2>
      <label for="title">Movie Title:</label>
      <input type="text" placeholder="Title*" id="title" v-model="movie.title" required />
      <label for="description">Movie Description:</label>
      <textarea placeholder="Description*" id="description" v-model="movie.description" required />
      <label for="image">Movie Image URL:</label>
      <input type="text" placeholder="Image URL*" id="image" v-model="movie.image" required />
      <button type="submit">Add Movie</button>
    </form>
    <div class="moviesContainer">
      <div class="movie" v-for="m in displayedMovies" :key="m._id" @click="goToMovie(m._id)">
        <img :src="m.image" @error="brokenImg" />
        <h2>{{m.title.length > 45 ? m.title.substring(0, 45) + '...' : m.title}}</h2>
        <p>{{m.description.substring(0, 150)}}...</p>
        <span class="date">{{m.createdOn.substring(0, 10)}}</span>
      </div>
    </div>
    <div class="paginationButtons">
      <button
        v-for="(btn, index) in numberOfButtons"
        @click="updateActivePaginationIndex(index)"
        :key="index"
        :class="{'active': activePaginationIndex === index}"
      >{{index+1}}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "movies",
  data() {
    return {
      movie: {
        title: "",
        description: "",
        image: ""
      },
      formActive: false
    };
  },
  computed: {
    ...mapGetters([
      "errorMsg",
      "movies",
      "isLogged",
      "numberOfButtons",
      "displayedMovies",
      "activePaginationIndex"
    ]),
    formBtn() {
      return this.formActive ? "Hide Form" : "Add Movie";
    }
  },
  methods: {
    brokenImg(event) {
      event.target.src = require("../assets/cinema.jpg");
    },
    addMovie() {
      this.$store.dispatch("addMovie", this.movie);
    },
    goToMovie(id) {
      this.$store.dispatch("getMovie", id);
      setTimeout(() => {
        this.$router.push({ name: "movie", params: { id } });
      }, 500)
    },
    updateActivePaginationIndex(index) {
      if (this.$store.state.activePaginationIndex !== index) {
        this.$store.dispatch("updateActivePaginationIndex", index);
      }
    }
  },
  created() {
    this.$store.dispatch("getMovies");
  },
  watch: {
    movie: {
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

<style lang="scss">
.movies {
  .showFormBtn {
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #00818a;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    background-color: #00818a;
    display: block;
    margin: 0 auto 2em auto;
    color: #fff;
    &:hover {
      background-color: darken(#00818a, 5%);
    }
  }
  form {
    margin-bottom: 2em;
  }
  .moviesContainer {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, 280px));
    grid-template-rows: 400px;
    grid-column-gap: 5em;
    grid-row-gap: 2em;
    .movie {
      background-color: #fff;
      border-radius: 5px;
      padding: 0.5em;
      cursor: pointer;
      transition: transform 250ms;
      position: relative;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      &:hover {
        transform: scale(1.05);
      }
      img {
        width: 100%;
        height: 200px;
        border-radius: 5px;
      }
      h2,
      p {
        max-width: 100%;
        word-wrap: break-word;
        color: #293462;
      }
      h2 {
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      .date {
        position: absolute;
        bottom: 5px;
        right: 0.5em;
        font-weight: bold;
        font-size: 0.8em;
        background-color: #f7be16;
        border-radius: 5px;
        padding: 2px 5px;
      }
    }
  }
  .paginationButtons {
    margin: 2em 0;
    display: flex;
    justify-content: center;
    button {
      margin: 0 1em;
      background-color: #35495e;
      color: #fff;
      font-weight: bold;
      border: 2px solid #41b883;
      border-radius: 5px;
      padding: 0.2em 1.2em;
      cursor: pointer;
      &.active {
        background-color: lighten(#35495e, 10%);
      }
      &:hover {
        background-color: lighten(#35495e, 10%);
      }
    }
  }
}
</style>
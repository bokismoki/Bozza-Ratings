<template>
  <div class="moviee">
    <div class="createdBy">
      <p>
        Created by:
        <span>{{selectedMovie.createdBy.username}}</span>
      </p>
      <img :src="selectedMovie.createdBy.profileImage" />
    </div>
    <h1>{{selectedMovie.title}}</h1>
    <p>{{selectedMovie.description}}</p>
    <img :src="selectedMovie.image" @error="brokenImg" />
    <div class="stars">
      <i class="fa fa-star" v-for="(star, index) in 5" :key="index" @click="updateRating(index)"></i>
    </div>
    <button v-if="isDeletable" @click="deleteMovie" class="removeBtn">Remove</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "movie",
  data() {
    return {};
  },
  mounted() {
    this.colorStars();
  },
  computed: {
    ...mapGetters(["selectedMovie"]),
    isDeletable() {
      return (
        this.$store.state.loggedUser.username ===
        this.$store.state.selectedMovie.createdBy.username
      );
    }
  },
  methods: {
    colorStars() {
      const stars = document.querySelectorAll(".fa-star");
      let rounds = 0;

      let interval = setInterval(() => {
        stars[rounds].style.color = "#f7be16";
        rounds++;
        if (rounds === this.$store.state.selectedMovie.rating)
          clearInterval(interval);
      }, 150);
    },
    updateRating(index) {
      const stars = document.querySelectorAll(".fa-star");
      stars.forEach(star => (star.style.color = "#000"));
      for (let i = 0; i <= index; i++) {
        stars[i].style.color = "#f7be16";
      }
    },
    brokenImg(event) {
      event.target.src = require("../assets/cinema.jpg");
    },
    deleteMovie() {
      this.$store.dispatch("deleteMovie", this.$route.params.id);
      this.$store.dispatch("updateIsLoading", true);
      setTimeout(() => {
        this.$router.push({ name: "movies" });
        this.$store.dispatch("updateIsLoading", false);
        this.$store.dispatch("getMovies");
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.moviee {
  padding: 2em 0.5em;
  .createdBy {
    position: absolute;
    top: 2em;
    right: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      color: #f7be16;
      padding: 0;
    }
    span {
      text-transform: uppercase;
    }
    img {
      width: 75px;
      border-radius: 50%;
      margin: 1em;
    }
  }
  h1,
  p {
    text-align: center;
    color: #fff;
    padding: 0 5em;
  }
  h1 {
    margin: 1em 0;
    color: #f7be16;
    font-size: 3em;
    text-transform: uppercase;
  }
  img {
    width: 100%;
    max-width: 300px;
    display: block;
    margin: 1.5em auto;
  }
  .stars {
    display: flex;
    justify-content: center;
    i {
      margin: 0 1px;
    }
  }
  .removeBtn {
    background-color: #12172c;
    color: #fff;
    margin: 2em auto;
    display: block;
    border: none;
    border-radius: 5px;
    padding: 0.5em 1em;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color 500ms, color 500ms;
    &:hover {
      background-color: #fff;
      color: #12172c;
    }
  }
}
@media (max-width: 1175px) {
  .moviee {
    h1,
    p {
      padding: 0 2em;
    }
  }
}
@media (max-width: 700px) {
  .moviee {
    h1 {
      font-size: 2em;
    }
  }
}
@media (max-width: 500px) {
  .moviee {
    h1,
    p {
      padding: 0 0.5em;
    }
  }
}
</style>
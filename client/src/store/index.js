import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router/index'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    axiosURL: 'http://localhost:3000',
    errorMsg: '',
    isLogged: false,
    movies: [],
    loggedUser: {},
    selectedMovie: {},
    activePaginationIndex: 0,
    isLoading: false
  },
  getters: {
    isLogged: state => state.isLogged,
    errorMsg: state => state.errorMsg,
    movies: state => state.movies,
    loggedUser: state => state.loggedUser,
    selectedMovie: state => state.selectedMovie,
    numberOfButtons: state => Math.ceil(state.movies.length / 8),
    displayedMovies: state => state.movies.slice().splice(state.activePaginationIndex * 8, 8),
    activePaginationIndex: state => state.activePaginationIndex,
    isLoading: state => state.isLoading
  },
  mutations: {
    SET_ERROR_MSG: (state, payload) => {
      state.errorMsg = payload;
    },
    SET_IS_LOGGED: (state, payload) => {
      state.isLogged = payload;
    },
    GET_MOVIES: (state, payload) => {
      state.movies = payload;
    },
    SET_LOGGED_USER: (state, payload) => {
      state.loggedUser = payload;
    },
    ADD_MOVIE: (state, payload) => {
      state.movies.unshift(payload);
    },
    UPDATE_PROFILE_IMAGE: (state, payload) => {
      state.loggedUser.profileImage = payload;
    },
    SORT_MOVIES: (state, payload) => {
      state.movies = payload;
    },
    GET_MOVIE: (state, payload) => {
      state.selectedMovie = state.movies.find(movie => movie._id === payload);
    },
    UPDATE_ACTIVE_PAGINATION_INDEX: (state, payload) => {
      state.activePaginationIndex = payload;
    },
    UPDATE_IS_LOADING: (state, payload) => {
      state.isLoading = payload;
    }
  },
  actions: {
    signup: (context, payload) => {
      axios.post(context.state.axiosURL + '/signup', payload, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        if (response.data.message) {
          context.commit('SET_ERROR_MSG', response.data.message);
        } else {
          Router.push({ name: 'login' });
        }
      }).catch(err => {
        console.error(err);
      })
    },
    login: (context, payload) => {
      axios.post(context.state.axiosURL + '/login', payload, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        if (response.data.message) {
          context.commit('SET_ERROR_MSG', response.data.message);
        } else {
          const { username, profileImage, _id, token } = response.data;
          localStorage.setItem('jwt', token);
          context.commit('SET_LOGGED_USER', { username, profileImage, _id });
          context.commit('SET_IS_LOGGED', true);
          Router.push({ name: 'movies' });
        }
      }).catch(err => {
        console.error(err);
      })
    },
    isLogged: (context, payload) => {
      context.commit('SET_IS_LOGGED', payload);
    },
    getMovies: context => {
      axios.get(context.state.axiosURL + '/movies')
        .then(movies => {
          context.commit('GET_MOVIES', movies.data);
          if (localStorage.getItem("sortOption") !== null) {
            const sortOption = localStorage.getItem("sortOption");
            context.dispatch("sortMovies", sortOption);
          }
        }).catch(err => {
          console.error(err);
        })
    },
    logout: context => {
      localStorage.removeItem('jwt');
      context.commit('SET_IS_LOGGED', false);
      context.commit('SET_LOGGED_USER', {});
      Router.push({ name: 'login' });
    },
    addMovie: (context, payload) => {
      return axios.post(context.state.axiosURL + '/movies', { ...payload, createdBy: { username: context.state.loggedUser.username, profileImage: context.state.loggedUser.profileImage } }, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(movie => {
        if (movie.data.message) {
          context.commit('SET_ERROR_MSG', movie.data.message);
        } else {
          context.commit('ADD_MOVIE', movie.data);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    updateProfileImage: (context, payload) => {
      axios.patch(context.state.axiosURL + '/user/' + context.state.loggedUser._id, { url: payload }, {
        headers: {
          'content-type': 'application/json'
        }
      }).then((updatedImage) => {
        context.commit('UPDATE_PROFILE_IMAGE', updatedImage.data);
        context.dispatch("getMovies");
      }).catch(err => {
        console.error(err);
      })
    },
    sortMovies: (context, payload) => {
      let sortedArray;
      switch (payload) {
        case "new":
          sortedArray = context.state.movies.sort((a, b) => a.createdOn > b.createdOn ? -1 : 1),
            context.commit('SORT_MOVIES', sortedArray);
          break;
        case "old":
          sortedArray = context.state.movies.sort((a, b) => a.createdOn > b.createdOn ? 1 : -1),
            context.commit('SORT_MOVIES', sortedArray);
          break;
        case "high":
          sortedArray = context.state.movies.sort((a, b) => a.rating > b.rating ? -1 : 1),
            context.commit('SORT_MOVIES', sortedArray);
          break;
        case "low":
          sortedArray = context.state.movies.sort((a, b) => a.rating > b.rating ? 1 : -1)
          context.commit('SORT_MOVIES', sortedArray);
      }
    },
    getMovie: (context, payload) => {
      context.commit('GET_MOVIE', payload);
    },
    updateActivePaginationIndex: (context, payload) => {
      context.commit('UPDATE_ACTIVE_PAGINATION_INDEX', payload);
    },
    deleteMovie: (context, payload) => {
      axios.delete(context.state.axiosURL + '/delete/' + payload)
        .then(response => {
          console.log('Movie with the id: ' + response.data._id + ' has been deleted.');
        }).catch(err => {
          console.error(err);
        })
    },
    updateIsLoading: (context, payload) => {
      context.commit('UPDATE_IS_LOADING', payload);
    }
  }
})

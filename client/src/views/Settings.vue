<template>
  <div class="settings">
    <h1 class="viewTitle">Settings</h1>
    <div class="profile">
      <input type="file" id="file" @change="processFile" />
      <label for="file">
        <img :src="loggedUser.profileImage" class="profileImg" alt="Profile Image" />
      </label>
      <h2 class="username">{{loggedUser.username}}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "settings",
  computed: {
    ...mapGetters(["loggedUser"])
  },
  methods: {
    processFile() {
      const img = document.querySelector(".profileImg");
      const file = document.querySelector("input[type=file]").files[0];

      const reader = new FileReader();

      reader.addEventListener("load", () => {
        img.src = reader.result;
        if (this.$store.state.loggedUser.profileImage !== reader.result) {
          this.$store.dispatch("updateProfileImage", reader.result);
        }
      });

      if (file.type.includes("image")) {
        reader.readAsDataURL(file);
      } else {
        console.error("Please select the right image format!");
      }
    }
  }
};
</script>

<style lang="scss">
.settings {
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    input[type="file"] {
      display: none;
    }
    label {
      position: relative;
      border-radius: 50%;
      margin-bottom: 1em;
      &::after {
        position: absolute;
        content: "EDIT";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #000;
        color: #fff;
        padding: 0.5em 1.5em;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .profileImg {
      border-radius: 50%;
      cursor: pointer;
      width: 200px;
      height: 200px;
      background-color: #fff;
      border: 1px solid #fff;
    }
    .username {
      color: #fff;
      text-transform: uppercase;
    }
  }
}
</style>
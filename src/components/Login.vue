<template>
  <div class="vue-tempalte">
    <form @submit.prevent="userLogin">
      <h3>Sign In</h3>

      <div class="form-group">
        <label>Tel</label>
        <input
          type="tel"
          class="form-control form-control-lg"
          v-model="user.tel"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="user.password"
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Sign In
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
    </form>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithPhoneNumber(this.user.tel, this.user.password)
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
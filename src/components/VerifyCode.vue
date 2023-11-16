<template>
  <div class="vue-tempalte">
    <h3>Verify Code</h3>

    <div class="form-group">
      <label>OTP</label>
      <input type="text" class="form-control form-control-lg" v-model="otp" />
    </div>

    <button @click="verifyOtp" class="btn btn-dark btn-lg btn-block">
      Confirm OTP
    </button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      otp: "",
    };
  },
  methods: {
    verifyOtp() {
      // let vm = this;
      let code = this.otp;
      //
      window.confirmationResult
        .confirm(code)
        .then(function (result) {
          // User signed in successfully.
          // eslint-disable-next-line no-unused-vars
          var user = result.user;
          console.log(user);
          alert("success");
          // ...
          //route to set password !
          // vm.$router.push({ path: "/setPassword" });
        })
        // eslint-disable-next-line no-unused-vars
        .catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    },
  },
};
</script>
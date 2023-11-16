<template>
  <div class="vue-template">
    <h3>Sign Up</h3>

    <div class="form-group">
      <label>Name</label>
      <input
          type="text"
          class="form-control form-control-lg"
          v-model="user.name"
      />
    </div>

    <div class="form-group">
      <label>Surname</label>
      <input
          type="text"
          class="form-control form-control-lg"
          v-model="user.surname"
      />
    </div>

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
    <button
        @click="userRegistration"
        class="btn btn-dark btn-lg btn-block"
        id="sign-up-button"
    >
      Sign Up
    </button>

    <div class="form-group">
      <label>OTP</label>
      <input type="text" class="form-control form-control-lg" v-model="otp"/>
    </div>

    <button @click="verifyOtp" class="btn btn-dark btn-lg btn-block">
      Confirm OTP
    </button>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        name: "",
        surname: "",
        tel: "",
        password: "",
      },
      otp: "123456",
      appVerifier: '',
    };
  },
  methods: {
    verifyOtp() {
      let code = this.otp;
      window.confirmationResult
          .confirm(code)
          .then(() => {
            // User signed in successfully.
            firebase
                .auth()
                .currentUser.getIdToken(/* forceRefresh */ true)
                .then((idToken) => {
                  // Send token to your backend via HTTPS
                  const config = {
                    headers: {
                      'idToken': idToken,
                    }
                  }
                  this.$axios.post('sync-cod', this.user, config).then(res => {
                    if (res.data.success) {
                      console.log('success');
                      this.user='';
                      this.otp='';
                    }
                  }).catch((e) => {
                    console.log(e);
                  });
                })
                // eslint-disable-next-line no-unused-vars
                .catch(function (error) {
                });
          })
          // eslint-disable-next-line no-unused-vars
          .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
            alert("invalid OTP");
          });
    },
    userRegistration() {
      let appVerifier = this.appVerifier
      firebase
          .auth()
          .signInWithPhoneNumber("+85620" + this.user.tel, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(window.confirmationResult);
            alert("sent");
          })
          .catch((error) => {
            alert(error.message);
          });
    },
    initReCaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', {
          'size': 'invisible',
          'callback': function () {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': function () {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        });
        //
        this.appVerifier = window.recaptchaVerifier
      }, 1000)
    }
  },
  created(){
    this.initReCaptcha()
  }
};
</script>
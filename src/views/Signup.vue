<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Signup Page</h1>
        <v-form ref="signUpForm" v-model="formValidity">
          <v-text-field 
            label="Email" 
            type="email"
            v-model="email"
            :rules="emailRules"
            required
          />
          <v-autocomplete label="Which browser do you use?" :items="browsers" />
          <v-file-input label="Attach profile picture" />
          <v-text-field label="Birthday" v-model="birthday" readonly />
          <v-date-picker v-model="birthday" />
          <v-checkbox 
            label="Agree to terms & conditions"
            v-model="agreeToTerms"
            :rules="agreeToTermRules"
            required
          />
          <v-btn 
            class="mr-4" 
            type="submit" 
            color="indigo"
            :disabled="!formValidity"
          >Submit</v-btn>
          <v-btn class="mr-4" color="success" @click="validateForm">Validate</v-btn>
          <v-btn class="mr-4" color="warning" @click="resetValidation">Reset Validation</v-btn>
          <v-btn color="error" @click="resetForm">Rest</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      agreeToTerms: false,
      agreeToTermRules: [
        value => !!value || 'You must agree to the terms and conditions to sign up for an account.'

      ],
      email: '',
      emailRules: [
        value => !!value || 'Email is required',
        value => value.indexOf('@') !== 0 || 'Email should have a username.',
        value => value.includes('@') || 'Email should include an @ symbol.',
        value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain.',
        value => value.indexOf('.') <= value.length - 3 || 'Email should contain a valid domain extension.'
      ],
      birthday: '',
      browsers: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave'],
      formValidity: false
    }),
    methods: {
      resetForm() {
        this.$refs.signUpForm.reset()
      },
      resetValidation() {
        this.$refs.signUpForm.resetValidation()
      },
      validateForm() {
        this.$refs.signUpForm.validate()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
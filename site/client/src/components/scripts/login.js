import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return{
      email: '',
      password: '',
      error: null
    }

  },
  methods: {
    async login() {
      try{
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken',response.data.token)
        this.$router.push('root')

      }catch(err){
        this.error = err.response.data.error
      }
    }

  }
}

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
    async register() {
      try{
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      }catch(err){
        this.error = err.response.data.error
      }
    }

  }
}

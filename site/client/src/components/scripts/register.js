import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return{
      email: '',
      password: '',
      error: null,
      emailCorrect: false,
      emailChecked: false,
      passwordCorrect: false,
      passwordChecked: false,
      longColour: 'grey',
      upperColour: 'grey',
      numberColour: 'grey'
    }

  },
  methods: {
    async register() {
      try{
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken',response.data.token)
        this.$router.push('index')
      }catch(err){
        this.error = err.response.data.error
      }
    },
    checkEmail(){
      this.emailChecked = true
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.emailCorrect = re.test(this.email)
    },
    checkPassword(){
      this.passwordChecked = true
      this.passwordCorrect = true
      if(this.passwordLongEnough()){
        this.longColour = 'black'
      }
      else{
        this.longColour = 'red'
        this.passwordCorrect = false
      }
      if(this.passwordUppercase()){
        this.upperColour = 'black'
      }
      else{
        this.upperColour = 'red'
        this.passwordCorrect = false
      }
      if(this.passwordNumber()){
        this.numberColour = 'black'
      }
      else{
        this.numberColour = 'red'
        this.passwordCorrect = false
      }
    },
    passwordLongEnough(){
      return(this.password.length >= 8)
    },
    passwordUppercase(){
      return(/[A-Z]/.test(this.password))
    },
    passwordNumber(){
      return(/[0-9]/.test(this.password))
    }
  }
}

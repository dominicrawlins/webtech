import IndiTopStats from '@/components/IndiTopStats'
export default {
  components: {
    IndiTopStats
  },
    data () {
    return{
      stat: "goalsAgainst",
      columns: ["name", "goalsFor", "goalsAgainst"]
    }

  },
  async mounted() {
  },
  methods: {
  }
}

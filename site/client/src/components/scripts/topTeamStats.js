import IndiTopStats from '@/components/IndiTopStats'
export default {
  components: {
    IndiTopStats
  },
    data () {
    return{
      stat: "goalsAgainst",
      columns: ["name", "goalsFor", "goalsAgainst"],
      order: "desc"
    }

  },
  async mounted() {
  },
  methods: {
  }
}

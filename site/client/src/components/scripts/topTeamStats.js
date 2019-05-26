import IndiTopStats from '@/components/IndiTopStats'
import BarChart from '@/components/BarChart'
export default {
  components: {
    IndiTopStats,
    BarChart
  },
    data () {
    return{
      stat: "goalsAgainst",
      columns: ["name", "goalsFor", "goalsAgainst"],
      order: "desc",
      secondstat: "wins",
      secondcolumns: ["name", "wins"],
      secondorder: "desc"
    }

  },
  async mounted() {
  },
  methods: {
  }
}

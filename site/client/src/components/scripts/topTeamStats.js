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
      columns: ["name","goalsAgainst"],
      order: "desc",
      secondstat: "wins",
      secondcolumns: ["name", "wins"],
      secondorder: "desc",
      table: "teams"
    }

  },
  async mounted() {
  },
  methods: {
  }
}

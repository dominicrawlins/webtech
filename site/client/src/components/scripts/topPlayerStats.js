import IndiTopStats from '@/components/IndiTopStats'
import BarChart from '@/components/BarChart'
export default {
  components: {
    IndiTopStats,
    BarChart
  },
    data () {
    return{
      stat: "goals",
      columns: ["name", "goals", "team"],
      order: "desc",
      secondstat: "assists",
      secondcolumns: ["name", "assists", "team"],
      secondorder: "desc",
      table: "players"
    }

  },
  async mounted() {
  },
  methods: {
  }
}

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
      columns: ["name", "goals"],
      order: "desc",
      secondstat: "assists",
      secondcolumns: ["name", "assists"],
      secondorder: "desc",
      table: "players"
    }

  },
  async mounted() {
  },
  methods: {
  }
}

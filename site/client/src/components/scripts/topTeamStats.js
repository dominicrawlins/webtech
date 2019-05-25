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
      heights: [50, 20, 10, 30, 50],
      maxLength: 200
    }

  },
  async mounted() {
  },
  methods: {
  }
}

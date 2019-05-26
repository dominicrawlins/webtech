import TeamService from '@/services/TeamService'
export default {
  name: 'barChart',
  props: {
    widths: Array,
    maxLength: Number,
    labels: Array
  },
  data(){
    return{
      pixelWidths : [],
      show : false,
      teams: ''
    }

  },
  methods:{
    calculatePixelWidths(){
      let maximal = Math.max(...this.widths)
      let tempPixelWeights = []
      for(var i = 0; i < this.widths.length; i++){
        let relativeWidth = (this.widths[i] / maximal) * this.maxLength
        let addedWidth = relativeWidth.toString() + 'px'
        tempPixelWeights.push(addedWidth)
      }
      this.pixelWidths = tempPixelWeights
    }
  },
  async mounted(){
    this.calculatePixelWidths()
    this.show = true
    this.teams = (await TeamService.getTeams()).data
  }
}

import TeamService from '@/services/TeamService'
export default {
  name: 'barChart',
  props: {
    widths: Array,
    maxLength: Number,
    labels: Array,
    teams: Array
  },
  data(){
    return{
      pixelWidths : [],
      show : false,
      colourDictionary : {
         liverpool: 'rgba(200,16,46,0.3)',
         manchestercity: 'rgba(108,171,221,0.3)',
         chelsea: 'rgba(3, 70, 148,0.3)',
         tottenham: 'rgba(19,34,87,0.3)',
         arsenal: 'rgba(239,1,7,0.3)',
         manchesterutd: 'rgba(218,41,28,0.3)',
         leicestercity: 'rgba(0,83,160,0.3)',
         wolverhampton: 'rgba(253,185,19,0.3)',
         everton: 'rgba(39,68,136,0.3)',
         watford: 'rgba(251,238,35,0.3)',
         westhamutd: 'rgba(122,38,58,0.3)',
         crystalpalace: 'rgba(27, 69, 143,0.3)',
         bournemouth: 'rgba(181,14,18,0.3)',
         burnley: 'rgba(108,29,69,0.3)',
         newcastleutd: 'rgba(45,41,38,0.3)',
         brighton: 'rgba(0,87,184,0.3)',
         southampton: 'rgba(215,25,32,0.3)',
         cardiffcity: 'rgba(0,112,181,0.3)',
         fulham: 'rgba(0,0,0,0.3)',
         huddersfield: 'rgba(14, 99, 173,0.3)'
      }
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
      console.log(this.teams)
    }
  },
  async mounted(){
    this.calculatePixelWidths()
    this.show = true
  }
}

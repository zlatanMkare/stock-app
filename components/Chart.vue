<script>
import { mapGetters } from 'vuex'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  
  data () {
    return {
      symbol: this.$route.query.id,
      chartdata: {
        labels: [],
        datasets: [
          {
            label: 'Close Price ($)',
            backgroundColor: '#a0c4d7',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  computed: {
    ...mapGetters([
      'getStock'
    ])
  },

  mounted () {
    this.mapStockData();
    this.renderChart(this.chartdata, this.options);
  },

  methods: {
    mapStockData() {
      let stocks = this.getStock;
      for (var key in stocks) {
          if (stocks.hasOwnProperty(key)) {
              let stock = stocks[key];
              if (stock.company.symbol === this.symbol) {
                  let stockData = JSON.parse(JSON.stringify(stock.chart));
                  
                  this.chartdata.labels = stockData.map(date => date.label);
                  this.chartdata.datasets[0].data = stockData.map(close => close.close);
              }
          }
      }
    }
  }
}
</script>

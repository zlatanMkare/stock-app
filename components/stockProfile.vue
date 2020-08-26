<template>
    <div class="container">
        <h2 class="my-5">Stock profile: {{ this.company.companyName }}</h2>
        <h3>Overview of the last 30 days</h3>
        <div class="my-5">
            <chart></chart>
        </div>
        <br>
        <h2>Stock details:</h2>
        <br>
        <p><strong>CEO:</strong> {{ this.company.CEO }}</p>
        <p><strong>Industry:</strong> {{ this.company.industry }}</p>
        <p><strong>Security Name:</strong> {{ this.company.securityName }}</p>
        <p><strong>Website:</strong> <a target="_blank" :href="this.company.website">{{this.company.website}}</a> </p>
        <p><strong>Exchange:</strong> {{ this.company.exchange }}</p>
        <p><strong>Employees:</strong> {{ this.company.employees }}</p>
        <br>
        <h3 class="mb-5">About</h3>
        <p>{{ this.company.description }}</p>
    </div>
</template>

<script>
import Chart from '~/components/Chart.vue'
import { mapGetters } from "vuex";

export default {
    components: {
        Chart    
    },

    data () {
        return {
            symbol: this.$route.query.id,
            company: [],
            chart: []
        }
    },

    mounted () {
        // get the stock
        let stocks = this.$store.state.stocks;
        for (var key in stocks) {
            if (stocks.hasOwnProperty(key)) {
                let stock = stocks[key];
                if (stock.company.symbol === this.symbol) {
                    this.company = stock.company;
                    this.chart = stock.chart;
                }
            }
        }
    },

    created () {
        
    }
}
</script>
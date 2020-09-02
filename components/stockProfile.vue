<template>
    <v-container>
        <v-row>
            <v-col md="12">
                <div class="float-left">
                    <h2 class="mb-5 mt-0">Stock profile: {{ this.company.companyName }}</h2>
                    <h3>Overview of the last 30 days</h3>
                </div>
                <div class="float-right">
                    <v-btn small color="primary" :to="'/'">
                        Back <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>
            </v-col>

            <v-col cols="12" class="my-5">
                <chart></chart>
            </v-col>
           
           <v-col cols="4">
               <v-card class="pa-4">
                    <h2>Stock details:</h2>
                    <br>
                    <p><strong>CEO:</strong> {{ this.company.CEO }}</p>
                    <p><strong>Industry:</strong> {{ this.company.industry }}</p>
                    <p><strong>Security Name:</strong> {{ this.company.securityName }}</p>
                    <p><strong>Website:</strong> <a target="_blank" :href="this.company.website">{{this.company.website}}</a> </p>
                    <p><strong>Exchange:</strong> {{ this.company.exchange }}</p>
                    <p><strong>Employees:</strong> {{ this.company.employees }}</p>
                </v-card>
           </v-col>

            <v-col cols="8">
                <h2 class="mb-5">About</h2>
                <p>{{ this.company.description }}</p>
            </v-col>
        </v-row>
    </v-container>
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
    }
}
</script>
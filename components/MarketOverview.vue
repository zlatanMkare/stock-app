<template>
    <div class="col-md-12">
        <v-flex class="col-md-12">
            <p class="mb-1">Market overview</p>
            <h1>Today's marketing briefing.</h1>
        </v-flex>    

        <v-row class="col-md-12">
            <v-col col cols="12" sm="6" md="4" v-for="(stock, index) in getStock" :key="index">
                <v-card dark color="#385F73" outlined>
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">{{stock.quote.companyName}}</div>
                        <v-list-item-title class="headline mb-1">{{stock.quote.symbol}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content class="text-right">
                        <small :class="color(stock.quote.changePercent*100)"><v-icon :class="color(stock.quote.changePercent*100)">{{icon}}</v-icon> {{stock.quote.changePercent*100 | roundOff}} %</small>
                        <h2>$ {{stock.quote.latestPrice}}</h2>
                    </v-list-item-content>
                    </v-list-item>

                    <v-card-actions>
                        <nuxt-link :to="'/stock?id=' + stock.quote.symbol">
                            <v-btn text>More</v-btn>
                        </nuxt-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
          
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            icon: ''
        } 
    },

    computed: {
        ...mapGetters([
            'getStock'
        ]),
    },

    mounted () {
        this.$store.dispatch('fetchStock');
    },

    methods: {
        color(value) {
            if (value <= 1) {
                this.icon = 'mdi-menu-down';
                return 'red--text';
                
            } else {
                this.icon = 'mdi-menu-up';
                return 'green--text';
            }
        }   
    },

    filters: {
        roundOff: function(value) {
            return Math.round(value * 100) / 100
        }
    }
}
</script>

<style scoped>
    
</style>
<template>
    <div class="col-md-12">
        <v-row class="col-md-12">
            <div class="col-md-8">
                <p class="mb-1">Market overview</p>
                <h1>Today's marketing briefing.</h1>  
            </div>
            <div v-if="getStock" class="col-md-4">
                <div class="colors mt-3 float-right">
                    <a @click.prevent="changeColorDefault()"><div id="default" class="color"></div></a>
                    <a @click.prevent="changeColor1()"><div id="purple" class="color"></div></a>
                    <a @click.prevent="changeColor2()"><div id="indigo" class="color"></div></a>
                    <a @click.prevent="changeColor3()"><div id="teal" class="color"></div></a>
                </div>
            </div>
        </v-row>    

        <v-row class="col-md-12" v-if="getStock">
            <v-col col cols="12" sm="6" md="4" v-for="(stock, index) in getStock" :key="index">
                <v-card dark :color="bgColor" outlined>
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">{{stock.quote.companyName}}</div>
                        <v-list-item-title class="headline mb-1">{{ stock.company.symbol }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content class="text-right">
                        <small :class="color(stock.quote.changePercent*100)"><v-icon :class="color(stock.quote.changePercent*100)">{{icon}}</v-icon> {{stock.quote.changePercent*100 | roundOff}} %</small>
                        <h2>$ {{stock.quote.latestPrice}}</h2>
                    </v-list-item-content>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn :to="'/stock?id=' + index" color="info" small>More <v-icon small>mdi-chevron-right</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-btn color="success" large>Add more <v-icon small>mdi-plus</v-icon></v-btn>
            </v-col>
        </v-row>
          
    </div>
</template>

<script>
import store from "vuex";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            icon: ''
        } 
    },

    computed: {
        ...mapGetters([
            'getStock',
            'getCardColor'
        ]),

        bgColor: {
            get () {
                return this.getCardColor;
            }
        }
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
        },
        changeColorDefault() {
            this.$store.commit('CHANGE_COLOR', '#385f73');
        },
        changeColor1() {
            this.$store.commit('CHANGE_COLOR', '#6A1B9A');
        },
        changeColor2() {
            this.$store.commit('CHANGE_COLOR', '#3949AB');
        },
        changeColor3() {
            this.$store.commit('CHANGE_COLOR', '#00897B');
        }
    },

    filters: {
        roundOff: function(value) {
            return Math.round(value * 100) / 100
        }
    }
}
</script>

<style lang="scss" scoped>
    .colors {
        .color {
            background: #eee;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin: 3px;
            display: inline-block;
        }
        #default {
            background: #385f73;
        }
        #purple {
            background: #6A1B9A;
        }
        #indigo {
            background: #3949AB;
        }
        #teal {
            background: #00897B;
        }
    }
</style>
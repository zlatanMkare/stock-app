<template>
    <div class="col-md-12">
        <v-flex class="col-md-12">
            <p class="mb-1">Stock Market Roundup</p>
            <h1>Latest News</h1>
        </v-flex>    

        <v-flex class="col-md-12">
            <div class="col-md-12 row elevation-0 mb-8" v-for="news in getNews.news" :key="news.news">
                <div class="col-md-4">
                    <!-- <v-img :src="news.image"> -->
                    <v-img class="newsImg" src="https://placeimg.com/640/480/any">
                        <v-card-title></v-card-title>
                    </v-img>
                </div>

                <div class="col-md-8">
                    <h3>{{news.headline}}</h3>
                    <small>{{news.source}} | {{ news.datetime | date }}</small>
                    <p class="text--primary">{{ news.summary | truncate }}</p>
                    <v-btn
                        color="info"
                        :href="news.url"
                        target="_blank"
                    >
                        Read More
                    </v-btn>
                </div>
            </div>
        </v-flex>
          
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
      ...mapGetters([
          'getNews'
      ]),
    },

    mounted () {
        this.$store.dispatch('fetchNews');
    },

    filters: {
        truncate: function(value) {
            return value.split('').splice(0,300).join('');
        },
        date: function(value) {
            let date = new Date(value);
            return date.toDateString();
        }
    }
}
</script>

<style scoped>
    .newsImg {
        border-radius: 5px;
    }
</style>
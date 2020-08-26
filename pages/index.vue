<template>
  <v-layout
    row
  >
    <market-overview />
    <latest-news />
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import MarketOverview from '~/components/MarketOverview.vue'
import LatestNews from '~/components/LatestNews.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    MarketOverview,
    LatestNews
  }
}
</script>

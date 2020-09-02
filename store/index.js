import Vuex from 'vuex'
import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
	baseURL: '/',
	// cache will be enabled by default
	adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

const createStore = () => {
    return new Vuex.Store({
        state: {
            stocks: [],
            news: [],
            chart: [],
            cardColor: '#385F73'
        },

        getters: {
            getStock(state) {
                return state.stocks;
            },
            getNews(state) {
                return state.news;
            },
            getCardColor(state) {
                return state.cardColor;
            }
        },

        mutations: {
            SET_STOCK(state,stocks) {
                state.stocks = stocks;
            },
            SET_NEWS(state,news) {
                state.news = news;
            },
            CHANGE_COLOR(state, color) {
                state.cardColor = color;
            }
        },

        actions: {
            
            fetchStock({commit}) {
                return new Promise ((resolve, reject) => {
                    let url = 'https://cloud.iexapis.com/stable/stock/market/batch?types=quote,company,chart&symbols=aapl,twtr,luv,dal,fb,googl&token=pk_f39cf95ab9b645cea5407da6faea85b1';
                    http.get(url).then( (response) => {
                        commit('SET_STOCK', response.data)
                        resolve()
                    }).catch(e => {
                        reject()
                    });
                })
            },

            fetchNews({commit}) {
                let url = 'https://cloud.iexapis.com/stable/stock/market/batch?types=news&token=pk_f39cf95ab9b645cea5407da6faea85b1';
                http.get(url).then( (response) => {
                    commit('SET_NEWS', response.data);
                });
            }
        }
    })
}

export default createStore;
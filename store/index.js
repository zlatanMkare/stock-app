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
            chart: []
        },

        getters: {
            getStock(state) {
                return state.stocks;
            },
            getNews(state) {
                return state.news;
            }
        },

        mutations: {
            SETSTOCK(state,stocks) {
                state.stocks = stocks;
            },
            SETNEWS(state,news) {
                state.news = news;
            }
        },

        actions: {
            
            fetchStock({commit}) {
                return new Promise ((resolve, reject) => {
                    let url = 'https://cloud.iexapis.com/stable/stock/market/batch?types=quote,company,chart&symbols=aapl,twtr,luv,dal,fb,googl&token=pk_f39cf95ab9b645cea5407da6faea85b1';
                    http.get(url).then( (response) => {
                        commit('SETSTOCK', response.data)
                        resolve()
                    }).catch(e => {
                        reject()
                    });
                })
            },

            fetchNews({commit}) {
                let url = 'https://cloud.iexapis.com/stable/stock/market/batch?types=news&token=pk_f39cf95ab9b645cea5407da6faea85b1';
                http.get(url).then( (response) => {
                    commit('SETNEWS', response.data);
                });
            }
        }
    })
}

export default createStore;
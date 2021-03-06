import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import CandidateView from './components/candidates/View.vue'
import CandidateList from './components/candidates/List.vue'
import CandidateApply from './components/candidates/Apply.vue'

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'vue-material/dist/theme/default.css';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract';
import TomoValidatorArtifacts from '../build/contracts/TomoValidator.json';
Vue.use(VueMaterial)

Vue.prototype.TomoValidator = contract(TomoValidatorArtifacts);

if (typeof web3 !== 'undefined') {
    var web3js = new Web3(web3.currentProvider);
} else {
    web3js = false;
} 

if (web3js instanceof Web3) {
    Vue.prototype.web3 = web3js;
    Vue.prototype.TomoValidator.setProvider(web3js.currentProvider);
    Vue.prototype.getAccount = function() {
        var p = new Promise(function(resolve, reject) {
            web3js.eth.getAccounts(function(err, accs) {
                if (err != null) {
                    console.log("There was an error fetching your accounts.");
                    reject(err);
                }

                if (accs.length == 0) {
                    console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    reject(err);
                }

                resolve(accs[0]);
            });
        });
        return p;
    }
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: CandidateList
        },
        {
            path: '/apply', component: CandidateApply
        },
        {
            path: '/candidates', component: CandidateList
        },
        {
            path: '/candidates/:address', component: CandidateView
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    template: '<App/>',
    components: { App }
})

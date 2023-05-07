import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { Button } from 'vant'
Vue.use(Button)
import { Field } from 'vant';
Vue.use(Field);
import { Dialog } from 'vant';

Vue.use(Dialog);

import { RadioGroup, Radio } from 'vant';

Vue.use(Radio);
Vue.use(RadioGroup);

import { Toast } from 'vant';

Vue.use(Toast);
import { Icon } from 'vant';

Vue.use(Icon);
import { Uploader } from 'vant';

Vue.use(Uploader);
import { Overlay } from 'vant';

Vue.use(Overlay);
import { Loading } from 'vant';

Vue.use(Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

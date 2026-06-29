import type { IPlugin, IPlatformSDK } from 'vbwd-view-component';
import en from './locales/en.json';
import th from './locales/th.json';

export const trueMoneyPaymentPlugin: IPlugin = {
  name: 'truemoney-payment',
  version: '26.6.1',
  description: 'TrueMoney Wallet (Thailand) payment — QR + deep-link',
  _active: false,

  install(sdk: IPlatformSDK) {
    sdk.addRoute({
      path: '/pay/truemoney',
      name: 'truemoney-payment',
      component: () => import('./TrueMoneyPaymentView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addRoute({
      path: '/pay/truemoney/success',
      name: 'truemoney-success',
      component: () => import('./TrueMoneySuccessView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addRoute({
      path: '/pay/truemoney/cancel',
      name: 'truemoney-cancel',
      component: () => import('./TrueMoneyCancelView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });

    sdk.addTranslations('en', en);
    sdk.addTranslations('th', th);
  },

  activate() {
    this._active = true;
  },
  deactivate() {
    this._active = false;
  },
};

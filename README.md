# TrueMoney Payment Plugin (fe-user)

Vue 3 plugin wiring TrueMoney Wallet (Thailand) checkout into the
user storefront. Renders a QR payload, offers a deep-link to the
TrueMoney app on mobile, and polls `/status` every 3 s for terminal
state.

## Routes

| Path | Component |
|------|-----------|
| `/pay/truemoney` | `TrueMoneyPaymentView.vue` — QR + deep-link + polling |
| `/pay/truemoney/success` | `TrueMoneySuccessView.vue` |
| `/pay/truemoney/cancel` | `TrueMoneyCancelView.vue` |

## i18n

`en`, `th`.

## Backend

Pairs with [`vbwd-plugin-truemoney`](https://github.com/VBWD-platform/vbwd-plugin-truemoney).

---

**Core:** [vbwd-fe-user](https://github.com/VBWD-platform/vbwd-fe-user)

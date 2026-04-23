<template>
  <div class="truemoney-cancel">
    <h2>{{ $t('truemoney.cancel.title') }}</h2>
    <p>{{ $t('truemoney.cancel.message') }}</p>
    <router-link class="btn btn-secondary" to="/checkout">
      {{ $t('truemoney.cancel.retry') }}
    </router-link>
  </div>
</template>

<style scoped>
.truemoney-cancel {
  max-width: 480px;
  margin: 4rem auto;
  text-align: center;
}
</style>

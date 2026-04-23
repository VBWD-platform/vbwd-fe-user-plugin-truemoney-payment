<template>
  <div class="truemoney-success">
    <h2>{{ $t('truemoney.success.title') }}</h2>
    <p>{{ $t('truemoney.success.message') }}</p>
    <router-link class="btn btn-primary" to="/dashboard">
      {{ $t('truemoney.success.dashboard') }}
    </router-link>
  </div>
</template>

<style scoped>
.truemoney-success {
  max-width: 480px;
  margin: 4rem auto;
  text-align: center;
}
</style>

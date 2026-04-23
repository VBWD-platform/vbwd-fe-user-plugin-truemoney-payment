<template>
  <div class="truemoney-payment">
    <div v-if="loading" class="truemoney-payment__loading">
      <p>{{ $t('truemoney.payment.creating') }}</p>
    </div>

    <div v-else-if="error" class="truemoney-payment__error">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="startPayment">
        {{ $t('truemoney.payment.retry') }}
      </button>
    </div>

    <div v-else-if="transaction" class="truemoney-payment__qr">
      <p>{{ $t('truemoney.payment.scan') }}</p>
      <div class="qr-placeholder">{{ transaction.qr_payload }}</div>
      <p class="expiry">{{ $t('truemoney.payment.expires') }}: {{ formatExpiry(transaction.expires_at) }}</p>
      <a
        v-if="transaction.deep_link"
        class="btn btn-secondary"
        :href="transaction.deep_link"
      >
        {{ $t('truemoney.payment.openApp') }}
      </a>
      <p v-if="pollStatus" class="poll-status">{{ pollStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/api';

interface Transaction {
  transaction_id: string;
  qr_payload: string;
  deep_link: string;
  expires_at: string;
}

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);
const transaction = ref<Transaction | null>(null);
const pollStatus = ref<string | null>(null);
let pollTimer: ReturnType<typeof setInterval> | null = null;

async function startPayment() {
  const invoiceNo = (route.query.invoice as string) || '';
  if (!invoiceNo) {
    error.value = 'No invoice specified';
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const resp = await api.post('/api/v1/plugins/truemoney/transactions', {
      invoice_no: invoiceNo,
      amount: route.query.amount,
    });
    transaction.value = await resp.json();
    startPolling(invoiceNo);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'failed';
  } finally {
    loading.value = false;
  }
}

function startPolling(invoiceNo: string) {
  pollTimer = setInterval(async () => {
    const resp = await api.get(
      `/api/v1/plugins/truemoney/transactions/${invoiceNo}/status`,
    );
    const body = await resp.json();
    pollStatus.value = body.status;
    if (body.status === 'completed') {
      stopPolling();
      router.push({ name: 'truemoney-success' });
    } else if (['failed', 'cancelled', 'expired'].includes(body.status)) {
      stopPolling();
      router.push({ name: 'truemoney-cancel' });
    }
  }, 3000);
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function formatExpiry(iso: string) {
  return new Date(iso).toLocaleTimeString();
}

onMounted(() => {
  startPayment();
});

onBeforeUnmount(() => {
  stopPolling();
});
</script>

<style scoped>
.truemoney-payment {
  max-width: 480px;
  margin: 4rem auto;
  padding: 1.5rem;
  text-align: center;
}
.qr-placeholder {
  padding: 2rem;
  border: 1px dashed var(--vbwd-color-border, #ccc);
  word-break: break-all;
  font-family: monospace;
  font-size: 0.75rem;
  margin: 1rem 0;
}
.poll-status {
  color: var(--vbwd-color-muted, #888);
  margin-top: 1rem;
}
</style>

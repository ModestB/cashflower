<template>
  <base-modal :show="isModalVisible" @close="closeModal">
    <template #header>
      <div>{{ headerTitle }}</div>
    </template>
    <template #default>
      <transition name="fade-up" mode="out-in">
        <base-alert v-if="showSuccessAlert" type="success">{{
          successAlert
        }}</base-alert>
        <base-alert v-else-if="showErrorAlert" type="error">
          <p>Wallet not saved!</p>
          <ul v-show="errors">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </base-alert>
      </transition>
      <div class="d-flex">
        <base-select
          :options="state.walletTypes"
          :selected="state.walletType"
          @set-selected="setWalletType"
          class="mr-3"
          label="Type"
          :disabled="isEditModal"
        >
        </base-select>
        <base-input
          id="walletName"
          type="text"
          label="Name"
          placeholder="Enter wallet name"
          class="mr-3"
          v-model="state.walletName"
          :blur="v$.walletName.$touch"
          :invalid="v$.walletName.$error"
          :invalid-feedback="v$.walletName.$errors[0]?.$message"
        >
        </base-input>
        <base-input
          id="walletBalance"
          type="number"
          label="Balance"
          placeholder="Enter wallet balance"
          v-model="state.walletBalance"
          :blur="v$.walletBalance.$touch"
          :invalid="v$.walletBalance.$error"
          :invalid-feedback="v$.walletBalance.$errors[0]?.$message"
        >
        </base-input>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <base-button
          class="mr-3"
          mode="danger"
          type="outline"
          @click="closeModal"
          >Cancel</base-button
        >
        <base-button
          mode="success"
          @click="submitHandler"
          :disabled="disableSubmit"
          >Save</base-button
        >
      </div>
    </template>
  </base-modal>
</template>

<script>
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import BaseButton from '../base/BaseButton.vue';
import { WALLET_TYPES } from '@/constants';

export default {
  components: { BaseButton },
  emits: ['close-modal'],
  setup(props) {
    const state = reactive({
      walletTypes: Object.values(WALLET_TYPES),
      walletName: props.name,
      walletBalance: props.balance,
      walletType: props.type,
    });
    const rules = {
      walletName: {
        required: helpers.withMessage('Wallet name is required', required),
      },
      walletBalance: {
        required: helpers.withMessage('Wallet balance is required', required),
      },
    };
    return {
      state,
      v$: useVuelidate(rules, state),
    };
  },
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    isEditModal: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    balance: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: WALLET_TYPES.regular.value,
    },
  },
  data() {
    return {
      successAlert: '',
      errors: '',
      disableSubmit: false,
    };
  },
  computed: {
    showSuccessAlert() {
      return this.successAlert.length;
    },
    showErrorAlert() {
      return this.errors.length;
    },
    headerTitle() {
      if (this.isEditModal) {
        return 'Edit Wallet';
      }
      return 'Add Wallet';
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
      if (!this.isEditModal) {
        this.state.walletName = '';
        this.state.walletBalance = 0;
        this.successAlert = '';
      }
      this.disableSubmit = false;

      // Reset any previous validations
      this.v$.$reset();
    },
    setWalletType(event) {
      this.walletType = event.value;
    },
    submitHandler() {
      this.disableSubmit = true;
      this.errors = '';
      this.v$.$touch();
      if (this.isEditModal) {
        return this.editWallet();
      }
      return this.addWallet();
    },
    addWallet() {
      this.$store
        .dispatch('wallets/addWallet', {
          name: this.state.walletName,
          balance: this.state.walletBalance,
          type: this.state.walletType,
        })
        .then(() => {
          this.successAlert = `Wallet ${this.state.walletName} created!`;

          setTimeout(() => {
            this.closeModal();
          }, 2000);
        })
        .catch((error) => {
          this.errors = Object.values(error.response.data.errors);
          this.disableSubmit = false;
        });
    },
    editWallet() {
      this.$store
        .dispatch('wallets/editWallet', {
          id: this.id,
          name: this.state.walletName,
          balance: this.state.walletBalance,
        })
        .then(() => {
          this.successAlert = `Wallet ${this.state.walletName} updated!`;
          setTimeout(() => {
            this.closeModal();
          }, 2000);
        });
    },
  },
};
</script>

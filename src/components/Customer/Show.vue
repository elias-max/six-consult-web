<template>
  <q-card
    class="fundo"
    style="width: 700px; max-width: 80vw;"
  >
    <q-card-section>
      <div class="title">Cliente</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div>
        <div class="row">
          <div class="col-12 col-md-12">
            <q-input
              class="q-px-md "
              v-model="customer.name"
              label="Nome"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4">
            <q-input
              class="q-px-md "
              v-model="customer.ftin"
              label="Cnpj"
              mask="##.###.###/####-##"
            />
          </div>
          <div class="col-12 col-md-8">
            <q-input
              class="q-px-md "
              v-model="customer.tradeName"
              label="Nome Fantasia"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8">
            <q-input
              class="q-px-md "
              v-model="customer.contactEmail"
              label="Email de Contato"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              class="q-px-md "
              v-model="customer.contactPhone"
              label="Telefone de Contato"
              mask="(##) N########"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4">
            <q-input
              class="q-px-md "
              readonly
              v-model="createdFormated"
              label="Criado em"
            />
          </div>
          <div class="col-12 col-md-8">
            <q-input
              class="q-px-md "
              readonly
              v-model="customer.userCreated.name"
              label="Criado por"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4">
            <q-input
              class="q-px-md "
              readonly
              v-model="updatedFormated"
              label="Alterado em"
            />
          </div>
          <div class="col-12 col-md-8">
            <q-input
              class="q-px-md "
              readonly
              v-model="customer.userUpdated.name"
              label="Alterado por"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn
        label="Fechar"
        v-close-popup
        @click="cancelar"
        color="secondary"
        flat
        class="q-ml-sm"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'customerShow',
  props: ['customer'],
  data () {
    return {

    }
  },
  computed: {
    createdFormated: function () {
      // `this` points to the vm instance
      return this.formatDate(this.customer.createdAt)
    },
    updatedFormated: function () {
      // `this` points to the vm instance
      return this.formatDate(this.customer.updatedAt)
    }
  },
  methods: {
    cancelar () {
      self.$emit('close')
    },
    formatDate (date) {
      return moment(String(date)).format('DD/MM/YYYY HH:mm:ss')
    },
  }
}
</script>

<style>
</style>

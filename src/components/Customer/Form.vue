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
        <div
          class="row"
          v-if="customer.userCreated"
        >
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
        <div
          class="row"
          v-if="customer.userUpdated"
        >
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
        label="Cancelar"
        v-close-popup
        @click="cancelar"
        color="secondary"
        flat
        class="q-ml-sm"
      />
      <q-btn
        label="Confirmar"
        type="submit"
        @click="save()"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'customerForm',
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
    save () {
      const self = this
      self.$q.loading.show()
      if (self.customer.id === undefined) {
        self.$axios
          .post('/Customer', {
            ftin: self.customer.ftin.replace(/\D/g, ""),
            name: self.customer.name,
            tradeName: self.customer.tradeName,
            contactEmail: self.customer.contactEmail,
            contactPhone: self.customer.contactPhone.replace(/\D/g, "")
          })
          .then(function (res) {
            self.$q.loading.hide()
            self.$q.notify({
              color: 'green',
              textColor: 'white',
              icon: 'check_circle_outline',
              message: 'Registro salvo com sucesso'
            })
            self.$emit('close')
          })
          .catch(function (err) {
            self.$q.loading.hide()
            console.log(err.response.data.message)
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error_outline',
              message: err.response.data.message
            })
          })
      } else {
        self.$axios
          .put('/Customer/' + self.customer.id, {
            ftin: self.customer.ftin.replace(/\D/g, ""),
            name: self.customer.name,
            tradeName: self.customer.tradeName,
            contactEmail: self.customer.contactEmail,
            contactPhone: self.customer.contactPhone.replace(/\D/g, "")
          })
          .then(function (res) {
            self.$q.loading.hide()
            self.$q.notify({
              color: 'green',
              textColor: 'white',
              icon: 'check_circle_outline',
              message: 'Registro alterado com sucesso'
            })
            self.$emit('close')
          })
          .catch(function (err) {
            self.$q.loading.hide()
            console.log(err)
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error_outline',
              message: err.response.data.message
            })
          })
      }
    }
  }
}
</script>

<style>
</style>

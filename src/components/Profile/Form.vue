<template>
  <q-card
    class="fundo"
    style="width: 700px; max-width: 80vw;"
  >
    <q-card-section>
      <div class="title">Perfil</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div>
        <div class="row">
          <div class="col-12 col-md-12">
            <q-input
              class="q-px-md "
              v-model="profile.name"
              label="Nome"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="title">Permissões</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div>
        <div class="row">
          <div class="col-9 col-md-3">
            <q-checkbox
              v-model="profile.create"
              label="Criar"
            />
          </div>
          <div class="col-9 col-md-3">
            <q-checkbox
              v-model="profile.update"
              label="Atualizar"
            />
          </div>
          <div class="col-3 col-md-3">
            <q-checkbox
              v-model="profile.delete"
              label="Excluir"
            />
          </div>
          <div class="col-3 col-md-3">
            <q-checkbox
              v-model="profile.isAdmin"
              label="Administrador"
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
export default {
  name: 'profileForm',
  props: ['profile'],
  data () {
    return {

    }
  },
  methods: {
    cancelar () {
      self.$emit('close')
    },
    save () {
      const self = this
      self.$q.loading.show()
      if (self.profile.id === undefined) {
        self.$axios
          .post('/Profile', {
            name: self.profile.name,
            create: self.profile.create,
            update: self.profile.update,
            delete: self.profile.delete,
            isAdmin: self.profile.isAdmin
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
          .put('/Profile/' + self.profile.id, {
            name: self.profile.name,
            create: self.profile.create,
            update: self.profile.update,
            delete: self.profile.delete,
            isAdmin: self.profile.isAdmin
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

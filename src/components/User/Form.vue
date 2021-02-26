<template>
  <q-card
    class="fundo"
    style="width: 700px; max-width: 80vw;"
  >
    <q-card-section>
      <div class="title">Usuário</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div>
        <div class="row">
          <div class="col-12 col-md-6">
            <q-input
              class="q-px-md "
              v-model="user.name"
              label="Nome"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              class="q-px-md "
              v-model="user.email"
              label="E-mail"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="col-12 col-md-12">
              <profile-select
                class="q-px-md"
                :object="user.profile"
                label="Perfil"
                title="Perfil"
                @selected="user.profile = $event"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="col-12 col-md-12">
              <q-input
                class="q-px-md"
                v-model="user.password"
                label="Senha"
                type="password"
              />
            </div>
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
import profileSelect from '../Profile/ProfileSelect'

export default {
  name: 'profileForm',
  props: ['user'],
  components: {
    profileSelect
  },
  data () {
    return {

    }
  },
  methods: {
    cancelar () {
      this.$emit('close')
    },
    save () {
      const self = this
      self.$q.loading.show()
      if (self.user.id === undefined) {
        self.$axios
          .post('/User', {
            name: self.user.name,
            email: self.user.email,
            profileId: self.user.profile.id,
            password: self.user.password,
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
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error_outline',
              message: err.response.data.message,
            })
          })
      } else {
        self.$axios
          .put('/User/' + self.user.id, {
            name: self.user.name,
            email: self.user.email,
            profileId: self.user.profile.id
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
              message: err.response.data.message,
            })
          })
      }
    }
  }
}
</script>

<style>
</style>

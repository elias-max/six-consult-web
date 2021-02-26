<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-form
        ref="myForm"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-card-section>
          <div class="row justify-center full-height full-width">
            <img
              alt="Logo"
              src="https://sixconsult.com.br/wp-content/uploads/2020/12/logo-six.png"
            />
          </div>
          <h6 class="text-center">Login do Sistema</h6>
          <q-input
            autofocus
            v-model="email"
            label="E-mail"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Informe seu e-mail']"
          />

          <q-input
            v-model="password"
            label="Senha"
            type="password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Informe sua senha']"
          />

        </q-card-section>
        <q-card-section class="align-center q-gutter-x-sm">

          <div class="row justify-end ">
            <q-btn
              label="Limpar"
              type="reset"
              color="primary"
              flat
              class="q-px-lg text-body1"
            />
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              class="q-px-lg text-body1"
            />
          </div>
        </q-card-section>

        <div class="text-italic text-center">
          Dúvidas Ligue :
          <q-btn
            flat
            round
            color="primary"
            disable
            icon="phone"
          />+ 55 (41) 9.9600 2770
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const self = this
      this.$q.loading.show()
      this.$refs.myForm.validate().then((success) => {
        if (success) {
          this.$axios
            .post('/User/login', {
              email: this.email,
              password: this.password
            })
            .then(function (res) {
              const user = res.data
              self.$store.commit('config/user', user)
              self.$axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
              self.$q.notify({
                color: 'green-5',
                textColor: 'white',
                icon: 'fas fa-exclamation-triangle',
                message: 'Bem vindo ' + user.name,
              })
              self.$q.loading.hide()
              self.$router.push('/main')
            })
            .catch(function (err) {
              self.$q.loading.hide()
              try {
                self.$q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'fas fa-exclamation-triangle',
                  message: err.response.data.message,
                  position: 'top'
                })
              } catch (error) {
                self.$q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'fas fa-exclamation-triangle',
                  message: 'Aconteceu um erro no Serviço ',
                  position: 'top'
                })
              }
            })
        } else {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Falta coisa',
            position: 'center'
          })
        }
      })
    },
    onReset () {
      this.email = null
      this.password = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>

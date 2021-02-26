<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Six Consult Desafio - Fernando Villa Rosa
        </q-toolbar-title>

        <div>Telefone: +55 (41) 99600-2770</div>
        <q-btn
          flat
          dense
          icon="logout"
          aria-label="Menu"
          @click="logoff()"
        > Sair </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          v-if="(!link.admin || user.isAdmin)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Clientes',
    caption: 'Listagem de clientes',
    icon: 'fas fa-columns',
    link: '/main/customers',
    admin: false
  },
  {
    title: 'Usuários',
    caption: 'Lista de Usuários',
    icon: 'fas fa-users',
    link: '/main/users',
    admin: true
  },
  {
    title: 'Perfil',
    caption: ' Lista dos perfis dos usuários',
    icon: 'fas fa-user',
    link: '/main/profiles',
    admin: true
  },
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      user: this.$store.state.config.user
    }
  },
  methods: {
    logoff () {
      const self = this
      this.$q
        .dialog({
          title: 'Logoff',
          message: 'Gostaria de Sair do Sistema ?',
          cancel: true
        })
        .onOk(() => {
          self.$store.commit('config/user', null)
          self.$axios.defaults.headers.common.Authorization = ''
          self.$q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Usuário deslogado !'
          })
          self.$router.push('/')
        })
    }
  }
}
</script>

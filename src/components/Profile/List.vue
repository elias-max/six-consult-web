<template>
  <div>
    <div class="q-pa-md">
      <p class="title">Listagem de perfis</p>
      <div class="row">
        <div class="col-12 col-md-8">
          <q-btn
            round
            color="primary"
            icon="add"
            @click="novo()"
          >
            <q-tooltip
              anchor="center right"
              content-class="bg-secondary text-white shadow-4"
              self="center left"
              :offset="[10, 10]"
            >
              <strong>Adicionar</strong>
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="filter"
            label="Pesquisar"
            debounce="500"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div style="width: 100%">
          <q-list separator>
            <q-item
              v-for="item in items"
              :key="item.id"
            >
              <q-item-section avatar>
                {{item.id}}
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle1">{{item.name}}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="far fa-eye"
                    clickable
                    @click="open(item)"
                  >
                    <q-tooltip
                      content-class="bg-secondary text-white shadow-4"
                      :offset="[10, 10]"
                    >
                      Mostrar
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="edit"
                    clickable
                    @click="edit(item)"
                  >
                    <q-tooltip
                      content-class="bg-secondary text-white shadow-4"
                      :offset="[10, 10]"
                    >
                      Editar
                    </q-tooltip>
                  </q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          :max="lastpage"
          color="secondary"
          :direction-links="true"
          :boundary-numbers="true"
          :max-pages="6"
        >
        </q-pagination>
      </div>
      <q-dialog
        persistent
        transition-show="scale"
        v-model="modal"
      >
        <profile-form
          @close="atualiza()"
          :profile.sync="object"
        />
      </q-dialog>
      <q-dialog
        persistent
        transition-show="scale"
        v-model="show"
      >
        <profile-show
          @close="atualiza()"
          :profile.sync="object"
        />
      </q-dialog>
    </div>
  </div>
</template>

<script>
import profileForm from './Form'
import profileShow from './Show'

export default {
  name: 'profile-list',
  components: {
    profileForm,
    profileShow
  },
  data () {
    return {
      filter: '',
      modal: false,
      show: false,
      object: {
        name: "",
        create: true,
        update: true,
        delete: true,
        isAdmin: false
      },
      items: [],
      lastpage: 1,
      perpage: 20,
      page: 1,
      options: [5, 10, 20, 50, 100]
    }
  },
  watch: {
    filter: function (val) {
      this.pesquisa(val)
    },
    page: function (val) {
      this.pesquisa(this.filter)
    }
  },
  mounted () {
    this.pesquisa('')
  },

  methods: {
    atualiza () {
      this.modal = false
      this.pesquisa(this.filter)
    },
    novo () {
      this.object = {
        name: "",
        create: true,
        update: true,
        delete: true,
        isAdmin: false
      }
      this.modal = true
    },
    edit (object) {
      this.object = object
      this.modal = true
    },
    open (object) {
      this.object = object
      this.show = true
    },
    pesquisa (filter) {
      const self = this
      this.$axios
        .get(
          '/Profile?filter=' +
          filter +
          '&page=' +
          this.page +
          '&pageSize=' +
          this.perpage
        )
        .then(res => {
          this.items = res.data.items
          this.page = res.data.page
          this.pageSize = res.data.pageSize
          this.totalItems = res.data.totalCount
        })
        .catch(err => {
          console.log(err.response)
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error_outline',
            message: 'Ocorreu um erro ao acessar o serviço : ' + err
          })
        })
    }
  }

}
</script>

<style>
</style>

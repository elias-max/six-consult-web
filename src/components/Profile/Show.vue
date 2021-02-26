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
              readonly
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
              disable
              v-model="profile.create"
              label="Criar"
            />
          </div>
          <div class="col-9 col-md-3">
            <q-checkbox
              disable
              v-model="profile.update"
              label="Atualizar"
            />
          </div>
          <div class="col-3 col-md-3">
            <q-checkbox
              disable
              v-model="profile.delete"
              label="Excluir"
            />
          </div>
          <div class="col-3 col-md-3">
            <q-checkbox
              disable
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
export default {
  name: 'profileShow',
  props: ['profile'],
  data () {
    return {

    }
  },
  methods: {
    cancelar () {
      self.$emit('close')
    },
  }
}
</script>

<style>
</style>

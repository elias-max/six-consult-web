<template>
  <div>
    <q-select
      v-model="other"
      :options="options"
      :label="title"
      @filter="buscar"
      :min-characters="2"
      @input="selected"
      clearable
      use-input
      options-selected-class="text-deep-orange"
    >
      <template v-slot:option="scope">
        <q-item
          v-bind="scope.itemProps"
          v-on="scope.itemEvents"
        >
          <q-item-section>
            <q-item-label v-html="scope.opt.label"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-dialog
      persistent
      transition-show="scale"
      v-model="newProfile"
    >
      <profile-form
        @close="atualiza()"
        :profile="newObject"
      />
    </q-dialog>
  </div>
</template>

<script>
import profileForm from "./Form"

export default {
  props: ["title", "object"],
  components: {
    profileForm
  },
  name: "profile-select",
  data: () => {
    return {
      newProfile: false,
      other: {},
      convertido: {},
      options: [],
      newObject: {
        name: ""
      }
    };
  },
  created () {
    if (this.object.name) {
      this.other = { label: this.object.name, value: this.object.id };
    } else {
      this.other = { label: "", value: 0 };
    }
  },
  watch: {
    // sempre que a pergunta mudar, essa função será executada
    other: function (newQuestion, oldQuestion) {
      if (newQuestion == null) {
        this.$emit("selected", null);
        this.$emit("selected", {});
      }
    }
  },
  methods: {
    atualiza () {
      this.newProfile = false
      this.newObject = {}
    },
    clean () {
      this.newObject = null
      this.newObject = {}
    },
    selected (item) {
      this.convertido = { label: item.name, value: item.id };
      let self = this;
      this.$axios
        .get("/Profile/" + item.value)
        .then(function (response) {
          self.$emit("selected", response.data);
        })
        .catch(function (err) {
          self.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "error_outline",
            message:
              "Ocorreu um erro ao acessar o serviço : " +
              JSON.stringify(err.response.data.Detailed)
          });
        });
    },
    buscar (val, update, abort) {
      console.log('opa')
      this.$axios
        .get("/Profile?filter=" + val + "&page=" + 1 + "&pageSize=" + 10)
        .then(response => {
          this.options = response.data.items.map(e => {
            console.log('Dentro')
            return {
              label: e.name,
              value: e.id
            };
          });
          this.options.sort(function (a, b) {
            return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
          });
          update(() => { });
        })
        .catch(e => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Erro ao carregar os dados - perfil " + e,
            icon: "report_problem"
          });
        });
    }
  }
};
</script>
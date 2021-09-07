<template>
  <v-ace-editor
    v-model:value="content"
    :lang="lang"
    @init="editorInit"
    theme="dracula"
    style="min-height:100px; min-width: 100%;"
    :printMargin="false"
    :options="options"
  />

</template>

<script>
import { reactive, toRefs } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-emmet'
export default {
  components: {
    VAceEditor
  },
  props: {
    lang: {
      type: String,
      default: 'javascript'
    }
  },
  data () {
    return {
      options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        copyWithEmptySelection: true,
        enableMultiselect: true,
        enableEmmet: true
      }
    }
  },
  setup () {
    const data = reactive({
      content: ''
    })
    const editorInit = () => {
    }

    return {
      ...toRefs(data),
      editorInit
    }
  }
}
</script>

<style>
</style>

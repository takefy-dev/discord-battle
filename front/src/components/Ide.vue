<template>
  <v-ace-editor
    v-model:value="content"
    :lang="lang"
    @init="editorInit"
    theme="dracula"
    style="width: 100%"
    :printMargin="false"
    :options="options"
  />

</template>

<script>
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-emmet'
import 'ace-builds/webpack-resolver'
import { reactive, toRefs } from 'vue'

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
  watch: {
    content (newValue) {
      this.$emit('new-content', newValue)
    }
  },
  created () {
    this.content = this.$t('ide.default')
  },
  setup () {
    const data = reactive({
      content: ''
    })
    const editorInit = () => {
    }
    return {
      editorInit,
      ...toRefs(data)
    }
  }
}
</script>

<style>
</style>

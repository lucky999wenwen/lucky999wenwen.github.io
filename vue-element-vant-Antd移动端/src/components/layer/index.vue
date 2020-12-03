<template>
  <el-dialog
    v-el-drag-dialog
    append-to-body
    :title="layer.title"
    :visible.sync="layer.show"
    :fullscreen="layer.fullscreen"
    :modal="true"
    :width="width"
    :top="top"
    :close-on-click-modal="false"
    @close="CloseDialog"
  >
    <slot></slot>
    <div class="submit" v-if="layer.showButtons">
      <el-button type="primary" @click="onSubmit">{{ trueLabel }}</el-button>
      <el-button @click="layer.show = false">{{ falseLabel }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
  export default {
    components: {

    },
    directives: { elDragDialog },
    props: {
      'layer': {
        type: Object,
        default: () => {
          return {
            show: false,
            title: '我是一个标题',
            showButtons: false,
            fullscreen: false,
            trueLabel: '确认',
            falseLabel: '取消'
          }
        }
      },
      'width': {
        type: String,
        default: '600px'
      },
      'top': {
        type: String,
        default: '6vh'
      },
      'trueLabel': {
        type: String,
        default: '确认'
      },
      'falseLabel': {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      // 作者：罗茜
      // 时间：2019年9月7日11:12:40
      // 作用：弹窗提交事件触发
      onSubmit(){
        this.$emit('submit',this.layer.title)
      },
      CloseDialog(){
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="" lang="scss">
  /deep/ .el-dialog__header{
    padding: 15px 20px;
  }
  .submit{
    text-align: center;
    margin-top: 10px;
  }
  /deep/.is-fullscreen{
    display: flex;
    flex-direction: column;
    .el-dialog__body{
      flex: 1;
    }
  }
</style>

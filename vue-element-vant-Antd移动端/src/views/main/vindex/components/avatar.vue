<template>
  <el-dialog :title="title" :visible.sync="layer.show" append-to-body>
    <div class="cropper-content">
      <div class="cropper" :style="{ height: autoCropHeight + 'px' }">
        <vueCropper
          ref="cropper"
          :img="layer.img"
          :outputSize="outputSize"
          :outputType="layer.outputType"
          :canScale="canScale"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
        ></vueCropper>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="
          layer.show = false;
          layer.loading = false;
        "
        >取 消</el-button
      >
      <el-button type="primary" @click="finish" :loading="layer.loading"
        >确认</el-button
      >

      <el-button size="mini" type="primary" plain @click="rotateLeft"
        >↺</el-button
      >
      <el-button size="mini" type="primary" plain @click="rotateRight"
        >↻</el-button
      >
    </div>
    <!-- <div class="preview-box">
      <div
        class="preview"
        :class="{ circle: type === 1 }"
        v-if="previews.h > 0"
      >
        <div :style="previewStyle">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </div>
    </div> -->
  </el-dialog>
</template>

<script>
export default {
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          loading: false,
          outputType: "jpeg",
        };
      },
    },
    // 裁剪生成图片的质量
    outputSize: {
      type: Number,
      default: () => {
        return 0.8;
      },
    },
    // 图片是否允许滚轮缩放
    canScale: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 截图框的宽高比例
    fixedNumber: {
      type: Array,
      default: () => {
        return [1, 1];
      },
    },
    // 默认生成截图框高度
    autoCropHeight: {
      type: Number,
      default: () => {
        return 300;
      },
    },
    //标题
    title: {
      type: String,
      default: () => {
        return "图片裁剪";
      },
    },
  },
  data() {
    return {
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        autoCrop: true, // 是否默认生成截图框
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
       previews: {},
         n:1,
      previewStyle: {},
    };
  },
  methods: {
    //向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        // var fileName = "goods" + this.fileinfo.uid;
        this.layer.loading = true;
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (e) => {
          //裁剪成功以后返回bas64
          this.$emit("cutImageSucess", e.target.result);
        };
      });
    },
    // 实时预览函数
    realTime(data) {
      const previews = data;
      this.previewStyle = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 200 / previews.w,
      };
      this.previews = data;
    },
  },
};
</script>

<style lang="scss" scope>
.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
    text-align: center;
  }
}
.preview {
  background: #cccccc;
  border: 2px solid #797979;
  overflow: hidden;
}
.preview.circle {
  border-radius: 50%;
}
</style>

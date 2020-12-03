<template>
  <div>
    个人中心
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadImg"
    >
      <img v-if="logo" :src="logo" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <avatar :layer="imageCutLayer" @cutImageSucess="cutImageSucess" />
  </div>
</template>

<script>
import avatar from "./components/avatar";
export default {
  components: {
    avatar,
  },
  data() {
    return {
      logo: "",
      imageCutLayer: {
        show: false,
      },
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        "image/JPEG" ||
        "image/jpg" ||
        "image/JPG" ||
        "image/png" ||
        "image/PNG";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传图标只能是 jpeg、jpg、png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图标图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    uploadImg(parms) {
      const formdata = new FormData();
      formdata.append("file", parms.file);
      const reader = new FileReader();
      reader.readAsDataURL(parms.file);
      reader.addEventListener("load", () => {
        let type = parms.file.type.split("/");
        this.imageCutLayer = {
          show: true,
          img: reader.result,
          outputType: type[1],
        };
      });
    },
    cutImageSucess(bas64Data) {},
  },
};
</script>

<style></style>

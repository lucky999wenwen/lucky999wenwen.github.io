<template>
<div>
    <div>用户名:<input type="text" v-model.trim="userName" /></div>
    <div>密码:<input type="password" v-model.trim="password" /></div>
    <button @click="toLogin">登录</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            userName: "",
            password: "",
        };
    },
    watch: {},
    methods: {
        toLogin() {
            // console.log('登录', this.userName, this.password)
            let userName1 = this.$getRsaCode(this.userName);
            let password2 = this.$getRsaCode(this.password);
            let self = this
            this.$axios({
                    url: self.$store.state.http + "/jeesite/f/app/login",
                    method: "post",
                    data: {
                        username: userName1,
                        password: password2,
                        appClientId: "",
                    },
                })
                .then((reponse) => {
                    console.log(reponse);
                })
        },
    },
};
</script>

<style></style>

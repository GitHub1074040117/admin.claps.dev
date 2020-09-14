<template>
    <div style="min-height: 99vh; background-image: url('https://picsum.photos/1920/1080');">
        <v-card class="mx-auto" max-width="500" style="position: relative; top: 10px;">
            <template>
                <v-container fluid>
                    <v-row>
                        <v-col
                                :cols="12"
                        >
                            <v-card @click="viewTrans">
                                <v-img
                                        :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                >
                                    <v-card-title v-text="'Transactions & transfers'"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-card-text class="text--primary">
                                        <div>Show recent bills of each project, you can learn which project is favoured most by others.</div>
                                    </v-card-text>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col
                                :cols="6"
                        >
                            <v-card @click="manageProject">
                                <v-img
                                        :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                >
                                    <v-card-title v-text="'Manage Projects'"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-card-text class="text--primary">
                                        <div>Checking project members, add new projects or delete projects.</div>
                                    </v-card-text>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col
                                :cols="6"
                        >
                            <v-card @click="manageAdmin">
                                <v-img
                                        :src="'https://cdn.vuetifyjs.com/images/cards/plane.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                >
                                    <v-card-title v-text="'Manage Admins'"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-card-text class="text--primary">
                                        <div>super administrator has all authority including delete other administrator.</div>
                                    </v-card-text>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </v-card>

        <!--<div class="panel-middle">
            <div class="panel-middle-vertical">
                <button type="button" class="button-enter" @click="manageProject"><span class="fa fa-bar-chart"></span>查看项目列表</button>
                <div class="panel-middle-lower-inner">
                    <p>Checking project members, add new projects or delete projects.</p>
                </div>
            </div>

            <div class="panel-middle-vertical">
                <button type="button" class="button-enter" @click="viewTrans"><span class="fa fa-bank"></span>查看捐赠流水</button>
                <div class="panel-middle-lower-inner">
                    <p>Show recent bills of each project, you can learn which project is favoured most by others.</p>
                </div>
            </div>
            <div class="panel-middle-vertical">
                <button type="button" class="button-enter" @click="manageAdmin"><span class="fa fa-address-book"></span>管理用户界面</button>
                <div class="panel-middle-lower-inner">
                    <p>Common administrator has limited authority, while super administrator has all authority including delete other administrator.</p>
                </div>
            </div>

        </div>-->
    </div>
</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                //active: false,
            }
        },
        // 在vuex中获取状态
        computed: {
            userInfo() {
                return this.$store.state.userModule.userInfo;
            },
        },
        mounted: function() {
            this.stopAnimation();
        },
        methods: {
            // 登出
            logout() {
                // 跳转登录页
                this.$router.replace({ name: 'login' });
                // 清除用户信息
                this.$store.dispatch('userModule/logout').then(() => {
                }).catch((err) => {
                    console.log("清除用户缓存失败，错误信息：", err);
                });
            },
            // 查看管理员列表
            manageAdmin() {
                // 跳转
                this.$router.push({ name: 'admin' });
            },
            // 查看项目列表
            manageProject() {
                this.$router.push({ name: 'project' });
            },
            // 查看捐赠流水
            viewTrans() {
                this.$router.push({ name: 'trans' });
            },
            // 停止动画
            stopAnimation() {
                const linear = document.getElementById("progress-linear");
                linear.style.visibility="hidden";
            },
            // 装载用户信息
            /*loadUserInfo() {
                let name = document.getElementById("userName");
                let avatar = document.getElementById("userAvatar");
                name.innerHTML = this.userInfo.name;
                avatar.setAttribute("src", this.userInfo.avatar_url);
            },*/
        },
    };
</script>

<style scoped>
    @import "../../assets/css/main.css";
</style>

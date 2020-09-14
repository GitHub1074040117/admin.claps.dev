<template>
    <v-card style="max-width: 80vw; margin: 40px auto" onload="updateAdminTable()">
        <v-list three-line>
            <v-list-item
                    v-for="item in Admins"
                    :key="item.id"
            >
                <v-list-item-avatar>
                    <v-img :src="item.avatar_url"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="item.name">
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="item.account + ' / ' + item.role"></v-list-item-subtitle>
                </v-list-item-content>
                <v-btn
                        color="red"
                        text
                        dark
                        @click="deleteAdmin"
                >
                    DELETE
                </v-btn>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    import adminService from "../../service/adminService";

    export default {
        name: "Admin",
        data() {
            return {
                Admins: [{
                    id: "",
                    name: "",
                    account: "",
                    role: "",
                    avatar_url: "",
                }],
            };
        },
        mounted: function() {
            this.updateAdminTable();
        },
        methods: {
            // 进入页面更新表单
            updateAdminTable() {
                adminService.getAdminTable().then((res) => {
                    this.Admins = res.data.data.Admins;
                }).catch((err) => {
                    alert("获取表单时出错了：" + err);
                });
            },

            // 删除一个管理员，同时更新数据库
            deleteAdmin(event) {
                let r = confirm("确定要删除吗？");
                if (!r) return;
                // 在html中删除一行记录
                const row = event.currentTarget.parentNode;
                // 获取要删除的账号
                const account = event.currentTarget.id;
                adminService.deleteAdmin({account}).then((res) => {
                    if (res.data.code === 200) {
                        row.remove();
                    }
                    alert(res.data.msg);
                });
            },

            showConfirmDialog() {
                let r = confirm("确定要删除吗？");
                if (r === true) {
                    alert("y");
                } else {
                    alert("n");
                }
            },

            // 添加一个管理员
            addAdmin() {
                this.$router.push({ name: 'admin/item' });
            },
        },
    };
</script>

<style scoped>
    @import "../../assets/css/admin/admin.css";
    @import "../../assets/css/table.css";
</style>

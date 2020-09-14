<template>
    <div>
        <div class="panel-item-main">
            <div class="legend-item">Add A New Admin</div>
            <div class="panel-item-inner">
                <p>Admin Name</p>
                <label class="input">
                    <input type="text" placeholder="Admin Name" id="adminName" />
                </label>
                <p>Github Account</p>
                <div class="panel-item-text">Admin account only supports github account.</div>
                <label class="input">
                    <input placeholder="Github Account" id="adminAccount" required />
                </label>

                <button class="submit" @click="addNewAdmin()">Submit</button>

            </div>
        </div>
    </div>
</template>

<script>
    import adminService from "../../../service/adminService";

    export default {
        name: "Item",
        data() {
            return {
                AdminOpe: {
                    name: "",
                    account: "",
                    role: "",
                    avatarUrl: "",
                },
            };
        },
        methods: {
            addNewAdmin() {
                // 获取账号信息
                let account = document.getElementById("adminAccount");
                let name = document.getElementById("adminName");
                this.AdminOpe.account = account.value;
                this.AdminOpe.name = name.value;
                adminService.addNewAdmin(this.AdminOpe).then((res) => {
                    console.log(res.data);
                    alert(res.data.msg);
                    if (res.data.code === 200) {
                        this.$router.push({ name: 'admin' });
                    }
                }).catch((err) => {
                    alert("添加失败！" + err)
                });
            },
        },
    }
</script>

<style scoped>
    @import "../../../assets/css/item.css";
</style>

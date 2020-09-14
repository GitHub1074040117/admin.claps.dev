<template>
    <div onload="updateTransferDetail()">
        <div class="container-fd">
            <div class="panel-main-fd">
                <div class="panel-upper-fd">
                    <div class="panel-upper-left-fd">
                        <div class="user-icon-fd">
                            <img src="" alt="" id="userAvatar">
                        </div>
                        <div class="user-text-fd">
                            <div class="user-name-fd" id="userName">EditChen</div>
                            <div class="user-email-fd" id="userEmail">104@mail.com</div>
                            <div class="user-email-fd" id="mixinId">Mixin Id</div>
                        </div>
                    </div>
                    <div class="panel-upper-right-fd">
                        <table>
                            <caption class="small">Projects</caption>
                            <thead>
                            </thead>
                            <tbody id="tb-project">
                            <tr>
                                <!---->
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel-lower-fd">
                    <table>
                        <caption>Transfer Table</caption>
                        <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Asset Id</th>
                            <th>Date</th>
                            <th>Snapshot Id</th>
                            <th>Trace Id</th>
                        </tr>
                        </thead>
                        <tbody id="tb-transfer">
                        <tr>
                            <!---->
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import transService from "../../../service/transService";
    import userService from "../../../service/userService";
    import projectService from "../../../service/projectService";
    export default {
        name: "Transfer",
        data() {
            return {
                userName: "",
                Transfers: [{
                    user_id: "",
                    snapshot_id: "",
                    trace_id: "",
                    created_at: "",
                    asset_id: "",
                    amount: "",
                    memo: "",
                }],
                User: {
                    id: "",
                    name: "",
                    display_name: "",
                    email: "",
                    avatar_url: "",
                    mixin_id: "",
                },
                Projects: [{
                    id: "",
                    name: "",
                    description: "",
                    avatar_url: "",
                    total: "",
                }],
            };
        },
        mounted: function() {
            this.updateTransferDetail();
        },
        methods: {
            // 进入页面自动更新用户的提现记录
            updateTransferDetail() {
                // 获取用户id
                this.userName = this.$route.params.name;
                // 由用户id获取用户
                userService.getUserByName(this.userName).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.User = res.data.data.User;
                        this.loadUserInfo();
                    }
                }).catch((err) => {
                    alert("获取用户时出错！" + err);
                });
                // 由用户id获取项目
                projectService.getProjectByUserName(this.userName).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        console.log(res.data.data);
                        let count = res.data.data.Count;
                        for (let i = 0; i < count; i++) {
                            this.Projects[i] = res.data.data.Projects[i];
                            this.appendUserProjectRow(i);
                        }
                    }
                }).catch((err) => {
                    alert("更新用户项目列表时出错：" + err);
                });
                // 获取成员提现记录
                transService.getTransfers(this.userName).then((res) => {
                    console.log("获取的提现列表:", res.data.data);
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        let count = res.data.data.Count;
                        for (let i = 0; i < count; i++) {
                            this.Transfers[i] = res.data.data.Transfers[i];
                            this.appendTransferRow(i);
                        }
                    }
                }).catch((err) => {
                    alert("获取提现记录时出错！" + err);
                });
            },

            // 装载用户信息
            loadUserInfo() {
                let img = document.getElementById("userAvatar");
                let name = document.getElementById("userName");
                let email = document.getElementById("userEmail");
                let mixinId = document.getElementById("mixinId");

                img.setAttribute("src", this.User.avatar_url);
                name.innerHTML = "User Name: " + this.User.name;
                email.innerHTML = "User Email: " + this.User.email;
                mixinId.innerHTML = "Mixin ID: " + this.User.mixin_id;
            },

            // 创建一行用户项目
            appendUserProjectRow(i) {
                let tbody = document.getElementById("tb-project");
                let row = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let img = document.createElement("img");

                td2.innerHTML = this.Projects[i].name;
                img.setAttribute("class", "avatar");
                img.setAttribute("src", this.Projects[i].avatar_url);
                img.setAttribute("alt", "");

                tbody.appendChild(row);
                row.appendChild(td1);
                row.appendChild(td2);
                td1.appendChild(img);
            },

            // 创建一行提现记录
            appendTransferRow(i) {
                let tbody = document.getElementById("tb-transfer");
                let row = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                td1.innerHTML = "$" + this.Transfers[i].amount;
                td2.innerHTML = this.Transfers[i].asset_id;
                td3.innerHTML = this.Transfers[i].created_at;
                td4.innerHTML = this.Transfers[i].snapshot_id;
                td5.innerHTML = this.Transfers[i].trace_id;
                tbody.appendChild(row);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
            },
        },
    }
</script>

<style scoped>
    @import "../../../assets/css/trans/transfer-detail.css";
    @import "../../../assets/css/table.css";
</style>

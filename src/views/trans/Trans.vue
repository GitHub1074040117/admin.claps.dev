<template>
    <div class="container-trans">
        <div class="panel-main-trans" onload="updateTransTable()">
            <div class="panel-upper-trans">
                <div class="legend-trans">Transactions & Transfers</div>
            </div>
            <div class="panel-lower-trans">
                <div class="panel-tab-trans">
                    <div class="tab-section" >
                        <input type="radio" name="trans-tab" id="tab-1" checked>
                        <label for="tab-1">Transactions</label>
                        <article id="art1">
                            <form>
                                <div class="article-transact" id="transact">
                                    <!--
                                    <div class="box-project">
                                        <div class="box-project-upper">
                                            <img :src="Projects[0].avatarUrl" alt="">
                                            <div class="box-project-upper-text">
                                                <p><strong>Claps.dev</strong></p>
                                                <p>This is an open source project!</p>
                                            </div>
                                        </div>
                                        <div class="box-project-lower">
                                            <div class="project-total">$86.5</div>
                                            <div class"contributes">5</div>
                                        </div>
                                    </div>
                                    -->
                                </div>
                            </form>
                        </article>
                    </div>
                    <div class="tab-section" >
                        <input type="radio" name="trans-tab" id="tab-2">
                        <label for="tab-2">Transfers</label>
                        <article id="art2">
                            <form>
                                <div class="article-transfer" id="transfer">
                                    <!--
                                    <div class="box-user">
                                        <div class="box-user-upper">
                                            <img src="https://avatars0.githubusercontent.com/u/65876923?v=4" alt="">
                                            <div class="box-user-upper-text">
                                                <div class="user-name">EditChen</div>
                                                <div class="user-email">
                                                    fox@mail.com
                                                </div>
                                                <div class="user-email">
                                                    mixinId1010101
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-user-lower">
                                            <div class="transfer-total">$23</div>
                                            <div class="withdraws">908</div>
                                        </div>
                                    </div>-->
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import transService from "../../service/transService";
    export default {
        name: "Trans",
        data() {
            return {
                Count: 0,
                Transactions: [{
                    project_id: "",
                    name: "",
                    description: "",
                    avatar_url: "",
                    total: "",
                    donations: "",
                }],
                Transfers: [{
                    user_id: "",
                    name: "",
                    total: "",
                    avatar_url: "",
                    mixin_id: "",
                    withdraws: "",
                    email: "",
                }],
            }
        },
        mounted: function() {
            this.updateTransTable();
        },
        methods: {
            // 进入页面更新表单
            updateTransTable() {
                // 获取捐赠记录
                transService.getTransactTable().then((res) => {
                    let count = res.data.data.Count;
                    for (let i = 0; i < count; i++) {
                        this.Transactions[i] = res.data.data.Transactions[i];
                        this.appendProjectTransactRow(i);
                    }
                }).catch((err) => {
                    alert("捐赠流水表单更新时出错！" + err);
                });
                // 获取提现记录
                transService.getTransferTable().then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    }
                    let count = res.data.data.Count;
                    for (let i = 0; i < count; i++) {
                        this.Transfers[i] = res.data.data.Transfers[i];
                        this.appendUserTransferRow(i);
                    }
                }).catch((err) => {
                    alert("提现记录表单更新时出错：" + err);
                });
            },

            // 添加一行项目的受捐记录
            appendProjectTransactRow(i) {
                let content = document.getElementById("transact");
                let box = document.createElement("div");
                let pnlUp = document.createElement("div");
                let pnlLow = document.createElement("div");
                let img = document.createElement("img");
                let pName = document.createElement("span");
                let pDesc = document.createElement("p");
                let total = document.createElement("div");

                box.setAttribute("class", "box");
                box.setAttribute("id", i);
                // 添加监听器
                box.addEventListener("click", this.viewTransaction);
                pnlUp.setAttribute("class", "box-project-upper");
                pnlLow.setAttribute("class", "box-project-lower");
                total.setAttribute("class", "project-total");
                img.setAttribute("src", this.Transactions[i].avatar_url);
                pName.innerHTML = this.Transactions[i].name;
                pDesc.innerHTML = "Totally received " + this.Transactions[i].donations + " donations";
                total.innerHTML = "$" + this.Transactions[i].total;

                content.appendChild(box);
                box.appendChild(pnlUp);
                box.appendChild(pnlLow);
                pnlUp.appendChild(img);
                pnlUp.appendChild(pName);
                pnlUp.appendChild(pDesc);
                pnlLow.appendChild(total);
            },

            // 添加一行用户的提现记录
            appendUserTransferRow(i) {
                let content = document.getElementById("transfer");
                let box = document.createElement("div");
                let pnlUp = document.createElement("div");
                let pnlLow = document.createElement("div");
                let img = document.createElement("img");
                let pnlTxt = document.createElement("div");
                let name = document.createElement("div");
                let email_1 = document.createElement("div");
                let email_2 = document.createElement("div");
                let total = document.createElement("div");
                let withdraws = document.createElement("div");
                box.setAttribute("class", "box");
                box.setAttribute("id", i);
                // 添加监听器
                box.addEventListener("click", this.viewTransfer);
                pnlUp.setAttribute("class", "box-user-upper");
                pnlLow.setAttribute("class", "box-user-lower");
                img.setAttribute("src", this.Transfers[i].avatar_url);
                img.setAttribute("alt", "");
                pnlTxt.setAttribute("class", "box-user-upper-text");
                name.setAttribute("class", "user-name");
                email_1.setAttribute("class", "user-email");
                email_2.setAttribute("class", "user-email");
                total.setAttribute("class", "transfer-total");
                withdraws.setAttribute("class", "withdraws");
                name.innerHTML = this.Transfers[i].name;
                email_1.innerHTML = "Email: " + this.Transfers[i].email;
                email_2.innerHTML = "Mixin Id : " + this.Transfers[i].mixin_id;
                total.innerHTML = "$" + this.Transfers[i].total;
                withdraws.innerHTML = "Withdraws: " + this.Transfers[i].withdraws;

                content.appendChild(box);
                box.appendChild(pnlUp);
                box.appendChild(pnlLow);
                pnlUp.appendChild(img);
                pnlUp.appendChild(pnlTxt);
                pnlTxt.appendChild(name);
                pnlTxt.appendChild(email_1);
                pnlTxt.appendChild(email_2);
                pnlLow.appendChild(total);
                pnlLow.appendChild(withdraws);
            },

            // 进入用户提现详情界面
            viewTransfer(event) {
                const userName = this.Transfers[event.currentTarget.id].name;
                this.$router.push({ name: 'transfer', params: {'name': userName} });
            },

            // 进入项目详细流水界面
            viewTransaction(event) {
                const projectName = this.Transactions[event.currentTarget.id].name;
                this.$router.push({ name: 'transact', params: {'name': projectName} });
            },
        },
    }
</script>

<style scoped>
    @import "../../assets/css/project/project.css";
    @import "../../assets/css/trans/trans.css";
    @import "../../assets/css/trans/transact.css";
    @import "../../assets/css/trans/transfer.css";
    @import "../../assets/css/box.css";
</style>

<template>
    <div onload="updateTransDetail()">
        <div class="container-ad">
            <div class="panel-main-ad">
                <div class="panel-upper-ad">
                    <div class="panel-project-ad">
                        <h2>Project Transactions</h2>
                        <img src="" alt="" id="projectIcon">
                        <div class="panel-project-text-ad" id="ProjectText">
                            <p><strong id="projectName">Claps.dev</strong></p>
                            <p id="projectDesc">This is an open source project</p>
                        </div>
                    </div>
                    <div class="panel-amount-ad">
                        <div class="amount-number" id="total"></div>
                        <p id="donations"></p>
                    </div>
                </div>
                <div class="panel-lower-ad">
                    <table>
                        <caption>Transaction Table</caption>
                        <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Asset Id</th>
                            <th>Date</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                        </tr>
                        </thead>
                        <tbody id="tb-transact">
                        <tr>
                            <!---->
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!--
        <div class="panel-upper-pd">
            <h3 class="header-detail-right">Super Admin</h3>
            <h3 class="header-detail-right">Access Key</h3>
        </div>
        <div class="panel-detail-main">
            <div class="panel-detail-left">
                <div class="section-left">
                    <input type="radio" name="sections-detail" id="input-detail-left-3" checked />
                    <label for="input-detail-left-3" class="icon-sections-detail"><span class="fa fa-credit-card" aria-hidden="true"></span>项目钱包</label>
                    <article id="art1">
                        <form>
                            <div class="panel-detail-middle">
                                <div class="panel-pwallet-main">
                                    <div class="panel-pwallet-amount">
                                        <h2>Project Transactions</h2>
                                        <div class="panel-projectIcon">
                                            <img src="" alt="" id="projectIcon">
                                            <div class="panel-project-text" id="ProjectText">
                                                <p><strong id="projectName">Claps.dev</strong></p>
                                                <p id="projectDesc">This is an open source project</p>
                                            </div>
                                        </div>
                                        <h2 class="amount-number" id="total">Total $4.6</h2><p id="donations">Last update in 2020-03-04 9:00am</p>
                                    </div>
                                    <div class="panel-pwallet-income-history">
                                        <div class="panel-pwallet-history-title"><h2>Transactions List</h2></div>
                                        <div class="panel-pwallet-income-table">
                                            <div class="income-pwallet-table-title">
                                                <span class="income-pwallet-table-title-first">Amount</span>
                                                <span class="income-pwallet-table-title-item">Asset Id</span>
                                                <span class="income-pwallet-table-title-date">Date</span>
                                                <span class="income-pwallet-table-title-item">Total</span>
                                                <span class="income-pwallet-table-title-item">Sender</span>
                                            </div>
                                            <div class="income-pwallet-table-content" id="atc">
                                                <div class="income-pwallet-table-row">
                                                    <a class="income-pwallet-row-item-first">$2.4</a>
                                                    <a class="income-pwallet-row-item">BIC</a>
                                                    <a class="income-pwallet-row-date">2020-03-04</a>
                                                    <a class="income-pwallet-row-item">$10.2</a>
                                                    <a class="income-pwallet-row-item">Patron</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </article>
                </div>
                <div class="section-left">
                    <input type="radio" name="sections-detail" id="input-detail-left-4" />
                    <label for="input-detail-left-4" class="icon-sections-detail"><span class="fa fa-calculator" aria-hidden="true"></span>成员钱包</label>
                    <article id="art2">
                        <form>
                            <div class="panel-detail-middle">
                                <div class="panel-mwallet-main">
                                    <div class="panel-mwallet-income-history">
                                        <div class="panel-mwallet-history-title">
                                            <h2>Member Transfer List</h2>
                                        </div>
                                        <div class="panel-mwallet-income-table">
                                            <div class="income-mwallet-table-title">
                                                <span class="income-mwallet-table-title-first"></span>
                                                <span class="income-mwallet-table-title-item">Name</span>
                                                <span class="income-mwallet-table-title-item">Amount</span>
                                                <span class="income-mwallet-table-title-date">Date</span>
                                                <span class="income-mwallet-table-title-item">Asset Id</span>
                                            </div>
                                            <div class="income-mwallet-table-content" id="ftc">
                                                <div class="income-mwallet-table-row">
                                                    <a class="income-mwallet-row-item-first"><img src="" alt=""></a>
                                                    <a class="income-mwallet-row-item">John</a>
                                                    <a class="income-mwallet-row-item">$2.4</a>
                                                    <a class="income-mwallet-row-date">2020-03-05</a>
                                                    <a class="income-mwallet-row-item">BIC</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        </div>
        -->
    </div>
</template>

<script>
    import projectService from "../../../service/projectService";
    import transService from "../../../service/transService";
    export default {
        name: "Detail",
        data() {
            return {
                projectName: "",
                Transactions: [{
                    amount: "",
                    sender: "",
                    receiver: "",
                    created_at: "",
                    asset_id: "",
                }],
                Project: {
                    id: "",
                    name: "",
                    description: "",
                    avatar_url: "",
                    total: "",
                    donations: "",
                },
            };
        },
        mounted: function() {
            this.updateTransDetail();
        },
        methods: {
            // 进入页面自动更新项目流水
            updateTransDetail() {
                // 获取项目id
                this.projectName = this.$route.params.name;
                // 由项目id获取项目
                projectService.getProjectByName(this.projectName).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.Project = res.data.data.Project;
                        console.log("获取的项目信息：",this.Project);
                        this.loadProjectInfo();
                    }
                }).catch((err) => {
                    alert("获取项目时出错！" + err);
                });

                // 获取项目捐赠流水记录
                transService.getTransactions(this.projectName).then((res) => {
                    console.log("获取的流水列表:", res.data.data);
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        let count = res.data.data.Count;
                        for (let i = 0; i < count; i++) {
                            this.Transactions[i] = res.data.data.Transactions[i];

                            this.appendTransactRow(i);
                        }
                    }
                }).catch((err) => {
                    alert("获取捐赠流水时出错！" + err);
                });
            },

            // 装载项目信息
            loadProjectInfo() {
                let img = document.getElementById("projectIcon");
                let name = document.getElementById("projectName");
                let desc = document.getElementById("projectDesc");
                let total = document.getElementById("total");
                let donations = document.getElementById("donations");

                img.setAttribute("src", this.Project.avatar_url);
                name.innerHTML = this.Project.name;
                desc.innerHTML = this.Project.description;
                total.innerHTML = "Total $" + this.Project.total;
                donations.innerHTML = "Totally received " + this.Project.donations + " donations in last month";
            },

            // 创建一行捐赠记录
            appendTransactRow(i) {
                let tbody = document.getElementById("tb-transact");
                let row = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                td1.innerHTML = "$" + this.Transactions[i].amount;
                td2.innerHTML = this.Transactions[i].asset_id;
                td3.innerHTML = this.Transactions[i].created_at;
                td4.innerHTML = this.Transactions[i].sender;
                td5.innerHTML = this.Transactions[i].receiver;
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
    @import "../../../assets/css/trans/transact-detail.css";
    @import "../../../assets/css/table.css";
</style>

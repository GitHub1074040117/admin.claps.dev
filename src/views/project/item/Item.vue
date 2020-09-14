<template>
    <div>
        <div class="panel-item-main">
            <div class="legend-item">Add A New Project</div>
            <div class="panel-item-inner">
                <p>Project Name</p>
                <label class="input">
                    <input type="text" placeholder="Project Name" id="projectName" required />
                </label>
                <p>Project Description</p>
                <label class="input">
                    <input type="text" placeholder="Description" id="description" />
                </label>
                <p>Project Owner</p>
                <div class="panel-item-text">You are expected to add one owner firstly,
                    later you can add other members.
                </div>
                <label class="input">
                    <input type="email" placeholder="Owner Email" id="ownerAccount" required />
                </label>
                <p>Repository URL</p>
                <div class="panel-item-text">You are expected to add one repository firstly,
                    you can also add other repositories later.
                </div>
                <label class="input">
                    <input type="text" placeholder="Repository Url" id="repoUrl" required />
                </label>


                <p>Repository URL Type:</p>
                <div class="panel-radio">
                    <span class="radio-label">
                        <input type="radio" id="radio1" name="sections" value="GITHUB" checked/>
                        <label for="radio1"></label>
                        <span>GITHUB</span>
                    </span>
                    <span class="radio-label">
                        <input type="radio" id="radio2" name="sections" value="BITBUCKET"/>
                        <label for="radio2"></label>
                        <span>BITBUCKET</span>
                    </span>
                    <span class="radio-label">
                        <input type="radio" id="radio3" name="sections" value="GITLAB"/>
                        <label for="radio3"></label>
                        <span>GITLAB</span>
                    </span>
                    <span class="radio-label">
                        <input type="radio" id="radio4" name="sections" value="GIT"/>
                        <label for="radio4"></label>
                        <span>GIT</span>
                    </span>
                </div>

                <p>Select Distribution:</p>
                <div class="panel-radio">
                    <span class="radio-label">
                        <input type="radio" id="rdo1" name="sections-2" value="0" checked/>
                        <label for="rdo1"></label>
                        <span>PersperAlgorithm</span>
                    </span>
                    <span class="radio-label">
                        <input type="radio" id="rdo2" name="sections-2" value="1"/>
                        <label for="rdo2"></label>
                        <span>Commits</span>
                    </span>
                </div>
                <div class="panel-radio">
                    <span class="radio-label">
                        <input type="radio" id="rdo3" name="sections-2" value="2"/>
                        <label for="rdo3"></label>
                        <span>ChangedLines</span>
                    </span>
                    <span class="radio-label">
                        <input type="radio" id="rdo4" name="sections-2" value="3"/>
                        <label for="rdo4"></label>
                        <span>IdenticalAmount</span>
                    </span>
                </div>

                <button class="submit" @click="addNewProject" id="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import projectService from "../../../service/projectService";

    export default {
        name: "Item",

        data() {
            return {
                ProjectInfo: {
                    projectName: "",
                    description: "",
                    ownerEmail: "",
                    repoUrl: "",
                    repoType: "",
                    distribution: "",
                },
            };
        },

        methods: {
            // 添加项目
            addNewProject() {
                // 动画
                const linear = document.getElementById("progress-linear");
                linear.style.visibility="visible";
                // 设置按钮不可点击
                const button = document.getElementById('submit');
                button.setAttribute("disable", "true");

                let name = document.getElementById("projectName");
                let desc = document.getElementById("description");
                let account = document.getElementById("ownerAccount");
                let repoUrl = document.getElementById("repoUrl");
                let repoType = document.getElementsByName("sections");
                let distribution = document.getElementsByName("sections-2");
                this.ProjectInfo.projectName = name.value;
                this.ProjectInfo.description = desc.value;
                this.ProjectInfo.ownerEmail = account.value;
                this.ProjectInfo.repoUrl = repoUrl.value;
                for(let k in repoType) {
                    if(repoType[k].checked) {
                        this.ProjectInfo.repoType = repoType[k].value;
                    }
                }
                for(let k in distribution) {
                    if(distribution[k].checked) {
                        this.ProjectInfo.distribution = distribution[k].value;
                    }
                }

                projectService.sendNewProjectInfo(this.ProjectInfo).then((res) => {
                    linear.style.visibility="hidden";
                    alert(res.data.msg);
                    if (res.data.code === 200) {
                        this.$router.push({ name: 'project' });
                    }
                    // 恢复按钮
                    button.removeAttribute("disable");
                }).catch((err) => {
                    linear.style.visibility="hidden";
                    alert("出错了！错误信息 ：" + err);
                    button.removeAttribute("disable");
                });

            },
        },
    }
</script>

<style scoped>
    @import "../../../assets/css/item.css";
</style>

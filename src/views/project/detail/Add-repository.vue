<template>
    <div>
        <div class="panel-item-main">
            <div class="legend-item">Add A New Repository</div>
            <div class="panel-item-inner">
                <form>
                    <p>Repository URL</p>
                    <label class="input">
                        <input type="text" placeholder="Repository Url" id="slug" required />
                    </label>
                    <p>Project Description</p>
                    <label class="input">
                        <input type="text" placeholder="Description (optional)" id="description" />
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
                </form>
                <button class="submit" @click="addNewProject">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import projectService from "../../../service/projectService";

    export default {

        name: "Add-repository",
        data() {
            return {
                Repo: {
                    projectId: "",
                    description: "",
                    slug: "",
                    name: "",
                    type: "",
                },
            };
        },
        methods : {
            addNewProject() {

                let slug = document.getElementById("slug");
                let description = document.getElementById("description");
                let type = document.getElementsByName("sections");
                for(let k in type) {
                    if(type[k].checked) {
                        this.Repo.type = type[k].value;
                        break;
                    }
                }
                this.Repo.projectId = this.$route.query;
                this.Repo.slug = slug.value;
                this.Repo.description = description.value;
                projectService.addProjectRepo(this.Repo).then((res) => {
                    alert(res.data.msg);
                    if (res.data.code === 200) {
                        this.$router.go(-1);
                    }
                }).catch((err) => {
                    alert("添加项目仓库时出错！" + err);
                });

            },
        },
    }
</script>

<style scoped>
    @import "../../../assets/css/item.css";
</style>

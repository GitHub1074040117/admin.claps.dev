<template>
    <div class="container-pd" onload="updateProjectDetail()">
        <!-- Navigation Bar -->
        <template>
            <div>
                <v-app-bar
                        color="darkgray"
                        src="https://picsum.photos/1920/1080?random"
                        dark
                >
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>
                        <div v-text="this.projectName"></div>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-menu
                            bottom
                            origin="center center"
                            transition="scale-transition"
                            class="float-right"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="green"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                Manage Project
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click.stop="addNewRepository">
                                <v-list-item-content>
                                    <v-list-item-title>Add Repository</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click.stop="addNewMember">
                                <v-list-item-content>
                                    <v-list-item-title>Add Member</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click.stop="deleteProject">
                                <v-list-item-content>
                                    <v-list-item-title class="red--text">Delete Project</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                        </v-list>
                    </v-menu>
                </v-app-bar>
            </div>
        </template>
        <br>
        <div style="max-width: 450px; min-height: 700px; display: inline-block; margin: 5px">
            <!-- Member List -->
            <template>
                <v-card
                        min-width="450"
                        class="mx-auto float-left"
                        v-if="showMembers"

                >
                    <v-list three-line>
                        <template v-for="(member, index) in Members">
                            <v-subheader
                                    v-if="index === 0"
                                    :key="index"
                                    v-text="'MEMBERS'"
                            ></v-subheader>

                            <v-divider
                                    v-if="index !== 0"
                                    :key="index"
                                    :inset="true"
                            ></v-divider>
                            <v-list-item

                                    :key="index"
                            >
                                <v-list-item-avatar>
                                    <v-img :src="member.avatar_url"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-html="member.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="member.email"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-html="member.mixin_id"></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-menu
                                        bottom
                                        origin="center center"
                                        transition="scale-transition"
                                        class="float-right"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                color="green"
                                                text
                                                dark
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            MORE
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click.stop="deleteMember" :id="member.id">
                                            <v-list-item-content>
                                                <v-list-item-title class="red--text">Delete</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                    </v-list>
                                </v-menu>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </template>

            <!-- Repo Table -->
            <template>
                <v-card
                        min-width="450"
                        class="mx-auto float-left"
                        v-if="showRepos"
                        style="margin-top: 35px;"
                >
                    <v-list three-line>
                        <template v-for="(repo, index) in Repos">
                            <v-subheader
                                    v-if="index === 0"
                                    :key="index"
                                    v-text="'REPOSITORY'"
                            ></v-subheader>

                            <v-divider
                                    v-if="index !== 0"
                                    :key="index"
                                    :inset="true"
                            ></v-divider>
                            <v-list-item
                                    :key="index"
                            >
                                <!--<v-list-item-avatar v-if="this.Project.avatar_url">
                                    <v-img :src="this.Project.avatar_url"></v-img>
                                </v-list-item-avatar>-->
                                <v-list-item-content>
                                    <v-list-item-title class="blue--text" v-html="repo.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="repo.slug"></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-menu
                                        bottom
                                        origin="center center"
                                        transition="scale-transition"
                                        class="float-right"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                color="green"
                                                text
                                                dark
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            MORE
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click.stop="" :id="repo.id">
                                            <v-list-item-content>
                                                <v-list-item-title>View</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item @click.stop="deleteRepository" :id="repo.id">
                                            <v-list-item-content>
                                                <v-list-item-title class="red--text">Delete</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </template>
        </div>

    </div>
</template>

<script>
    import projectService from "../../../service/projectService";

    export default {
        name: "Detail",
        data() {
            return {
                showMembers: false,
                showRepos: false,
                isActive: false,
                projectId: 0,
                projectName: '',
                Members: [
                    {
                        id: "",
                        name: "",
                        display_name: "",
                        email: "",
                        avatar_url: "",
                        mixin_id: "",
                    },
                ],
                Repos: [{
                    id: "",
                    type: "",
                    slug: "",
                    name: "",
                }],
                Project: {
                    id: "",
                    name: "",
                    description: "",
                    avatar_url: "",
                    total: "",
                },
            };
        },
        mounted: function() {
            this.updateProjectDetail();
        },
        methods: {
            // 进入页面自动更新项目的成员、仓库和钱包
            updateProjectDetail() {
                // 获取项目id
                this.projectId = this.$route.query.projectId;
                this.projectName = this.$route.params.name;
                // 由项目id获取项目
                projectService.getProjectByName(this.projectName).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.Project = res.data.data.Project;
                        console.log("获取的项目信息：",this.Project);
                    }
                }).catch((err) => {
                    alert("获取项目时出错！" + err);
                });

                // 获取项目成员表单
                projectService.getProjectMember(this.projectName).then((res) => {
                    console.log("获取的成员列表:", res.data.data);
                    if (res.data.code !== 200) {
                        return null;
                    } else {
                        this.Members = res.data.data.Members;
                        this.showMembers = true;
                    }
                }).catch((err) => {
                    alert("获取成员表单时出错！" + err);
                });

                // 获取项目仓库表单
                projectService.getProjectRepo(this.projectName).then((res) => {
                    console.log("获取的项目仓库信息：", res.data.data);
                    if (res.data.code !== 200) {
                        return null;
                    } else {
                        this.Repos = res.data.data.Repos;
                        this.showRepos = true;
                    }
                }).catch((err) => {
                    alert("获取仓库表单时出错！" + err);
                });
            },

            // 装载项目信息
            loadProjectInfo() {
                let img = document.getElementById("projectIcon");
                let name = document.getElementById("projectName");
                let desc = document.getElementById("projectDesc");
                img.setAttribute("src", this.Project.avatar_url);
                name.innerHTML = this.Project.name;
                desc.innerHTML = this.Project.description;
            },

            // 删除当前项目
            deleteProject() {
                // 确认提示
                let r = confirm("确定要删除吗？");
                if (!r) return;

                const projectName = this.projectName;
                // 由项目id删除项目
                projectService.deleteProject(projectName).then((res) => {
                    alert(res.data.msg);
                    if (res.data.code === 200) {
                        this.$router.replace({ name: 'project' })
                    }
                }).catch((err) => {
                    alert("删除项目时出错！" + err);
                });
            },

            // 添加成员
            addNewMember() {
                this.$router.push({ name: 'addMember', params: {'name': this.projectName} });
            },

            // 删除成员
            deleteMember(event) {
                // 确认提示
                let r = confirm("确定要删除吗？");
                if (!r) return;

                // 获取项目id
                const projectName = this.projectName;
                // 获取成员id
                const userId = event.currentTarget.id;
                projectService.deleteProjectMember(projectName, userId).then((res) => {
                    alert(res.data.msg);
                    if (res.data.code === 200) {
                        location.reload();
                    }
                }).catch((err) => {
                    alert("删除成员时出错！" + err)
                });
            },

            // 添加项目
            addNewRepository() {
                this.$router.push({ name: 'addRepository', params: {'name': this.projectName} });
            },

            // 删除仓库
            deleteRepository(event) {
                // 确认提示
                let r = confirm("确定要删除吗？");
                if (!r) return;

                // 获取项目id
                const repoId = event.currentTarget.id;
                projectService.deleteProjectRepo(repoId).then((res) => {
                    alert(res.data.msg);
                    if (res.data.code === 200) {
                        location.reload();
                    }
                }).catch((err) => {
                    alert("删除仓库时出错！" + err)
                });
            },

        },
    }
</script>

<style scoped>
    @import "../../../assets/css/project/project-detail.css";
    @import "../../../assets/css/table.css";
</style>

<template>
    <div class="container-project">
        <div class="panel-main-project" onload="updateProjectTable()">
            <v-card>
                <!-- project header with search -->
                <v-card-title>
                    PROJECTS
                    <v-btn
                            color="green"
                            text
                            @click="addNewProject"
                    >
                        NEW PROJECT
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                            id="project_search"
                            type="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="panel-content-project" id="tc">
                    <!-- Project Info Card -->
                    <div  v-if="showCard">
                        <v-card
                                class="mx-auto float-left ml-5 mr-5 mt-5 mb-5 list"
                                max-width="255"
                                v-for="project in Projects"
                                :key="project.id"
                                v-cloak
                                :data-project="project.name"
                        >
                            <v-img
                                    src="https://picsum.photos/1920/1080?random"
                                    height="150px"
                            ></v-img>
                            <v-list three-line>
                                <v-list-item>
                                    <v-list-item-avatar color="green darken-1">
                                        <img v-if="project.avatar_url" :src="project.avatar_url" alt="">
                                        <span v-if="!project.avatar_url" class="white--text headline">{{project.name.charAt(0).toUpperCase()}}</span>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <div v-text="project.name"></div>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <div v-text="project.description"></div>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <!-- Project Menu -->
                            <v-card-actions>
                                <v-btn
                                        color="green"
                                        text
                                        @click="editProject"
                                        :id="project.name"
                                >
                                    Manage Project
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                        icon
                                        @click="show = !show"
                                >
                                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <v-expand-transition>
                                <div v-show="show">
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <div v-text="project.description"></div>
                                        <div class="blue--text" v-text="'$' + project.total"></div>
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </div>
                </div>
            </v-card>
        </div>

    </div>
</template>

<script>
    import projectService from "../../service/projectService";

    export default {
        name: "Project",
        data() {
            return {
                search: '',
                showCard: false,
                show: false,
                Count: 0,
                Projects: [{
                    id: "",
                    name: "",
                    description: "",
                    avatar_url: "",
                    total: "",
                }],
            }
        },
        mounted: function() {
            this.updateProjectTable();
        },

        methods: {
            // 进入页面更新项目表单
            updateProjectTable() {
                projectService.getProjectTable().then((res) => {
                    this.Projects = res.data.data.Projects;
                    this.showCard = true;
                }).catch((err) => {
                    alert("表单更新时出错！" + err);
                });

                // 配置input监听器, 实现搜索功能
                const s = document.createElement('style');
                const input = document.getElementById("project_search");
                document.head.appendChild(s);
                input.addEventListener('input', function () {
                    if(this.value !== '') {
                        s.innerHTML = '.list:not([data-project*=' + this.value + ']){display:none}';
                    } else {
                        s.innerHTML = '';
                    }
                })
            },

            // 添加新项目
            addNewProject() {
                this.$router.push({ name: 'addProject' });
            },

            // 进入项目详细界面
            editProject(event) {
                //const i = event.currentTarget.id;
                const projectName = event.currentTarget.id;
                // 携带项目参数
                this.$router.push({ name: 'project/detail', params: {'name': projectName}});
            },
        },

    }
</script>

<style scoped>
    @import "../../assets/css/project/project.css";
    @import "../../assets/css/box.css";
</style>

<template>
    <div>
        <div class="panel-item-main" style="background-color: #eeeeee">
            <div class="legend-item">Add A New Member</div>
            <div style="width: 100%">
                <div class="panel-tab">
                    <div class="tab-section">
                        <input type="radio" name="input-tab" id="tab-1" checked>
                        <label for="tab-1" name="label-tab">Email</label>
                        <article id="art1">
                            <form>
                                <p>Member Email</p>
                                <label class="input">
                                    <input type="text" placeholder="Member Email" id="email" required />
                                </label>
                                <div class="panel-item-text">
                                    The member you add must has already signed up for mixin app.
                                </div>
                            </form>
                            <button class="submit" @click="addMember">Submit</button>
                        </article>
                    </div>
                    <div class="tab-section">
                        <input type="radio" name="input-tab" id="tab-2">
                        <label for="tab-2" name="label-tab">Mixin ID</label>
                        <article id="art2">
                            <form>
                                <p>Member Mixin ID</p>
                                <label class="input">
                                    <input type="text" placeholder="Mixin ID" id="mixinId" required />
                                </label>
                                <div class="panel-item-text">
                                    The member you add must has already signed up for mixin app.
                                </div>
                            </form>
                            <button class="submit" @click="addMember">Submit</button>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import projectService from "../../../service/projectService";

    export default {
        name: "Add-member",
        methods : {
            addMember() {
                let input1 = document.getElementById("tab-1");
                let input2 = document.getElementById("tab-2");
                const projectName = this.$route.params.name;
                // 按邮箱添加
                if (input1.checked) {
                    const memberEmail = document.getElementById("email").value;
                    if (memberEmail === "") {
                        alert("获取到的邮箱空！");
                        return null;
                    }
                    projectService.addMemberByEmail(projectName, memberEmail).then((res) => {
                        console.log(res);
                        alert(res.data.msg);
                        if (res.data.code === 200) {
                            this.$router.go(-1);
                        }
                    }).catch((err) => {
                        alert("添加成员时出错：" + err);
                    });
                }
                // 按mixin Id添加
                if (input2.checked) {
                    const mixinId = document.getElementById("mixinId").value;
                    if (mixinId === "") {
                        alert("获取到的mixinId为空！");
                        return null;
                    }
                    projectService.addMemberByMixinId(projectName, mixinId).then((res) => {

                        alert(res.data.msg);
                        if (res.data.code === 200) {
                            this.$router.go(-1);
                        }
                    }).catch((err) => {
                        alert("添加成员时出错：" + err);
                    });
                }
            },
        },
    }
</script>

<style scoped>
    @import "../../../assets/css/item.css";
    @import "../../../assets/css/tab.css";
</style>

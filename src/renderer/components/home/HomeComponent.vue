<template>
    <div style="padding: 8px">
        <div>
            <el-table :data="videoInfoList">
                <el-table-column prop="name" label="名称"/>
                <el-table-column prop="path" label="地址"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handlePlay(scope.$index, scope.row)">播放
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="添加直播信息" :visible.sync="addDialogShow">
            <el-form :model="videoInfo" :rules="addInputRules" ref="addDialogInput">
                <el-form-item label="直播名字" prop="name">
                    <el-input v-model="videoInfo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="直播地址" prop="path">
                    <el-input v-model="videoInfo.path" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogCancel">取 消</el-button>
                <el-button type="primary" @click="addData">确 定</el-button>
            </div>
        </el-dialog>

        <el-button style="position: fixed;bottom: 40px;right: 40px" icon="el-icon-plus" circle
                   @click="addDialogShow = true"></el-button>
    </div>
</template>

<script>
    import {remote} from 'electron'

    export default {
        name: "HomeComponent",
        data() {
            return {
                videoInfo: {
                    name: '',
                    path: ''
                },
                addDialogShow: false,
                addInputRules: {
                    name: [{required: true, message: '请输入直播名称', trigger: 'blur'}],
                    path: [{required: true, message: '请输入直播名称', trigger: 'blur'}],
                },
                videoInfoList: []
            }
        },
        methods: {
            addData() {
                let self = this;
                this.$refs.addDialogInput.validate((valid) => {
                    if (valid) {
                        this.addDialogShow = false;
                        this.$db.insert(this.videoInfo, function (err, newDoc) {
                            if (err)
                                return;
                            console.log("insert", newDoc._id);
                            self.videoInfo.name = '';
                            self.videoInfo.path = '';
                            self.getVideoInfoList()
                        })
                    } else {
                        return false
                    }
                })

            },
            addDialogCancel() {
                this.$refs.addDialogInput.resetFields();
                this.addDialogShow = false

            },
            handlePlay(index, row) {
                this.$router.push({name: 'play2', query: {name: row.name, path: row.path}})
            },
            handleDelete(index, row) {
                let self = this;
                this.$db.remove({_id: row._id}, {}, function (err, numRemoved) {
                    if (err)
                        return;
                    self.getVideoInfoList()
                })
            }
            ,
            getVideoInfoList() {
                let self = this;
                this.$db.find({}, function (err, docs) {
                    self.videoInfoList = docs
                });
                console.log("db", remote.app.getPath('userData'))
                this.$notify({
                    title: 'db位置',
                    message: remote.app.getPath('userData'),
                    duration: 0
                });
            }

        },
        created() {
            this.getVideoInfoList()
        }
    }
</script>

<style scoped>

</style>
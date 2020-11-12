<template>

    <div id="eventManagementPage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>赛事组别及价格管理</label>
                </el-col>
                <el-col :span="1" style="position: relative;float: right;    margin-top: 10px;    margin-right: 4%;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="addAndup"><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div class="contentPage">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="tabledata" :min-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="60px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <el-table-column prop="competitionFullName" label="赛事全称" width="180px"></el-table-column>
                <el-table-column prop="competitionName" label="赛事简称" width="180px"></el-table-column>
                <el-table-column prop="competitionAddress" label="赛事地址" width="130px"></el-table-column>
                <el-table-column prop="competitionBeginTimeStr" label="赛事开始时间"></el-table-column>
                <el-table-column prop="competitionEndTimeStr" label="赛事结束时间"></el-table-column>
                <el-table-column prop="applyBeginTimeStr" label="申请开始时间"></el-table-column>
                <el-table-column prop="applyEndTimeStr" label="申请结束时间"></el-table-column>
                <!-- <el-table-column prop="applyRequire" label=" 报名要求" width="300px"></el-table-column> -->
                <el-table-column prop="enable" label=" 发布状态" width="50px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.enable=='1'">上架</span>
                        <span v-if="scope.row.enable=='0'">下架</span>
                        <span v-if="scope.row.enable=='2'">停止报名</span>
                    </template>
                </el-table-column>
                <el-table-column prop="recommend" label="是否推荐" width="50px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.recommend=='1'">是</span>
                        <span v-if="scope.row.recommend=='0'">否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="helpline" label="咨询热线"></el-table-column>
                <el-table-column prop="applyType" label="报名类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.applyType=='apply_button_G'"> 一键报名</span>
                        <span v-else-if="scope.row.applyType=='apply_button_T'">团队报名</span>
                        <span v-else-if="scope.row.applyType=='apply_button_GT'">个人/团队报名</span>
                        <span v-else-if="scope.row.applyType==''">停止报名</span>
                    </template>
                </el-table-column>
                <el-table-column prop="needToPay" label="是否需要支付" style="color:#f57d01">
                    <template slot-scope="scope">
                        <span v-if='scope.row.needToPay==0'>需要支付</span>
                        <span v-else-if='scope.row.needToPay==1'>不需要支付</span>
                    </template>
                </el-table-column>
                <el-table-column label=" 操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            style="width: 41%;margin-bottom: 10px;" @click="attributeEdit(scope.$index, scope.row)">报名配置
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" style="width: 41%;"
                            @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            style="width: 41%;    margin-left: 1px;margin-bottom: 10px;"
                            @click="disclaimerEdit(scope.$index, scope.row)">免责声明
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" style="width: 41%;"
                            @click="gameIntroduce(scope.$index, scope.row)">赛事介绍
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" style="width: 41%;"
                            @click="enlistAsk(scope.$index, scope.row)">报名要求
                        </el-button>

                        <!-- <el-button type="primary" size="mini" @click="addRoleqx(scope.$index, scope.row)"></el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisibleqx" :close-on-click-modal="false" id="addNewlogqxxg">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="122px" style="color:black">
                <el-form-item label="赛事全称" prop="competitionFullName">
                    <el-input v-model="formData.competitionFullName"></el-input>
                </el-form-item>
                <el-form-item label="赛事简称" prop="competitionName">
                    <el-input v-model="formData.competitionName"></el-input>
                </el-form-item>

                <el-form-item label="赛事开始时间" prop="competitionBeginTimeStr">
                    <el-date-picker v-model="formData.competitionBeginTimeStr" type="date" placeholder="开始日期"
                        :picker-options="startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="赛事结束时间" prop="competitionEndTimeStr">
                    <el-date-picker v-model="formData.competitionEndTimeStr" type="date" placeholder="结束日期"
                        :picker-options="endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="申请开始时间" prop="applyBeginTimeStr">
                    <el-date-picker v-model="formData.applyBeginTimeStr" type="date" placeholder="结束日期"
                        :picker-options="applyBeginTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="申请结束时间" prop="applyEndTimeStr">
                    <el-date-picker v-model="formData.applyEndTimeStr" type="date" placeholder="结束日期"
                        :picker-options="applyEndTim" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否推荐" prop="recommend">
                    <el-select v-model="formData.recommend" placeholder="请选择是否推荐">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="咨询热线" prop="helpline ">
                    <el-input v-model="formData.helpline "></el-input>
                </el-form-item>
                <el-form-item label="赛事发布" prop="enable">
                    <el-select v-model="formData.enable" placeholder="请选择赛事是否发布">
                        <el-option label="下架" value="0"></el-option>
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="停止报名" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报名类型" prop="applyType">
                    <el-select v-model="formData.applyType" placeholder="请选择报名类型">
                        <el-option label="一键报名" value="apply_button_G"></el-option>
                        <el-option label="团队报名" value="apply_button_T"></el-option>
                        <el-option label="个人/团队报名" value="apply_button_GT"></el-option>
                        <el-option label="停止报名" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="赛事地址" prop="competitionAddress" style="width:100%">
                    <el-input v-model="formData.competitionAddress" style="width: 100%;"></el-input>
                </el-form-item>
                <el-form-item label="是否需要支付" prop="needToPay">
                    <el-select v-model="formData.needToPay" placeholder="请选择">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="需要支付" value="0"></el-option>
                        <el-option label="不需要支付" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="报名要求" prop="applyRequire" style="width:100%">
                    <el-input type="textarea" v-model="formData.applyRequire" style=" width: 100%;"></el-input>
                </el-form-item> -->



            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cancelHandel('formData')">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('formData')">确 定</el-button>
            </div>

        </el-dialog>
        <el-dialog title="报名配置" :visible.sync="attributeVisibleqx" :close-on-click-modal="false" id="attributelogqxxg">
            <div style="text-align: center">
                <!-- :props="{
                            key: 'id',
                            label: 'userName'
                        }"  -->
                <el-transfer style="text-align: left; display: inline-block" target-order='push' v-model="value"
                    filterable :titles="['所有属性', '选中属性']" :button-texts="['到左边', '到右边']" @change="handleChange" :props="{
                            key: 'id',
                            label: 'labelName'
                        }" :data="data">
                </el-transfer>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="attributeCancel">取 消</el-button>
                <el-button size="mini" type="primary" @click="attributeup">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="免责声明" :visible.sync="disclaimerdialogVisible" :close-on-click-modal="false"
            id="disclaimerdialog">
            <el-form ref="disclaimerData" :model="disclaimerData" :rules="rules" label-width="122px"
                style="color:black;">
                <el-form-item label="免责声明" prop="disclaimer" style="width:100%">
                    <el-input type="textarea" v-model="disclaimerData.disclaimer"
                        style=" width: 100%;    height: 265px;    resize: none;" placeholder="请填写免责声明内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="disclaimerCancel">取 消</el-button>
                <el-button size="mini" type="primary" @click="disclaimerAdd('disclaimerData')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="报名要求" :visible.sync="enlistAskDialogVisible" :close-on-click-modal="false"
            id="enlistAskDialog">
            <el-form ref="disclaimerData" :model="disclaimerData" :rules="rules" label-width="122px"
                style="color:black;">
                <el-form-item label="报名要求" prop="applyRequire" style="width:100%">
                    <el-input type="textarea" v-model="disclaimerData.applyRequire"
                        style=" width: 100%;    height: 265px;    resize: none;" placeholder="请填写报名要求内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="disclaimerCancel">取 消</el-button>
                <el-button size="mini" type="primary" @click="disclaimerAdd('disclaimerData')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import Cookies from 'js-cookie'

    import {
        getAlleventManagementData,
        getupEventManagementData,
        getAllQuality,
        getPartQuality,
        AddYXQuality
    } from '../../services/index.js'
    export default {
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: '备选项' + i,
                        // disabled: i % 4 === 0
                    });
                }
                return data;
            };
            return {
                data: [],
                value: [],
                attributeVisibleqx: false,
                disclaimerdialogVisible: false,
                heightItem: window.innerHeight - 80, // 计算表格的高度
                tabledata: [],
                loading: true,
                total: 5,
                currentPage: 1,
                pageSize: 20,
                index: '',
                dialogFormVisibleqx: false,
                enlistAskDialogVisible: false,
                formData: {
                    id: '',
                    competitionFullName: '',
                    competitionName: '',
                    competitionAddress: '',
                    competitionBeginTimeStr: '',
                    competitionEndTimeStr: '',
                    applyBeginTimeStr: '',
                    // applyRequire: '',
                    applyEndTimeStr: '',
                    userId: '',
                    enable: '0',
                    recommend: '',
                    helpline: '',
                    needToPay: '',
                    applyType: 'apply_button_G',
                },
                disclaimerData: {
                    id: '',
                    disclaimer: '',
                    // applyRequire: '',
                    userId: '',
                },
                title: '赛事新增',
                rules: {
                    competitionFullName: [{
                        required: true,
                        message: '请输赛事全称',
                        trigger: 'blur'
                    }],
                    competitionName: [{
                        required: true,
                        message: '请输入赛事简称',
                        trigger: 'blur'
                    }],
                    competitionAddress: [{
                        required: true,
                        message: '请输入赛事地址',
                        trigger: 'blur'
                    }],
                    competitionBeginTimeStr: [{
                        type: 'string',
                        required: true,
                        message: '请选择赛事开始时间',
                        trigger: 'change'
                    }],
                    competitionEndTimeStr: [{
                        type: 'string',
                        required: true,
                        message: '请选择赛事结束时间',
                        trigger: 'change'
                    }],
                    applyBeginTimeStr: [{
                        type: 'string',
                        required: true,
                        message: '请选择申请开始时间',
                        trigger: 'change'
                    }],
                    applyEndTimeStr: [{
                        type: 'string',
                        required: true,
                        message: '请选择申请结束时间',
                        trigger: 'change'
                    }],
                    // applyRequire: [{

                    //     required: true,
                    //     message: '请填写报名要求',
                    //     trigger: 'blur'
                    // }],
                    enable: [{
                        required: true,
                        message: '请选择发布状态',
                        trigger: 'change'
                    }],
                    disclaimer: [{
                        required: true,
                        message: '请填写免责声明的内容',
                        trigger: 'blur'
                    }],
                    recommend: [{
                        required: true,
                        message: '请选择是否推荐',
                        trigger: 'change'
                    }],
                    applyType: [{
                        required: true,
                        message: '请选择报名类型',
                        trigger: 'change'
                    }],
                    needToPay: [{
                        required: true,
                        message: '请选择报名类型',
                        trigger: 'change'
                    }],
                },
                competitionIds: '',
                startTime: {
                    // disabledDate: time => {
                    //     if (this.formData.competitionEndTimeStr) {
                    //         return time.getTime() >(new Date(this.formData.competitionEndTimeStr).getTime()-86400)
                    //     } else {
                    //         //  return time.getTime()
                    //     }
                    // }
                },
                // 结束时间大于开始时间，且小于此刻
                endTime: {
                    // disabledDate: time => {
                    //     if (this.formData.competitionBeginTimeStr) {
                    //         return time.getTime()< (new Date(this.formData.competitionBeginTimeStr).getTime()-86400)
                    //     } else {
                    //         return time.getTime() >Date.now()
                    //     }
                    // }
                },
                applyBeginTime: {
                    // disabledDate: time => {
                    //     if (this.formData.applyEndTimeStr) {
                    //         return time.getTime() > new Date(this.formData.applyEndTimeStr).getTime()
                    //     } else {
                    //         // return time.getTime() > Date.now()
                    //     }
                    // }
                },
                applyEndTim: {
                    // disabledDate: time => {
                    //     if (this.formData.applyBeginTimeStr) {
                    //         return time.getTime() <(new Date(this.formData.applyBeginTimeStr).getTime()-86400)
                    //     } else {
                    //         return time.getTime() > Date.now()
                    //     }
                    // }
                },

            }
        },
        mounted() {
            //  $('#cbl').css("display",'none')
            // this.getMatchAllData();
            this.getAlldata(1, this.pageSize);
        },
        methods: {
            renderFunc(h, option) {
                return "<span >{" + option.key + "} - {" + option.label + "}< /span>";
            },
            //传输框内容的修改事件
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            },
            //所选属性添加
            attributeEdit(index, row) {
                this.value = [];
                this.data = [];
                this.competitionIds = row.id
                getAllQuality().then((data) => {
                    // console.log(data.result);
                    this.data = data.result;
                    getPartQuality(row.id).then((data) => {
                        this.value = data.result;
                    })
                })
                this.attributeVisibleqx = true;
            },

            attributeup() {
                let columnList = [];
                for (let i = 0; i < this.value.length; i++) {
                    columnList.push({
                        columnId: this.value[i],
                        sortNo: i
                    });

                }
                console.log(JSON.stringify([...columnList]));
                AddYXQuality(this.competitionIds, JSON.stringify([...columnList])).then((data) => {
                    if (data.success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        })

                    }


                })
                this.attributeVisibleqx = false;

            },
            attributeCancel() {
                this.attributeVisibleqx = false;
            },
            //免责声明
            disclaimerEdit(index, row) {
                this.disclaimerData = {
                    id: row.id,
                    disclaimer: row.disclaimer,
                    userId: this.$store.state.user.userId,
                }
                this.disclaimerdialogVisible = true;

            },
            disclaimerCancel() {
                this.disclaimerdialogVisible = false;
                this.enlistAskDialogVisible = false
            },
            //免责声明新增修改
            disclaimerAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getupEventManagementData(this.disclaimerData).then((result) => {
                            if (result.success) {
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                })
                                this.disclaimerdialogVisible = false;
                                this.enlistAskDialogVisible = false;
                                this.$refs[formName].resetFields();
                                this.getAlldata(1, this.pageSize);

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '失败!'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '验证失败!'
                        })
                        return false;
                    }
                });


            },
            // 赛事介绍
            gameIntroduce(index, row) {
                let routes = this.$router.resolve({
                    path: '/PictureManagementPage',
                    name: 'PictureManagementPage',
                    // Picture_management.vue
                    query: {
                        id: row.id,
                        type: 'competition'
                    },
                    component: resolve => require(['../competition/Picture_management.vue'], resolve),
                    meta: {
                        title: '赛事介绍'
                    },
                });
                window.open(routes.href, '_blank');

            },
            //报名要求
            enlistAsk(index, row) {
                this.disclaimerData = {
                    id: row.id,
                    applyRequire: row.applyRequire,
                    userId: this.$store.state.user.userId,
                }
                // this.disclaimerdialogVisible = true;
                this.enlistAskDialogVisible = true;

            },
            secedeMethod() {
                // Cookies.set("TokenKey", '');
                Cookies.remove('TokenKey')
                this.$router.push({
                    name: 'Login'
                })
            },

            //默认进来查询所有的报名人员的数据信息
            getAlldata(pageNo, pageSize) {
                this.currentPage = pageNo;
                this.pageSize = pageSize;
                getAlleventManagementData(pageNo, pageSize, "competition").then((
                    data) => {
                    if (data.code == "403") {
                        Cookies.remove('TokenKey')
                        this.$router.push({
                            name: 'Login'
                        });
                        this.loading = false;
                        return;
                    } else {
                        if (data.result.length > 0) {
                            this.tabledata = data.result;
                            this.total = data.rowCount;
                            this.loading = false;
                        } else {
                            this.tabledata = [];
                            this.total = data.rowCount;
                        }
                        this.loading = false;
                    }
                });

            },
            indexMethod(index) {
                return this.pageSize * (this.currentPage - 1) + index;

            },

            //分页切换
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;

                this.getAlldata(1, val);
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAlldata(val, this.pageSize);
                // console.log(`当前页: ${val}`);
            },
            // 新增
            addAndup() {
                this.title = "赛事新增"
                this.formData = {
                        id: '',
                        competitionFullName: '',
                        competitionName: '',
                        competitionAddress: '',
                        competitionBeginTimeStr: '',
                        competitionEndTimeStr: '',
                        applyBeginTimeStr: '',
                        // applyRequire: '',
                        applyEndTimeStr: '',
                        userId: this.$store.state.user.userId,
                        enable: '0',
                        recommend: '',
                        helpline: '',
                        needToPay: '',
                        applyType: 'apply_button_G',
                        competitionType: "competition"

                    },
                    this.dialogFormVisibleqx = true;
            },
            //修改
            handleEdit(index, row) {
                this.title = "赛事修改"
                        if(row.applyType==''){
                    row.applyType='3'
                }
                this.formData = {
                    id: row.id,
                    competitionFullName: row.competitionFullName,
                    competitionName: row.competitionName,
                    competitionAddress: row.competitionAddress,
                    competitionBeginTimeStr: row.competitionBeginTimeStr,
                    competitionEndTimeStr: row.competitionEndTimeStr,
                    applyBeginTimeStr: row.applyBeginTimeStr,
                    applyEndTimeStr: row.applyEndTimeStr,
                    // applyRequire: row.applyRequire,
                    userId: this.$store.state.user.userId,
                    enable: row.enable,
                    recommend: row.recommend,
                    helpline: row.helpline,
                    applyType: row.applyType,
                    needToPay: row.needToPay,
                    competitionType: "competition"
                };
                this.dialogFormVisibleqx = true;

            },

            cancelHandel(formName) {
                this.$refs[formName].resetFields();
                this.dialogFormVisibleqx = false;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                         if(this.formData.applyType=="3"){
                             this.formData.applyType='';
                         }
                        getupEventManagementData(this.formData).then((result) => {
                            if (result.success) {
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                })
                                this.dialogFormVisibleqx = false;
                                this.$refs[formName].resetFields();
                                this.getAlldata(1, this.pageSize);

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '失败!'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '验证失败!'
                        })
                        return false;
                    }
                });

            },

        },
    }
</script>

<style lang="scss">
    #eventManagementPage {
        min-height: calc(100% - 3px);
        background-color: #eceff4;
        width: 100%;

        .el-table__header {
            table-layout: auto;

        }

        .el-transfer-panel__item.el-checkbox {
            color: #606266;
            width: 100%;
        }

        .el-table th.gutter {
            display: table-cell !important;
        }

        .el-table--border th {
            background-color: #ecebeb;
            font-family: 'Microsoft YaHe';
            color: black;
        }

        .tiaojian {
            margin-bottom: 7px;
            width: 100%;
            /* //height: 49px; */
            background-color: white;
            border-radius: 10px;
        }

        .contentPage {
            width: 100%;
            height: 90%;
            margin: 0 auto;
            border-radius: 10px;
            background: #fff;
            padding: 10px 15px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            /* overflow: hidden; */
            border-radius: 0px;
        }

        .contentPage .selectbox {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: right;
        }

        .contentPage .selectbox>li {
            font-size: 14px;
            color: #333;
            font-weight: 600;
            display: inline-block;
        }

        .contentPage .selectbox>li>label {
            margin: 0 8px;
        }

        .contentPage .selectbox>li .el-input__inner {
            height: 30px;
            line-height: 30px;
        }

        .contentPage .selectbox>li .el-select {
            width: 114px;
        }

        .contentPage .selectbox>li .el-input__icon {
            line-height: 30px;
        }

        .el-pagination {

            margin-top: 10px;
        }

        .el-row {
            margin-bottom: 7px;
            margin-left: 20px;
        }

        .el-table td,
        .el-table th.is-leaf {
            border-bottom: 1px solid #EBEEF5;
            text-align: center;
            font-weight: 400;
            color: black;
        }

        .sub-lefticon {
            font-size: 16px;
            color: #adadad;
            margin: 0 4px;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 100%;
        }

        .el-button {
            width: 62px;
            padding: 0;
            height: 26px;
            line-height: 26px;
        }

        #bm_table {
            width: 100%;
            height: 300px;
            font-size: 12px;
            /* background: greenyellow; */
        }

        .el-form-item {
            position: relative;
            float: left;
            width: 50%;
            display: flex;
            // z-index: 3;
        }

        .el-input {
            /* width: 89%;
        right: -19px; */
        }

        .el-select {
            width: 99%;
        }

        .top_btn {
            background-color: white;
            height: 40px;
            padding-top: 10px;
            width: 100%;
        }

        .feedbackType .el-input__inner {
            line-height: 30px;
            height: 36px;
            font-size: 12px;

        }

        .feedbackType {
            line-height: 44px;
            font-size: 12px;
            font-family: '微软雅黑';
            color: black;

        }

        .left {
            position: relative;
            float: left;
            width: 20%;
            height: 100%;
            background: #394263;
        }

        .right {
            position: relative;
            float: left;
            width: 80%;
            height: 100%;
        }

        .el-form-item__label {
            color: black !important;
        }

        .el-textarea__inner {
            height: 100%;
        }

    }
</style>
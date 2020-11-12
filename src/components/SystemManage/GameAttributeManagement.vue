<template>

    <div id="GameAttributeManagementPage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>报名信息管理</label>
                </el-col>
                <el-col :span="1" style="position: relative;float: right;    margin-top: 10px;    margin-right: 2%;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="addAndup"><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col>
                <!-- <el-col :span="1" style="position: relative;float: right;    margin-top: 10px;    margin-right: 4%;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="addAndup"><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col> -->
            </el-row>
            <!-- <el-row style="padding-bottom: 7px;" :gutter="0">
              

            </el-row> -->
        </div>
        <div class="contentPage">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="tabledata" :max-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="60px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <el-table-column prop="labelName" label="属性名称"></el-table-column>
                <el-table-column prop="valueName" label="标签" width="130px"></el-table-column>
                <el-table-column prop="notEmpty" label="是否非空" width="50px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.notEmpty=='1'">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="verificationFormat" label="验证格式" width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.verificationFormat=='string'">字符串</span>
                        <span v-else-if="scope.row.verificationFormat=='number'">数值</span>
                    </template>
                </el-table-column>
                <el-table-column prop="valueType" label="值类型" width="100px"></el-table-column>
                <el-table-column prop="sortNo" label="排序号" width="80px"></el-table-column>
                <el-table-column prop="enabled" label="是否有效" width="80px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.enabled=='0'">无效</span>
                        <span v-else-if="scope.row.enabled=='1'">有效</span>
                    </template>
                </el-table-column>
                <el-table-column label=" 操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-delete"
                            @click="handledelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisibleqx" :close-on-click-modal="false" id="addNewlogqxxg">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm"
                style="color:black">
                <el-form-item label="属性名称" prop="labelName">
                    <el-input v-model="formData.labelName"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="valueName">
                    <el-input v-model="formData.valueName"></el-input>
                </el-form-item>
                <el-form-item label="值类型" prop="valueType">
                    <el-input v-model="formData.valueType"></el-input>
                </el-form-item>
                <el-form-item label="是否非空" prop="notEmpty">
                    <el-select v-model="formData.notEmpty" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="验证格式" prop="verificationFormat">
                    <el-select v-model="formData.verificationFormat" placeholder="请选择">
                        <el-option label="字符串" value="string"></el-option>
                        <el-option label="数值" value="number"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNo">
                    <el-input v-model.number="formData.sortNo"></el-input>
                </el-form-item>
                <el-form-item label="是否有效" prop="enabled">
                    <el-select v-model="formData.enabled" placeholder="请选择">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cancelHandel('formData')">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('formData')">确 定</el-button>
            </div>

        </el-dialog>

    </div>

</template>

<script>
    import Cookies from 'js-cookie'
    import {
        getAttributeAllData,
        deleteAttribute,
        getcontestantDivisionName,
        AttributeAddandUp
    } from '../../services/index.js'

    export default {
        data() {
            return {
                account: '',
                // inputMaxL: 5,
                heightItem: window.innerHeight - 180, // 计算表格的高度
                tabledata: [],
                loading: true,
                total: 5,
                currentPage: 1,
                pageSize: 10,
                index: '',
                dialogFormVisibleqx: false,
                divisionId: '',
                groupID: '',
                projectiD: '',
                contestantName: '',
                contestantCertificateCode: '',
                whetherPay: '',
                // sex: '',
                MathData: [],
                Mathdatazb: [],
                groupData: [],
                formData: {
                    id: '',
                    labelName: '',
                    valueName: '',
                    notEmpty: '',
                    verificationFormat: '',
                    valueType: '',
                    sortNo: '',
                    enabled: '',
                    userId: '',

                },
                title: '赛事属性新增',
                rules: {
                    labelName: [{
                        required: true,
                        message: '请输入属性名称',
                        trigger: 'blur'
                    }],
                    valueName: [{
                        required: true,
                        message: '请输入标签',
                        trigger: 'blur'
                    }],
                    notEmpty: [{
                        required: true,
                        message: '请选择',
                        trigger: 'change'

                    }],
                    verificationFormat: [{
                        required: true,
                        message: '请选择验证格式',
                        trigger: 'chang'
                    }],
                    valueType: [{
                            required: true,
                            message: '请输入值类型',
                            trigger: 'blur'
                        }
                        // { validator: isvalidateMoney, trigger: 'blur,change' }
                    ],
                    sortNo: [{
                        required: true,
                        message: '请输入排序号',
                    }, {
                        type: 'number',
                        message: '必须是数字',
                    }],
                    enabled: [{
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    }],

                },
                applyDetailId: ''
            }
        },
        mounted() {
            // this.getMatchAllData();
            this.getAlldata('1', this.pageSize);

        },
        methods: {

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
                getAttributeAllData(pageNo, pageSize).then((
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
                this.title = "赛事属性新增"
                this.formData = {
                        id: '',
                        labelName: '',
                        valueName: '',
                        notEmpty: '',
                        verificationFormat: '',
                        valueType: '',
                        sortNo: '',
                        enabled: '',
                        userId: this.$store.state.user.userId,
                    },
                    this.dialogFormVisibleqx = true;
            },
            //修改
            handleEdit(index, row) {
                this.title = "赛事属性修改"
                this.formData = {
                    id: row.id,
                    labelName: row.labelName,
                    valueName: row.valueName,
                    notEmpty: row.notEmpty,
                    verificationFormat: row.verificationFormat,
                    valueType: row.valueType,
                    sortNo: row.sortNo,
                    enabled: row.enabled,
                    userId: this.$store.state.user.userId,
                };
                this.dialogFormVisibleqx = true;

            },
            //删除
            handledelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((action) => {
                    deleteAttribute(row.id).then((res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.currentPage = 1;
                            this.pageSize = '10';
                            this.getAlldata(1, this.pageSize);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })


                // alert(row);
            },
            cancelHandel(formName) {
                this.dialogFormVisibleqx = false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        AttributeAddandUp(this.formData).then((result) => {
                            if (result.success) {
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                })
                                this.dialogFormVisibleqx = false;
                                this.$refs[formName].resetFields();
                                this.currentPage = 1;
                                this.pageSize = '10';
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
    #GameAttributeManagementPage {
        min-height: calc(100% - 3px);
        background-color: #eceff4;
        width: 100%;

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
            height: 80%;
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

        .el-table__body,
        .el-table__footer,
        .el-table__header {
            table-layout: unset;
            border-collapse: separate;
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

    }
</style>
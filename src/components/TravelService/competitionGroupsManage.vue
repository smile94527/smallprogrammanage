<template>

    <div id="GroupManagementPage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>服务类型管理</label>
                </el-col>
                
            </el-row>
            <el-row style="padding-bottom:7px" :gutter="0">

                <el-col :span="5" id="feedbackType" class="feedbackType">
                    <label>出行服务名称：</label>
                    <el-select v-model="divisionId" style="width:62%;" @change="getcontestantGroup()">
                        <el-option v-for="item in MathData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="feedbackType">
                    <label>出行服务组别：</label>
                    <el-select placeholder="请选择出行服务组别" v-model="groupID" style="width: 62%;" @change="onSelectedDrug()">
                        <el-option value="">请选择</el-option>
                        <el-option v-for="item in Mathdatazb" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>

                </el-col>
                <el-col :span="5" class="feedbackType">

                    <label>出行服务项目：</label>
                    <el-select placeholder="请选择出行服务项目" v-model="projectiD" style=" width: 62%;">
                        <el-option value="">请选择</el-option>

                        <el-option v-for="item in groupData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>

                </el-col>
                <el-col :span="5" class="feedbackType">

                    <label>性别：</label>
                    <el-select placeholder="请选择性别" v-model="sex" style="width: 62%;">
                        <el-option value="">请选择</el-option>
                        <el-option label="女" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                    </el-select>

                </el-col>
                <el-col :span="1" style=" margin-top: 10px; margin-right: 10px;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="getAlldata(1, pageSize)"> 查询
                    </el-button>
                </el-col>
                <el-col :span="1" style=" margin-top: 10px;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="addAndup"><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div class="contentPage">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="tabledata" :max-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="60px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <!-- <el-table-column prop="competitionId" label="赛事ID"></el-table-column> -->
                <el-table-column prop="groupCode" label="组别编码"></el-table-column>
                <el-table-column prop="group" label="出行服务组别" width=""></el-table-column>
                    <el-table-column prop="projectName" label="服务类型"></el-table-column>
                <el-table-column prop="unitPrice" label="单价"></el-table-column>
                <el-table-column prop="sex" label="性别" width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex=='1'">男</span>
                        <span v-if="scope.row.sex=='0'">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类别" width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type=='G'">个人</span>
                        <!-- <span v-if="scope.row.type=='T'">团队</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="maxAge" label="参与项目的最大年龄"></el-table-column>
                <el-table-column prop="minAge" label=" 参与项目的最小年龄"></el-table-column>
            
                <!-- <el-table-column prop="peoNumber" label=" 该项目的参与人数"></el-table-column> -->
                <el-table-column prop="sortNo" label=" 排序号"></el-table-column>
                <el-table-column label=" 操作" width="160px">
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
        <el-dialog :title="title" :visible.sync="dialogFormVisiblezb" :close-on-click-modal="false" id="addNewlogqxxg">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="117px" style="color:black">
                <el-form-item label="出行服务名称" prop="competitionId">
                    <el-select v-model="formData.competitionId" @change="getcontestantGroup()">
                        <el-option v-for="item in MathData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组别编码">
                    <el-input v-model="formData.groupCode"></el-input>
                </el-form-item>

                <el-form-item label="出行服务组别" >
                    <el-input v-model="formData.group"></el-input>
                </el-form-item>
                  <el-form-item label="服务类型" prop="projectName">
                    <el-input v-model="formData.projectName"></el-input>
                </el-form-item>
                <el-form-item label="单价" prop="unitPrice">
                    <el-input v-model.trim="formData.unitPrice"
                    :maxlength="inputMaxL"
                    @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(formData.unitPrice) ? null : formData.unitPrice.length - 1"
                    ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formData.sex" placeholder="请选择">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                    <!-- <el-input v-model="formData.sex"></el-input> -->
                </el-form-item>
                <el-form-item label="类别" prop="type">
                    <el-select v-model="formData.type" placeholder="请选择">
                        <!-- <el-option label="团队" value="T"></el-option> -->
                        <el-option label="个人" value="G"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNo">
                    <el-input v-model.number="formData.sortNo"></el-input>
                </el-form-item>
                <el-form-item label="最大年龄" prop="maxAge">
                    <el-input v-model="formData.maxAge"></el-input>
                </el-form-item>
                <el-form-item label="最小年龄" prop="minAge">
                    <el-input v-model="formData.minAge"></el-input>
                </el-form-item>
                <!-- <el-form-item label="参与人数" prop="peoNumber">
                    <el-input v-model.number="formData.peoNumber"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-bottom:20px">
                <el-button size="mini" @click="cancelHandel('formData')">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('formData')">确 定</el-button>
            </div>

        </el-dialog>

    </div>

</template>

<script>
    import Cookies from 'js-cookie'
    import {
        getgroupManage,
        groupManageUpAndAdd,
        groupManageDelete,
        verificationProjectName,
        getMatchData,
        getcontestantGroup,
        getcontestantDivisionName,
        verificationBusinessData
    } from '../../services/index.js'
    export default {
        data() {
            const isvalidateMoney = (rule, value, callback) => {
                  if(value != null && value != "") {
                      if(/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(value)) {
                           callback();
                     } else {
                           callback(new Error('请输入数字，最多保留两位小数!'));
                      }
                }
                  else{
                      callback();
               }
              }
            return {
                heightItem: window.innerHeight - 180, // 计算表格的高度
                tabledata: [],
                loading: true,
                total: 5,
                currentPage: 1,
                pageSize: 20,
                index: '',
                dialogFormVisiblezb: false,
                divisionId: '',
                groupID: '',
                projectiD: '',
                inputMaxL:'',
                sex: '',
                MathData: [],
                Mathdatazb: [],
                groupData: [],
                formData: {
                    id: '',
                    competitionId: '',
                    groupCode: '',
                    group: '',
                    unitPrice: '',
                    sex: '',
                    type: 'G',
                    maxAge: '',
                    minAge: '',
                    projectName: '',
                    peoNumber: '1',
                    sortNo: '',
                    userId: '',

                },
                title: '出行服务组别新增',
                rules: {
                    competitionId: [{
                        required: true,
                        message: '请输赛事id',
                        trigger: 'blur'
                    }],
                    groupCode: [{
                        required: true,
                        message: '请输入组别编码',
                        trigger: 'blur'
                    }],
                    group: [{
                        required: true,
                        message: '请输入组别',
                        trigger: 'blur'
                    }],
                    unitPrice: [
                    //     {
                    //     required: true,
                    //     message: '请输入单价',
                    // }, {
                    //     type: 'number',
                    //     message: '必须是数字',
                    // }
                    {
                            required: true,
                            message: '请输入单价',
                            trigger: 'blur'
                        },
                        {validator: isvalidateMoney}
                    ],
                    type: [{
                        required: true,
                        message: '请选择类别',
                        trigger: 'change'
                    }],
                    maxAge: [{
                        required: true,
                        message: '请输入参与项目的最大年龄',
                        trigger: 'blur'
                    }],
                    minAge: [{
                        required: true,
                        message: '请输入参与项目的最小年龄',
                        trigger: 'blur'
                    }],
                    projectName: [{
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
                    }],
                    peoNumber: [{
                        required: true,
                        message: '请输入该项目的参与人数',
                    }, {
                        type: 'number',
                        message: '必须是数字',
                    }],
                    sortNo: [{
                        required: true,
                        message: '请输入排序号',
                    }, {
                        type: 'number',
                        message: '必须是数字',
                    }]
                },
            }
        },
      
        mounted() {
            this.getMatchAllData();
            
        },
        methods: {
            secedeMethod() {
                // Cookies.set("TokenKey", '');
                Cookies.remove('TokenKey')
                this.$router.push({
                    name: 'Login'
                })
            },
            //获取赛事所有的赛事名称
            getMatchAllData() {
                this.$store.dispatch('getdefaultOpeneds','[2]');
                this.divisionId = '',
                    this.groupID = '',
                    this.projectiD = '',
                    //  this.sex:'',
                    this.MathData = [],
                    this.Mathdatazb = [],
                    this.groupData = [],
                    getMatchData("travelService").then((data) => {
                        if (data.code == "403") {
                            Cookies.remove('TokenKey')
                            this.$router.push({
                                name: 'Login'
                            })
                            return;
                        } else {
                            if ( data.result && data.result.length > 0) {
                                this.divisionId = data.result[0].key
                                this.MathData = data.result;
                                this.getAlldata(1, this.pageSize);
                                this.getcontestantGroup();
                            }else{
                                this.MathData=[];
                                 this.getAlldata(1, this.pageSize);
                            }
                        }

                    });
            },
            //根据赛事id获取所有的组别
            getcontestantGroup() {
                this.groupID = '',
                    this.projectiD = '',
                    //  this.sex:'',
                    this.Mathdatazb = [],
                    this.groupData = [],
                    getcontestantGroup(this.divisionId).then((data) => {
                        if (data.result && data.result.length > 0) {
                            this.Mathdatazb = data.result;
                            this.onSelectedDrug()
                        }else{
                             this.Mathdatazb =[];
                        }
                    });
            },
            //根据组别id获取所有的参赛项目
            onSelectedDrug() {
                this.projectiD = '',
                    this.groupData = [],
                    getcontestantDivisionName(this.divisionId, this.groupID).then((data) => {
                        if (data.result && data.result.length > 0) {
                            this.groupData = data.result;

                        }else{
                              this.groupData =[];
                        }
                    });
            },
            //默认进来查询所有的报名人员的数据信息
            getAlldata(pageNo, pageSize) {
                 this.currentPage=pageNo;
                this.pageSize=pageSize;
                let csdata = {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    competitionId: this.divisionId,
                    groupCode: this.groupID,
                    id: this.projectiD,
                    sex: this.sex
                }
                getgroupManage(csdata).then((
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
                this.title = "出行服务组别新增"
                this.formData = {
                        id: '',
                        competitionId: '',
                        groupCode: '',
                        group: '',
                        unitPrice: '',
                        sex: '',
                        type: 'G',
                        maxAge: '',
                        minAge: '',
                        projectName: '',
                        peoNumber: '1',
                        sortNo: '',
                        userId: this.$store.state.user.userId,
                    },
                    this.dialogFormVisiblezb = true;
            },
            //修改
            handleEdit(index, row) {
                this.title = "出行服务组别修改"
                this.formData = {
                    id: row.id,
                    competitionId: row.competitionId,
                    groupCode: row.groupCode,
                    group: row.group,
                    unitPrice: row.unitPrice,
                    sex: row.sex,
                    type: row.type,
                    maxAge: row.maxAge,
                    minAge: row.minAge,
                    projectName: row.projectName,
                    peoNumber: '1',
                    sortNo: row.sortNo,
                    userId: this.$store.state.user.userId,
                };
               
                this.dialogFormVisiblezb = true;

            },
            //删除
            handledelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((action) => {
                    verificationBusinessData(row.id).then((data) => {
                        if (data.success) {
                            groupManageDelete(row.id).then((res) => {
                                if (res.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功'
                                    })
                                    this.getAlldata(1, this.pageSize);
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: '删除失败'
                                    })
                                }
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.message
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
                this.dialogFormVisiblezb = false; 
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                let id = this.formData.id;
                let competitionId = this.formData.competitionId;
                let groupCode = this.formData.groupCode;
                let projectName = this.formData.projectName;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                       
                        verificationProjectName(id, competitionId, groupCode, projectName).then((data) => {
                            if (data.result) {
                                groupManageUpAndAdd(this.formData).then((result) => {
                                    if (result.success) {
                                        this.$message({
                                            type: 'success',
                                            message: '成功!'
                                        })
                                        this.dialogFormVisiblezb = false;
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
                                    message: data.message
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
            // 时间开始选择器
            startTimeStatus: function (value) {
                this.formData.competitionBeginTimeStr = value
            },
            // 时间结束选择器
            endTimeStatus: function (value) {
                this.formData.competitionEndTimeStr = value
            },

        },


    }
</script>

<style lang="scss">
    #GroupManagementPage {
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
        .el-table__body, .el-table__footer, .el-table__header {
    table-layout: unset;
    border-collapse: separate;
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
            height: 81%;
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

    }
</style>
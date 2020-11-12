<template>

    <div id="costManagePage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>出行报名费用管理</label>
                </el-col>
                <!-- <el-col :span="1" style="position: relative;float: right;    margin-top: 10px;    margin-right: 4%;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="addAndup"><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col> -->
            </el-row>
            <el-row style="padding-bottom: 7px;" :gutter="0">

                <el-col :span="5" id="feedbackType" class="feedbackType">
                    <label>出行服务名称：</label>
                    <el-select v-model="divisionId" style="width:62%" @change="getcontestantGroup()">
                        <el-option v-for="item in MathData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="feedbackType">
                    <label>出行服务组别：</label>
                    <el-select placeholder="请选择出行服务组别" v-model="groupID" style="width:60%">
                        <el-option value="">请选择</el-option>
                        <el-option v-for="item in Mathdatazb" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>

                </el-col>
                <el-col :span="4" class="feedbackType">
                    <label>出行人姓名：</label>
                    <el-input v-model="contestantName" placeholder="请输入出行人姓名" style="width:58%"></el-input>
                    <!-- <el-input size="medium" v-model.trim="account" placeholder="提取金额" :maxlength="inputMaxL"
                        @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(account) ? null : account.length - 1"></el-input> -->

                </el-col>
                <el-col :span="5" class="feedbackType">
                    <label>证件号码：</label>
                    <el-input v-model="contestantCertificateCode" placeholder="请输入证件号码" style="width:62%"></el-input>
                </el-col>
                <el-col :span="4" class="feedbackType">
                    <label>是否支付：</label>
                    <el-select placeholder="请选择是否支付" v-model="whetherPay" style="width:62%">
                        <el-option value=" ">请选择</el-option>
                        <el-option label="已支付" value="1"></el-option>
                        <el-option label="未支付" value="0"></el-option>
                        <el-option label="已退款" value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" style="width: 45px;margin-top: 10px; "
                        @click="getAlldata(1, pageSize)"> 查询
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
                <el-table-column prop="competitionName" label="出行服务名称"></el-table-column>
                <el-table-column prop="userName" label="出行人姓名" width="100px"></el-table-column>
                <el-table-column prop="certificateCode" label="证件号码" width="200px"></el-table-column>
                <el-table-column prop="sex" label="性别" width="50px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex=='1'">男</span>
                        <span v-else>女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="groupName" label="出行服务组别" width=""></el-table-column>
                <el-table-column prop="divisionName" label="出行服务项目" width="100px"></el-table-column>
                <el-table-column prop="payPrice" label="支付金额" width="80px">
                    <template slot-scope="scope">
                        <span v-if='scope.row.payPrice'>{{scope.row.payPrice}}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payState" label=" 支付状态" width="80px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payState=='1'" style="color:#f57d01">已支付</span>
                        <span v-else-if="scope.row.payState=='2'" style="color:#f57d01">已退款</span>
                        <span v-else>未支付</span>
                    </template>
                </el-table-column>
                <el-table-column prop="refundPrice" label="退款金额" width="80px">
                    <template slot-scope="scope">
                        <span v-if='scope.row.refundPrice'>{{scope.row.refundPrice}}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="refundState" label="退款状态" width="80px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.refundState=='1'" style="color:#f57d01">退款成功</span>
                        <span v-else-if="scope.row.refundState=='0'">退款失败</span>
                    </template>
                </el-table-column>
                <el-table-column label=" 操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.payState=='1'">退款
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)" v-else disabled="disabled" style="border-color: #7d7b7b;
    background-color: #7d7b7b;">退款
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
            <el-form ref="formData" :model="formData" :rules="rules" label-width="115px" class="demo-ruleForm"
                style="color:black">
                <el-form-item label="出行服务名称" prop="competitionName">
                    <el-input v-model="formData.competitionName"></el-input>
                </el-form-item>
                <el-form-item label="出行人姓名" prop="userName">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>

                <el-form-item label="证件号码" prop="certificateCode">
                    <el-input v-model="formData.certificateCode"></el-input>
                </el-form-item>
                <el-form-item label="支付金额" prop="payPrice">
                    <el-input v-model="formData.payPrice"></el-input>
                </el-form-item>

                <el-form-item label="退款金额" prop="refundPrice">
                    <!-- <el-input size="medium" v-model.trim="formData.refundPrice" placeholder="请输入退款金额" ></el-input> -->
                    <el-input size="medium" v-model.trim="formData.refundPrice" placeholder="请输入退款金额"
                        :maxlength="inputMaxL"
                        @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(formData.refundPrice) ? null : formData.refundPrice.length - 1">
                    </el-input>

                </el-form-item>
                <el-form-item label="退款原因" prop="refundDesc">
                    <el-input type="textarea" v-model="formData.refundDesc" placeholder="请输入退款原因"></el-input>
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
        getrefundData2,
        
        getMatchData,
        getcontestantGroup,
        getcontestantDivisionName,
        refund
    } from '../../services/index.js'
    export default {
        data() {
                const isvalidateMoney = (rule, value, callback) => {
                  if(value != null && value != "") {
                      if(/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(value)) {
                          if(value>this.formData.payPrice){
                               callback(new Error('退款金额不能大于支付金额!'));
                          }else{
                              callback();
                          }
                     } else {
                           callback(new Error('请输入数字，最多保留两位小数!'));
                      }
                }
                  else{
                      callback();
               }
              }
            return {
                account: '',
                // inputMaxL: 5,
                heightItem: window.innerHeight - 180, // 计算表格的高度
                tabledata: [],
                loading: true,
                total: 5,
                currentPage: 1,
                pageSize: 20,
                index: '',
                dialogFormVisibleqx: false,
                divisionId: '',
                groupID: '',
                inputMaxL:'',
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
                    competitionName: '',
                    userName: '',
                    certificateCode: '',
                    payPrice: '',
                    refundPrice: '',
                    refundDesc: ''
                },
                title: '退款申请',
                rules: {
                    competitionName: [{
                        required: true,
                        message: '请输入出行服务名称',
                        trigger: 'blur'
                    }],
                    userName: [{
                        required: true,
                        message: '请输入出行人姓名',
                        trigger: 'blur'
                    }],
                    payPrice: [{
                        required: true,
                        message: '请输入支付金额',
                        trigger: 'blur'

                    }],
                    certificateCode: [{

                        required: true,
                        message: '请输入证件号码',
                        trigger: 'blur'
                    }],
                    refundPrice: [{
                            required: true,
                            message: '请输入退款金额',
                            trigger: 'blur'
                        },
                        {validator: isvalidateMoney}
                        // { validator: isvalidateMoney, trigger: 'blur,change' }
                    ],
                    refundDesc: [{
                        required: true,
                        message: '请输入退款原因',
                        trigger: 'blur'
                    }],

                },
                applyDetailId:''
            }
        },
        mounted() {
            this.getMatchAllData();
            
        },
        methods: {
            // inputMaxL(e) {
            //     // if(/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(e)){
            //     //     if(/^\d+\.?\d{0,1}$/.test(e) ? null : e.length - 1){
            //     //          return /^\d+\.?\d{0,1}$/.test(e) ? null : e.length - 1
            //     //     }else{
            //     //         alert("最多只能输入两位小数")
            //     //     }
            //     // }else{
            //     //     alert('请输入数字')
            //     // }
            //     return /^\d+\.?\d{0,1}$/.test(e) ? null : e.length - 1
            // },
            secedeMethod() {
                // Cookies.set("TokenKey", '');
                Cookies.remove('TokenKey')
                this.$router.push({
                    name: 'Login'
                })
            },
            //获取赛事所有的赛事名称
            getMatchAllData() {
                this.divisionId = '',
                    this.groupID = '',
                    this.projectiD = '',
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
                            if (data.result.length > 0) {
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
                        if (data.result.length > 0) {
                            this.Mathdatazb = data.result;
                            // this.onSelectedDrug()
                        }else{
                             this.Mathdatazb = [];

                        }
                    });
            },

            //默认进来查询所有的报名人员的数据信息
            getAlldata(pageNo, pageSize) {
                 this.currentPage=pageNo;
                this.pageSize=pageSize;
                let csData = {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    competitionId: this.divisionId,
                    contestantGroupCode: this.groupID,
                    contestantName: this.contestantName,
                    contestantCertificateCode: this.contestantCertificateCode,
                    whetherPay: this.whetherPay,

                }
                getrefundData2(csData).then((
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

            //修改
            handleEdit(index, row) {
                this.title = "退款申请",
                this.applyDetailId=row.id;
                this.formData = {
                        id: row.outTradeNo,
                        competitionName: row.competitionName,
                        userName: row.userName,
                        certificateCode: row.certificateCode,
                        payPrice: row.payPrice,
                        refundPrice: '',
                        refundDesc: '',

                    },
                    this.dialogFormVisibleqx = true;

            },

            cancelHandel(formName) {
                this.dialogFormVisibleqx = false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                  this.$refs[formName].validate((valid) => {
                            if (valid) {
                              
                                let csdata = {
                                    outTradeNo: this.formData.id,
                                    totalFee: this.formData.payPrice,
                                    refundFee: this.formData.refundPrice,
                                    refundDesc: this.formData.refundDesc,
                                    competitionType:"travelService",
                                    applyDetailId:this.applyDetailId
                                }

                                refund(csdata).then((result) => {
                                    if (result.success) {
                                        this.$message({
                                            type: 'success',
                                            message: '退款成功!'
                                        })
                                        this.dialogFormVisibleqx = false;
                                          this.$refs[formName].resetFields();
                                        this.getAlldata(1, this.pageSize);

                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: '退款失败!'
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
    #costManagePage {
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
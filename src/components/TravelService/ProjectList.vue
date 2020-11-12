<template>
    <div id="EnrolmentEnquiryPage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>出行服务报名类型清单</label>
                </el-col>
                <!-- <el-col :span="1" style="position: relative;float: right;    margin-top: 10px;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="secedeMethod()">退出
                    </el-button>
                </el-col> -->
            </el-row>
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="5" id="feedbackType" class="feedbackType">
                    <label>出行服务名称：</label>
                    <el-select v-model="divisionId" style="width: 62%;" @change="getcontestantGroup()">
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
                    <el-select placeholder="请选择出行服务项目" v-model="projectiD" style="width: 62%;">
                        <el-option value="">请选择</el-option>

                        <el-option v-for="item in groupData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>

                </el-col>
                <el-col :span="6" class="feedbackType">
                    <label>出行人身份证号：</label>
                    <el-input v-model="certificateCode" placeholder="请输入内容" style="width: 62%;"></el-input>
                </el-col>
            </el-row>
            <el-row style=" padding-bottom: 10px;" :gutter="0">
                <el-col :span="5" class="feedbackType">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出行人：</label>
                    <el-input v-model="userName" placeholder="请输入出行人名称" style="width: 62%;"></el-input>

                </el-col>
                <el-col :span="5" class="feedbackType">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否支付：</label>
                    <el-select placeholder="请选择是否支付" v-model="applyId" style="width: 62%;" disabled="disabled">
                        <el-option value=" ">请选择</el-option>
                        <el-option label="已支付" value="1"></el-option>
                        <el-option label="未支付" value="0"></el-option>
                        <el-option label="已退款" value="2"></el-option>
                    </el-select>

                </el-col>
                <!-- <el-col :span="5" class="feedbackType">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;团队名称：</label>
                    <el-input v-model="teamName" placeholder="请输入团队名称" style="width: 65%;"></el-input>
                  
                </el-col>
                <el-col :span="6" class="feedbackType">
                    <label>领队人身份证号：</label>
                    <el-input v-model="ld_certificateCode" placeholder="请输入内容" style="width: 62%;"></el-input>
                </el-col> -->
                <el-col :span="1" style="position: relative;float;margin-left: 12px; margin-top: 10px;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="getAlldata(1, pageSize)"> 查询
                    </el-button>
                </el-col>
                <el-col :span="1" style="position: relative;margin-top: 10px;margin-left: 10px;margin-right: 100px;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="export2Excel"> <i
                            class="el-icon-printer"></i>导出
                    </el-button>
                </el-col>
            </el-row>

        </div>
        <div class="contentPage">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="Bmdata" :max-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="60px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <el-table-column prop="contestantName" label="出行人"></el-table-column>
                <el-table-column prop="contestantSex" label="性别" width="60px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contestantSex=='1'">男</span>
                        <span v-else>女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="contestantNationality" label="国家"></el-table-column>

                <el-table-column prop="contestantCertificateCode" label="出行人证件号码" width="220px"></el-table-column>
                <!-- <el-table-column prop="contestantBirthday" label="年龄" width="60px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contestantBirthday">{{getage(scope.row.contestantBirthday)}}</span>

                    </template>

                </el-table-column> -->
                <el-table-column prop="contestantGroup" label="出行服务组别"></el-table-column>
                <el-table-column prop="contestantDivisionName" label="出行服务项目"></el-table-column>
                <!-- <el-table-column prop="contestantDivisionPrice" label="报名费用"  style="color:#f57d01">
                    <template slot-scope="scope">
                        <span style="color:#f57d01">{{scope.row.contestantDivisionPrice}}</span>

                    </template>
                </el-table-column>
                <el-table-column prop="whetherPay" label="是否支付" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.whetherPay=='1'" style="color:#f57d01">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="contestantPicture" label="参赛照片地址" width="130px"></el-table-column> -->
                <!-- <el-table-column prop="teamName" label="团队名称" width="230px"></el-table-column>
                <el-table-column prop="teamLeaderName" label="团队领队"></el-table-column> -->
                <el-table-column prop="pickUpSpotName" label="乘车地点中文"></el-table-column>
                <el-table-column prop="censusRegister" label="户籍地址"></el-table-column>
                <el-table-column prop="presentAddress" label="现住址"></el-table-column>
                <!-- <el-table-column prop="teamLeaderCertificateCode" label="领队身份证号" width="220px"></el-table-column> -->


            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

        </div>


    </div>

</template>

<script>
    import Cookies from 'js-cookie'
    import {
        getEnrolment_enquiry_data2,
        getMatchData,
        getcontestantGroup,
        getcontestantDivisionName,
        getEnrolment_enquiryDcdata2
    } from '../../services/index.js'
    export default {
        data() {
            return {
                heightItem: window.innerHeight - 180, // 计算表格的高度
                Bmdata: [],
                loading: true,
                total: 5,
                currentPage: 1,
                pageSize: 10,
                selected: null,
                divisionId: '',
                groupID: '',
                projectiD: '',
                certificateCode: '',
                userName: '',
                applyId: '1',
                teamName: '',
                ld_certificateCode: '',
                MathData: [],
                Mathdatazb: [],
                groupData: [],
                index: '',
                listData: [],
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
                this.divisionId = '',
                    this.groupID = '',
                    this.projectiD = '',
                    //  this.sex:'',
                    this.MathData = [],
                    this.Mathdatazb = [],
                    this.groupData = [],
                    getMatchData("travelService").then((data) => {
                        if (data.code == "403") {
                            // this.$message({
                            //     type: 'error',
                            //     message: data.message
                            // });
                            Cookies.remove('TokenKey')
                            this.$router.push({
                                name: 'Login'
                            })
                            return;
                        } else {
                            if (data.result && data.result.length > 0) {
                                this.divisionId = data.result[0].key
                                this.MathData = data.result;
                                this.getAlldata(1, this.pageSize);
                                this.getcontestantGroup();
                            } else {
                                this.loading = false;
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
                        } else {
                            this.Mathdatazb = [];
                            this.loading = false;
                        }
                    });
            },
            //根据组别id获取所有的参赛项目
            onSelectedDrug() {
                this.projectiD = '',
                    this.groupData = [],
                    getcontestantDivisionName(this.divisionId, this.groupID).then((data) => {
                        if (data.result.length > 0) {
                            this.groupData = data.result;

                        } else {
                            this.groupData = [];
                            this.loading = false;
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
                    // contestantGroupCode: this.groupID,
                    // contestantDivisionId: this.projectiD,
                    contestantCertificateCode: this.certificateCode,
                    contestantName: this.userName,
                    whetherPay: this.applyId,
                    // teamName: this.teamName,
                    // teamLeaderCertificateCode: this.ld_certificateCode
                }
                getEnrolment_enquiry_data2(csdata).then((
                    data) => {
                    if (data.code == "403") {
                        // this.$message({
                        //     type: 'error',
                        //     message: data.message
                        // });
                        Cookies.remove('TokenKey')
                        this.$router.push({
                            name: 'Login'
                        });
                        this.loading = false;
                        return;
                    } else {

                        // console.log(data);
                        if (data.result.length > 0) {
                            this.Bmdata = data.result;
                            this.total = data.rowCount;
                            this.loading = false;
                        } else {
                            this.Bmdata = [];
                            this.total = data.rowCount;
                        }
                        this.loading = false;
                    }
                });

            },
            indexMethod(index) {
                return this.pageSize * (this.currentPage - 1) + index;

            },
            // QueryData(){

            // },
            //获取年龄
            getage(strBirthday) {
                var returnAge;
                var strBirthdayArr = strBirthday.split("-");
                var birthYear = strBirthdayArr[0];
                // var birthMonth = strBirthdayArr[1];
                // var birthDay = strBirthdayArr[2];

                var d = new Date();
                var nowYear = d.getFullYear();
                // var nowMonth = d.getMonth() + 1;
                // var nowDay = d.getDate();

                if (nowYear == birthYear) {
                    returnAge = 0; //同年 则为0岁
                } else {
                    var ageDiff = nowYear - birthYear; //年之差
                    if (ageDiff > 0) {
                        returnAge = ageDiff;
                        // if (nowMonth == birthMonth) {
                        //     var dayDiff = nowDay - birthDay; //日之差
                        //     if (dayDiff < 0) {
                        //         returnAge = ageDiff - 1;
                        //     } else {
                        //         returnAge = ageDiff;
                        //     }
                        // } else {
                        //     var monthDiff = nowMonth - birthMonth; //月之差
                        //     if (monthDiff < 0) {
                        //         returnAge = ageDiff - 1;
                        //     } else {
                        //         returnAge = ageDiff;
                        //     }
                        // }
                    } else {
                        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge; //返回周岁年龄
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
            export2Excel() {
                let csdata = {
                    competitionId: this.divisionId,
                    // contestantGroupCode: this.groupID,
                    // contestantDivisionId: this.projectiD,
                    contestantCertificateCode: this.certificateCode,
                    contestantName: this.userName,
                    whetherPay: this.applyId,
                    // teamName: this.teamName,
                    // teamLeaderCertificateCode: this.ld_certificateCode
                }
                getEnrolment_enquiryDcdata2(csdata).then((data) => {
                    if (data.result.length > 0) {
                        this.listData = data.result;
                        require.ensure([], () => {
                            const {
                                export_json_to_excel
                            } = require('../../../src/vendor/Export2Excel.js'); //Export2Excel.js
                            const tHeader = ['出行人', '性别', '国家', '出行人证件号码', '出行服务组别', '出行服务项目',
                                '报名费用',
                                // '团队名称',
                                // '团队领队',
                                '乘车地点中文', '户籍地址', '现住址'
                            ];
                            // 上面设置Excel的表格第一行的标题
                            const filterVal = ['contestantName', 'contestantSex',
                                'contestantNationality',
                                'contestantCertificateCode',
                                'contestantGroup', 'contestantDivisionName',
                                'contestantDivisionPrice',
                                // 'teamName',
                                // 'teamLeaderName'
                                'pickUpSpotName', 'censusRegister', 'presentAddress'

                            ];
                            // 上面的index、nickName、name是tableData里对象的属性
                            //把data里的tableData存到list

                            const list = this.listData;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].contestantSex == "1") {
                                    list[i].contestantSex = "男"
                                } else {
                                    list[i].contestantSex = "女"
                                }
                                // if (list[i].contestantBirthday) {
                                //     list[i].contestantBirthday = this.getage(list[i]
                                //     .contestantBirthday);
                                // } else {
                                //     list[i].contestantBirthday = list[i].contestantBirthday;
                                // }

                            }
                            const data = this.formatJson(filterVal, list);

                            export_json_to_excel(tHeader, data, '田径赛参赛项目清单');


                        })
                    }


                });

            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(
                    j => v[j]
                ));
            }


        },


    }
</script>

<style lang="scss">
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
        height: 74%;
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

    #EnrolmentEnquiryPage {
        min-height: calc(100% - 3px);
        background-color: #eceff4;
        width: 100%;



    }

    #EnrolmentEnquiryPage .el-row {
        margin-bottom: 7px;
        margin-left: 20px;
    }

    #EnrolmentEnquiryPage .el-table td,
    .el-table th.is-leaf {
        border-bottom: 1px solid #EBEEF5;
        text-align: center;
        font-weight: 400;
        color: black;
    }

    #EnrolmentEnquiryPage .sub-lefticon {
        font-size: 16px;
        color: #adadad;
        margin: 0 4px;
    }

    #EnrolmentEnquiryPage .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }

    #EnrolmentEnquiryPage .el-button {
        width: 62px;
        padding: 0;
        height: 26px;
        line-height: 26px;
    }

    #bm_table {
        width: 100%;
        height: 300px;
        font-size: 12px;
        // display: table-caption;
        /* background: greenyellow; */
    }

    #EnrolmentEnquiryPage .el-form-item {
        position: relative;
        float: left;
        width: 50%;
        z-index: 3;
    }

    #EnrolmentEnquiryPage .el-input {
        /* width: 89%;
        right: -19px; */
    }

    #EnrolmentEnquiryPage .el-select {
        width: 99%;
    }

    #EnrolmentEnquiryPage .top_btn {
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
</style>
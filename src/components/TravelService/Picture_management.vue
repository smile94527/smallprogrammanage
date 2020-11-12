<template>
    <div id="pictureManage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>出行服务介绍</label>
                </el-col>
                  <el-col :span="1" style="margin-top: 7px; float:right;margin-right:32px" class="addnew">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="addAndup"><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col>
            </el-row>
            <!-- <el-row style="padding-bottom: 7px;" :gutter="0">

                <el-col :span="6" id="feedbackType" class="feedbackType">
                    <label>出行服务名称：</label>
                    <el-select v-model="divisionId" style="width:62%">
                        <el-option v-for="item in MathData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="margin-top: 7px;">
                    <el-button type="primary" size="mini" style="width: 45px;    height: 26px"
                        @click="getAlldata(1, pageSize)"> 查询
                    </el-button>
                </el-col>
              

            </el-row> -->
        </div>
        <div class="contentPage">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="tabledata" :min-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="80px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <el-table-column prop="competitionName" label="出行服务名称"></el-table-column>
                <el-table-column prop="competitionPresentationTitle" label="一级标题">
                      <template slot-scope="scope">
                        <span v-if="scope.row.competitionPresentationTitle=='presentation_image'">赛事介绍图片</span>
                        <span v-else-if="scope.row.competitionPresentationTitle=='thumbnail'">首页赛事缩略图</span>
                        <span v-else-if="scope.row.competitionPresentationTitle=='top_image'">赛事介绍顶部图片</span>
                        <span v-else>{{scope.row.competitionPresentationTitle}}</span>

                    </template>
                </el-table-column>
                <el-table-column prop="competitionPresentationTypeName" label="二级标题" width="">
                            <template slot-scope="scope">
                        <span v-if="scope.row.competitionPresentationTitle=='presentation_image'">图片</span>
                        <span v-else-if="scope.row.competitionPresentationTitle=='thumbnail'">缩略图</span>
                        <span v-else-if="scope.row.competitionPresentationTitle=='top_image'">图片</span>
                        <span v-else>{{scope.row.competitionPresentationTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="competitionPresentation" label="描述" width="300px"></el-table-column>
                <el-table-column prop="sortNo" label=" 排序编码"></el-table-column>
                <el-table-column label=" 操作" width="230px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-upload2"
                            @click="puictureClick(scope.$index, scope.row)">上传图片
                        </el-button>
                        <!-- <el-button size="mini" type="primary" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-delete"
                            @click="handledelete(scope.$index, scope.row)">删除
                        </el-button> -->
                          <el-button v-if="scope.row.competitionPresentationTitle!='presentation_image'  &&  scope.row.competitionPresentationTitle!='thumbnail'  &&  scope.row.competitionPresentationTitle!='top_image' " size="mini" type="primary" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button  v-if="scope.row.competitionPresentationTitle!='presentation_image'  &&  scope.row.competitionPresentationTitle!='thumbnail' && scope.row.competitionPresentationTitle!='top_image' " size="mini" type="primary" icon="el-icon-delete"
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
        <el-dialog :title="title" :visible.sync="dialogFormVisibleqx" :close-on-click-modal="false"
            id="addNewPiucturelogqxxg">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="120px" style="color:black">
                <el-form-item label="出行服务名称" prop="competitionId">
                    <el-select v-model="formData.competitionId" disabled="true">
                        <el-option v-for="item in MathData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级标题" prop="competitionPresentationTitle" placeholder="请输入一级标题">
                    <el-input v-model="formData.competitionPresentationTitle"></el-input>
                </el-form-item>
                <el-form-item label="排序编码" prop="sortNo">
                    <el-input v-model.number="formData.sortNo" placeholder="请输入排序编码"></el-input>
                </el-form-item>
                <el-form-item label="二级标题" placeholder="请输入二级标题">
                    <el-input v-model="formData.competitionPresentationTypeName" width="180px"></el-input>
                </el-form-item>
                <el-form-item label="描述" placeholder="请输入描述内容" style="width:100%">
                    <el-input type="textarea" v-model="formData.competitionPresentation"
                        style="    width: 118%;  height: 265px;    resize: none;">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cancelHandel('formData')" style="width:80px">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('formData')" style="width:80px">确 定</el-button>
            </div>

        </el-dialog>
        <el-dialog title="图片上传" :visible.sync="upPuictureDialogForm" :close-on-click-modal="false" @close="close"
            id="scPiucturelogqxxg">
            <el-form enctype="multipart/form-data" ref="puictureFrom" :model="puictureFrom" :rules="rules"
                label-width="120px" id="from">
                <el-form-item label="上传图片" label-width="120px">
                    <!-- <el-upload class="upload-demo" 
                    drag
                        action="http://192.168.11.185:8080/CrossCountrySys/competitionImgController/saveData" multiple
                        :data="upLoadData" :on-change="changeLoad" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload> -->
                    <el-upload class="upload-demo" ref="upload" :action="url" :data="upLoadData"
                        :file-list="fileListData" :on-preview="handlePreview" :on-remove="handleRemove"
                        :before-upload="beforeupload" :on-change="changeLoad" :auto-upload="false" list-type="picture">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                        </el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <!-- <div class="upload-rig">
                    <el-button  type='submit' @click="startUpload()">开始上传</el-button>
                </div> -->
            </el-form>


        </el-dialog>
    </div>
</template>
<script>
    import Cookies from 'js-cookie'
    import {
        getPictureData,
        upAddaddPicture,
        deletePicture,
        uploadPuicture,
        getMatchData,
        // getcontestantDivisionName,
        verificationBusinessData,
        getImage,
        deleteImage
    } from '../../services/index.js'
    import api from '../../api';
    export default {
        data() {
            return {
                url: api.PRO_HOST + '/CrossCountrySys/competitionImgController/saveData',
                puictureFrom: {},
                heightItem: window.innerHeight - 180, // 计算表格的高度
                tabledata: [],
                loading: true,
                total: 5,
                currentPage: 1,
                pageSize: 20,
                index: '',
                dialogFormVisibleqx: false,
                divisionId: '',
                MathData: [],
                formData: {
                    id: '',
                    competitionId: '',
                    competitionPresentationTitle: '',
                    competitionPresentationTypeName: '',
                    competitionPresentation: '',
                    sortNo: '',
                    userId: '',
                },
                title: '出行服务介绍新增',
                rules: {
                    competitionId: [{
                        required: true,
                        message: '请输选择出行服务',
                        trigger: 'change'
                    }],
                    competitionPresentationTitle: [{
                        required: true,
                        message: '请输入一级标题',
                        trigger: 'blur'
                    }],
                    competitionPresentation: [{
                        required: true,
                        message: '请输入描述内容',
                        trigger: 'blur'
                    }],
                    sortNo: [{
                        required: true,
                        message: '请输入排序编码',
                    }, {
                        type: 'number',
                        message: '必须是数字',
                    }]
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                upPuictureDialogForm: false,
                competitionPresentationId: '',

                upLoadData: {
                    competitionPresentationId: '1',
                    moduleName: ''
                },
                // file: '',
                // fileList: '',
                fileListData: [],
                param: {}

            }
        },
        mounted() {
            var param = this.$route.query;
            // this.divisionId=param.id;
            this.getMatchAllData(param.id,param.type);

        },
  
        methods: {
            close() {
                this.$refs.upload.clearFiles(); //清空图片数组的
            },
            //提交文件
            submitUpload() {
                this.$refs.upload.submit();
            },
            //删除文件之前的钩子函数
            handleRemove(file, fileList) {
                if (file.id) {
                    deleteImage(file.id).then((data) => {
                        if (data.success) {
                            // setTimeout(() => {


                            // }, 1000);
                            this.$message({
                                type: 'info',
                                message: '已删除原有图片',
                                duration: 1000
                            });

                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除原有图片失败',
                                duration: 1000
                            });
                        }

                    })
                }



            },
            //点击列表中已上传的文件事的钩子函数
            handlePreview(file) {
                console.log(file);
            },
            beforeupload(file) {
                console.log(file);
            },
            //重新上传图片时的回调钩子
            changeLoad(file, fileList) {
                //上传时限制图片大小
                const isJPG = file.raw.type === 'image/jpeg';
                const isGIF = file.raw.type === 'image/gif';
                const isPNG = file.raw.type === 'image/png';
                const isBMP = file.raw.type === 'image/bmp';
                const isLt5kb = file.size / 1024 < 500;

                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                    this.$refs.upload.clearFiles(); //清空图片数组的
                }
                if (!isLt5kb) {
                    this.$message.error('上传图片大小不能超过 500kb!');
                    this.$refs.upload.clearFiles(); //清空图片数组的
                }
                // this.file = file;
                // this.fileList = fileList;
                this.upLoadData = {
                    competitionPresentationId: this.competitionPresentationId,
                    moduleName: 'competition'
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt5kb;

            },

            puictureClick(index, row) {
                this.fileListData = [];
                this.upPuictureDialogForm = true;
                this.competitionPresentationId = row.id;
                getImage(row.id).then((data) => {
                    if (data.result.length > 0) {
                        for (var i = 0; i < data.result.length; i++) {
                            this.fileListData.push({
                                name: data.result[i].name,
                                url: api.PRO_HOST + "/CrossCountrySys/" + data.result[i].url,
                                id: data.result[i].id
                            })
                        }
                        // this.fileListData =data.result;
                    }
                });

            },
            //获取赛事所有的赛事名称
            getMatchAllData(id,type) {
                this.divisionId = '',
                    this.MathData = [],
                    getMatchData(type).then((data) => {
                        if (data.code == "403") {
                            Cookies.remove('TokenKey')
                            this.$router.push({
                                name: 'Login'
                            })
                            return;
                        } else {
                            if (data.result.length > 0) {
                                this.divisionId = id;
                                // data.result[0].key
                                this.MathData = data.result;
                                this.getAlldata(1, this.pageSize);
                                // this.getcontestantGroup();
                            }
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
                }
                getPictureData(csdata).then((
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
                 var param = this.$route.query;
                this.title = "出行服务介绍新增"
                this.formData = {
                        id: '',
                        competitionId: param.id,
                        competitionPresentationTitle: '',
                        competitionPresentationTypeName: '',
                        competitionPresentation: '',
                        sortNo: '',
                        userId: this.$store.state.user.userId,
                    },
                    this.dialogFormVisibleqx = true;
            },
            //修改
            handleEdit(index, row) {
                this.title = "出行服务介绍修改"
                this.formData = {
                    id: row.id,
                    competitionId: row.competitionId,
                    competitionPresentationTitle: row.competitionPresentationTitle,
                    competitionPresentationTypeName: row.competitionPresentationTypeName,
                    competitionPresentation: row.competitionPresentation,
                    sortNo: row.sortNo,
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
                    verificationBusinessData(row.id).then((data) => {
                        if (data.success) {
                            deletePicture(row.id).then((res) => {
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
                this.dialogFormVisibleqx = false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        upAddaddPicture(this.formData).then((result) => {
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
    #pictureManage {
        min-height: calc(100% - 3px);
        background-color: #eceff4;
        width: 100%;
.el-table__empty-block {
    min-height: 450px
}
        .el-table--scrollable-y .el-table__body-wrapper {
            overflow-y: auto;
            min-height: 400px;
               
        }

        .el-table th.gutter {
            display: table-cell !important;
        }

        .el-table--border th {
            background-color: #ecebeb;
            font-family: 'Microsoft YaHe';
            color: black;
        }

        .el-table__body,
        .el-table__footer,
        .el-table__header {
            table-layout: unset;
            border-collapse: separate;
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

        .el-button--mini,
        .el-button--mini.is-round {
            padding: 7px 1px;
        }

        .addnew {

            .el-button--mini,
            .el-button--mini.is-round {
                padding: 6px 0px;
            }
        }


    }

    #addNewPiucturelogqxxg {
        .el-form-item {
            position: relative;
            float: left;
            width: 50%;
            display: flex;
            // z-index: 3;
        }

        .el-form--inline .el-form-item {
            display: flex;
            margin-right: 10px;
            vertical-align: top;
        }

        .el-form-item__label {
            color: black !important;

        }
         .el-textarea__inner {
            height: 100%;
        }
    }

    #scPiucturelogqxxg {
        .el-dialog {
            width: 36%;
        }

    }
</style>
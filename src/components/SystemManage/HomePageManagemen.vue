<template>
    <div id="HomePageManage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>参赛首页图片管理</label>
                </el-col>
                <el-col :span="1" style="margin-top: 7px;" class="addnew">
                    <el-button type="primary" size="mini" style="width: 74px;" @click="puictureClick"><i
                            class="el-icon-circle-plus"></i>图片上传
                    </el-button>
                </el-col>
            </el-row>

        </div>
        <div class="contentPage">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="tabledata" :max-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="80px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <el-table-column prop="url" label="图片">
                    <template slot-scope="scope">
                        <el-avatar shape="square" :size="50" :src="scope.row.url"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="indexSelectState" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.indexSelectState=='1'">选用</span>
                        <span v-else>弃用</span>
                    </template>
                </el-table-column>
                <el-table-column label=" 操作" width="230px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            @click="SelectionEdit(scope.$index, scope.row,'1')" v-if="scope.row.indexSelectState!='1'">选用
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-delete"
                            @click="SelectionEdit(scope.$index, scope.row,'0')" v-if="scope.row.indexSelectState=='1'">弃用
                        </el-button>
                        <el-button size="mini" type="primary" icon="el-icon-delete"
                            @click="handledelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="图片上传" :visible.sync="upPuictureDialogForm" :close-on-click-modal="false" @close="close"
            id="scPiucturelogqxxg">
            <el-form enctype="multipart/form-data" ref="puictureFrom" :model="puictureFrom" label-width="120px"
                id="from">
                <el-form-item label="上传图片" label-width="120px">
                    <el-upload class="upload-demo" ref="upload" :action="url" :data="upLoadData"
                        :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeupload"
                        :on-change="changeLoad" :auto-upload="false" list-type="picture">
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
        getHomePagePicture,
        uploadPuicture,
        HomePictureXYQY,
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
                // total: 5,
                // currentPage: 1,
                // pageSize: 20,
                index: '',
                dialogFormVisibleqx: false,
                divisionId: '',
                MathData: [],
                title: '赛事图片新增',
                upPuictureDialogForm: false,
                competitionPresentationId: '',
                upLoadData: {
                    competitionPresentationId: '1',
                    uploadPuicture: 'index'
                },
                // file: '',
                // fileList: '',
                fileListData: [],
                param: {}

            }
        },
        mounted() {
            this.getAlldata();
        },
        methods: {
            close() {
                this.$refs.upload.clearFiles(); //清空图片数组的
                 this.getAlldata();
            },
            //提交文件
            submitUpload() {
                this.$refs.upload.submit();
            },
            //删除文件之前的钩子函数
            handleRemove(file, fileList) {},
            //点击列表中已上传的文件事的钩子函数
            handlePreview(file) {
                // console.log(file);
            },
            beforeupload(file) {
                // console.log(file);
            },
            puictureClick() {
                this.upPuictureDialogForm = true;
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
                    moduleName: 'index'
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt5kb;

            },
            //默认进来查询所有的报名人员的数据信息
            getAlldata() {
                getHomePagePicture().then((
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
                            var homeData = [];
                            for (let i = 0; i < data.result.length; i++) {
                                homeData.push({
                                    id: data.result[i].id,
                                    competitionPresentationId: data.result[i].competitionPresentationId,
                                    url: api.PRO_HOST + "/CrossCountrySys/" + data.result[i].url,
                                    indexSelectState: data.result[i].indexSelectState
                                })
                            }
                            this.tabledata = homeData;
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
                return index++;
            },
            // 新增
            addAndup() {},
            //修改
            SelectionEdit(index, row, indexSelectState) {
                HomePictureXYQY(row.id, indexSelectState).then((data) => {
                    if (data.success) {
                        let message = '弃用成功';
                        if (indexSelectState == '1') {
                            message = "选用成功"
                        }
                        this.$message({
                            type: 'info',
                            message: message
                        });
                           this.getAlldata();
                    }
                })
            },
            AbandoningEdit(index, row) {},
            //删除
            handledelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((action) => {
                      deleteImage(row.id).then((data) => {
                        if (data.success) {
                             this.$message({
                                    type: 'info',
                                    message: '已删除原有图片',
                                    duration: 1000
                                });
                                this.getAlldata();

                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除原有图片失败',
                                duration: 1000
                            });
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

        },


    }
</script>

<style lang="scss">
    #HomePageManage {
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
    }

    #scPiucturelogqxxg {
        .el-dialog {
            width: 36%;
        }

    }
</style>
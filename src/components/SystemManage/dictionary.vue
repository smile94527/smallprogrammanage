<template>
    <div id="dictionaryPageManage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>系统字典管理</label>
                </el-col>
                   <el-col :span="1" style="margin-top: 7px; float:right;    margin-right: 29px;" class="addnew">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="toggle('Add') "><i
                            class="el-icon-circle-plus"></i>新增
                    </el-button>
                </el-col>
            </el-row>
            <!-- <el-row style="padding-bottom: 7px;" :gutter="0"> -->
                <!-- <el-col :span="6" id="feedbackType" class="feedbackType">
                    <label>系统字典类型</label>
                    <el-select v-model="value1" style="    margin-left: 10px;">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item1 in typeSelectArr" :key="item1.value" :label="item1.value"
                            :value="item1.key" @change="getAllTableData()">
                        </el-option>
                    </el-select>
                </el-col> -->
                <!-- <el-col :span="1" style="margin-top: 7px;">
                    <el-button type="primary" size="mini" style="width: 45px;    height: 26px"
                        @click="getAlldata(1, pageSize)"> 查询
                    </el-button>
                </el-col>-->
             

            <!-- </el-row> -->
        </div>
        <div class="contentPage">
            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border style="width: 100%"
                id="taskManTable" :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
                <el-table-column prop="typeName" label="赛事名称">
                    <!-- <template slot-scope="scope">
                        <span>{{setTable_TypeHandle(scope.row.typeName)}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="key" label="编码"></el-table-column>
                <el-table-column prop="value" label="名称"></el-table-column>
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <span>{{setTableHandle(scope.row.enabled)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
                id="dictionaryDialog">
                <el-form ref="dictionaryFormLog" :model="form" :label-position="labelPosition" :rules="rules"
                    label-width="100px" class="demo-ruleForm" style="color:black">
                    <!-- <el-form-item label="赛事名称" prop="type" width="200">
                        <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in typeSelectArr" :key="item.key" :label="item.value"
                                :value="item.key"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="编码" prop="key" width="200" class="is-required">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="名称" prop="value" width="200">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" prop="enabled">
                        <el-select v-model="form.enabled" placeholder="请选择" style="    width: 100%;">
                            <el-option label="有效" value="1"></el-option>
                            <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序" prop="sortNo" width="200">
                        <el-input v-model.number="form.sortNo" auto-complete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="cancelHandel('formData')">取 消</el-button>
                    <el-button size="small" type="primary" @click="submitForm('dictionaryFormLog')">确 定</el-button>
                </div>

            </el-dialog>
        </div>

    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import {
        searchDictionaryManList,
        addUpdateDictionaryManList,
        deleteDictionaryManList,
        searchDictionarySelectList,
        judgeDictionaryKey
    } from '../../services/index.js'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            var KeyFlag = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('编码不能为空！'));
                } else {
                    if (this.oldKey != value) {
                        judgeDictionaryKey(this.form.id, this.form.type, value).then(result => {
                            if (!result) {
                                return callback(new Error('编码已存在！'));
                            } else {
                                return callback()
                            }
                        })
                    }

                }
            };
            return {
                loading: true,
                // 下拉框数据
                selectData: [{
                    name: "type",
                    options: [{
                        value: null,
                        label: '全部'
                    }]
                }],
                // 下拉框集合
                selectObj: {
                    type: "",
                },
                dataModel: [], //下拉框遍历依靠
                value1: '',
                minBtns: ['Add'], //本页按钮
                allBtns: [], // 总按钮
                labelPosition: 'right',
                tableData: [],
                heightItem: window.innerHeight - 180, // 计算表格的高度，
                dialogFormVisible: false, //是否显示弹出框
                form: {}, // 新增弹出框
                formIndex: -1,
                oldform: {}, // 取消新增后重置
                oldKey: '', // 旧的form表单修改时的key编码值
                updateIndex: '',
                dialogTitle: '', //弹出框的title
                typeSelectArr: [], // 下拉框
                rules: {
                    type: [{
                        required: true,
                        message: '类型不能为空',
                        trigger: 'blur'
                    }],
                    value: [{
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }],
                    sortNo: [{
                        required: true,
                        message: '排序号不能为空',
                        // trigger: 'blur'
                    }, {
                        type: 'number',
                        message: '必须为数字值',
                        // trigger: 'blur'
                    }],
                    key: [{
                        validator: KeyFlag,
                        trigger: 'blur'
                    }]
                }


            }

        },
        methods: {
            getAllTableData() {
                 var param = this.$route.query;
                searchDictionaryManList(param.id).then((result) => {
                    if (result.code == "403") {
                        Cookies.remove('TokenKey')
                        this.$router.push({
                            name: 'Login'
                        });
                        this.loading = false;
                        return;
                    } else {
                        if (result.result.length > 0) {
                            this.tableData = result.result;
                            if (result.success) {
                                this.loading = false;
                            }
                        }
                    }


                })
            },
            toggle(val) {
                if (val == "Add") {
                    this.addTaskHandle();
                }
            },
            addTaskHandle() { //新增功能
             var param = this.$route.query;
                this.form = {
                    id:'',
                    type: param.id, //类型先默认
                    key: '', //编码
                    value: '', //名称，
                    sortNo: '', //排序
                    enabled: '1', //是否有效
                    userId: this.$store.state.user.userId,
                };
                this.dialogFormVisible = true;
                this.dialogTitle = '增加系统字典'
            },
            // 表格内部处理
            setTableHandle(res) {
                if (res == 1) {
                    return '有效'
                } else if (res == 0) {
                    return '无效'
                }
            },
            // 表格内部的类型处理
            setTable_TypeHandle(res) {
                let val = ''
                this.typeSelectArr.map((item, index) => {
                    if (res == item.key) {
                        val = item.value;
                    }
                })
                return val
            },
            // select发生变化进行查询表格数据
            selectChangeHandle(val) {
                var _this = this;
                val.map((item, index) => {
                    switch (index) {
                        case 0:
                            _this.selectObj.type = item.value1
                            break;
                    }
                })

            },
            // 取消新增操作
            cancelHandel() {
                this.dialogFormVisible = false;
                this.$refs['dictionaryFormLog'].resetFields(); // 清空表单里的验证
                for (var m in this.form) {
                    this.form[m] = this.oldform[m]
                }
            },
            // 确定新增数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateIndex = this.updateIndex ? this.updateIndex : ''
                        let obj = {
                            id: this.form.id,
                            type: this.form.type, //类型
                            key: this.form.key, //编码
                            value: this.form.value, //名称
                            enabled: this.form.enabled, //是否有效
                            sortNo: this.form.sortNo, //排序
                            userId: this.form.userId // 登录人（用户ID）
                        }
                        addUpdateDictionaryManList(obj).then((result) => {
                            if (result.success) {
                                // 加载系统字典数据
                                // searchDictionaryManList('').then((result) => {
                                //     this.tableData = result.result;
                                // })
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                });
                                 this.dialogFormVisible=false;
                                this.getAllTableData();
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
            // 表格修改
            handleEdit(index, row) {
                  var param = this.$route.query;
                this.form = {
                    id:row.id,
                    type: param.id, //类型先默认
                    key: row.key, //编码
                    value: row.value, //名称，
                    sortNo: row.sortNo, //排序
                    enabled: '1', //是否有效,
                     userId: this.$store.state.user.userId,
                };
                this.dialogFormVisible = true;
                this.dialogTitle = '修改系统字典'
                // this.updateIndex = this.tableData[index].id;
                // this.form = this.tableData[index];
                // this.oldKey = this.tableData[index].key
                // this.oldform = {
                //     ...this.tableData[index]
                // }
                // this.dialogTitle = '修改系统字典'
                // this.dialogFormVisible = true;

            },
            // 表格删除数据
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDictionaryManList(this.tableData[index].id).then((result) => {
                        if (result.success) {
                            // searchDictionaryManList('').then((result) => {
                            //     this.tableData = result.result;
                            // });
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // this.dialogFormVisible=false;
                            this.getAllTableData();
                        } else {
                            this.$message({
                                type: 'success',
                                message: '删除失败!'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },

        },
        created() {
            //加载系统字典下拉
            searchDictionarySelectList().then((result) => {
                if (result.code == "403") {
                    Cookies.remove('TokenKey')
                    this.$router.push({
                        name: 'Login'
                    })
                    return;
                } else {
                    if (result.result.length > 0) {
                        // this.divisionId = data.result[0].key
                        this.typeSelectArr = result.result;
                        this.getAllTableData();

                    } else {
                        this.typeSelectArr = [];
                        this.getAllTableData();
                    }
                }
            })
            // 加载系统字典数据
        },
        mounted() {
            const that = this
            window.onresize = () => { //用于处理
                return (() => {
                    that.heightItem = window.innerHeight - 160
                })()
            }
        },

    }
</script>
<style lang="scss">
    #dictionaryPageManage {
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

    #dictionaryDialog {
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
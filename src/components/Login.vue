<template>
    <div class="loginA">
        <div style="display: flex;
    margin-left: 5%;
    width: 40%;
    padding-top: 18px;">


            <!-- <el-image  src='../assets/loge_jy.jpg' style="width: 100px; height: 100px"></el-image> -->
            <span class="title">交运竞赛网络报名系统</span>
        </div>
        <div class="login">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item style=" width: 100%;
    margin-top: -20px;
    text-align: center;
    padding-left: 20px;">
                    <h3 style="    font-size: 25px;
        margin-left: 14%;
    color: white;
    font-weight: 200;
    ">欢迎登陆</h3>
                </el-form-item>
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username" autocomplete="on"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="on"></el-input>
                </el-form-item>

                <div class="box clearfix">
                    <span class="lf" @click="clearCookie"
                        style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 5px;">{{message}}</span>
                    <!-- <span class="lf" @click="clearCookie"
                        style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 5px;">忘记密码？</span> -->
                    <!-- <div class="rt">
                        <el-checkbox v-model="checked" style="color:#a0a0a0;">一周内自动登录</el-checkbox>
                    </div> -->
                </div>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="    width: 31%;
    margin-left: 31%;">登录</el-button>
                    <!--  <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>

    </div>


</template>

<script>
    import {
        isvalidUsername
    } from '../utils/validate'
    import Cookies from 'js-cookie'
    import {
        userLoginController
    } from '../services/index.js'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => {
                if (value.length < 1) {
                    callback(new Error('请输入密码'))
                } else {
                    callback()
                }
            }
            return {

                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    // username: [{
                    //         required: true,
                    //         message: '请输入账号',
                    //         trigger: 'blur'
                    //     },
                    //     {
                    //         min: 4,
                    //         max: 16,
                    //         message: '长度在 6 到 16 个字符',
                    //         trigger: 'blur'
                    //     }
                    // ],
                    // password: [{
                    //         required: true,
                    //         message: '请输入密码',
                    //         trigger: 'blur'
                    //     },
                    //     {
                    //         min: 6,
                    //         max: 16,
                    //         message: '长度在 6 到 16 个字符',
                    //         trigger: 'blur'
                    //     }
                    // ]
                    username: [{
                        required: true,
                        // message: '请输入用户名',
                        trigger: 'blur',
                        validator: validateUsername
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass
                    }]
                },
                checked: false,
                message: '',

            };
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo,
                userId: state => state.user.userId
            })
        },
        created() {
            let that = this;
            document.onkeypress = function (e) {
                var keycode = document.all ? event.keyCode : e.which;
                if (keycode == 13) {
                    that.submitForm('ruleForm'); // 登录方法名
                    return false;
                }
            };
        },
        //页面加载调用获取cookie值
        mounted() {
            this.getCookie();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const self = this;
                        userLoginController(self.ruleForm.username, self.ruleForm.password).then((data) => {
                            if (data.success) {
                                this.message = '';
                                //  const TokenKey = 'token'
                                //  const UserIdKey = 'UserId'
                                Cookies.set("TokenKey", data.result.token);
                                this.$store.dispatch('getToken', data.result.token);
                                this.$store.dispatch('getUserid', data.result.userId);

                                //     this.$router.push({name: 'Home',
                                //         params: {
                                //             user: self.ruleForm.username,
                                //             pwd: self.ruleForm.password
                                //         }
                                //    });
                                this.$router.push({
                                    // path: '/manage/teamPage'
                                    path: '/pothunterPage'
                                    // name:teamPage
                                })
                            } else {
                                // this.message = data.message
                                this.$message({
                                    type: 'error',
                                    message: data.message
                                });

                            }
                        });
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },

            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            //  console.log(arr2[1])
                            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'password') {
                            // console.log(arr2[1])
                            this.ruleForm.password = arr2[1];
                        }
                    }
                    this.checked = true;
                }
            },
            //清除cookie
            clearCookie: function () {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .login .el-form {
        border-radius: 10px;
        text-align: center;
        padding: 20px;
        /* background: #ebbb3b;
        background: -moz-linear-gradient(top, #ebbb3b 0%, #ffffff 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ebbb3b), color-stop(100%, #ffffff));
        background: -webkit-linear-gradient(top, #ebbb3b 0%, #ffffff 100%);
        background: -o-linear-gradient(top, #ebbb3b 0%, #ffffff 100%);
        background: -ms-linear-gradient(top, #ebbb3b 0%, #ffffff 100%);
        background: linear-gradient(to bottom, #ebbb3b 0%, #ffffff 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#ffffff', GradientType=0); */
    }

    .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 15px !important;
        color: white !important;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .el-form-item__content {
        line-height: 40px;
        position: relative;
        font-size: 14px;
        float: left;
        width: 69%;
        margin-left: -1px !important;
    }

    .loginA {
        width: 100%;
        height: 100%;
        margin: auto;
        /* background: url(); */
        /* background: url("/assets/login2.jpg") no-repeat center; */
        background-size: 100% 100%;
        background: url('../assets/login3.jpg');
        background-repeat: no-repeat;
        background-position: center;
        min-height: 708px;
        min-width: 1366px;
    }

    .login {
        min-width: 350px;
        width: 25%;
        margin: auto;
        padding-top: 8%;
        border-radius: 10px;
        margin-left: 51%;
    }

    .el-button--primary {
        color: #FFF;
        background-color: #6bc2f5;
        border-color: #6bc2f5;

    }

    .el-button--primary:hover {
        color: #FFF;
        background-color: #5ab4e9;
        border-color: #5ab4e9;
    }

    .title {
        font-size: 26px;
        font-weight: 400;
        color: #87f1f9;
        font-family: sans-serif;
        margin-top: 35px;
    }

    .lf {
        float: left;
    }

    .box {
        min-width: 350px;
        margin-left: 50px;
        width: 30%;
    }

    .rf {
        float: right;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }

    .clearfix {
        *zoom: 1;
    }
</style>
<template>
    <div id="pothunterPage" class="contentPage">
        <div class="tiaojian">
            <el-row style="margin-bottom:7px" :gutter="0">
                <el-col :span="8" class="feedbackType" style="font-size: 16px;
    font-weight: 600;
    color: rgb(245, 125, 1);">
                    <label>赛事报名人员清单</label>
                </el-col>
                <!-- <el-col :span="1" style="position: relative;float: right;    margin-top: 10px;">
                    <el-button type="primary" size="mini" style="width: 45px;" @click="secedeMethod()">退出
                    </el-button>
                </el-col> -->
            </el-row>
            <el-row style="" :gutter="0">
                <el-col :span="6" id="feedbackType" class="feedbackType">
                    <label>赛事名称：</label>
                    <el-select v-model="divisionId" style="width:62%" @change="getcontestantGroup()">
                        <el-option v-for="item in MathData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="feedbackType">
                    <label>参赛组别：</label>
                    <el-select placeholder="请选择参赛组别" v-model="groupID" style="width:62%" @change="onSelectedDrug()">
                        <el-option value="">请选择</el-option>
                        <el-option v-for="item in Mathdatazb" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>

                </el-col>

                <el-col :span="6" class="feedbackType">

                    <label>参赛人身份证号：</label>
                    <el-input v-model="certificateCode" placeholder="请输入内容" style="width:49%"></el-input>

                </el-col>
                <el-col :span="6" class="feedbackType">

                    <label>参&nbsp;赛&nbsp;人&nbsp;：</label>
                    <el-input v-model="userName" placeholder="请输入团队名称" style="width:62%"></el-input>

                </el-col>

            </el-row>
            <el-row style="padding-bottom: 7px;" :gutter="0">

                <el-col :span="6" class="feedbackType">
                    <label>是否支付：</label>
                    <el-select placeholder="请选择是否支付" v-model="applyId" style="width:62%"
                        @change="onSelectedDrug($event)">
                        <el-option value=" ">请选择</el-option>
                        <el-option label="已支付" value="1"></el-option>
                        <el-option label="未支付" value="0"></el-option>
                        <el-option label="已退款" value="2"></el-option>
                    </el-select>

                </el-col>
                <el-col :span="6" class="feedbackType">
                    <label>团队名称：</label>
                    <el-input v-model="teamName" placeholder="请输入团队名称" style="width:62%"></el-input>
                    <!-- <div class="grid-content bg-purple-light">ssss</div> -->
                </el-col>
                <el-col :span="6" class="feedbackType">
                    <label>领队&nbsp;身&nbsp;份&nbsp;证号：</label>
                    <el-input v-model="ld_certificateCode" placeholder="请输入内容" style="width:50%"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" size="mini" style="width: 45px;    margin-top: 10px;"
                        @click="getAlldata(1, pageSize)"> 查询
                    </el-button>
                    <el-button type="primary" size="mini" style="width: 45px;    margin-top: 10px;"
                        @click="export2Excel"><i class="el-icon-printer"></i> 导出
                    </el-button>

                </el-col>
            </el-row>

        </div>
        <div class="contentPage" id="cont">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="Bmdata" :max-height="heightItem" border
                style="width: 100%;border-radius: 10px;" height='90%' :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}" id="bm_table">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="60px">
                </el-table-column>
                <!-- <el-table-column prop="competitionName" label="赛事名称" fixed></el-table-column> -->
                <el-table-column prop="contestantName" label="参赛人" width="120px"></el-table-column>
                <el-table-column prop="contestantSex" label="性别" width="60px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contestantSex=='1'">男</span>
                        <span v-else>女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="contestantNationality" label="国家"></el-table-column>

                <el-table-column prop="contestantCertificateCode" label="参赛人证件号码" width="190px"></el-table-column>
                <el-table-column prop="contestantBirthday" label="年龄" width="60px">
                    <template slot-scope="scope">
                        <span>{{getage(scope.row.contestantBirthday)}}</span>

                    </template>

                </el-table-column>
                <el-table-column prop="contestantPhone" label="参赛电话" width="120px"></el-table-column>
                <el-table-column prop="contestantGroup" label="参赛组别" width="120px"></el-table-column>
                <el-table-column prop="contestantDivisionName" label="参赛项目" width="180px"></el-table-column>
                <el-table-column prop="contestantDivisionPrice" label="报名费用" style="color:#f57d01">
                    <template slot-scope="scope">
                        <span style="color:#f57d01">{{scope.row.contestantDivisionPrice}}</span>

                    </template>
                </el-table-column>
                <el-table-column prop="whetherPay" label="是否支付">
                    <template slot-scope="scope">
                        <span v-if="scope.row.whetherPay=='1'" style="color:#f57d01">已支付</span>
                        <span v-else-if="scope.row.whetherPay=='2'" style="color:#f57d01">已退款</span>
                        <span v-else>未支付</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="contestantPicture" label="参赛照片地址" width="130px"></el-table-column> -->
                <el-table-column prop="teamName" label="团队名称" width="210px"></el-table-column>
                <el-table-column prop="teamLeaderName" label="团队领队"></el-table-column>
                <el-table-column prop="teamLeaderPhone" label="领队电话" width="150px"></el-table-column>

                <el-table-column prop="bloodType" label="血型"></el-table-column>
                <el-table-column prop="clothesSize" label="衣服尺码"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <!-- <el-table-column prop="teamLeaderCertificateCode" label="领队身份证号" width="220px"></el-table-column> -->
                <el-table-column label="操作" width='100px'>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" style="width:57px;"
                            @click="printMethod(scope.$index, scope.row)">
                            打印
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" style="margin-top:10px">
            </el-pagination>

        </div>
        <!-- <el-dialog id="printMe"  title="竞赛证" > -->
        <!-- <div  id="printMe"  style="width:200px;height:200px;    border: 1px solid red;
    background: darkred;margin-left: 30%;margin-top: 30%;">
                <p>jshdajsdksa</p>
                 <p>jshdajsdksa</p>
            </div> -->
        <!-- </el-dialog> -->
        <el-dialog title="" :visible.sync="dialogFormVisibleqx" :close-on-click-modal="false" id="printDialogqxxg">
            <section ref="print" id='print' :style="{width:'255.12px',height:'368.5px',color: 'black'}">
                <img :src="img" style="width:100%;height:100%;">
                <div
                    style="width: 100%;height: 100px;margin-top: -243px;position: relative;float: right;text-align: center;">
                    <div style="width: 84px;height: 100px;display: flex;justify-content: center;align-items: center;margin-left: 155px;
    margin-top: -10px; ">
                        <img style="width: 84px;height: 100px" id="oImg" :src="objTc.picture">
                        <!-- <img   id="oImg"  :src="img22"> -->

                        <!-- <el-image :src="img22" :fit="fits"></el-image> -->
                    </div>
                    <div>
                        <span
                            style="display: flex; height: 19px;line-height: 20px;width: 90px;margin-left: 63px; margin-top: -24px;"
                            class="h_l"><label style=" font-size: 10px;text-align: center; width: 100%;-webkit-text-size-adjust: none;
    color: #463e3c;">{{objTc.name}}</label>
                        </span>
                        <span
                            style="display: flex; margin-top: 0px;height: 20px;line-height: 19px; width: 90px;margin-left: 65px;"
                            class="h_l"><label style="font-size: 10px; -webkit-text-size-adjust: none;width: 100%;
    color: #463e3c;text-align:center;">{{objTc.group}}</label>
                        </span>
                        <span v-if='objTc.ID_number.length>8' style="display: flex;margin-top: -3px;height: 19px;line-height: 19px;width:130px;
    margin-left: 65px;" class="h_l"><label
                                style="font-size: 10px;-webkit-text-size-adjust: none;text-align: center;color: #463e3c;width: 100%;">{{objTc.ID_number}}</label>
                        </span>
                        <span v-else style="display: flex;margin-top: -3px;height: 19px;line-height: 19px;width: 90px;
    margin-left: 65px;" class="h_l"><label style="font-size: 10px; -webkit-text-size-adjust: none;
    color: #463e3c;width: 100%;    text-align: center;
    padding-left: 5px;">{{objTc.ID_number}}</label>
                        </span>
                        <template v-if="objTc.project.length=='4'">
                            <span
                                style="display: flex;  margin-top: 2px; height: 19px;line-height: 16px;width: 188px;margin-left: 65px;"
                                class="h_l"><label style="font-size: 10px;-webkit-text-size-adjust: none;text-align: left;padding-left: 5px;
    color: #463e3c;width: 100%;">{{objTc.project[0]}}&nbsp;{{objTc.project[1]}}</label>
                            </span>
                            <span
                                style="display: flex;  margin-top: 2px; height: 19px;line-height: 16px;width: 188px;margin-left: 65px;"
                                class="h_l"><label style="font-size: 10px;-webkit-text-size-adjust: none;
    color: #463e3c;width: 100%;    text-align: left;
    padding-left: 5px;">{{objTc.project[2]}}&nbsp;{{objTc.project[3]}}</label>
                            </span>
                        </template>
                        <template v-if="objTc.project.length=='3'">
                            <span
                                style="display: flex;  margin-top: 2px; height: 19px;line-height: 16px;width: 188px;margin-left: 65px;"
                                class="h_l"><label style="font-size: 10px;-webkit-text-size-adjust: none;
    color: #463e3c;width: 100%;    text-align: left;
    padding-left: 5px;">{{objTc.project[0]}}&nbsp;{{objTc.project[1]}}</label>
                            </span>
                            <span v-if='objTc.project[2].length>6'
                                style="display: flex;  margin-top: 2px; height: 19px;line-height: 16px;width: 188px;margin-left: 65px;"
                                class="h_l"><label style="font-size: 10px;    -webkit-text-size-adjust: none;
    color: #463e3c;width: 100%;    text-align: left;
    padding-left: 3px;">{{objTc.project[2]}}</label>
                            </span>
                            <span v-else
                                style="display: flex;margin-top: -1px; height: 19px;line-height: 16px; width: 53%;margin-left: 27%;"
                                class="h_l"><label
                                    style="font-size: 10px;width: 100%;  -webkit-text-size-adjust: none;text-align: left;padding-left: 5px;color: #463e3c;">{{objTc.project[2]}}</label>
                            </span>

                        </template>
                        <template v-if="objTc.project.length<='2'">
                            <span v-for="(item,index) in objTc.project" :key="index"
                                style="display: flex;  margin-top: 2px; height: 19px;line-height: 16px;width: 188px;margin-left: 65px;"
                                class="h_l">
                                <label
                                    style="font-size: 10px;-webkit-text-size-adjust: none; width: 90px;text-align: center;padding-left: 5px;color: #463e3c;">{{item}}&nbsp;</label>
                            </span>
                        </template>
                    </div>
                </div>
            </section>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="qxtiqx()">取 消</el-button>
                <!-- <el-button size="small" type="primary" @click="getPdf">打印参赛证</el-button> -->
                <el-button size="small" type="primary" @click="printOut() ">打印参赛证</el-button>
                <!-- <el-button size="small" type="primary" @click="submitqx">打印参赛证</el-button> -->
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import Cookies from 'js-cookie'
    import html2canvas from 'html2canvas';
    import JsPDF from 'jspdf'
    import api from '../../api';
    import {
        getPothunterData,
        getMatchData,
        getcontestantGroup,
        getcontestantDivisionName,
        getPothunterDCdata,
        printBase64
    } from '../../services/index.js'
    export default {
        data() {
            return {
                img: require('../../assets/csz2.jpg'),
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
                dialogFormVisibleqx: false,
                input: '',
                items: '',
                objTc: {
                    name: '',
                    sex: '',
                    picture: '',
                    group: '',
                    ID_number: '',
                    ID_number2:'',
                    team_Name: '',
                    project: [],
                },
                listData: [],
                htmlTitle: '参赛证',
                img22: "https://www.tcloudlink.com.cn/files/548859356586704896.jpg",
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                imgResponse: '',
            }
        },
        mounted() {
            this.getMatchAllData();

        },
        methods: {
            //htmlCanves打印
            dataURLToBlob(dataurl) { //ie 图片转格式
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                    type: mime
                })
            },
            downloadResult(name) {
                // let canvasID = document.getElementById('print');
                let cntElem = document.getElementById('print');
                let shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
                let width = shareContent.offsetWidth; //获取dom 宽度
                let height = shareContent.offsetHeight; //获取dom 高度
                let canvas = document.createElement("canvas"); //创建一个canvas节点
                let scale = 10; //定义任意放大倍数 支持小数
                canvas.width = width * scale; //定义canvas 宽度 * 缩放
                canvas.height = height * scale; //定义canvas高度 *缩放
                canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
                let opts = {
                    scale: scale, // 添加的scale 参数
                    canvas: canvas, //自定义 canvas
                    backgroundColor: null,
                    // logging: true, //日志开关，便于查看html2canvas的内部执行流程
                    width: width, //dom 原始宽度
                    height: height,
                    fontSize: '12px',
                    color: '#463e3c',
                    useCORS: true // 【重要】开启跨域配置
                }
                let a = document.createElement('a');
                html2canvas(cntElem, opts).then(canvas => {
                    var context = canvas.getContext('2d');
                    //     // 【重要】关闭抗锯齿
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
                    let dom = canvas;
                    dom.style.display = "block";
                    a.style.display = "block";
                    // document.body.removeChild(dom);
                    let blob = this.dataURLToBlob(dom.toDataURL("image/png"));
                    // console.log(blob);
                    a.setAttribute("href", URL.createObjectURL(blob));
                    // saveFile(canvas.toDataURL(),'参赛证.png');
                    a.setAttribute("download", name + ".png")
                    document.body.appendChild(a);
                    a.click();
                    URL.revokeObjectURL(blob);
                    document.body.removeChild(a);
                    this.dialogFormVisibleqx = false;
                });


            },

            downloadResult2(name) {
                let canvasID = document.getElementById('print');
                var mycanvas = document.createElement("canvas");

                let a = document.createElement('a');
                html2canvas(canvasID, {
                    // canvas:mycanvas,
                    backgroundColor: null,
                    useCORS: true,
                    logging: true, //日志开关，便于查看html2canvas的内部执行流程
                    timeout: 500, // 加载延时

                }).then(canvas => {
                    let dom = document.body.appendChild(canvas);
                    dom.style.display = "block";
                    a.style.display = "block";
                    document.body.removeChild(dom);
                    let blob = this.dataURLToBlob(dom.toDataURL("image/png"));
                    // console.log(blob);
                    a.setAttribute("href", URL.createObjectURL(blob));
                    // saveFile(canvas.toDataURL(),'参赛证.png');
                    a.setAttribute("download", name + ".png")
                    document.body.appendChild(a);
                    a.click();
                    URL.revokeObjectURL(blob);
                    document.body.removeChild(a);
                });
            },
            printOut() {
                this.Photosimg();
                this.dialogFormVisibleqx = false;
                // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
                //$(window).scrollTop(0); // jQuery 的方法
                document.body.scrollTop = 0; // IE的
                document.documentElement.scrollTop = 0; // 其他
                let name = this.objTc.name + '_'+ this.objTc.ID_number2;
                this.downloadResult(name)
            },
            //直接打印图片
            downloadIamge(imgsrc, name) { //下载图片地址和图片名
                var image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
            },
            downs() {
                this.downloadIamge(this.objTc.picture, 'pic')
            },
            //导成pdf格式
            getPdf() {
                var title = this.htmlTitle;
                let a = document.createElement('a');
                html2canvas(document.getElementById('print'), {
                    // allowTaint: true,
                    backgroundColor: null,
                    useCORS: true
                }).then(function (canvas) {
                    let dom = document.body.appendChild(canvas);
                    dom.style.display = "block";
                    a.style.display = "block";
                    const contentWidth = '255.12'
                    const contentHeight = '368.5'
                    const imgWidth = contentWidth + 5
                    const imgHeight = contentHeight + 12
                    const pageData = canvas.toDataURL('image/jpg')
                    let context = dom.getContext("2d");
                    context.translate(0, 0);
                    context.scale(2, 2);
                    const PDF = new JsPDF('', 'px', [imgWidth, imgHeight])
                    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                    // console.log(title)
                    PDF.save(title + '.pdf');
                })
            },
            //打印功能
            printMethod(index, row) {
                // api.PRO_HOST + "/CrossCountrySys/" + data.result[i].url
                this.objTc = {
                    name: row.contestantName,
                    picture: api.PRO_HOST + "/CrossCountrySys" + (row.contestantPicture.split('CrossCountryTest')[1] != undefined ? row.contestantPicture.split('CrossCountryTest')[1] : row
                        .contestantPicture.split('CrossCountry')[1]),
                    group: row.contestantGroup,
                    ID_number2: row.contestantCertificateCode,
                    ID_number:row.censusRegister !=null ? row.censusRegister : '' ,
                    team_Name: row.teamName,
                }
                let prj = row.contestantDivisionName.split(",");
                var data = []
                for (var i = 0; i < prj.length; i++) {
                    data.push(prj[i]);
                }
                this.objTc.project = data;
                if (row.contestantSex == 1) {
                    this.objTc.sex = "男";
                } else {
                    this.objTc.sex = "女";
                }
                let idl = row.contestantPicture.split(
                    'https://www.tcloudlink.com.cn/CrossCountryTest/fileUploadController/downFile/')[1];
                let idl2 = row.contestantPicture.split(
                    'https://www.tcloudlink.com.cn/CrossCountry/fileUploadController/downFile/')[1];
                let id = idl != undefined ? idl : idl2;
                api.printBase64 = '/CrossCountrySys/fileUploadController/downImgFile/' + id
                printBase64().then((data) => {
                    this.objTc.picture = 'data:image/jpeg;base64,' + data;
                    this.dialogFormVisibleqx = true;
                    this.Photosimg();
                });
                // this.$print(this.$refs.print);

            },

            //取消
            qxtiqx() {
                this.dialogFormVisibleqx = false;
            },
            // 确定
            submitqx() {
                this.$print(this.$refs.print);
            },
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
                    getMatchData("competition").then((data) => {
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
                            if (data.result.length > 0) {
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
                        if (data.result.length > 0) {
                            this.Mathdatazb = data.result;
                            this.onSelectedDrug()
                        } else {
                            this.loading = false;
                        }
                    });
            },
            //根据组别id获取所有的参赛项目
            onSelectedDrug() {
                getcontestantDivisionName(this.divisionId, this.groupID).then((data) => {
                    if (data.result.length > 0) {
                        this.groupData = data.result;

                    }
                });

            },

            //默认进来查询所有的报名人员的数据信息
            getAlldata(pageNo, pageSize) {
                this.currentPage = pageNo;
                this.pageSize = pageSize;
                let csdata = {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    competitionId: this.divisionId,
                    contestantGroupCode: this.groupID,
                    contestantDivisionId: this.projectiD,
                    contestantCertificateCode: this.certificateCode,
                    contestantName: this.userName,
                    whetherPay: this.applyId,
                    teamName: this.teamName,
                    teamLeaderCertificateCode: this.ld_certificateCode
                }
                getPothunterData(csdata).then((
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
                            this.pageNo = pageNo;
                            this.pageSize = pageSize;
                            this.Bmdata = data.result;
                            this.total = data.rowCount;
                            this.loading = false;
                        } else {
                            this.Bmdata = [];
                            this.total = data.rowCount;
                            this.loading = false;
                        }
                        this.loading = false;
                    }
                });

            },
            //序列号添加
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
                    contestantGroupCode: this.groupID,
                    contestantDivisionId: this.projectiD,
                    contestantCertificateCode: this.certificateCode,
                    contestantName: this.userName,
                    whetherPay: this.applyId,
                    teamName: this.teamName,
                    teamLeaderCertificateCode: this.ld_certificateCode
                }
                getPothunterDCdata(csdata).then((data) => {
                    if (data.result.length > 0) {
                        this.listData = data.result;
                        require.ensure([], () => {
                            const {
                                export_json_to_excel
                            } = require('../../../src/vendor/Export2Excel.js'); //Export2Excel.js
                            const tHeader = ['参赛人', '性别', '年龄', '国家', '参赛人证件号码', '参赛电话', '参赛组别', '参赛项目',
                                '报名费用', '是否支付',
                                '团队名称',
                                '团队领队',
                                '领队电话',
                                '血型', '衣服尺码', '邮箱'
                            ];
                            // 上面设置Excel的表格第一行的标题
                            const filterVal = ['contestantName', 'contestantSex', 'contestantBirthday',
                                'contestantNationality',
                                'contestantCertificateCode', 'contestantPhone',
                                'contestantGroup', 'contestantDivisionName',
                                'contestantDivisionPrice',
                                'whetherPay',
                                'teamName',
                                'teamLeaderPhone',
                                'teamLeaderName', 'bloodType', 'clothesSize', 'email'
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
                                if (list[i].whetherPay == '1') {
                                    list[i].whetherPay = "已支付"
                                } else if (list[i].whetherPay == '2') {
                                    list[i].whetherPay = "已退款"
                                } else {
                                    list[i].whetherPay = "未支付"
                                }
                                list[i].contestantBirthday = this.getage(list[i].contestantBirthday);
                            }
                            const data = this.formatJson(filterVal, list);

                            export_json_to_excel(tHeader, data, '田径赛报名人员清单');


                        })
                        // var  list =[];
                        // list= data.result;

                    }


                });

            },
            Photosimg() {
                let w = (document.getElementById("oImg").naturalWidth);
                let h = (document.getElementById("oImg").naturalHeight);
                // w=100;
                // h=80;
                // console.log(w)
                if (w > h) {
                    let bi = h/w ;
                    document.getElementById("oImg").style.width = 84 + 'px';
                    document.getElementById("oImg").style.height = 84 * bi + 'px';
                } else if (w < h) {
                    let bi = w/ h;
                    document.getElementById("oImg").style.width = 100 * bi + 'px';
                    document.getElementById("oImg").style.height = 100 + 'px';
                }

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
    #printDialogqxxg {
        .el-dialog {
            width: 300px;
            text-align: center;
        }

        p {
            line-height: 12px;
            font-size: 16px;
            font-weight: 400;
        }

        .csz {
            font-size: 30px;
            font-weight: 400;
            line-height: 32px;
        }

        .el-avatar,
        .baseInf {
            position: relative;
            float: left;
        }

        .baseInf {
            width: 69%;

        }

        .el-input__inner {
            border-radius: 0px;
            border: 0px solid #DCDFE6;
            border-bottom: 1px solid black;
            height: 25px;
            line-height: 25px;
        }

        .nameAndsex .el-input {
            width: 54%;
        }

        .nameAndsex p {
            width: 50%;
            text-align: left;
            padding-left: 10px;
            font-size: 14px;
            line-height: 0px;
            height: 16px;
        }

        .zb .el-input {
            width: 63%;
        }

        .zb {
            padding-left: 5px;
        }
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


    #pothunterPage {

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
    }

    #pothunterPage {
        min-height: calc(100% - 3px);
        background-color: #eceff4;
        width: 100%;

        .el-table th.gutter {
            display: table-cell !important;
        }
    }

    #pothunterPage .el-row {
        margin-bottom: 7px;
        margin-left: 20px;
    }

    #pothunterPage .el-table td,
    .el-table th.is-leaf {
        border-bottom: 1px solid #EBEEF5;
        text-align: center;
        font-weight: 400;
        color: black;
    }

    #pothunterPage .sub-lefticon {
        font-size: 16px;
        color: #adadad;
        margin: 0 4px;
    }

    #pothunterPage .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }

    #pothunterPage .el-button {
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

    #pothunterPage .el-form-item {
        position: relative;
        float: left;
        width: 50%;
        z-index: 3;
    }

    #pothunterPage .el-input {
        /* width: 89%;
        right: -19px; */
    }

    #pothunterPage .el-select {
        width: 99%;
    }

    #pothunterPage .top_btn {
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
//开发环境
const SAT_HOST = 'http://localhost:8080';
// const SAT_HOST = 'http://120.27.70.24:8082'
//  const SAT_HOST = 'http://192.168.11.185:8080'
//生产
const PRO_HOST = 'http://124.70.79.167'
    // const PRO_HOST = 'http://120.27.70.24:8083'
    // const PRO_HOST = 'http://192.168.43.248:8080'
    // CrossCountryTestSys
    //CrossCountrySys

// 用户登录
const UserLogin_API = '/CrossCountrySys/loginController/login'
    // 查询用户登录信息
    //报名查询接口1
const Enrolment_enquiry = '/CrossCountrySys/applyDetailMessageController/searchData'
    //出行服务

//出行服务项目清单-分页查询
const Enrolment_enquiry2 = '/CrossCountrySys/applyDetailMessageController/searchTravelServiceData'
    //赛事名称查询
const getMatchData = '/CrossCountrySys/applyDetailMessageController/searchCompetitionAllData'
    //根据赛事名称获取参赛组别
const getcontestantGroup = '/CrossCountrySys/applyDetailMessageController/searchCompetitionGroupAllData'

//根据组别id获取参赛项目
const getcontestantDivisionName = '/CrossCountrySys/applyDetailMessageController/searchCompetitionGroupProjectNameAllData'
    //报名清单查询
const getPothunterData = '/CrossCountrySys/applyDetailMessageController/searchDataGroupByProjectName'
    //出行服务报名清单查询
const getPothunterData2 = '/CrossCountrySys/applyDetailMessageController/searchTravelServiceDataGroupByProjectName'
    //赛事名称查询//
    //报名清单导出查询
const getPothunterDCdata = '/CrossCountrySys/applyDetailMessageController/searchAllDataGroupByProjectName'
    //出行服务报名清单导出查询
const getPothunterDCdata2 = '/CrossCountrySys/applyDetailMessageController/searchTravelServiceAllDataGroupByProjectName'
    //项目清单导出查询
const Enrolment_enquiryDcdata = '/CrossCountrySys/applyDetailMessageController/searchAllData'
    //出行服务项目清单导出查询
const Enrolment_enquiryDcdata2 = '/CrossCountrySys/applyDetailMessageController/searchTravelServiceAllData'

//赛事管理页面查询
const getAlleventManagementData = '/CrossCountrySys/competitionController/searchData'
    //赛事管理赛事新增、修改
const upEventManagementData = '/CrossCountrySys/competitionController/saveData'
    //赛事管理赛事新增、修改
const deleteEventManagementData = '/CrossCountrySys/competitionController/deleteById'
    //验证赛事下是否存在组别信息
const verificationGroup = '/CrossCountrySys/competitionController/verificationGroup'

//验证赛事下是否存在组别信息
const verificationUser = '/CrossCountrySys/competitionController/verificationUser'

//赛事组别项目分页查询
const groupManage = "/CrossCountrySys/divisionController/searchData"

//赛事组别项目分页查询
const groupManageUpAndAdd = "/CrossCountrySys/divisionController/saveData"
    //赛事组别项目分页查询
const groupManageDelete = "/CrossCountrySys/divisionController/deleteById"
    //赛事组别新增修改验证
const verificationProjectName = '/CrossCountrySys/divisionController/verificationProjectName'

const verificationBusinessData = '/CrossCountrySys/divisionController/verificationBusinessData'
    //退款页面查询
const getrefundData = '/CrossCountrySys/refundMessageController/searchData'
    //出行服务退款页面查询
const getrefundData2 = '/CrossCountrySys/refundMessageController/searchTravelData' //refundMessageController/searchTravelData

const refund = '/CrossCountrySys/refundController/refund'
    //图片管理页面查询
const getPictureData = '/CrossCountrySys/competitionPresentationController/searchData'
    //图片管理页面新增修改
const upAddaddPicture = '/CrossCountrySys/competitionPresentationController/saveData'
    //图片管理页面新增修改
const deletePicture = '/CrossCountrySys/competitionPresentationController/deleteById'
    //图片上传

const uploadPuicture = '/CrossCountrySys/competitionImgController/saveData'

// 查询赛事介绍图片
const getImage = '/CrossCountrySys/competitionImgController/searchImgAllData'

const deleteImage = '/CrossCountrySys/competitionImgController/deleteImgById'

//获取所有的属性字段
const getAllQuality = '/CrossCountrySys/columnConfigurationController/searchAllData'

//根据赛事ID查询赛事已有的字段
const getPartQuality = "/CrossCountrySys/columnConfigurationController/searchAllDataByCompetitionId"
    //保存赛事字段配置
const AddYXQuality = "/CrossCountrySys/competitionController/insertCompetitionColumnList"
    //查询所有用过的图片
const getHomePagePicture = '/CrossCountrySys/competitionImgController/searchAllData'
    // 选用/弃用 首页顶部轮播图
const HomePictureXYQY = '/CrossCountrySys/competitionImgController/saveIndexData'
    //字典管理
    /*系统字典-查询系统字典下拉框数据
     **参数
     */
const searchDictionarySelectdata_API = '/CrossCountrySys/sysDictionariesController/searchAllGroupData'

/*系统字典-查询系统字典数据
 **参数
 */
const searchDictionaryAlldata_API = '/CrossCountrySys/sysDictionariesController/searchAllData'

/*系统字典-查询系统字典数据
 **参数
 */
const addUpdateDictionary_API = '/CrossCountrySys/sysDictionariesController/saveData'

/*系统字典-系统字典删除
 **参数
 */
const deleteDictionary_API = '/CrossCountrySys/sysDictionariesController/deleteById'

/*系统字典-判断系统字典的key，用户新增时是否已经存在
 **参数
 */
const judgeDictionaryKey_API = '/CrossCountrySys/sysDictionariesController/verificationRepeat'
    /*系统字典-删除系统字典时作验证(验证关联关系(是否存在下级岗位))
     **参数
     */
const deletejudgeDictionaryByChild_API = '/CrossCountrySys/sysTitleController/verificationIncidenceRelationByChildren'

/*系统字典-验证关联关系(是否存在关联用户)
 **参数
 */
const deletejudgeDictionaryByUser_API = '/CrossCountrySys/sysTitleController/verificationIncidenceRelationByUser'
    // 赛事属性管理查询(分页)
const AttributeAllData = '/CrossCountrySys/columnConfigurationController/searchData'
    // 赛事属性管理新增，修改
const AttributeAddandUp = '/CrossCountrySys/columnConfigurationController/saveData'
    //赛事管理删除
const deleteAttribute = '/CrossCountrySys/columnConfigurationController/deleteById'

const printBase64 = '/CrossCountrySys/fileUploadController/downImgFile'
export default {
    SAT_HOST,
    //  UAT_HOST,
    PRO_HOST,
    Enrolment_enquiry,
    UserLogin_API,
    getMatchData,
    getcontestantGroup,
    getcontestantDivisionName,
    getPothunterData,
    getPothunterDCdata,
    Enrolment_enquiryDcdata,
    getAlleventManagementData,
    upEventManagementData,
    deleteEventManagementData,
    verificationGroup,
    verificationUser,
    groupManage,
    groupManageUpAndAdd,
    groupManageDelete,
    verificationProjectName,
    verificationBusinessData,
    getrefundData,
    refund,
    getPictureData,
    upAddaddPicture,
    deletePicture,
    uploadPuicture,
    getImage,
    deleteImage,
    getAllQuality,
    getPartQuality,
    AddYXQuality,
    getHomePagePicture,
    HomePictureXYQY,
    searchDictionaryAlldata_API,
    searchDictionarySelectdata_API,
    addUpdateDictionary_API,
    deleteDictionary_API,
    judgeDictionaryKey_API,
    deletejudgeDictionaryByChild_API,
    deletejudgeDictionaryByUser_API,
    AttributeAllData,
    AttributeAddandUp,
    deleteAttribute,
    getPothunterData2,
    Enrolment_enquiryDcdata2,
    Enrolment_enquiry2,
    getPothunterDCdata2,
    getrefundData2,
    printBase64
}
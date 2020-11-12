import http from '../utils/http'
import API from '../api'
import Login from '../api/index.js'

export function userLoginController(loginName, loginPassword) {
    return new Promise((resolve, reject) => {
        http({
                url: Login.UserLogin_API,
                method: 'GET',
                data: {
                    loginName: loginName,
                    loginPassword: loginPassword
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                return error;
            })
    })
}

export function getEnrolment_enquiry_data(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.Enrolment_enquiry,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
export function getEnrolment_enquiry_data2(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.Enrolment_enquiry2,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}


//获取赛事名称
export function getMatchData(competitionType) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getMatchData,
                method: 'POST',
                data: {
                    competitionType: competitionType

                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                return error
                    //console.log(error);
            });
    })
}
//获取参赛组别
export function getcontestantGroup(competitionId) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getcontestantGroup,
                method: 'POST',
                data: {
                    competitionId: competitionId
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                return error
                    //console.log(error);
            });
    })
}
//根据赛事id和组别id获取项目
export function getcontestantDivisionName(competitionId, groupCode) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getcontestantDivisionName,
                method: 'POST',
                data: {
                    competitionId: competitionId,
                    groupCode: groupCode
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                return error
                    //console.log(error);
            });
    })
}
//获取人员清单的数据
export function getPothunterData(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getPothunterData,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

//获取出行服务人员清单的数据
export function getPothunterData2(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getPothunterData2,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//获取人员清单导出的数据
export function getPothunterDCdata(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getPothunterDCdata,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//获取出行服务人员清单导出的数据
export function getPothunterDCdata2(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getPothunterDCdata2,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//获取项目清单导出的数据
export function getEnrolment_enquiryDcdata(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.Enrolment_enquiryDcdata,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//出行服务
export function getEnrolment_enquiryDcdata2(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.Enrolment_enquiryDcdata2,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

//赛事管理页面接口
export function getAlleventManagementData(pageNo, pageSize, competitionType) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getAlleventManagementData,
                method: 'POST',
                data: {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    competitionType: competitionType
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

export function getupEventManagementData(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.upEventManagementData,
                method: 'POST',
                data: csData,
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

export function deleteEventManagementData(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deleteEventManagementData,
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

export function verificationGroup(id, competitionId, groupCode, projectName) {
    return new Promise((resolve, reject) => {
        http({
                url: API.verificationGroup,
                method: 'POST',
                data: {
                    id: id,
                    competitionId: competitionId,
                    groupCode: groupCode,
                    projectName: projectName,

                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
export function verificationUser(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.verificationGroup,
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

//赛事组别管理
//赛事管理页面接口
export function getgroupManage(csdata) {
    return new Promise((resolve, reject) => {
        http({
                url: API.groupManage,
                method: 'POST',
                data: csdata
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

export function groupManageUpAndAdd(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.groupManageUpAndAdd,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

export function groupManageDelete(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.groupManageDelete,
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}

export function verificationProjectName(id, competitionId, groupCode, projectName) {
    return new Promise((resolve, reject) => {
        http({
                url: API.verificationProjectName,
                method: 'POST',
                data: {
                    id: id,
                    competitionId: competitionId,
                    groupCode: groupCode,
                    projectName: projectName

                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
export function verificationBusinessData(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.verificationBusinessData,
                method: 'POST',
                data: {
                    id: id,
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//退款页面查询

export function getrefundData(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getrefundData,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//出行服务退款
export function getrefundData2(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getrefundData2,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //
                // console.log(error);

                return error
                    //console.log(error);
            });
    })
}
//退款
export function refund(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.refund,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//图片新增修改
export function getPictureData(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getPictureData,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}

export function upAddaddPicture(csData) {
    return new Promise((resolve, reject) => {
        http({
                url: API.upAddaddPicture,
                method: 'POST',
                data: csData
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
export function deletePicture(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deletePicture,
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//赛事介绍图片上传
export function uploadPuicture(id, file, moduleName) {
    return new Promise((resolve, reject) => {
        http({
                url: API.uploadPuicture,
                method: 'POST',
                // 'Content-Type': 'multipart/form-data',
                data: {
                    competitionPresentationId: id,
                    file: file,
                    moduleName: moduleName


                },

            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//获取图片
export function getImage(id, file) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getImage,
                method: 'POST',
                // 'Content-Type': 'multipart/form-data',
                data: {
                    competitionPresentationId: id,
                },
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}

//删除图片
export function deleteImage(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deleteImage,
                method: 'POST',
                // 'Content-Type': 'multipart/form-data',
                data: {
                    id: id,
                },
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//获取所有的字段
export function getAllQuality() {
    return new Promise((resolve, reject) => {
        http({
                url: API.getAllQuality,
                method: 'POST',
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//根据赛事ID查询赛事已有的字段
export function getPartQuality(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.getPartQuality,
                method: 'POST',
                // 'Content-Type': 'multipart/form-data',
                data: {
                    competitionId: id,
                },
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}

//保存赛事字段配置
export function AddYXQuality(id, columnList) {
    return new Promise((resolve, reject) => {
        http({
                url: API.AddYXQuality,
                method: 'POST',
                // 'Content-Type': 'multipart/form-data',
                data: {
                    competitionIds: id,
                    columnList: columnList
                },
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//查询所有用过的图片
export function getHomePagePicture() {
    return new Promise((resolve, reject) => {
        http({
                url: API.getHomePagePicture,
                method: 'POST',
                // 'Content-Type': 'multipart/form-data',
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}
//查询所有用过的图片
// 选用/弃用 首页顶部轮播图	路径	competitionImgController/saveIndexData	
// 	类型	POST	
// 	参数	id	主键ID
// 		indexSelectState	1 选用，0弃用
// 	返回值	{	
// 		code:200	
// 		success:true	
// 		message:	
// 		result:true	
// 		}	

export function HomePictureXYQY(id, indexSelectState) {
    return new Promise((resolve, reject) => {
        http({
                url: API.HomePictureXYQY,
                method: 'POST',
                data: {
                    id: id,
                    indexSelectState: indexSelectState
                }
            })
            .then(({
                data,
                status
            }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                return error
                    //console.log(error);
            });
    })
}


// 系统字典-查询系统字典数据

export function searchDictionaryManList(type) {
    return new Promise((resolve, reject) => {
        http({
                url: API.searchDictionaryAlldata_API,
                method: 'POST',
                data: {
                    type: type
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                ///  console.log(error);
            })
    })
}
// 系统字典 - 下拉菜单查询
export function searchDictionarySelectList() {
    return new Promise((resolve, reject) => {
        http({
                url: API.searchDictionarySelectdata_API,
                method: 'POST',
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                //  console.log(error);
            })
    })
}
// 系统字典-新增&修改系统字典

export function addUpdateDictionaryManList(data) {
    return new Promise((resolve, reject) => {
        http({
                url: API.addUpdateDictionary_API,
                method: 'POST',
                data: data
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}

// 系统字典-删除系统字典

export function deleteDictionaryManList(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deleteDictionary_API,
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
//系统字典-判断新增时用户输入的key是否已经存在
export function judgeDictionaryKey(id, type, key) {
    return new Promise((resolve, reject) => {
        http({
                url: API.judgeDictionaryKey_API,
                method: 'POST',
                data: {
                    id: id,
                    type: type,
                    key: key
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
//系统字典-删除系统字典时作验证(验证关联关系(是否存在下级岗位))
export function deletejudgeDictionaryByChild(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deletejudgeDictionaryByChild_API,
                method: 'POST',
                data: {
                    id: id,
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
//系统字典-删除系统字典时验证关联关系(是否存在关联用户)
export function deleterjudgeDictionaryByUser(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deletejudgeDictionaryByUser_API,
                method: 'POST',
                data: {
                    id: id,
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
//获取属性查询页面所有的属性

export function getAttributeAllData(pageNo, pageSize) {
    return new Promise((resolve, reject) => {
        http({
                url: API.AttributeAllData,
                method: 'POST',
                data: {
                    pageNo: pageNo,
                    pageSize: pageSize,
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
//新增，修改
export function AttributeAddandUp(csdata) {
    return new Promise((resolve, reject) => {
        http({
                url: API.AttributeAddandUp,
                method: 'POST',
                data: csdata
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
export function deleteAttribute(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API.deleteAttribute,
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}

export function printBase64() {
    return new Promise((resolve, reject) => {
        http({
                url: API.printBase64,
                method: 'GET',

            })
            .then(({ data, status }) => {
                if (status != 200) {
                    //请求失败
                    return;
                }
                resolve(data);
            })
            .catch(error => {
                //请求失败
                // console.log(error);
            })
    })
}
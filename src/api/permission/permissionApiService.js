import http from "../http-common";

class PermissionApiService {
  //取得使用者列表
  getPermissionList(data,pageSize,currentPage) {
    let queryString = "";
    if (pageSize !== null && pageSize !== undefined) {
      if (queryString !== "") {
        queryString += `&pageSize=${pageSize}`;
      } else {
        queryString += `pageSize=${pageSize}`;
      }
    }
    if (currentPage !== null && currentPage !== undefined) {
      if (queryString !== "") {
        queryString += `&currentPage=${currentPage}`;
      } else {
        queryString += `currentPage=${currentPage}`;
      }
    }
    if (data !== null && data !== undefined) {
      if (queryString !== "") {
        queryString += `&name=${data}`;
      } else {
        queryString += `name=${data}`;
      }
    }
    if (queryString === "") {
      return http.get(`/users`);
    } else {
      return http.get(`/users?${queryString}`);
    }
  }
  //取得帳號的權限列表
  getRoleList() {
    return http.get(`/role`);
  }
  //新增使用者
  addUser(data){
    return http.post(`/register`,data)
  }
  //修改使用者資訊
  modifyUserInfo(id,data) {
    return http.put(`/edit/${id}`,data)
  }
  //刪除使用者
  deleteUser(data){
    return http.delete('/user',{data:data})
  }
}
export default new PermissionApiService();

import http from "../http-common";

class LoginApiService {
  //登入
  login(data) {
    return http.post(`login`,data);
  }
  //登出
  logout(){
    return http.post(`logout`);
  }
  //取得使用者資訊
  getUserInfo(){
    return http.get('user_info')
  }
  //修改密碼
  changePassword(data){
    return http.put('change_password',data)
  }
}
export default new LoginApiService();

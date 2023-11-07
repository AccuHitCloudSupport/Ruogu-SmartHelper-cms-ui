import http from "../http-common";

class DataManagentApiService {
  //取得文件列表
  getdocuments(data) {
    let queryString = "";
    if (data.docName !== null && data.docName !== undefined) {
      if (queryString !== "") {
        queryString += `&docName=${data.docName}`;
      } else {
        queryString += `docName=${data.docName}`;
      }
    }

    if (data.status != null && data.status !== undefined) {
      if (queryString !== "") {
        queryString += `&status=${data.status}`;
      } else {
        queryString += `status=${data.status}`;
      }
    }

    if (data.source != null && data.source !== undefined) {
      if (queryString !== "") {
        queryString += `&source=${data.source}`;
      } else {
        queryString += `source=${data.source}`;
      }
    }

    if (data.userName != null && data.userName !== undefined) {
      if (queryString !== "") {
        queryString += `&userName=${data.userName}`;
      } else {
        queryString += `userName=${data.userName}`;
      }
    }

    if (data.startDate != null && data.startDate !== undefined) {
      if (queryString !== "") {
        queryString += `&startDate=${data.startDate}`;
      } else {
        queryString += `startDate=${data.startDate}`;
      }
    }

    if (data.endDate != null && data.endDate !== undefined) {
      if (queryString !== "") {
        queryString += `&endDate=${data.endDate}`;
      } else {
        queryString += `endDate=${data.endDate}`;
      }
    }

    if (data.pageSize != null && data.pageSize !== undefined) {
      if (queryString !== "") {
        queryString += `&pageSize=${data.pageSize}`;
      } else {
        queryString += `pageSize=${data.pageSize}`;
      }
    }else{
      if (queryString !== "") {
        queryString += `&pageSize=10`;
      } else {
        queryString += `pageSize=10`;
      }
    }

    if (data.currentPage != null && data.currentPage !== undefined) {
      if (queryString !== "") {
        queryString += `&currentPage=${data.currentPage}`;
      } else {
        queryString += `currentPage=${data.currentPage}`;
      }
    }else{
      if (queryString !== "") {
        queryString += `&currentPage=1`;
      } else {
        queryString += `currentPage=1`;
      }
    }

    if (data.sortAsc != null && data.sortAsc !== undefined) {
      if (queryString !== "") {
        queryString += `&sortAsc=${data.sortAsc}`;
      } else {
        queryString += `sortAsc=${data.sortAsc}`;
      }
    }else{
      if (queryString !== "") {
        queryString += `&sortAsc=false`;
      } else {
        queryString += `sortAsc=false`;
      }
    }

    if (queryString === "") {
      return http.get(`/documents`);
    } else {
      return http.get(`/documents?${queryString}`);
    }
  }
  //取得取得檔案種類或狀態
  getDocumentStatus(colName) {
    return http.get(`/document?colName=${colName}`);
  }
  //審核文件
  approveDocuments(data) {
    return http.put(`/documents`, data);
  }
  //上傳檔案
  uploadDocuments(data) {
    return http.post(`/documents`, data);
  }
  //刪除檔案
  deleteDocuments(data) {
    return http.delete("/documents", {data:data});
  }
  //取得範例檔案
  getExample(name){
    return http.get(`/example?name=${name}`)
  }
}
export default new DataManagentApiService();

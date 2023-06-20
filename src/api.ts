import axios from 'axios';

// BASE_URL을 가져다 써주세요!
// headers는 공통영역이라 api.ts에서 선언해두었습니다
// interface 타입선언을 가져오실때 그에 맞는 이름으로 바꿔서 export 해주세요 (RequestBody X -> signUpRequestBody O)
// 각 Api의 함수명은 바꾸셔도 됩니다! 뒤에 Api만 유지해주세요~
// 이 주석은 모든 api가 정리되면 지우겠습니다

const BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

const headers = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team3',
};

//----------------------------------인증----------------------------------//
// 회원가입 POST
export interface signUpRequestBody {
  email: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호, 8자 이상 (필수!)
  passwordCheck: string; // 비밀번호 확인 값 추가
  displayName: string; // 사용자 이름, 20자 이하 (필수!)
  profileImgBase64?: string; // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
}
export interface authResponseData {
  accessToken: string; // 액세스 토큰
}
export async function signUpApi(
  requestBody: signUpRequestBody
): Promise<authResponseData> {
  const res = await axios.post(`${BASE_URL}/auth/signup`, requestBody, {
    headers,
  });
  const json: authResponseData = res.data;
  return json;
}

// 인증확인 - POST
export async function authenticateApi(
  accessToken: string
): Promise<authResponseData> {
  const res = await axios.post(
    `${BASE_URL}/auth/me`,
    {},
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json: authResponseData = res.data;
  return json;
}

// 로그인 - POST
export interface logInRequestBody {
  email: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호 (필수!)
}
export interface logInResponseData {
  accessToken: string;
}
export async function logInApi(
  requestBody: logInRequestBody
): Promise<logInResponseData> {
  const res = await axios.post(`${BASE_URL}/auth/login`, requestBody, {
    headers,
  });
  const json: logInResponseData = res.data;
  return json;
}

// 로그아웃 - POST (지금 안쓰고 있는데 필요할까요..?)
// export function logOut() {
//   return axios.post(`${BASE_URL}/auth/logout`).then((r) => r.data);
// }

// 사용자 정보수정 - PUT
export function userModifyApi() {
  return axios.put(`${BASE_URL}/auth/user`).then((r) => r.data);
}

// 사용자 목록조회 - GET 'masterKey: true'
export function userInquiryApi() {
  return axios.get(`${BASE_URL}/auth/users`).then((r) => r.data);
}

//----------------------------------계좌----------------------------------//
// 선택 가능한 은행 목록 조회 - GET
export function bankInquiryApi() {
  return axios.get(`${BASE_URL}/account/banks`).then((r) => r.data);
}

// 계좌목록 및 잔액조회 - GET
export function accountListApi() {
  return axios.get(`${BASE_URL}/account`).then((r) => r.data);
}

// 계좌연결 - POST
export function connectAccountApi() {
  return axios.post(`${BASE_URL}/account`).then((r) => r.data);
}

// 계좌해지 - DELETE
export function deleteAccountApi() {
  return axios.delete(`${BASE_URL}/account`).then((r) => r.data);
}

//----------------------------------제품----------------------------------//
// 모든 제품 조회 - GET 'masterKey: true'
export function allProductApi() {
  return axios.get(`${BASE_URL}/products`).then((r) => r.data);
}

// 전체 거래(판매)내역 - GET 'masterKey: true'
export function allSalesApi() {
  return axios.get(`${BASE_URL}/products/transactions/all`).then((r) => r.data);
}

// 거래(판매)내역 완료/취소 및 해제 - PUT 'masterKey: true'
export function requestCancelProductApi() {
  return axios
    .put(`${BASE_URL}/products/transactions/:detailId`)
    .then((r) => r.data);
}

// 제품 추가 - POST 'masterKey: true'
export function addProductApi() {
  return axios.post(`${BASE_URL}/products`).then((r) => r.data);
}

// 제품 수정 - PUT 'masterKey: true'
export function modifyProductApi() {
  return axios.put(`${BASE_URL}/products/:productId`).then((r) => r.data);
}

// 제품 삭제 - DELETE 'masterKey: true'
export function deleteProductApi() {
  return axios.delete(`${BASE_URL}/products/:productId`).then((r) => r.data);
}

// 단일제품 상세조회 - GET
export function oneProductApi() {
  return axios.get(`${BASE_URL}/products/:productId`).then((r) => r.data);
}

// 제품검색 - POST
export function searchProductApi() {
  return axios.post(`${BASE_URL}/products/search`).then((r) => r.data);
}

// 제품 거래(구매)신청 - POST
export function buyProductApi() {
  return axios.post(`${BASE_URL}/products/buy`).then((r) => r.data);
}

// 제품 거래(구매) 취소 - POST
export function cancelProductApi() {
  return axios.post(`${BASE_URL}/products/cancel`).then((r) => r.data);
}

// 제품 거래(구매) 확정 - POST
export function confirmProductApi() {
  return axios.post(`${BASE_URL}/products/ok`).then((r) => r.data);
}

// 제품 전체 거래(구매) 내역 - GET
export function allBuyProductApi() {
  return axios
    .get(`${BASE_URL}/products/transactions/details`)
    .then((r) => r.data);
}

// 단일 제품 상세 거래(구매) 내역 - POST
export function oneBuyProductApi() {
  return axios
    .post(`${BASE_URL}/products/transactions/details`)
    .then((r) => r.data);
}

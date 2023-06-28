import axios, { AxiosResponse } from 'axios';

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
export async function signUpApi(requestBody: signUpRequestBody) {
  const res = await axios.post(`${BASE_URL}/auth/signup`, requestBody, {
    headers,
  });
  const json = res.data;
  return json;
}

// 인증확인 - POST
export async function authenticateApi(accessToken: authResponseData) {
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
  const json = res.data;
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
export async function logInApi(requestBody: logInRequestBody) {
  const res = await axios.post(`${BASE_URL}/auth/login`, requestBody, {
    headers,
  });
  const json = res.data;
  return json;
}

// 로그아웃 - POST
export async function logOutApi(accessToken: string) {
  const res = await axios.post(
    `${BASE_URL}/auth/logout`,
    {},
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = res.data;
  return json;
}

export interface userModifyRequestBody {
  displayName?: string;
  profileImgBase64?: string;
  oldPassword?: string;
  newPassword?: string;
}

// 사용자 정보수정 - PUT
export async function userModifyApi(
  accessToken: authResponseData,
  requestBody: userModifyRequestBody
) {
  const res = await axios.put(`${BASE_URL}/auth/user`, requestBody, {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.data;
  return json;
}

// 사용자 목록조회 - GET 'masterKey: true'
export function userInquiryApi() {
  return axios.get(`${BASE_URL}/auth/users`).then((r) => r.data);
}

//----------------------------------계좌----------------------------------//
export interface Account {
  // 사용자 계좌 정보
  id: string; // 계좌 ID
  bankName: string; // 은행 이름
  bankCode: string; // 은행 코드
  accountNumber: string; // 계좌 번호
  balance: number; // 계좌 잔액
}
export interface Bank {
  // 선택 가능한 은행 정보
  name: string; // 은행 이름
  code: string; // 은행 코드
  digits: number[]; // 은행 계좌 자릿수
  disabled: boolean; // 사용자가 추가한 계좌 여부
}
export interface AddCountReqBody {
  bankCode: string; // 연결할 은행 코드 (필수!)
  accountNumber: string; // 연결할 계좌번호 (필수!)
  phoneNumber: string; // 사용자 전화번호 (필수!)
  signature: boolean; // 사용자 서명 (필수!)
}
export interface DelAccountReqBody {
  accountId: string; // 계좌 ID (필수!)
  signature: boolean; // 사용자 서명 (필수!)
}
// 선택 가능한 은행 목록 조회 - GET
export function bankInquiryApi(accessToken: authResponseData) {
  const res = axios
    .get(`${BASE_URL}/account/banks`, {
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
  return res;
}

// 계좌목록 및 잔액조회 - GET
export async function accountListApi(accessToken: authResponseData) {
  const res = await axios
    .get(`${BASE_URL}/account`, {
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
  return res;
}

// 계좌연결 - POST
export async function connectAccountApi(
  accessToken: authResponseData,
  body: AddCountReqBody
) {
  const res = await axios
    .post(`${BASE_URL}/account`, body, {
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    })

    .then((r) => r.data);
  return res;
}

// 계좌해지 - DELETE
export function deleteAccountApi(
  accessToken: authResponseData,
  body: DelAccountReqBody
) {
  const res = axios
    .delete(`${BASE_URL}/account`, {
      data: body,
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
  return res;
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
interface ProductDetailResponseData {
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 상세 설명
  tags: string[]; // 제품 태그
  thumbnail: string; // 제품 썸네일 이미지(URL)
  photo: string; // 제품 상세 이미지(URL)
  isSoldOut: boolean; // 제품 매진 여부
  reservations: Reservation[]; // 제품의 모든 예약 정보 목록
  discountRate: number; // 제품 할인율
}

// 예약 정보가 있는 경우
interface Reservation {
  start: string; // 예약 시작 시간
  end: string; // 예약 종료 시간
  isCanceled: boolean; // 예약 취소 여부
  isExpired: boolean; // 예약 만료 여부
}

export async function productDetailApi(id: string) {
  const res = await axios.get(`${BASE_URL}/products/${id}`, {
    headers,
  });
  const data: ProductDetailResponseData = res.data;
  return data;
}

// 제품검색 - POST
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | undefined;
  discountRate: number;
}
export async function searchProductApi(
  searchedValue: string
): Promise<Product[]> {
  const data = {
    searchText: `${searchedValue}`,
  };
  const res: AxiosResponse<Product[]> = await axios.post(
    `${BASE_URL}/products/search`,
    data,
    { headers }
  );
  const Data: Product[] = res.data;
  return Data;
}

export async function categoryProductApi(
  categoryName: string
): Promise<Product[]> {
  const res: AxiosResponse<Product[]> = await axios.post(
    `${BASE_URL}/products/search`,
    { searchTags: [`${categoryName}`] },
    { headers }
  );
  const Data: Product[] = res.data;
  return Data;
}

// 제품 거래(구매)신청 - POST
export function buyProductApi() {
  return axios.post(`${BASE_URL}/products/buy`).then((r) => r.data);
}

// 제품 거래(구매) 취소 - POST
export interface CancelRequestBody {
  detailId: string; // 취소할 제품의 거래 내역 ID
}
export async function cancelProductApi(
  accessToken: authResponseData,
  body: CancelRequestBody
) {
  const res = await axios.post(`${BASE_URL}/products/cancel`, body, {
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
  // return axios.post(`${BASE_URL}/products/cancel`).then((r) => r.data);
}

// 제품 거래(구매) 확정 - POST
export function confirmProductApi() {
  return axios.post(`${BASE_URL}/products/ok`).then((r) => r.data);
}

// 제품 전체 거래(구매) 내역 - GET
export type MyPurchases = TransactionDetail[];
interface TransactionDetail {
  // 거래 내역 정보
  detailId: string; // 거래 내역 ID
  product: {
    // 거래한 제품 정보
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number; // 제품 할인율
  };
  reservation: Reservation | null; // 거래한 제품의 예약 정보
  timePaid: string; // 제품을 거래한 시간
  isCanceled: boolean; // 거래 취소 여부
  done: boolean; // 거래 완료 여부
}

interface Reservation {
  start: string; // 예약 시작 시간
  end: string; // 예약 종료 시간
  isCanceled: boolean; // 예약 취소 여부
  isExpired: boolean; // 예약 만료 여부
}

interface ProductDetailequestBody {
  detailId: string; // 상세 내용을 확인할 거래(구매) 내역 ID
}

export interface OneTransactionDetail {
  // 상세 거래 정보
  detailId: string; // 거래 내역 ID
  account: {
    // 거래한 사용자의 계좌 정보
    bankName: string;
    bankCode: string;
    accountNumber: string;
  };
  product: {
    // 거래한 제품 정보
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    photo: string | null;
    discountRate: number; // 제품 할인율
  };
  reservation: Reservation | null; // 거래한 제품의 예약 정보
  timePaid: string; // 제품을 거래한 시간
  isCanceled: boolean; // 거래 취소 여부
  done: boolean; // 거래 완료 여부
}

interface Reservation {
  start: string; // 예약 시작 시간
  end: string; // 예약 종료 시간
  isCanceled: boolean; // 예약 취소 여부
  isExpired: boolean; // 예약 만료 여부
}

export async function allBuyProductApi(
  accessToken: authResponseData
): Promise<TransactionDetail[]> {
  try {
    const res: AxiosResponse<TransactionDetail[]> = await axios.get(
      `${BASE_URL}/products/transactions/details`,
      {
        headers: { ...headers, Authorization: 'Bearer ' + accessToken },
      }
    );
    const Data: TransactionDetail[] = res.data;
    return Data;
  } catch (e) {
    return [];
  }
}

// 단일 제품 상세 거래(구매) 내역 - POST
export async function oneBuyProductApi(
  accessToken: authResponseData,
  body: ProductDetailequestBody
) {
  const res: AxiosResponse<OneTransactionDetail> = await axios.post(
    `${BASE_URL}/products/transactions/detail`,
    body,
    { headers: { ...headers, Authorization: 'Bearer ' + accessToken } }
  );
  return res.data;
}

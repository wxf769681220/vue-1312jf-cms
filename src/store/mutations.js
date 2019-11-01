export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_QUIT(state) {
    // 变更状态
    state.token = ''
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_MATCH_INFO_BASE: (state, matchInfoBase) => {
    state.matchInfoBase = matchInfoBase
  },
  SET_EXCEL_DATA: (state, excelData) => {
    state.excelData = excelData
  }
}

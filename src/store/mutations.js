export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_QUIT(state) {
    state.token = ''
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_MATCH_INFO_BASE: (state, matchInfoBase) => {
    state.matchInfoBase = matchInfoBase
  },
  SET_PLAYERS_INFO: (state, playersInfo) => {
    state.playersInfo = playersInfo
  },
  SET_PRINT_DATA: (state, printData) => {
    state.printData = printData
  }
}

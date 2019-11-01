
import XLSX from 'xlsx'

export function getExcelData(e, matchId) {
  let thisFile = e.target.files[0]

  if (!thisFile) {
    return
  }

  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(thisFile)
    reader.onload = function (e) {
      let data = e.target.result
      let wb = XLSX.read(data, {
        type: 'binary'
      })
      let jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      jsonData.forEach(item => {
        item.status = 0
        item.matchId = parseInt(matchId)
      })
      let newData = JSON.parse(JSON.stringify(jsonData)
        .replace(/参赛号/g, 'enrollNum')
        .replace(/姓名/g, 'realName')
        .replace(/身份证号/g, 'idNumber')
        .replace(/手机号/g, 'phone')
        .replace(/地区\/单位/g, 'region')
        .replace(/填表人/g, 'preparer')
        .replace(/联系电话/g, 'preparerPhone')
        .replace(/备注/g, 'remark')
      )
      resolve(newData)
    }
  })
}

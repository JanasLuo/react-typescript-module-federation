/*
 * @Author: janasluo
 * @Date: 2021-07-29 10:10:54
 * @LastEditTime: 2021-07-29 14:59:18
 * @LastEditors: janasluo
 * @Description:
 * @FilePath: /digital_police/digital_police_admin/version.js
 */
const child_process = require('child_process')

const getBuildInfo = () => {
  // git 最后一次提交的 Head
  const branch = child_process
    .execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim()
  const commitHash = child_process
    .execSync('git show -s --format=%H')
    .toString()
    .trim()
  const shortCommitHash = child_process
    .execSync('git show -s --format=%h')
    .toString()
    .trim()
  const message = child_process
    .execSync('git log --format=%B -n 1')
    .toString()
    .trim()
  const commitUserName = child_process
    .execSync('git show -s --format=%cn')
    .toString()
    .trim()
  const commitUserMail = child_process
    .execSync('git show -s --format=%ce')
    .toString()
    .trim()
  const commitDateObj = new Date(
    child_process.execSync(`git show -s --format=%cd`).toString()
  )
  const commitDate = `${
    commitDateObj.getFullYear() +
    '-' +
    (commitDateObj.getMonth() + 1) +
    '-' +
    commitDateObj.getDate() +
    ' ' +
    commitDateObj.getHours() +
    ':' +
    commitDateObj.getMinutes()
  }`
  // const buildUserName = child_process.execSync('git config user.name').toString().trim()
  // const buildUserMail = child_process.execSync('git config user.email').toString().trim()
  const nowDate = new Date()
  const buildDate = `${
    nowDate.getFullYear() +
    '-' +
    (nowDate.getMonth() + 1) +
    '-' +
    nowDate.getDate() +
    ' ' +
    nowDate.getHours() +
    ':' +
    nowDate.getMinutes()
  }`
  return {
    branch,
    commitHash,
    shortCommitHash,
    message,
    commitUserName,
    commitUserMail,
    commitDate,
    buildDate
  }
}
module.exports = getBuildInfo

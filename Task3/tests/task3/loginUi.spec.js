import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'
const dataSet = JSON.parse(JSON.stringify(require('../../data/data.json')))

test('login test', async ({ page}) => {
  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login(dataSet.userData.loginData, dataSet.userData.passwordData)
})
exports.LoginPage = class LoginPage {

  constructor (page ) {

    this.page = page
    this.userName = page.locator('#userName')
    this.password = page.getByPlaceholder('password')
    this.submitBtn = page.locator('#login')
  }

  async gotoLoginPage() {
    await this.page.goto('https://demoqa.com/login')
  }

  async login(username, password) {
    await this.userName.fill(username)
    await this.password.fill(password)
    await this.submitBtn.click()
  }
}
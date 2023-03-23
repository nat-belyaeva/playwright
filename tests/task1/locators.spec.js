import { test, expect } from '@playwright/test'

// =====================1. Используя сайт https://www.onliner.by/, составить как можно больше локаторов различного типа =====================

test('locators', async ({ page }) => {

  // - by CSS
  //by id
  await page.locator('#fast-search')

  //by class
  await page.locator('.auth-bar__item--text')
  await page.locator('.fast-search__input')

  //by Attribute
  await page.locator('[type="password"]')

  //by class & attribute
  await page.locator('.auth-form__description [href="https://profile.onliner.by/registration"]')

  // - by Xpath
  //by id
  await page.locator('//*[@id="fast-search"]')

  // by class
  await page.locator('//*[@class="auth-bar__item auth-bar__item--text"]')

  //by Attribute
  await page.locator('//input[@type="password"]')
  await page.locator('//*[@placeholder="Повторите пароль"]')

  // - by Placeholder
  await page.getByPlaceholder('Ник или e-mail')
  await page.getByPlaceholder('Ваш e-mail')

  //filter by text
  await page.locator('form:has-text("Регистрация")')

  //filter by  child
  await page.locator('.auth-form__field input').nth(1)
  await page.locator('.auth-form__field input').first()
  await page.locator('.auth-form__field input').last()

  //get list
  await page.locator('.auth-form__field input') //get 3 elements

  //by another locator
  await page.locator('ul.b-list-topics>li')
    .filter({has:page.locator('a[href="./viewtopic.php?t=24798149"]')})
})

test('User is able to type in the Seaarch field', async ({ page }) => {
  const getSearchInput = await page.locator('.fast-search__input')
  const getSearchModal = await page.locator('#fast-search-modal .modal-dialog')

  await page.goto('https://www.onliner.by/')
  await getSearchInput.type('mobile phone')
  await expect(getSearchModal).toHaveCount(1)
})

test('User is able to open authentification window', async ({ page }) => {
  const getVhodBtn = await page.locator('.auth-bar__item--text')
  const authForm = await page.locator(('#auth-container .auth-form'))

  await page.goto('https://www.onliner.by/')
  await getVhodBtn.click()
  await expect(authForm).toBeVisible()
})

test('User is able to register by email', async ({ page }) => {
  const getVhodBtn = await page.locator('.auth-bar__item--text')
  const authForm = await page.locator(('#auth-container .auth-form'))
  const registerLink = await page.locator('.auth-form__description [href="https://profile.onliner.by/registration"]')
  const registerWord = await page.locator('form:has-text("Регистрация")')
  const email = await page.getByPlaceholder('Ваш e-mail')
  const passwordForm = await page.locator('.auth-form__field input').nth(1)
  const rando = Math.random().toString(36).substring(2, 7)
  const typeEmail = `tech${rando}@agilquest.net`
  const typePassword = `Qwerty123@`
  const repeatPassword = await page.locator('//*[@placeholder="Повторите пароль"]')
  const policyCheckbox = await page.locator('.i-checkbox__faux')
  const submitBtn = await page.locator('button.auth-button')
  const confirmWindow = await page.locator('.auth-form__title')

  await page.goto('https://www.onliner.by/')
  await getVhodBtn.click()
  await expect(authForm).toBeVisible()

  await registerLink.click()
  await expect(registerWord).toBeVisible()

  await email.type(typeEmail)
  await passwordForm.type(typePassword)
  await expect(passwordForm).toHaveClass(/auth-input_success/)

  await repeatPassword.type(typePassword)
  await expect(repeatPassword).toHaveClass(/auth-input_success/)

  await policyCheckbox.click()
  await expect(policyCheckbox).toBeChecked()

  await submitBtn.click()
  await expect(confirmWindow).toHaveText(/Подтвердите/)
})

// ======================================== 2 =========================================================
//2. Дана таблица (см. Вложение - код таблицы максимально упрощён).

//универсальный XPATH доступный для понимая //tbody/tr[1]/td[5] - Jul 19, 2018 14:42 PM
//                                          //tbody/tr[2]/td[5] - Jul 19, 2018 14:43 PM


// table/tbody/tr[contains(.,'SimpleDataset')]/td[count(preceding-sibling::td)+1 = count(ancestor::table/thead/tr/th[.='Updated']/preceding-sibling::th)+1]
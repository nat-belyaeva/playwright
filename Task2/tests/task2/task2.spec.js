import { test, expect } from '@playwright/test'

test.describe('Fill inputs, checkboxes, dropdowns', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/')
  })

  test('Fill inputs', async ({ page }) => {
    await page.locator('.card-body')
      .filter({ hasText: 'Elements' })
      .click()

    await expect(page).toHaveURL('https://demoqa.com/elements')
    await expect(page.locator('.playgound-header')).toContainText('Elements')

    await page.locator('.menu-list .text').first().click()
    await expect(page.locator('.playgound-header')).toHaveText('Text Box')

    await page.getByPlaceholder('Full Name').fill('dfsdgklkkkkkk')
    await page.getByPlaceholder('name@example.com').fill('name231@example.com')

    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.locator('#output p').nth(0)).toHaveId('name')
    await expect(page.locator('#output p').nth(1)).toHaveId('email')
    await expect(page.locator('#output p#name')).toContainText('Name:dfsdgklkkkkkk')
    await expect(page.locator('#output p#email')).toContainText('Email:name231@example.com')
  })

  test('checkbox on Elements tab', async ({ page }) => {
    await page.locator('.card-body')
      .filter({ hasText: 'Elements' })
      .click()
    await page.locator('.menu-list .text').nth(1).click()
    await expect(page.locator('.playgound-header')).toHaveText('Check Box')

    await page.locator('[for="tree-node-home"]').check()
    await page.locator('[for="tree-node-home"]').isChecked()
    await expect(page.locator('#result')).toContainText('You have selected :')
    await expect(page.locator('[for="tree-node-home"]')).toBeChecked()
  })

  test('Checkboxes 2', async ({ page }) => {
    await page.locator('.card-body')
      .filter({ hasText: 'Forms' })
      .click()
    await page.locator('#item-0 .text')
      .filter({ hasText: 'Practice Form' })
      .click()
    await expect(page).toHaveURL('https://demoqa.com/automation-practice-form')

    const hobbies = page.locator('#hobbiesWrapper .custom-control-label')
    const count = hobbies.count()

    for (let i = 0; i < count; i++) {
      await hobbies.nth(i).check()
      let hobbyNumber = page.locator(`label[for="hobbies-checkbox-${i + 1}"]`)
      await hobbyNumber.isChecked()
      await expect(hobbyNumber).toBeChecked()
    }

    for (let i = 0; i < count; i++) {
      if (await hobbies.nth(i).textContent() === 'Reading') {
        await hobbies.nth(i).uncheck()
        await expect(page.locator('label[for="hobbies-checkbox-2"]')).not.toBeChecked()
      }
    }
  })

  test('Select dropdown using label', async ({ page }) => {
    const colorMenu = page.locator('#oldSelectMenu')
    await page.locator('.card-body')
      .filter({ hasText: 'Widgets' })
      .click()

    let selectMenu = page.locator('.menu-list li#item-8').last()
    await selectMenu.scrollIntoViewIfNeeded()

    await page.waitForTimeout(3000)
    await selectMenu.click({ force: true })

    await expect(page).toHaveURL('https://demoqa.com/select-menu')

    //await colorMenu.selectOption({value: '8'})
    //await colorMenu.selectOption({index: 8})
    await colorMenu.selectOption('8')
    await expect(colorMenu).toHaveValue('8')
  })
})
test.describe('Mouse actions', async () => {

  test('Mouse click', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons')
    await expect(page).toHaveTitle(/DEMOQA/)
    await page.locator('#doubleClickBtn').dblclick()
    await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click')

    await page.locator('#rightClickBtn').click({ button: 'right' })
    await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click')

    await page.locator('.btn-primary').last().click({ force: true })
    await expect(page.locator('#dynamicClickMessage')).toContainText('You have done a dynamic click')

    await page.locator('.btn-primary').last().click({ position: { x: 1, y: 1 } })
    await expect(page.locator('#dynamicClickMessage')).toContainText('You have done a dynamic click')
  })

  test('Mouse hover', async ({ page }) => {
    await page.goto('https://demoqa.com/menu#')

    const menuItem2 = page.locator('#nav li')
      .filter({ hasText: 'Main Item 2' })
    const subSubList = page.locator('#nav li')
      .filter({ hasText: 'Main Item 2' }).page().locator('ul li').last()
    await menuItem2.hover()
    await expect(menuItem2).toBeVisible()

    await subSubList.hover()
    await expect(subSubList).toBeVisible()
  })
})
test.describe('Upload file', () => {

  test('Upload file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download')

    await page.setInputFiles('#uploadFile', 'test_data/FileToUpload.txt')
    await page.pause()
    await page.locator('#uploadFile').click()
    await expect(page.locator('.mt-3 p')).toHaveId('uploadedFilePath')
    await expect(page.locator('.mt-3 p')).toContainText('FileToUpload')
  })
})

test.describe('Keyboards', () => {
  test('press Enter', async ({ page }) => {
    await page.goto('https://demoqa.com/elements')
    await expect(page).toHaveURL('https://demoqa.com/elements')
    await expect(page.locator('.playgound-header')).toContainText('Elements')

    await page.locator('.menu-list .text').first().click()
    await expect(page.locator('.playgound-header')).toHaveText('Text Box')

    await page.getByPlaceholder('Full Name').click()
    await page.keyboard.type('dfsdgklkkkkkk delete It')
    await page.keyboard.down(('Shift'))
    for (let i = 0; i < ' delete It'.length; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')
    await page.keyboard.press(('Backspace'))
    await page.keyboard.type(' NewNAme')
    await page.getByRole('button', { name: 'Submit' }).press('Enter')
    await expect(page.locator('#output p').nth(0)).toHaveId('name')
    await expect(page.locator('#output p#name')).toContainText('Name:dfsdgklkkkkkk NewNAme')
  })
})

test.describe('Drag & Drop', () => {
  test('Drag and Drop Elements', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable ')
    await expect(page).toHaveURL('https://demoqa.com/droppable ')

    await page.locator('#draggable').dragTo(await page.locator('#droppable').first())
    await expect(page.locator('#droppable').first()).toContainText('Dropped!')
  })
})






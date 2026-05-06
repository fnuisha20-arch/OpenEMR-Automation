import {test} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import loginData  from "../test-data/loginData.json";
import {NavigationHomePage} from "../pages/navigationPage";


test.describe('Roles Access-OpenEMR', ()=>{
test.describe('physician access - OpenEMR', ()=>{

    test.beforeEach(async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.openLogin(
    loginData.physician.username,loginData.physician.password  );

    await loginPage.verifyLoginSuccess();
    })

    test('Verify physician user able to see menu', async ({page})=>{
      const navigationPage=new NavigationHomePage(page);
      await navigationPage.verifyMenuVisible(navigationPage.calendar);
    })
    
    test('Verify physician user not able to see Admin menu', async ({page})=>{
    const navigationPage = new NavigationHomePage(page);
    await navigationPage.verifyMenuNotVisible(navigationPage.admin);
})
})
test.describe('Receptionist access - OpenEMR', ()=>{

  test.beforeEach(async({page})=>{
const loginPage= new LoginPage(page);
await loginPage.openLogin
(loginData.receptionist.username,loginData.receptionist.password);
await loginPage.verifyLoginSuccess();
  })
  test('Verify receptionist user able to see menu', async({page})=>{
    const navigationPage=new NavigationHomePage(page);
    await navigationPage.verifyMenuVisible(navigationPage.patient)
  })
 test('Verify receptionist user not able to access admin module', async({page})=>{
const navigationPage=new NavigationHomePage(page);
await navigationPage.verifyMenuNotVisible(navigationPage.procedures);
 })
})

test.describe('Clinician access - OpenEMR',()=>{

  test.beforeEach(async({page})=>{
    const loginPage=new LoginPage(page);
    await loginPage.openLogin(
      loginData.clinician.username, loginData.clinician.password);
    await loginPage.verifyLoginSuccess();
  })
  test('Verify clinician user is able to see menu', async({page})=>{
    const navigationPage=new NavigationHomePage(page);
    await navigationPage.verifyMenuVisible(navigationPage.reports);
 })
  test('Verify clinician user not able to access admin module',async({page})=>{
 const navigationPage=new NavigationHomePage(page);
await navigationPage.verifyMenuNotVisible(navigationPage.modules);
})
})
})
import {test} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import loginData  from "../test-data/loginData.json";

test.describe('Login Tests - OpenEMR',() =>{
// Test for admin login
test ('Verify of admin Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin(loginData.admin.username, loginData.admin.password);
    await loginPage.verifyLoginSuccess();
})

// Test for physician login
test('Verify of physician Login', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLogin(loginData.physician.username,loginData.physician.password);
    await loginPage.verifyLoginSuccess();
})
// Test for receptionist login
test('Verify of receptionist login', async({page})=>{
    const loginPage= new LoginPage(page)
    await loginPage.openLogin(loginData.receptionist.username, loginData.receptionist.password);
    await loginPage.verifyLoginSuccess();
})
//Test for clinician login
test('Verify of clinician login', async({page})=>{
    const loginPage = new LoginPage(page)
 await loginPage.openLogin(loginData.clinician.username, loginData.clinician.password);
 await loginPage.verifyLoginSuccess();
})
//Test for accountant login
test('Verify of accountant login', async({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLogin(loginData.accountant.username, loginData.accountant.password);
    await loginPage.verifyLoginSuccess();
})
//invalid user login
test('Verify invalid username login', async({page})=> {
    const loginPage = new LoginPage (page)
    await loginPage.openLogin("invalidUS",loginData.admin.password);
    await loginPage.verifyLoginError();
})
//invalid password login
test('Verify invalid password login', async({page})=> {
    const loginPage = new LoginPage (page)
    await loginPage.openLogin(loginData.admin.username,"wrongpassword123");
    await loginPage.verifyLoginError();
}
)
//invalid username & password login
test('Verify invalid username & password login', async({page})=> {
    const loginPage = new LoginPage(page)
    await loginPage.openLogin("invaliduser", "wrongpassword123");
    await loginPage.verifyLoginError();
})
//Empty username & password login
test('Verify Empty username & password login', async({page})=> {
    const loginPage = new LoginPage(page)
    await loginPage.openLogin("", "");
    await loginPage.verifyLoginError();
})
})
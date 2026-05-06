import {expect, Locator, Page} from "@playwright/test"

export class LoginPage {

    readonly page : Page;
    readonly username : Locator;
    readonly password : Locator;
    readonly loginBtn : Locator;

    constructor ( page :Page){
    this.page = page ;
    this.username = page.locator('#authUser');
    this.password = page.locator('#clearPass');
    this.loginBtn = page.locator('#login-button')
    }
async openLogin(username:string, password:string) {
    await this.page.goto('https://demo.openemr.io/openemr/interface/login/login.php?site=default',  { waitUntil: 'networkidle' });
    // Debug — print all frames
   
    await this.username.waitFor({ state: 'visible', timeout: 30000 });
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    
}
async verifyLoginSuccess() {
    await this.page.waitForURL('**/interface/main/tabs/main.php**');
}
async verifyLoginError() {
        await expect(
        this.page.getByText('Invalid username or password')
    ).toBeVisible();
    }

async logout() {
    await this.page.locator('#logout-button').click();
    await this.page.waitForURL('**/interface/login/login.php**');
}

}
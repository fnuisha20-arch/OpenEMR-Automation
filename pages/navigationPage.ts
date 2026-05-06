import {expect,Locator, Page} from "@playwright/test"

export class NavigationHomePage{

    readonly page : Page
    readonly calendar : Locator;
    readonly finder : Locator;
    readonly flow : Locator;
    readonly recalls : Locator;
    readonly messages : Locator;
    readonly patient : Locator;
    readonly fees : Locator;
    readonly modules : Locator;
    readonly procedures : Locator;
    readonly admin : Locator;
    readonly reports : Locator;
    readonly miscellaneous : Locator;
    readonly popups : Locator;

    constructor (page : Page){
this.page = page;
this.calendar = page.locator('#mainMenu').getByText('Calendar', { exact: true });
this.finder = page.locator('#mainMenu').getByText('Finder', { exact: true });
this.flow = page.locator('#mainMenu').getByText('Flow', { exact: true });
this.recalls = page.locator('#mainMenu').getByText('Recalls', { exact: true });
this.messages = page.locator('#mainMenu').getByText('Messages', { exact: true });
this.patient = page.locator('#mainMenu').getByText('Patient', { exact: true });
this.fees = page.locator('#mainMenu').getByText('Fees', { exact: true });
this.modules = page.locator('#mainMenu').getByText('Modules', { exact: true });
this.procedures = page.locator('#mainMenu').getByText('Procedures', { exact: true });
this.admin = page.locator('#mainMenu').getByText('Admin', { exact: true });
this.reports = page.locator('#mainMenu').getByText('Reports', { exact: true });
this.miscellaneous = page.locator('#mainMenu').getByText('Miscellaneous', { exact: true });
this.popups = page.locator('#mainMenu').getByText('Popups', { exact: true });
    }
async verifyMenuVisible(menuLocator: Locator){
    await expect(menuLocator).toBeVisible();
}
async verifyMenuNotVisible(menuLocator:Locator){
    await expect(menuLocator).not.toBeVisible();
}

}

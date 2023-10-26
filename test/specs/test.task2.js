import { expect, browser, $ } from '@wdio/globals'


    it("Register New user e2e test", async ()=> {
        await browser.url("https://demowebshop.tricentis.com/");
        const registerLink = await $(".ico-register");
        const firstNameInputField = await $("//*[@id='FirstName']");
        const lastNameInputField = await $("//*[@id='LastName']");
        const emailInputField = await $("//*[@id='Email']");
        const passwordInputField = await $("//*[@id='Password']");
        const confirmPasswordInputField = await $("//*[@id='ConfirmPassword']");
        const registerButton = await $("//*[@id='register-button']");
        const registreitonLabel = await $("div.result"); 

        registerLink.click;
        firstNameInputField.setValue("TestFirstName");
        lastNameInputField.setValue("TestLastName");
        emailInputField.setValue("testEmail@gmail.com");
        passwordInputField.setValue("Password");
        confirmPasswordInputField.setValue("Password");
        registerButton.click;
        expect(registreitonLabel).toExist();
    });
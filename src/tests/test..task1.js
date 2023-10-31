import { expect, browser, $ } from '@wdio/globals'


    it("Check the title is correct", async ()=> {
        await browser.url("https://www.epam.com/");

        const pageTiile = await browser.getTitle();
        console.log(pageTiile);
        expect(pageTiile).toEqual("EPAM | Software Engineering & Product Development Services");
    });

    it("Check the ability to switch Light / Dark mode", async ()=> {
        await browser.url("https://www.epam.com/");

        const acceptCookiesbutton = await $("/html/body/div/div[5]/div[2]/div/div[1]/div/div[2]/div/button[2]");
        const hamburgerMenuButton = await $(".hamburger-menu__button");
        const themeModeSwitcher = await $("//div[2]/div[1]/header/div/div/div/div/nav/div/div/div/section/div");
        const themeLabel = await $('span.theme-switcher-label.body-text-small');
        const darkThemeLabel = await $('//div[2]/div[1]/header/div/div/div/div/nav/div/div/div/span[text()="Dark Mode"]')
        const lightThemeLabel = await $('//div[2]/div[1]/header/div/div/div/div/nav/div/div/div/span[text()="Light Mode"]')

        acceptCookiesbutton.click;
        hamburgerMenuButton.click;
        //expect(labelText).toEqual('Dark Mode');
        expect (darkThemeLabel).toExist();
        themeModeSwitcher.click;
        const labelText = await themeLabel.getText();
        //expect(labelText).toEqual('Light Mode');
        expect (lightThemeLabel).toExist(); 
    });

    it("Check that allow to change language to UA", async ()=> {
        await browser.url("https://www.epam.com/");

        const acceptCookiesbutton = await $("/html/body/div/div[5]/div[2]/div/div[1]/div/div[2]/div/button[2]");
        const hamburgerMenuButton = await $(".hamburger-menu__button");
        const changeLanguageButton = await $("//div[2]/div[1]/header/div/div/div/div/nav/div/div/button/span");
        const ukrainianLang = await $("//div[2]/div[1]/header/div/div/div/div/nav/div/nav/ul/li[6]/a");
        

        acceptCookiesbutton.click;
        hamburgerMenuButton.click;
        changeLanguageButton.click;
        ukrainianLang.click;
    
        // const pageTiile = await browser.getTitle();
        // console.log(pageTiile);
        // expect(pageTiile).toEqual("EPAM | Унікальні можливості роботи для ІТ-професіоналів та молодих спеціалістів");
    });

    it("Check the policies list", async ()=> {
        await browser.url("https://www.epam.com/");

        const acceptCookiesbutton = await $("/html/body/div/div[5]/div[2]/div/div[1]/div/div[2]/div/button[2]");
        const policiesContainer = await $(".policies");

        acceptCookiesbutton.click;
        policiesContainer.scroll;

        // Check the left policies links
        const leftLinks = policiesContainer.$('.ul.policies-left');
        expect(leftLinks.isExisting());

        // Check the right policies links
        const rightLinks = policiesContainer.$('.ul.policies-right');
        expect(rightLinks.isExisting());

        // Verify the text content of specific links
        expect(leftLinks).toHaveTextContaining('INVESTORS');
        expect(leftLinks).toHaveTextContaining('OPEN SOURCE');
        expect(leftLinks).toHaveTextContaining('PRIVACY POLICY');
        expect(rightLinks).toHaveTextContaining('COOKIE POLICY');
        expect(rightLinks).toHaveTextContaining('APPLICANT PRIVACY NOTICE');
        expect(rightLinks).toHaveTextContaining('WEB ACCESSIBILITY');
    });

    it("Check that allow to switch location list by region", async ()=> {
        await browser.url("https://www.epam.com/");

        const acceptCookiesbutton = await $("/html/body/div/div[5]/div[2]/div/div[1]/div/div[2]/div/button[2]");
        const ourLocation = await $(".tabs");
        const americasLabel = await $("//*[@id='id-890298b8-f4a7-3f75-8a76-be36dc4490fd']/div[1]/div/div/div[1]");
        const emeaLabel = await $("//*[@id='id-890298b8-f4a7-3f75-8a76-be36dc4490fd']/div[1]/div/div/div[2]/a");
        const apacLabel = await $("//*[@id='id-890298b8-f4a7-3f75-8a76-be36dc4490fd']/div[1]/div/div/div[3]/a");
        
        acceptCookiesbutton.click;
        expect(ourLocation).toHaveTextContaining('AMERICAS');
        expect(ourLocation).toHaveTextContaining('EMEA');
        expect(ourLocation).toHaveTextContaining('APAC');

        americasLabel.click;
        emeaLabel.click;
        apacLabel.click;        
    });

    it("Check the search function", async ()=> {
        await browser.url("https://www.epam.com/");
        const acceptCookiesbutton = await $("/html/body/div/div[5]/div[2]/div/div[1]/div/div[2]/div/button[2]");
        const searchbutton = await $("//div[2]/div[1]/header/div/div/ul/li[3]/div/button/span[1]");
        const searchInputField = await $("//*[@id='new_form_search']");
        const findButton = await $("span.bth-text-layer");
        const searchResultCount = await $("h2.search-results__counter");
        const searchResultItems = await $("div.search-results__items");

        acceptCookiesbutton.click;
        searchbutton.click;
        searchInputField.click;
        searchInputField.addValue('AI');
        findButton.click;

        expect(searchResultCount.isExisting());
        expect(searchResultItems.isExisting());
    });

    it("Chack form's fields validation", async ()=> {
        await browser.url("https://www.epam.com/about/who-we-are/contact");
        const submitButton = await $("button.button-ui");

        submitButton.click;
        //cannot find how to check validation correctly
    });


    // it("Check tha the Company logo on the header lead to the main page", async ()=> {
    //     await browser.url("https://www.epam.com/about");
    //     const logo = await $("//div[2]/div[2]/div/div/header/div/div/a[3]/img[3]");

    //     logo.click;
    //     browser.pause(10000);
    //     const homePageURL = await browser.getUrl();
    //     expect(homePageURL).toEqual("https://www.epam.com/");
    //     // const pageTiile = await browser.getTitle();
    //     // expect(pageTiile).toEqual("EPAM | Software Engineering & Product Development Services");
    // });

//     it("Check that allows to download report ", async ()=> {
//         await browser.url("https://www.epam.com/about");
//         const downloadButton = await $("//div[1]/div[5]/section/div[2]/div/div/div[1]/div/div[3]/div/a/span/span[2]");

//         downloadButton.click;
//         browser.pause(5000);
//         // Specify the expected file name and extension
//         const expectedFileName = 'EPAM_Corporate_Overview_2023.pdf';

//         // Verify if the file exists in the default download directory
//         const downloadDir = browser.config.capabilities['ms:edgeOptions'] ? // For Microsoft Edge
//         browser.config.capabilities['ms:edgeOptions'].prefs['download.default_directory'] :
//         browser.config.capabilities['goog:chromeOptions'].prefs.download.default_directory;

//         const filePath = path.join(downloadDir, expectedFileName);

//         // Check if the file exists
//         const fileExists = fs.existsSync(filePath);

//         // Assert that the file was downloaded and has the correct name and extension
//         assert.strictEqual(fileExists, true, 'File was not downloaded');
//   });

import {} from '@wdio/globals'

 
function generateRandomEmail() {
    const emailPrefix = Math.random().toString(36).substring(7);
    return `${emailPrefix}@example.com`;
  }
 
describe('shop', () => {
    var email;
    before(() => {
      email = generateRandomEmail();
    })
 
    it('Verify that allows register a User', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
 
        await $('.ico-register').click()
        await $("//input[@id='gender-male']").click()
       
        await $("//input[@id='FirstName']").setValue('FirstNameTest');
        await $("//input[@id='LastName']").setValue('LastNameTest');
        
        await $('//input[@id="Email"]').setValue(email);
 
        
        await $("//input[@id='Password']").setValue('Password!');
        await $("//input[@id='ConfirmPassword']").setValue('Password!');
        
        const submitButton = await $('#register-button');
        await submitButton.click()
 
        let result = await $("//div[@class='result']").getText()
        expect (result).toEqual('Your registration completed')
 
        await $("//a[@href='/logout']").click()
 
    });


    it('Verify that allows login a User', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)

        await $('.ico-login').click();
        await $('//input[@id="Email"]').setValue(email);
        await $('//input[@id="Password"]').setValue('Password!');
        await $('.button-1.login-button').click();
        await $("//a[@href='/logout']").click()
    });


    it('Verify that "Computers" group has 3 sub-groups with correct name', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/computers"]').click();

        let desktops = await $("/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[1]/div[1]/div/h2/a").getText()
        expect (desktops).toEqual('Desktops')

        let notebooks = await $("/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[1]/div[2]/div/h2/a").getText()
        expect (notebooks).toEqual('Notebooks')

        let accessories = await $("/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[1]/div[3]/div/h2/a").getText()
        expect (accessories).toEqual('Accessories')

    });

    it('Verify that allows sorting items (different options)', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/computers"]').click();

        await $("/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[1]/div[1]/div/h2/a").click();
        await $("//select[@id='products-orderby']").click();
        await $("//*[@id='products-orderby']/option[2]").click();
        // const productNames = await $$('.product-title');
        // let previousName = '';

        // for (const productName of productNames) {
        //     const currentName = productName.getText();
        //     expect(currentName).toBeGreaterThanOrEqual(previousName);
        //     previousName = currentName;
        // };
        await $("//*[@id='products-orderby']/option[3]").click();
        await $("//*[@id='products-orderby']/option[4]").click();
    });

    it('Verify that allows changing number of items on page', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/computers"]').click();

        await $("/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[1]/div[1]/div/h2/a").click();
        await $("//select[@id='products-pagesize']").click();
        await $("//select[@id='products-pagesize']/option[1]").click();
        let elements = await $$('.item-box');
        
        expect(elements).toBeElementsArrayOfSize(4)
        expect(elements).toBeDisplayed();       

    });

    it('Verify that allows adding an item to the Wishlist', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/electronics"]').click();

        await $("//a[@title='Show products in category Cell phones'][normalize-space()='Cell phones']").click();
        await $("//a[contains(text(),'Smartphone')]").click();
        await $("//input[@id='add-to-wishlist-button-43']").click();

        const addToWish = await $("//p[@class='content']").getText()
        expect (addToWish).toEqual('The product has been added to your wishlist');
        
        let wishlist = await $("//span[@class='wishlist-qty']").getText()
        expect (wishlist).toEqual('(1)');
    });

    it('Verify that allows adding an item to the cart', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/electronics"]').click();

        await $("//a[@title='Show products in category Cell phones'][normalize-space()='Cell phones']").click();
        await $("//a[contains(text(),'Smartphone')]").click();
        await $("//input[@id='add-to-cart-button-43']").click();

        const addToCart = await $("//p[@class='content']").getText()
        expect (addToCart).toEqual('The product has been added to your shopping cart');
        
        let cartList = await $("//span[@class='cart-qty']").getText()
        expect (cartList).toEqual('(1)');
    });

    it('Verify that allows removing an item from the cart', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/electronics"]').click();

        await $("//a[@title='Show products in category Cell phones'][normalize-space()='Cell phones']").click();
        await $("//a[contains(text(),'Smartphone')]").click();
        await $("//input[@id='add-to-cart-button-43']").click();

        const addToCart = await $("//p[@class='content']").getText()
        expect (addToCart).toEqual('The product has been added to your shopping cart');
        
        let cartList = await $("//span[@class='cart-qty']").getText()
        expect (cartList).toEqual('(2)');
        await $("//span[@class='cart-label']").click();
        await $("//input[@name='removefromcart']").click();
        await $("//input[@name='updatecart']").click();
        let cartListUpdated = await $("//span[@class='cart-qty']").getText()
        expect (cartListUpdated).toEqual('(0)');
    });

    it('Verify that allows checkout an item ', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)
        await $('//a[@href="/electronics"]').click();
        //User Login
        await $('.ico-login').click();
        await $('//input[@id="Email"]').setValue(email);
        await $('//input[@id="Password"]').setValue('Password!');
        await $('.button-1.login-button').click();
        //Product search
        await $('//a[@href="/electronics"]').click();
        await $("//a[@title='Show products in category Cell phones'][normalize-space()='Cell phones']").click();
        await $("//h2[@class='product-title']//a[normalize-space()='Smartphone']").click();
        await $("//input[@id='add-to-cart-button-43']").click();
        //Product add to chart
        const addToCart = await $("//p[@class='content']").getText()
        expect (addToCart).toEqual('The product has been added to your shopping cart');
        
        let cartList = await $("//span[@class='cart-qty']").getText()
        expect (cartList).toEqual('(1)');

        await $("//span[normalize-space()='Shopping cart']").click();
        //product checkout
        await $("//input[@id='termsofservice']").click();
        await $("//button[@id='checkout']").click();
        //Checkout Billing Adress
        await $("//input[@id='BillingNewAddress_Company']").setValue('TestCompany');
        await $("//select[@id='BillingNewAddress_CountryId']").click();
        await $("//*[@id='BillingNewAddress_CountryId']/option[2]").click();
        await $("//input[@id='BillingNewAddress_Address1']").setValue('TestStreet');
        await $("//input[@id='BillingNewAddress_ZipPostalCode']").setValue('790020');
        await $("//input[@id='BillingNewAddress_PhoneNumber']").setValue('1111111111');
        await $("//input[@onclick='Billing.save()']").click();

        await $("//input[@onclick='Shipping.save()']").click();//Elements are not interactable, this need to be fixed as it works in debug mode
        await $("//input[@class='button-1 shipping-method-next-step-button']").click();
        await $("//input[@class='button-1 payment-method-next-step-button']").click();
        await $("//input[@class='button-1 payment-info-next-step-button']").click();
        await $("//input[@class='button-1 payment-info-next-step-button']").click();
        await $("//input[@value='Confirm']").click();

        const thankyouElem = await $("//h1[normalize-space()='Thank you']")
        await expect(thankyouElem).toBeDisplayed()
        const orderElem = await $("//strong[normalize-space()='Your order has been successfully processed!']")
        await expect(orderElem).toBeDisplayed()
    });

});
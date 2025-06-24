import puppeteer from 'puppeteer';

async function testLocalApp() {
  console.log('Starting local app browser test...');
  
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });
  
  try {
    const page = await browser.newPage();
    
    console.log('Navigating to local app...');
    await page.goto('http://localhost:5174');
    
    console.log('Waiting for app to load...');
    await page.waitForSelector('h1', { timeout: 10000 });
    
    const title = await page.$eval('h1', el => el.textContent);
    console.log('App title:', title);
    
    console.log('Looking for user management elements...');
    const hasUserForm = await page.$('input[placeholder="Name"]') !== null;
    console.log('User form found:', hasUserForm);
    
    if (hasUserForm) {
      console.log('Filling user form...');
      await page.type('input[placeholder="Name"]', 'Test User');
      await page.type('input[placeholder="Email"]', 'test@example.com');
      
      console.log('Clicking Add User button...');
      // Find and click the button containing "Add User" text
      const clicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const addButton = buttons.find(button => button.textContent?.includes('Add User'));
        if (addButton) {
          addButton.click();
          return true;
        }
        return false;
      });
      if (clicked) {
        console.log('User added!');
      }
    }
    
    console.log('Taking screenshot of the app...');
    await page.screenshot({ path: 'local-app-test.png', fullPage: true });
    
    console.log('Test completed successfully!');
    console.log('Screenshot saved as local-app-test.png');
    
  } catch (error) {
    console.error('Error during local app test:', error);
  } finally {
    await browser.close();
  }
}

testLocalApp().catch(console.error);
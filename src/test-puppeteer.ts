import puppeteer from 'puppeteer';

async function testBrowserAutomation() {
  console.log('Starting browser automation test...');
  
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });
  
  try {
    const page = await browser.newPage();
    
    console.log('Navigating to Google...');
    await page.goto('https://www.google.com');
    
    console.log('Waiting for search input...');
    await page.waitForSelector('textarea[name="q"]', { timeout: 5000 });
    
    console.log('Typing search query...');
    await page.type('textarea[name="q"]', 'MCP Puppeteer test');
    
    console.log('Pressing Enter...');
    await page.keyboard.press('Enter');
    
    console.log('Waiting for search results...');
    await page.waitForNavigation();
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'search-results.png' });
    
    console.log('Test completed successfully!');
    console.log('Screenshot saved as search-results.png');
    
  } catch (error) {
    console.error('Error during browser automation:', error);
  } finally {
    await browser.close();
  }
}

testBrowserAutomation().catch(console.error);
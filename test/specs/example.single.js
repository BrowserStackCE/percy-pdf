const percySnapshot = require('@percy/webdriverio');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`http://localhost:8888/web/viewer.html`);
        await browser.pause(30000);
      
        const pages = await $('.pdfViewer').$$('.page');
        const num_of_pages = pages.length
        console.log(num_of_pages)
        for(let i=0; i<num_of_pages-1; i+=1){
            await percySnapshot(i+1+'-page');
            await pages[i+1].scrollIntoView({behavior:"smooth"});
            await browser.pause(2000);
            await browser.execute(async () => {
                const elemToRemove = await document.querySelector(`.pdfViewer .page:nth-of-type(1)`);
                await elemToRemove.remove();
            });
        }
        
    });
});


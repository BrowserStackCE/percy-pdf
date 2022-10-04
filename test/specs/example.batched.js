const percySnapshot = require('@percy/webdriverio');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
    
        // need to group pages since batches doesn't have enough memory
        // to load up all the pages in the pdf
        // grouping will reduce the spanshot usage
        const group_pages = 7; // group <9 pages in every spanshot
        const loadtime_per_page = 2000; // >1sec
        const initial_loadtime = 40000; // >30 sec

        await browser.url(`http://localhost:8888/web/viewer.html?file=%2Ftest%2Fpdfs%2Fscreenshot-bc9581d0dd_new.pdf`);
        await browser.pause(initial_loadtime);
        //get all the pages
        const pages = await $('.pdfViewer').$$('.page');
        const num_of_pages = pages.length
        
        for(let i=0; i<num_of_pages; i+=1){
            // scroll to each page and wait for it to load up
            await pages[i].scrollIntoView({behavior:"smooth"});
            await browser.pause(loadtime_per_page);
            // take a spanshot after every group
            if((i+1)%group_pages == 0 || i == num_of_pages-1){
                console.log("on page "+i)
                // percy css to ignore pages after the current group
                await percySnapshot(i+1+'-page', { 
                    percyCSS: `.pdfViewer .page:nth-of-type(n+${group_pages+1}) { display: none; }` 
                  });
                // delete the group for which spanshots are taken
                for(let k=0; k<group_pages && i != num_of_pages-1 ; k++){
                    await browser.execute(async () => {
                        const elemToRemove = await document.querySelector(`.pdfViewer .page:nth-of-type(1)`);
                        await elemToRemove.remove();
                    });
                    // just for testing purposes
                    await browser.pause(1000);
                }
            }
            
        }
        
    });
});


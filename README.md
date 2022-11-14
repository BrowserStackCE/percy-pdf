## percy-pdf
This repo will allow you to compare your pdfs on percy.

#### How it works?
 1. First we parse the pdf into html using pdf.js by mozzila.
 2. We capture snapshots of the parsed webpage and send it to percy for comparison.
 3. There are two ways to capture snapshot.
    1. Single page per snapshot (Set group_pages = 1) - this is the recommended method as this will allow you to capture a lot of details.
    2. Multiple pages per snapshot (Set group_pages >1) - if you have a usecase where you would want to capture multiple pages in togther in a single snapshot.
   
   
#### Getting started
 1. Create an account on percy and setup a new project. Copy the `PERCY_TOKEN` as will need it in the following steps.
 2. Load your pdf using the pdf.js Library by following the steps mentioned [here](https://github.com/mozilla/pdf.js#getting-started).
    1. once you complete the setup you will be able to see your PDF in the browser.
    2. make a note of the URL
 3. Next, we need to clone this repo.
    1. cd to the root folder of the repo and run `npm install`.
    2. export the `PERCY_TOKEN`.
    3. update the URL in the `percy.pdf.js`
 4. Run `npm run pery-pdf`
 
#### Results!
 ![Screenshot 2022-10-04 at 6 50 14 PM](https://user-images.githubusercontent.com/53310042/193829894-513c5ded-1728-4a66-a2eb-b4da4a81dc73.png)
![Screenshot 2022-10-04 at 6 51 55 PM](https://user-images.githubusercontent.com/53310042/193830310-b33cb035-bd28-4e1f-8de0-4c1f2651ee93.png)

#### Use Cases
 1. Comparing long pdfs with a lot of visual data.
 2. Comapring Figma designs.
 3. You tell me.
  
#### Next steps
 1. Simplify the above mentioned process.
 2. Explore pdf - website comparison. 

#### FAQ
 1. Is there a limit on pdf length that can be compared?
    - Nope, there is not limit on the length of the pdf.
 2. How is this different from image comparisons?
    - This library parses pdf to html and percy will compare dom elements and hence the results will be more  accurate.
    - You can use percy features like scope and percy-css that will allow you to focus or ignore parts of your pdf.
    - you tell me.

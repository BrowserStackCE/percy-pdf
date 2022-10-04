## percy-pdf
This repo will allow you to compare your pdfs on percy.

#### How it works?
 1. First we parse the pdf into html using pdf.js by mozzila.
 2. We capture snapshots of the parsed webpage and send it to percy for comparison.
 3. There are two ways to capture snapshot.
    1. Single page per snapshot - this is the recommended method as this will allow you to capture a lot of details.
    2. Multiple pages per snapshot - if you have a usecase where you would want to capture multiple pages in togther in a single snapshot.
   
#### Getting started
 1. Create an account on percy and setup a new project. Copy the `PERCY_TOKEN` as will need it in the following steps.
 2. Load your pdf using the pdf.js Library by following the steps mentioned [here](https://github.com/mozilla/pdf.js#getting-started).
 3. Next, we need to clone this repo.
    1. cd to the root folder of the repo, npm install.
    2. export the `PERCY_TOKEN`.
    3. update the URL (where your repo is hosted locally) in the `example.batched.js` and `example.single.js`.
 4. Run `npm run pery-batched` or `npm run percy-single`.
 
 #### Use Cases
  1. Comparing long pdfs with a lot of visual data
  2. Comapring Figma designs
  3. You tell me
  
 #### Next steps
  1. Simplify the above mentioned process.
  2. Explore pdf - website comparison. 

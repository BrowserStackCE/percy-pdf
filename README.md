## percy-pdf
This `percy-pdf` code repository provides an approach to compare your Portable Document Format (PDF) files using Percy for visual testing requirements across multiple application releases.

### How it works?
 1. This repository script can be run using `npm test -- <pdf-run-info-config-file-path.yml>`. The sample PDF run info config files are provided in the `./configs` folder
 2. The above command starts a local web server inside the `pdfjs-3.4.120-dist` folder and then triggers the `tests/run.js`
 3. At a high level, the `tests/run.js` script:
   - Copies the projects from the user's project folder (i.e. `./projects`) to the local web server folder (i.e.`pdfjs-3.4.120-dist/web`). The user's projects folder is expected contain the PDF files per application release for which you would like to run the PDF file visual comparisions.
   - Iterates through the PDF Run Information Config File provided while triggering the run to identify all the PDF files in scope:
      - For creating a PDF baseline build within Percy
         OR 
      - For creating a new Percy build to compare new release PDF file with the existing PDF baseline.
 4. Triggers a Percy build for every file within the PDF Run Information Config File. Each page of the PDF file will be distinct screenshots on the Percy build.
   
   
### Getting Started
 1. Copy PDF files that you'd like to visually compare in the `projects` folder, within this repository.     Please ensure that these PDF documents are grouped based on `<project-name>` and then the `<release-version>`. A typical directory structure would like:
   - projects
      - insurance-policy-docs <-- project-name-folder
         - golden-copy
            - pdf-file-1.pdf
            - pdf-file-2.pdf
            - pdf-file-3.pdf
         - release-v2
            - pdf-file-1.pdf
            - pdf-file-2.pdf
            - pdf-file-3.pdf
         - release-v3
            - pdf-file-1.pdf
            - pdf-file-2.pdf
            - pdf-file-3.pdf
         - and so on.
 
      Note: A sample project folder has been provided with this repository (i.e. `insurance-policy-docs`). It further has different folders such as `golden-copy`, `release-v2` indicating different versions of the PDF documents. You can create as many new folders as you'd like for each new release of the PDF document.

 2. Create a PDF Run Info Config file within the `./configs` folder. Sample config files are provided here: `./configs/insurance-policy-docs` 
 3. Create an account on [Percy](https://percy.io) and create a new project. Note the Project specific `PERCY_TOKEN`, as this will be required while triggering the project builds.
 4. Clone this repository and move to the project folder.
      ```
      git clone git@github.com:BrowserStackCE/percy-pdf.git
      cd percy-pdf
      ```
 5. Ensure you are using the latest LTS version of Node.js. You can install the latest LTS Node.js version from [here](https://nodejs.org/en). We have tested this solution using Node 18.16.0 LTS.
 5. Install the repository dependencies:
      ```
      npm install
      ```
 6. Export the environment variable `PERCY_TOKEN`, obtained in step 3, using the command below.
      ```
      For *nix based and Mac machines:
      export PERCY_TOKEN=<percy-project-token>
      
      For Windows:
      set PERCY_TOKEN=<percy-project-token>
      ```
 7. Trigger the run:
      ```
      npm test -- <run-info-config-file-path.yml>
      e.g.
      npm test -- configs/insurance-policy-docs/pdf-docs-run-info-baseline.yml
      npm test -- configs/insurance-policy-docs/pdf-docs-run-info-release2.yml
      ```

### Frequently Asked  Questions (FAQs)
1. How does the script identify which PDF files to compare with each other, under the &lt;project&gt;/&lt;&release&gt; directory?

   The PDF file name should match for any PDF file to be compared with any other file under the &lt;project&gt;/&lt;release&gt; directory. For e.g `insurance-policy-docs/release-v2/pdf-file-1.pdf` will be compared against `insurance-policy-docs/golden-copy/pdf-file-1.pdf`

### Issue Tracking
&lt;This section lists the reported issues for this repository&gt;


### Disclaimer

This repository is provided on a `pro-bono` basis by the Customer Engineering team at BrowserStack. It uses a simple NodeJS script to iterate through the PDF documents, as per the user configurations provided in the `./configs` directory, create the equivalent `percy snapshot` command-specific configuration, and trigger the Percy build for comparing the PDF files across different PDF pages. In case, you decide to use this repository and face any issues, you can submit an New Issue using the Issues tab on the GitHub repository and the maintainer(s) may consider fixing the reported issue or developing the requested feature.
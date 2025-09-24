## percy-pdf
This `percy-pdf` code repository provides an approach to compare your Portable Document Format (PDF) files using Percy for Visual Testing Requirements, across multiple application releases.
      
### Getting Started
 1. Copy PDF files that you'd like to visually compare in the `projects` folder, within this repository.     Please ensure that these PDF documents are grouped based on `<project-name>` and then the `<release-version>`. A typical directory structure would like:
   - projects
      - insurance-policy-docs <-- &lt;your-project-name-folder&gt;
         - golden-copy <-- &lt;your-baseline-release-folder&gt;
            - pdf-file-1.pdf
            - pdf-file-2.pdf
            - pdf-file-3.pdf
         - release-v2 <-- &lt;your-another-release-folder&gt;
            - pdf-file-1.pdf
            - pdf-file-2.pdf
            - pdf-file-3.pdf
         - release-v3 <-- &lt;your-another-release-folder&gt;
            - pdf-file-1.pdf
            - pdf-file-2.pdf
            - pdf-file-3.pdf
         - and so on.
 
      Note: A sample project folder has been provided with this repository (i.e. `insurance-policy-docs`). It further has different folders such as `golden-copy`, `release-v2` indicating different versions of the PDF documents. You can create as many new folders as you'd like for each new release of the PDF document.

 2. Create a PDF Run Info Config file within the `./configs` folder. Sample config files are provided here: `./configs` 
 3. Create an account on [Percy](https://percy.io) and create a new Percy Web project. Note the Project specific `PERCY_TOKEN`, as this will be required while triggering the project builds.
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
 7. Trigger the run for the Getting Started Scenario:
      ```
      npm test -- <run-info-config-file-path.yml> <Optional PORT Param. Default 8080>
      e.g.
      npm test -- configs/getting-started-scenarios/01_pdf-docs-run-info-baseline.yml
      npm test -- configs/getting-started-scenarios/01_pdf-docs-run-info-release2.yml
      ```

      In case, you would like to provide a dynamic port value for the web server too, please provide the PORT as the second argument to the command:
      ```
      npm test -- <run-info-config-file-path.yml> <Optional PORT Param. Default 8080>
      e.g.
      npm test -- configs/getting-started-scenarios/01_pdf-docs-run-info-baseline.yml 8081
      npm test -- configs/getting-started-scenarios/01_pdf-docs-run-info-release2.yml 8081
      ```
8. You may want to trigger the Advanced Scenario in a similar fashion, once you have gone through the Advanced PDF Run Config File flags (and have relevant use cases), as documented in the section `PDF Run Config File` below.

      ```
      npm test -- <run-info-config-file-path.yml>
      e.g.
      npm test -- configs/advanced-scenarios/01_pdf-docs-run-info-baseline.yml
      npm test -- configs/advanced-scenarios/01_pdf-docs-run-info-release2.yml
      ```

### PDF Run Config File

The PDF Run Info file provides a number of flags that provide information about the PDF documents up for Visual Comparison. This section provides details of all the flags:

#### Mandatory Flags:

- runMode: The run mode - i.e. whether creating a new baseline OR comparing existing baseline with new release. Based on the requirement, this value can be `create-baseline` or `compare-release-with-baseline`.
- projectFolders: An array of Folders under the `projects` folder in the root directory. e.g. [insurance-policy-docs, test-docs]
- baselineDir: The directory under the project folder which contains the baseline PDF documents. e.g. golden-copy
- releaseDir: The directory under the project folder which contains the new release PDF documents. e.g. release-v2. This flag is `optional` while creating a new baseline Percy build, however it becomes mandatory for a comparision build between baseline and new release.

#### Optional Flags

- includeDocs (optional): An array of PDF documents under the project folder which should be included for comparison. If this tag is not provided, all PDF documents under the project folder will be chosen by default, else only the provided documents will be chosen.
   - This flag contains sub-flags:
      - project: the project folder for the document
      - doc: the doc name with the `.pdf` extension
- excludeDocs (optional): An array of PDF documents under the project folder which should be excluded for comparison. If this tag is not provided, no PDF documents under the project folder will be excluded by default, else only the provided documents will be excluded.
   - This flag contains sub-flags:
      - project: the project folder for the document
      - doc: the doc name with the `.pdf` extension
- specialDocConfigs (optional): This flag provides further customization to include / exclude certain pages of the any of the PDF documents. The specific document is identified using the `project` and `doc` flags and further flags `includePages` / `excludePages` are provided to include or exclude pages in the PDF document during baselining or comparision.
- createNewBuildPerDoc (default -> false): For any PDF Run Config file, by default -> A single build is created with clubs all PDF documents across User projects in a single Percy build. However, if the user wants to create a new Percy Build per PDF document, then `createNewBuildPerDoc` can be optionally set to true.
- percyConfigs.waitForTimeout (default: none):  Percy snapshot internal configuration that can be passed by the user through the PDF Run Info Config file. It specifies an amount of time to wait before capturing a snapshot in milliseconds. 
  E.g. Below configuration will ensure Percy Snapshot command waits for 200 milliseconds before capturing the Snapshot.
  
  ```
  percyConfigs:
    waitForTimeout: 200
  ```


### Internal Working  
 1. This repository script can be run using `npm test -- <pdf-run-info-config-file-path.yml>`. The sample PDF run info config files are provided in the `./configs` folder
 2. The above command starts a Local Web Server inside the `pdfjs-3.4.120-dist` folder and then triggers the `tests/run.js`
 3. At a high level, the `tests/run.js` script:
   - Copies the projects from the user's project folder (i.e. `./projects`) to the local web server folder (i.e.`pdfjs-3.4.120-dist/web`). The user's projects folder is expected contain the PDF files, per application release, for which you would like to run the PDF file visual comparisions.
   - Iterates through the PDF Run Information Config File provided while triggering the run to identify all the PDF files in scope:
      - For creating a PDF baseline build within Percy
         OR 
      - For creating a new Percy build to compare new release PDF file with the existing PDF baseline.
 4. Triggers a Percy build for every file within the PDF Run Information Config File. Each page of the PDF file will be distinct screenshots on the Percy build.

### Frequently Asked  Questions (FAQs)
1. How does the script identify which PDF files to compare with each other, under the &lt;project&gt;/&lt;&release&gt; directory?

   The PDF file name should match for any PDF file to be compared with any other file under the &lt;project&gt;/&lt;release&gt; directory. For e.g `insurance-policy-docs/release-v2/pdf-file-1.pdf` will be compared against `insurance-policy-docs/golden-copy/pdf-file-1.pdf`

### Issue Tracking
#### Known Limitations
1. The excludePages flag within the PDF Docs Run Info Config file does not allow excluding for PDF Page 1 and the second last page of the PDF.  


### Disclaimer

This repository is provided on a `pro-bono` basis by the Customer Engineering team at BrowserStack. It uses a simple NodeJS script to iterate through the PDF documents, as per the user configurations provided in the `./configs` directory, create the equivalent `percy snapshot` command-specific configuration, and trigger the Percy build for comparing the PDF files across different PDF pages. In case, you decide to use this repository and face any issues, you can submit an New Issue using the Issues tab on the GitHub repository and the maintainer(s) may consider fixing the reported issue or developing the requested feature.
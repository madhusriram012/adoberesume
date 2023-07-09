
# Resume Builder API frontend

This challenge aims to create a Resume Builder API that uses the Adobe Document Generation API to dynamically create PDF resumes from DOCX based templates.This repository is the frontend part.  

# How to connect frontend to backend

 1.Go to this link below

```bash
  https://github.com/madhusriram012/resumeapibackend
```
2.Paste it on any web browser it will get you to the backend part of this project where it contains the Resume Builder API.

3.Follow the steps in the backend repository to start the server.

4.After starting the server come back to the frontend part and follow the steps below. 

5.Make sure the backend server is running before you start the frontend server because backend server will send the response once the request has been sent from frontend part.

## How to run


### Step 1: Clone the repository
```bash
git clone https://github.com/madhusriram012/resumeapifrontend.git
```

### Step 2: Install dependencies

```bash
cd resumeapifrontend
npm install 
```
If error persists while running the above command ,simply delete the node_modules folder and repeat the process.

### 3.To start development server
```bash
  npm run dev
```

## Demo
1.In the home page you can choose any template from the given 3 templates and this leads to a form.
<img width="1122" alt="image" src="https://github.com/madhusriram012/resumeapifrontend/assets/75003175/fd58e818-e5bc-40fa-91b7-18cb52b4a017">

2.In the form you can enter the details and once you click the generate button it sends a requests with all the required information in json format to backend.
<img width="1184" alt="image" src="https://github.com/madhusriram012/resumeapifrontend/assets/75003175/4e40ce1b-7d77-42d9-9c18-6651cc214d59">

3.The API in backend compiles and merges all the infromation from json file and sends response in the form of pdf file which will prompt the user to download the file.
<img width="1176" alt="image" src="https://github.com/madhusriram012/resumeapifrontend/assets/75003175/78901a85-254a-42cd-8b58-9cf24da2feae">

4.The output will look like the below in pdf format.
<img width="464" alt="image" src="https://github.com/madhusriram012/resumeapifrontend/assets/75003175/5e7e2804-ea40-4953-86bb-152467af2e4e">





import React from "react";
import LabelInput from "./LabelInput/LabelInput";


const PersonalInformation = ({ formik }) => {
    
  return (
    <div className="Template__formSection">
     
        <LabelInput
          id="name"
          isMandatory
          name="personalInformation.name"
          label="Name"
          value={formik.values.personalInformation.name}
          placeholder="Enter your name"
          onChange={formik.handleChange}
        />
     
      
        <LabelInput
          id="lastName"
          isMandatory
          label="Last Name"
          name="personalInformation.lastName"
          value={formik.values.personalInformation.lastName}
          placeholder="Enter your last name"
          onChange={formik.handleChange}
        />
      
      
        <LabelInput
          id="emailAddress"
          isMandatory
          label="Email"
          name="personalInformation.emailAddress"
          value={formik.values.personalInformation.emailAddress}
          placeholder="Enter your email"
          type="email"
          onChange={formik.handleChange}
        />
 
        <LabelInput
          id="phoneNumber"
          isMandatory
          label="Phone"
          placeholder="Enter your phone number with extension"
          type="text"
          name="personalInformation.phoneNumber"
          value={formik.values.personalInformation.phoneNumber}
          onChange={formik.handleChange}
        />

        <LabelInput
          id="linkedInUrl"
          isMandatory
          label="LinkedIn"
          name="personalInformation.linkedInUrl"
          value={formik.values.personalInformation.linkedInUrl}
          placeholder="Enter your LinkedIn URL"
          onChange={formik.handleChange}
        />
      
    </div>
  );
};

export default PersonalInformation;

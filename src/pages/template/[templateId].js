import EducationBox from "@/components/EducationBox";
import ExperienceBox from "@/components/ExperienceBox";
import LabelInput from "@/components/LabelInput/LabelInput";
import SkillBox from "@/components/SkillBox";
import "@/styles/routes/template.scss";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Fragment, useMemo, useRef } from "react";
import { customAlphabet } from "nanoid";
import AchievementBox from "@/components/AchievementBox";
import Header from "@/components/Header/Header";
import {loginAndGeneratePdf} from "@/api/resume.builder.rest";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const templateId = context.query.templateId;
  return {
    props: {
      templateId,
    },
  };
}

export default function Template({ templateId }) {
  const nanoid = customAlphabet("1234567890abcdef", 7);
  const [jsonData, setJsonData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const formik = useFormik({
    initialValues: {
      templateId: templateId,
      //   personalInfo
      personalInformation: {
        name: "", // Add firstName inside personalInformation
        lastName: "", // Add lastName inside personalInformation
        emailAddress: "", // Add email inside personalInformation
        phoneNumber: "", // Add phone inside personalInformation
        linkedInUrl: "", // Add linkedInUrl inside personalInformation
      },
      jobTitle: "",
      careerObjective: "",
      //   skills
      skills: [],
      //   education
      education: [
        {
          schoolName: "",
          passingYear: "",
          description: "",
        },
      ],
      //   experience
      experience: [
        {
          companyName: "",
          passingYear: "",
          responsibilities: "",
        },
      ],
      //   achievements
      achievements: [
        {
          field: "",
          awards: "",
        },
      ],
    },
    onSubmit: async (values) => {
      if (Object.values(values).includes("")) {
        alert("Please fill all mandatory fields");
        return;
      }

      // Convert form values to JSON format
      const json = JSON.stringify(values, null, 2);
      setJsonData(json);
      console.log(json);
      try {
        // Set request headers
        setIsGeneratingPdf(true); // Set flag to indicate PDF generation is in progress
        await loginAndGeneratePdf(json)
        console.log("Data saved successfully! ");
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsGeneratingPdf(false);
      }
    },

    validate: (values) => {
      let errors = {};

      // Validate education fields
      values.education.forEach((educationItem, index) => {
        if (!educationItem.passingYear) {
          errors.education = errors.education || [];
          errors.education[index] = errors.education[index] || {};
          errors.education[index].passingYear = "Cannot be blank";
        }
      });
      return errors;
    },
  });


  return (
    <div className="Template">
      <Header />
      <h1>Details</h1>
      <FormikProvider value={formik}>
        <form className="Template__form" onSubmit={formik.handleSubmit}>
          <section className="Template__formSection">
            <h4>
              Personal information
              <span>&nbsp;</span>
            </h4>
            <div className="Template__formSection--row">
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
            </div>
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
              placeholder="Enter your phone number"
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
            <LabelInput
              id="jobTitle"
              isMandatory
              label="Job Title"
              value={formik.values.jobTitle}
              placeholder="Enter your job title"
              onChange={formik.handleChange}
            />
            <LabelInput
              id="careerObjective"
              isMandatory
              label="Career Objective"
              value={formik.values.careerObjective}
              placeholder="Enter your career objective"
              onChange={formik.handleChange}
            />

            <h4>
              Skills
              <span>&nbsp;</span>
            </h4>
            <FieldArray
              name="skills"
              render={(arrayHelpers) => (
                <Fragment>
                  {formik.values.skills.map((item, index) => {
                    return (
                      <SkillBox
                        arrayHelpers={arrayHelpers}
                        formik={formik}
                        key={item.id}
                        index={index}
                      />
                    );
                  })}
                  <button
                    className="FancyButton"
                    type="button"
                    onClick={() => arrayHelpers.push(formik.values.skills)}
                  >
                    Add Skill
                  </button>
                </Fragment>
              )}
            />
          </section>
          <section className="Template__formSection">
            <h4>
              Education
              <span>&nbsp;</span>
            </h4>
            <FieldArray
              name="education"
              render={(arrayHelpers) => (
                <Fragment>
                  {formik.values.education.map((item, index) => (
                    <EducationBox
                      arrayHelpers={arrayHelpers}
                      formik={formik}
                      key={item.id}
                      index={index}
                    />
                  ))}
                  <button
                    className="FancyButton"
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        schoolName: "",
                        passingYear: "",
                        description: "",
                      })
                    }
                  >
                    Add Education
                  </button>
                </Fragment>
              )}
            />
          </section>
          <section className="Template__formSection">
            <h4>
              Experience
              <span>&nbsp;</span>
            </h4>
            <FieldArray
              name="experience"
              render={(arrayHelpers) => (
                <Fragment>
                  {formik.values.experience.map((item, index) => (
                    <ExperienceBox
                      arrayHelpers={arrayHelpers}
                      formik={formik}
                      key={item.id}
                      index={index}
                    />
                  ))}
                  <button
                    className="FancyButton"
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        companyName: "",
                        passingYear: "",
                        responsibilities: "",
                      })
                    }
                  >
                    Add Experience
                  </button>
                </Fragment>
              )}
            />
          </section>
          <section className="Template__formSection">
            <h4>
              Achievements
              <span>&nbsp;</span>
            </h4>
            <FieldArray
              name="achievements"
              render={(arrayHelpers) => (
                <Fragment>
                  {formik.values.achievements.map((item, index) => (
                    <AchievementBox
                      arrayHelpers={arrayHelpers}
                      formik={formik}
                      key={item.id}
                      index={index}
                      awards={item.awards} // Update the prop name to 'awards'
                    />
                  ))}
                  <button
                    className="FancyButton"
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        field: "",
                        awards: "", // Update the field name to 'awards'
                      })
                    }
                  >
                    Add Achievement
                  </button>
                </Fragment>
              )}
            />
          </section>
          <button
            className="FancyButton"
            type="submit"
            data-type="green-solid"
            style={{
              width: "100%",
            }}
            onClick={formik.handleSubmit}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? "Generating.." : "Generate"}
          </button>
        </form>
      </FormikProvider>
    </div>
  );
}

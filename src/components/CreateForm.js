import React from "react";
import classes from "../styles/CreateForm.module.css";
import { useState } from "react";
import axios from "axios";
const base_url = "http://127.0.0.1:5000/form/application-forms/";
function CreateForm() {
  const [status, setstatus] = useState("applied");
  const [is_hostellite, setis_hostellite] = useState("");
  function handleStatusChange(val) {
    setstatus(val);
  }

  function handleis_hostelliteChange(val) {
    setis_hostellite(val);
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(status);
    // Access form elements
    const formElements = event.target.elements;

    // Create dictionary to store key-value pairs
    const formData = new FormData();

    // Iterate over form elements
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];

      // Check if the element has a name attribute
      if (element.name) {
        // Check if the element is a file input
        if (element.type === "file") {
          if (element.files[0]) {
            // Append the file itself
            formData.append(element.name, element.files[0]);
          } else {
            // Create a dummy file based on the supported file type
            let dummyFile;
            if (element.accept.includes("pdf")) {
              dummyFile = new File(["Dummy PDF content"], "dummy.pdf", {
                type: "application/pdf",
              });
            }
            if (dummyFile) {
              // Append the dummy file
              formData.append(element.name, dummyFile);
            }
          }
        } else {
          if (element.name !== "status" && element.name !== "is_hostellite")
            // Store key-value pair in formData dictionary
            formData.append(element.name, element.value);
        }
      }
    }
    formData.append("status", status);
    formData.append("is_hostellite", is_hostellite);
    // Log the form data
    console.log(formData);
    axios
      .post(base_url, formData)
      .then(() => {
        alert("Data submitted successfully");
      })
      .catch(() => {
        alert("Error Submitting Data");
      });
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.statusGroup}>
          <h2 className={classes.statusHeading}>Application Status</h2>
          <div>
            <button
              type="button"
              name="status"
              value="applied"
              id="s1"
              onClick={handleStatusChange.bind(null, "applied")}
              className={status === "applied" ? classes.active : ""}
            >
              Applied
            </button>
            <button
              type="button"
              name="status"
              value="discontinued"
              id="s2"
              onClick={handleStatusChange.bind(null, "discontinued")}
              className={status === "discontinued" ? classes.active : ""}
            >
              Discontinued
            </button>
            <button
              type="button"
              name="status"
              value="admitted"
              id="s3"
              onClick={handleStatusChange.bind(null, "admitted")}
              className={status === "admitted" ? classes.active : ""}
            >
              Admitted
            </button>
          </div>
        </div>
        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>Basic Information</h2>
          <div className={classes.formElement}>
            <label>Email</label>
            <input type="text" name="email" />
          </div>

          <div className={classes.formElement}>
            <label>Student Name</label>
            <input type="text" name="student_name" />
          </div>

          <div className={classes.formElement}>
            <label>Course</label>
            <input type="text" name="course" />
          </div>

          <div className={classes.formElement}>
            <label>Date of Birth</label>
            <input type="date" name="date_of_birth" />
          </div>

          <div className={classes.formElement}>
            <label>Gender</label>
            <input type="text" name="gender" />
          </div>
          <div className={classes.hostellite}>
            <div>
              <button
                type="button"
                name="status"
                value="applied"
                id="s1"
                onClick={handleis_hostelliteChange.bind(null, "Day Scholar")}
                className={
                  is_hostellite === "Day Scholar" ? classes.active : ""
                }
              >
                Day Scholar
              </button>
              <button
                type="button"
                name="status"
                value="discontinue"
                id="s2"
                onClick={handleis_hostelliteChange.bind(null, "Hostellite")}
                className={is_hostellite === "Hostellite" ? classes.active : ""}
              >
                Hostellite
              </button>
            </div>
          </div>
          <div className={classes.formElement}>
            <label>Community</label>
            <select name="community">
              <option value="OC">OC</option>
              <option value="BC">BC</option>
              <option value="MBC">MBC</option>
              <option value="SC">SC</option>
              <option value="SCA">SCA</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div className={classes.formElement}>
            <label>Religion</label>
            <input type="text" name="religion" />
          </div>

          <div className={classes.formElement}>
            <label>Native Place</label>
            <input type="text" name="native_place" />
          </div>

          <div className={classes.formElement}>
            <label>Blood Group</label>
            <input type="text" name="blood_group" />
          </div>

          <div className={classes.formElement}>
            <label>Height</label>
            <input type="number" name="height" step="0.01" />
          </div>

          <div className={classes.formElement}>
            <label>Weight</label>
            <input type="number" name="weight" step="0.01" />
          </div>

          <div className={classes.formElement}>
            <label>Caste</label>
            <input type="text" name="caste" />
          </div>

          <div className={classes.formElement}>
            <label>Address for Communication</label>
            <textarea name="address_for_communication"></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Student Contact Number</label>
            <input type="text" name="student_contact_no" />
          </div>

          <div className={classes.formElement}>
            <label>Mobile 1</label>
            <input type="text" name="mobile_1" />
          </div>

          <div className={classes.formElement}>
            <label>Mobile 2</label>
            <input type="text" name="mobile_2" />
          </div>

          <div className={classes.formElement}>
            <label>Mobile 3</label>
            <input type="text" name="mobile_3" />
          </div>

          <div className={classes.formElement}>
            <label>Date of Admission</label>
            <input type="date" name="date_of_admission" />
          </div>

          <div className={classes.formElement}>
            <label>Local Guardian Address</label>
            <textarea name="address_local_guardian"></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Guardian Mobile</label>
            <input type="text" name="guardian_mobile" />
          </div>

          <div className={classes.formElement}>
            <label>Nationality</label>
            <input type="text" name="nationality" />
          </div>
          <div className={classes.formElement}>
            <label>Mother Tongue</label>
            <input type="text" name="mother_tongue" />
          </div>
          <div className={classes.formElement}>
            <label>Quota</label>
            <input type="text" name="quota" />
          </div>
          <div className={classes.formElement}></div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>Parent Information</h2>

          <div className={classes.formElement}>
            <label>Father's Name</label>
            <input type="text" name="father_name" />
          </div>

          <div className={classes.formElement}>
            <label>Father's Occupation</label>
            <input type="text" name="father_occupation" />
          </div>

          <div className={classes.formElement}>
            <label>Father's Occupation Address</label>
            <textarea name="father_occupation_address"></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Father's Phone Number</label>
            <input type="text" name="father_phone_number" />
          </div>

          <div className={classes.formElement}>
            <label>Father's Email</label>
            <input type="email" name="father_email" />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Name</label>
            <input type="text" name="mother_name" />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Occupation</label>
            <input type="text" name="mother_occupation" />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Occupation Address</label>
            <textarea name="mother_occupation_address"></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Mother's Phone Number</label>
            <input type="text" name="mother_phone_number" />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Email</label>
            <input type="email" name="mother_email" />
          </div>
          <div className={classes.formElement}></div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>HSC Performance</h2>

          <div className={classes.formElement}>
            <label>HSC Register Number</label>
            <input type="text" name="hsc_register_no" />
          </div>

          <div className={classes.formElement}>
            <label>Board of Study</label>
            <select name="board_of_study">
              <option value="State">State</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className={classes.formElement}>
            <label>HSC Year of Passing</label>
            <input type="number" name="hsc_year_of_passing" />
          </div>

          <div className={classes.formElement}>
            <label>HSC Physics Mark</label>
            <input type="number" name="hsc_physics_mark" step="0.0001" />
          </div>

          <div className={classes.formElement}>
            <label>HSC Chemistry Mark</label>
            <input type="number" name="hsc_chemistry_mark" step="0.0001" />
          </div>

          <div className={classes.formElement}>
            <label>HSC Biology Mark</label>
            <input type="number" name="hsc_biology_mark" step="0.0001" />
          </div>

          <div className={classes.formElement}>
            <label>HSC Total Mark</label>
            <input type="number" name="hsc_total_mark" step="0.0001" />
          </div>

          <div className={classes.formElement}>
            <label>HSC Marks Maximum</label>
            <input type="number" name="hsc_marks_maximum" step="0.0001" />
          </div>

          <div className={classes.formElement}>
            <label>PCB Percentage</label>
            <input type="number" name="pcb_percentage" step="0.0001" />
          </div>
          <div className={classes.formElement}></div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>NEET Performance</h2>

          <div className={classes.formElement}>
            <label>NEET Roll Number</label>
            <input type="text" name="neet_roll_no" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Year</label>
            <input type="number" name="neet_year" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Study Center Name</label>
            <input type="text" name="neet_study_center_name" />
          </div>

          <div className={classes.formElement}>
            <label>No. of NEET Attempts</label>
            <input type="number" name="no_of_neet_attempts" />
          </div>

          <div className={classes.formElement}>
            <label>NEET AIR</label>
            <input type="number" name="neet_air" />
          </div>

          <div className={classes.formElement}>
            <label>Selection Committee Allotment Order No</label>
            <input type="text" name="selection_committee_allotment_order_no" />
          </div>

          <div className={classes.formElement}>
            <label>Selection Committee General Rank</label>
            <input type="text" name="selection_committee_general_rank" />
          </div>

          <div className={classes.formElement}>
            <label>Allotment Order Date</label>
            <input type="date" name="allotment_order_date" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Physics Mark</label>
            <input type="number" name="neet_physics_mark" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Chemistry Mark</label>
            <input type="number" name="neet_chemistry_mark" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Biology Mark</label>
            <input type="number" name="neet_biology_mark" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Total Mark</label>
            <input type="number" name="neet_total_mark" />
          </div>

          <div className={classes.formElement}>
            <label>NEET Physics Percentile</label>
            <input
              type="number"
              name="neet_physics_percentile"
              defaultValue={null}
              step="0.00000001"
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Chemistry Percentile</label>
            <input
              type="number"
              name="neet_chemistry_percentile"
              defaultValue={null}
              step="0.00000001"
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Biology Percentile</label>
            <input
              type="number"
              name="neet_biology_percentile"
              defaultValue={null}
              step="0.00000001"
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Total Percentile</label>
            <input
              type="number"
              name="neet_total_percentile"
              defaultValue={null}
              step="0.00000001"
            />
          </div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>File Uploads</h2>

          <div className={classes.formElement}>
            <label>Student Photo (max 1MB)</label>
            <input
              type="file"
              accept="image/*"
              name="student_photo"
              defaultValue={null}
              maxsize={1048576}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Score Card (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="neet_score_card"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Conduct Certificate (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="conduct_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Admit Card / Hall Ticket (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="neet_admit_card"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>
              Allotment Order and Payment Receipt SSLC Certificate (max 10MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              name="allotment_order_sslc_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Certificate (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="hsc_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Transfer Certificate (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="transfer_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Community Certificate (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="community_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Aadhaar Card (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="aadhaar_card"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Eligibility and Migration Certificates (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="eligibility_migration_certificates"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Nativity Certificate (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="nativity_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>
              Income Certificate for salary below 2.5 lacs (max 10MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              name="income_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Physical Fitness Certificate / Original (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="physical_fitness_certificate"
              defaultValue={null}
              maxsize={10485760}
            />
          </div>

          <div className={classes.formElement}>
            <label>Declaration Form (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="declaration_form"
              maxsize={10485760}
              defaultValue={null}
            />
          </div>

          <div className={classes.formElement}>
            <label>Anti-ragging Bond by Student & Parent (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="anti_ragging_bond"
              maxsize={10485760}
              defaultValue={null}
            />
          </div>

          <div className={classes.formElement}>
            <label>Certificate of Physically Handicapped (max 10MB)</label>
            <input
              type="file"
              accept=".pdf"
              name="physically_handicapped_certificate"
              maxsize={10485760}
              defaultValue={null}
            />
          </div>
        </div>

        <div className={classes.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;

import React, { useEffect } from "react";
import classes from "../styles/CreateForm.module.css";
import { useState } from "react";
import axios from "axios";

const base_url = "http://192.168.0.29:8888/form/application-forms/";
function CreateForm() {
  const [status, setstatus] = useState("applied");
  const [is_hostellite, setis_hostellite] = useState("");
  const [ar_number, setar_number] = useState(0);
  const [student_data, setStudentData] = useState({});
  function handleStatusChange(val) {
    setstatus(val);
  }
  function handleis_hostelliteChange(val) {
    setis_hostellite(val);
  }
  function handlear_numberChange(event) {
    setar_number(event.target.value);
  }
  function getStudentData(event) {
    axios
      .get(base_url + ar_number)
      .then((response) => {
        console.log("e");
        setStudentData(response.data);
      })
      .catch(() => {
        alert("Error in retriving Data");
      });
    event.preventDefault();
  }
  // console.log(student_data);
  useEffect(() => {
    setis_hostellite(student_data.is_hostellite);
    setstatus(student_data.status);
  }, [student_data]);
  // console.log(student_data.status);
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
          // Append the file itself
          console.log(element.name, element.files[0]);
          formData.append(element.name, element.files[0]);
        } else {
          if (element.name !== "status" && element.name !== "is_hostellite")
            // Store key-value pair in formData dictionary
            formData.append(element.name, element.value);
        }
      }
    }
    formData.append("status", status);
    formData.append("is_hostellite", is_hostellite);
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
      <form onSubmit={getStudentData}>
        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>Fetch Student Data</h2>
          <div className={classes.formElement}>
          <label>Enter Application number</label>
            <input
              type="number"
              name="ar_number"
              onChange={handlear_numberChange}
            />
          </div>
          <div className={classes.getBtn}>
            <button type="submit">Fetch Data</button>
          </div>
        </div>
      </form>
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
              disabled
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
              disabled
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
              disabled
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
            <input type="text" name="email" defaultValue={student_data.email} />
          </div>

          <div className={classes.formElement}>
            <label>Student Name</label>
            <input
              type="text"
              name="student_name"
              disabled
              defaultValue={student_data.student_name}
            />
          </div>

          <div className={classes.formElement}>
            <label>Course</label>
            <input
              type="text"
              name="course"
              disabled
              defaultValue={student_data.course}
            />
          </div>

          <div className={classes.formElement}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              disabled
              defaultValue={student_data.date_of_birth}
            />
          </div>

          <div className={classes.formElement}>
            <label>Course Type</label>
            <input type="text" name="course_type" defaultValue={student_data.course_type} disabled/>
          </div>

          <div className={classes.formElement}>
            <label>Aadhaar number</label>
            <input type="text" name="aadhar_no" defaultValue={student_data.aadhar_no} disabled/>
          </div>

          <div className={classes.formElement}>
            <label>Start of Academic year</label>
            <input type="text" name="academic_year_start" defaultValue={student_data.academic_year_start} disabled/>
          </div>

          <div className={classes.formElement}>
            <label>End of academic year</label>
            <input type="text" name="academic_year_end" defaultValue={student_data.academic_year_end} disabled/>
          </div>


          <div className={classes.formElement}>
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              disabled
              defaultValue={student_data.gender}
            />
          </div>

          <div className={classes.hostellite}>
            <div>
              <button
                type="button"
                name="status"
                value="applied"
                id="s1"
                disabled
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
                disabled
                onClick={handleis_hostelliteChange.bind(null, "Hostellite")}
                className={is_hostellite === "Hostellite" ? classes.active : ""}
              >
                Hostellite
              </button>
            </div>
          </div>
          <div className={classes.formElement}>
            <label>Community</label>
            <input
              type="text"
              name="community"
              disabled
              defaultValue={student_data.community}
            />
          </div>

          <div className={classes.formElement}>
            <label>Religion</label>
            <input
              type="text"
              name="religion"
              disabled
              defaultValue={student_data.religion}
            />
          </div>

          <div className={classes.formElement}>
            <label>Native Place</label>
            <input
              type="text"
              name="native_place"
              disabled
              defaultValue={student_data.native_place}
            />
          </div>

          <div className={classes.formElement}>
            <label>Blood Group</label>
            <input
              type="text"
              name="blood_group"
              disabled
              defaultValue={student_data.blood_group}
            />
          </div>

          <div className={classes.formElement}>
            <label>Height</label>
            <input
              type="number"
              name="height"
              step="0.01"
              disabled
              defaultValue={student_data.height}
            />
          </div>

          <div className={classes.formElement}>
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              step="0.01"
              disabled
              defaultValue={student_data.weight}
            />
          </div>

          <div className={classes.formElement}>
            <label>Caste</label>
            <input
              type="text"
              name="caste"
              disabled
              defaultValue={student_data.caste}
            />
          </div>

          <div className={classes.formElement}>
            <label>Address for Communication</label>
            <textarea
              name="address_for_communication"
              disabled
              defaultValue={student_data.address_for_communication}
            ></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Student Contact Number</label>
            <input
              type="text"
              name="student_contact_no"
              disabled
              defaultValue={student_data.student_contact_no}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mobile 1</label>
            <input
              type="text"
              name="mobile_1"
              disabled
              defaultValue={student_data.mobile_1}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mobile 2</label>
            <input
              type="text"
              name="mobile_2"
              disabled
              defaultValue={student_data.mobile_2}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mobile 3</label>
            <input
              type="text"
              name="mobile_3"
              disabled
              defaultValue={student_data.mobile_3}
            />
          </div>

          <div className={classes.formElement}>
            <label>Date of Admission</label>
            <input
              type="date"
              name="date_of_admission"
              disabled
              defaultValue={student_data.date_of_admission}
            />
          </div>

          <div className={classes.formElement}>
            <label>Local Guardian Address</label>
            <textarea
              name="address_local_guardian"
              disabled
              defaultValue={student_data.address_local_guardian}
            ></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Guardian Mobile</label>
            <input
              type="text"
              name="guardian_mobile"
              disabled
              defaultValue={student_data.guardian_mobile}
            />
          </div>

          <div className={classes.formElement}>
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              disabled
              defaultValue={student_data.nationality}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mother Tongue</label>
            <input
              type="text"
              name="mother_tongue"
              disabled
              defaultValue={student_data.mother_tongue}
            />
          </div>

          <div className={classes.formElement}>
            <label>Quota</label>
            <input
              type="text"
              name="quota"
              disabled
              defaultValue={student_data.quota}
            />
          </div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>Parent Information</h2>

          <div className={classes.formElement}>
            <label>Father's Name</label>
            <input
              type="text"
              name="father_name"
              disabled
              defaultValue={student_data.father_name}
            />
          </div>

          <div className={classes.formElement}>
            <label>Father's Occupation</label>
            <input
              type="text"
              name="father_occupation"
              disabled
              defaultValue={student_data.father_occupation}
            />
          </div>

          <div className={classes.formElement}>
            <label>Father's Occupation Address</label>
            <textarea
              name="father_occupation_address"
              disabled
              defaultValue={student_data.father_occupation_address}
            ></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Father's Phone Number</label>
            <input
              type="text"
              name="father_phone_number"
              disabled
              defaultValue={student_data.father_phone_number}
            />
          </div>

          <div className={classes.formElement}>
            <label>Father's Email</label>
            <input
              type="email"
              name="father_email"
              disabled
              defaultValue={student_data.father_email}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Name</label>
            <input
              type="text"
              name="mother_name"
              disabled
              defaultValue={student_data.mother_name}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Occupation</label>
            <input
              type="text"
              name="mother_occupation"
              disabled
              defaultValue={student_data.mother_occupation}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Occupation Address</label>
            <textarea
              name="mother_occupation_address"
              disabled
              defaultValue={student_data.mother_occupation_address}
            ></textarea>
          </div>

          <div className={classes.formElement}>
            <label>Mother's Phone Number</label>
            <input
              type="text"
              name="mother_phone_number"
              disabled
              defaultValue={student_data.mother_phone_number}
            />
          </div>

          <div className={classes.formElement}>
            <label>Mother's Email</label>
            <input
              type="email"
              name="mother_email"
              disabled
              defaultValue={student_data.mother_email}
            />
          </div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>HSC Performance</h2>

          <div className={classes.formElement}>
            <label>HSC Register Number</label>
            <input
              type="text"
              name="hsc_register_no"
              disabled
              defaultValue={student_data.hsc_register_no}
            />
          </div>

          <div className={classes.formElement}>
            <label>Board of Study</label>
            <input
              type="text"
              name="board_of_study"
              disabled
              defaultValue={student_data.board_of_study}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Year of Passing</label>
            <input
              type="number"
              name="hsc_year_of_passing"
              disabled
              defaultValue={student_data.hsc_year_of_passing}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Physics Mark</label>
            <input
              type="number"
              name="hsc_physics_mark"
              disabled
              step="0.0001"
              defaultValue={student_data.hsc_physics_mark}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Chemistry Mark</label>
            <input
              type="number"
              name="hsc_chemistry_mark"
              disabled
              step="0.0001"
              defaultValue={student_data.hsc_chemistry_mark}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Biology Mark</label>
            <input
              type="number"
              name="hsc_biology_mark"
              disabled
              step="0.0001"
              defaultValue={student_data.hsc_biology_mark}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Total Mark</label>
            <input
              type="number"
              name="hsc_total_mark"
              disabled
              step="0.0001"
              defaultValue={student_data.hsc_total_mark}
            />
          </div>

          <div className={classes.formElement}>
            <label>HSC Marks Maximum</label>
            <input
              type="number"
              name="hsc_marks_maximum"
              disabled
              step="0.0001"
              defaultValue={student_data.hsc_marks_maximum}
            />
          </div>

          <div className={classes.formElement}>
            <label>PCB Percentage</label>
            <input
              type="number"
              name="pcb_percentage"
              disabled
              step="0.0001"
              defaultValue={student_data.pcb_percentage}
            />
          </div>
          <div className={classes.formElement}></div>
        </div>

        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>NEET Performance</h2>

          <div className={classes.formElement}>
            <label>NEET Roll Number</label>
            <input
              type="text"
              name="neet_roll_no"
              disabled
              defaultValue={student_data.neet_roll_no}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Year of Passing</label>
            <input
              type="number"
              name="neet_year"
              disabled
              defaultValue={student_data.neet_year}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Study Center Name</label>
            <input
              type="text"
              name="neet_study_center_name"
              disabled
              defaultValue={student_data.neet_study_center_name}
            />
          </div>

          <div className={classes.formElement}>
            <label>No. of NEET Attempts</label>
            <input
              type="number"
              name="no_of_neet_attempts"
              disabled
              defaultValue={student_data.no_of_neet_attempts}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET AIR</label>
            <input
              type="number"
              name="neet_air"
              disabled
              defaultValue={student_data.neet_air}
            />
          </div>

          <div className={classes.formElement}>
            <label>Selection Committee Allotment Order No</label>
            <input
              type="text"
              name="selection_committee_allotment_order_no"
              disabled
              defaultValue={student_data.selection_committee_allotment_order_no}
            />
          </div>

          <div className={classes.formElement}>
            <label>Selection Committee General Rank</label>
            <input
              type="text"
              name="selection_committee_general_rank"
              disabled
              defaultValue={student_data.selection_committee_general_rank}
            />
          </div>

          <div className={classes.formElement}>
            <label>Allotment Order Date</label>
            <input
              type="date"
              name="allotment_order_date"
              disabled
              defaultValue={student_data.allotment_order_date}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Physics Percentile</label>
            <input
              type="number"
              name="neet_physics_percentile"
              disabled
              step="0.0001"
              defaultValue={student_data.neet_physics_percentile}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Chemistry Percentile</label>
            <input
              type="number"
              name="neet_chemistry_percentile"
              disabled
              step="0.0001"
              defaultValue={student_data.neet_chemistry_percentile}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Biology Percentile</label>
            <input
              type="number"
              name="neet_biology_percentile"
              disabled
              step="0.0001"
              defaultValue={student_data.neet_biology_percentile}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Total Percentile</label>
            <input
              type="number"
              name="neet_total_percentile"
              disabled
              step="0.0001"
              defaultValue={student_data.neet_total_percentile}
            />
          </div>

          <div className={classes.formElement}>
            <label>NEET Total Mark</label>
            <input
              type="number"
              name="neet_total_mark"
              disabled
              defaultValue={student_data.neet_total_mark}
            />
          </div>
        </div>
        <div className={classes.infoGroup}>
          <h2 className={classes.infoHeading}>File Uploads</h2>
          <div className={classes.link}>
            <a
              href={student_data.student_photo}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Student Photo
            </a>
          </div>
          <div className={classes.link}>
            <a
              href={student_data.neet_score_card}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Neet Score Card
            </a>
          </div>
          <div className={classes.link}>
            <a
              href={student_data.conduct_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Conduct Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.neet_admit_card}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Neet Admit Card
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.allotment_order_payment_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Allotment Order Certificate
            </a>
          </div>
          <div className={classes.link}>
            <a
              href={student_data.sslc_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View SSLC Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.hsc_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View HSC Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.transfer_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Transfer Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.community_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Community Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.aadhaar_card}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Aadhaar Card
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.eligibility_migration_certificates}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Eligibility Migration Certificates
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.nativity_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Nativity Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.income_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Income Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.physical_fitness_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Physical Fitness Certificate
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.declaration_form}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Declaration Form
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.anti_ragging_bond}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Anti Ragging Bond
            </a>
          </div>

          <div className={classes.link}>
            <a
              href={student_data.physically_handicapped_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Physically Handicapped Certificate
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;

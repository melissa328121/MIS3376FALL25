 /*
program name: hw3.js
author: melissa alfaro
date created: 9/14/25
date last edited: 11/10/25
version: 3.9
description: homework 3 patient registration javascript form
*/

// dynamic date code

// adds the correct ending to the number like 1st 2nd 3rd 4th
function getOrdinal(num) {
  if (num > 3 && num < 21) return num + "th" // handles 11 to 19
  switch (num % 10) {
    case 1: return num + "st"
    case 2: return num + "nd"
    case 3: return num + "rd"
    default: return num + "th"
  }
}

// create a date object for today
const d = new Date()

// get weekday month day and year
const weekday = d.toLocaleString('en-US', { weekday: 'long' })
const month = d.toLocaleString('en-US', { month: 'long' })
const day = getOrdinal(d.getDate())
const year = d.getFullYear()

// display the full date in the element with id today
document.getElementById("today").innerHTML = `${weekday}, ${month} ${day}, ${year}`

// set dynamic max date for DOB field
const dobInput = document.getElementById("dob")
if (dobInput) dobInput.max = new Date().toISOString().split("T")[0]

// range slider javascript

// find the slider and the output display by their IDs
const slider = document.getElementById("range");
const output = document.getElementById("range-value");

if (slider && output) {
  output.textContent = slider.value;

  slider.oninput = function() {
    output.textContent = this.value;
  };
}




// make sure they exist before using
if (slider && output) {
  // initial formatted value
  output.innerHTML = `Health Rating: ${slider.value} / 10`;

  // update the display whenever the slider moves
  slider.oninput = function () {
    output.innerHTML = `Health Rating: ${this.value} / 10`;
  };
}




// set the initial value of the output to match the slider's value
output.innerHTML = slider.value;

// update the output whenever the slider is moved
slider.oninput = function () {
  output.innerHTML = this.value;
};

// date of birth validation
function validateDob() {
  const dob = document.getElementById("dob")
  const date = new Date(dob.value)
  const today = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(today.getFullYear() - 120)

  if (date > today) {
    document.getElementById("dob-error").innerHTML = "date cannot be in the future"
    dob.value = ""
    return false
  } else if (date < maxDate) {
    document.getElementById("dob-error").innerHTML = "date cannot be more than 120 years ago"
    dob.value = ""
    return false
  } else {
    document.getElementById("dob-error").innerHTML = ""
    return true
  }
}

// social security validation
function validateSsn() {
  const ssn = document.getElementById("ssn").value
  const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/

  if (!ssnR.test(ssn)) {
    document.getElementById("ssn-error").innerHTML = "please enter a valid social security number"
    return false
  } else {
    document.getElementById("ssn-error").innerHTML = ""
    return true
  }
}
// live SSN formatting
// adds dashes as the user types
document.addEventListener("DOMContentLoaded", () => {
  const ssn = document.getElementById("ssn");
  if (!ssn) return;
  ssn.addEventListener("input", () => {
    // remove all non-digits
    let value = ssn.value.replace(/\D/g, "");
    // format it with dashes
    if (value.length > 3 && value.length <= 5)
      value = value.slice(0, 3) + "-" + value.slice(3);
    else if (value.length > 5)
      value = value.slice(0, 3) + "-" + value.slice(3, 5) + "-" + value.slice(5, 9);
    ssn.value = value; // updates the ssn field
  });
});



// address line 1 validation
function validateAddress1() {
  const ad1 = document.getElementById("address1").value

  if (ad1.length < 2) {
    document.getElementById("address1-error").innerHTML = "please enter something on address line"
    return false
  } else {
    document.getElementById("address1-error").innerHTML = ""
    return true
  }
}

// city validate js code
// below checks that city is not blank and length is between 2 and 30 characters
function validateCity() 
{
  let city = document.getElementById("city").value.trim();
 // if city is blank
  if (city === "") {
    document.getElementById("city-error").innerHTML = "city cannot be left blank.";
    return false;
  }

  // if city is too short
  if (city.length < 2) {
    document.getElementById("city-error").innerHTML = "city must be at least 2 characters.";
    return false;
  }

  // if city is too long
  if (city.length > 30) {
    document.getElementById("city-error").innerHTML = "city cannot exceed 30 characters.";
    return false;
  }

  // if everything is valid, clear the error message
  document.getElementById("city-error").innerHTML = "";
  return true;
}



// zip code validation
function validateZipcode() {
  const zipCodeInput = document.getElementById("zipcode")
  let zip = zipCodeInput.value.replace(/[^\d-]/g, "") // removes characters that are not digits or dash

  if (!zip) {
    document.getElementById("zipcode-error").innerHTML = "zip code cannot be left blank"
    return false
  }

  if (!/^\d{5}(-\d{4})?$/.test(zip)) {
    document.getElementById("zipcode-error").innerHTML = "enter a valid 5 digit or zip plus 4 format"
    return false
  }

  zipCodeInput.value = zip
  document.getElementById("zipcode-error").innerHTML = ""
  return true
}

// email validation
function validateEmail() {
  const email = document.getElementById("email").value.trim()
  const emailReject = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/

  if (email === "") {
    document.getElementById("email-error").innerHTML = "email cannot be empty"
    return false
  } else if (!emailReject.test(email)) {
    document.getElementById("email-error").innerHTML = "please enter a valid email address"
    return false
  } else {
    document.getElementById("email-error").innerHTML = ""
    return true
  }
}

// phone number validation
function validatePhonenum() {
  const phoneInput = document.getElementById("phonenum")
  let phone = phoneInput.value.replace(/\D/g, "") // removes everything except numbers
  
  if (phone.length === 0) {
    document.getElementById("phonenum-error").innerHTML = "phone number cannot be left blank"
    return false
  }

  if (phone.length !== 10) {
    document.getElementById("phonenum-error").innerHTML = "phone number must be 10 digits"
    return false
  }

  const formattedPhoneNum = phone.slice(0,3) + "-" + phone.slice(3,6) + "-" + phone.slice(6,10)
  phoneInput.value = formattedPhoneNum
  document.getElementById("phonenum-error").innerHTML = ""
  return true
}

// username validation
function validateUname() {
  let uname = document.getElementById("username").value
  uname = uname.toLowerCase()
  document.getElementById("username").value = uname

  if (uname.length === 0) {
    document.getElementById("username-error").innerHTML = "username field cannot be empty"
    return false
  }

  if (!isNaN(uname.charAt(0))) {
    document.getElementById("username-error").innerHTML = "username cannot begin with a number"
    return false
  }

  const regex = /^[a-zA-Z0-9_-]+$/
  if (!regex.test(uname)) {
    document.getElementById("username-error").innerHTML = "username can only contain letters numbers underscores or dashes"
    return false
  }

  if (uname.length < 5) {
    document.getElementById("username-error").innerHTML = "username must be at least 5 characters"
    return false
  }

  if (uname.length > 30) {
    document.getElementById("username-error").innerHTML = "username cannot exceed 30 characters"
    return false
  }

  document.getElementById("username-error").innerHTML = ""
  return true
}

// password validation
function validatePassword() {
  const pword = document.getElementById("password").value
  const uname = document.getElementById("username").value
  const errorMessage = []

  if (!/[a-z]/.test(pword)) errorMessage.push("enter at least one lowercase letter")
  if (!/[A-Z]/.test(pword)) errorMessage.push("enter at least one uppercase letter")
  if (!/[0-9]/.test(pword)) errorMessage.push("enter at least one number")
  if (!/[!$@#%^&*()_\-+=\\/><.,`~]/.test(pword)) errorMessage.push("enter at least one special character")
  if (pword.toLowerCase().includes(uname)) errorMessage.push("password cannot contain your username")

  const errorContainer = document.getElementById("password-message-box")
  errorContainer.innerHTML = errorMessage.map(msg => `<span>${msg}</span><br/>`).join("")
  

  return errorMessage.length === 0
}

// confirm password validation
function confirmPassword() {
  const pword1 = document.getElementById("password").value
  const pword2 = document.getElementById("con_password").value

  if (pword1 !== pword2) {
    document.getElementById("con-password-error").innerHTML = "passwords do not match"
    return false
  } else {
    document.getElementById("con-password-error").innerHTML = ""
    return true
  }
}

// review button shows all user input back to them
// review button shows all user input back to them
function reviewInput() {
  const formcontent = document.getElementById("signup")

  // map field names (the "name" attributes) to readable labels
  const labels = {
    fname: "First Name",
    minitial: "Middle Initial",
    lname: "Last Name",
    psex: "Patient Sex",
    dob: "Date of Birth",
    ssn: "SSN",
    address1: "Address Line 1",
    address2: "Address Line 2",
    city: "City",
    state: "State",
    zipcode: "Zip Code",
    email: "Email",
    phonenum: "Phone Number",
    insurance: "Insurance Coverage",
    vaccinated: "COVID-19 Vaccinated",
    condition: "Medical Conditions",
    notes: "Condition Details",
    range: "Health Rating",
    username: "Username",
    password: "Password",
    con_password: "Confirm Password"
  }

  let formoutput = "<table class='output'><tr><th colspan='2'>Your Information Review</th></tr>"

  // loop through all elements in the form
  for (let i = 0; i < formcontent.elements.length; i++) {
    const el = formcontent.elements[i]

    // skip irrelevant elements
    if (!el.name || el.type === "button" || el.type === "submit" || el.type === "reset") continue
    if ((el.type === "checkbox" || el.type === "radio") && !el.checked) continue

    // figure out the user-friendly label
    const label = labels[el.name] || el.name

        // handle password-type fields for display
      let value = el.value;

      // show SSN formatted with dashes but hide other passwords
      if (el.name === "ssn") {
        // format SSN if it’s only digits (just in case)
        let clean = value.replace(/\D/g, "");
        if (clean.length === 9) {
          value = clean.slice(0,3) + "-" + clean.slice(3,5) + "-" + clean.slice(5);
        }
      } else if (el.type === "password") {
        value = "********"; // hide normal passwords
}

    formoutput += `
      <tr>
        <td align='right'><b>${label}</b></td>
        <td class='outputdata'>${value}</td>
      </tr>
    `
  }

  formoutput += "</table>"
  document.getElementById("showInput").innerHTML = formoutput
}
// clears the review output when user clicks clear
function removeReview() {
  document.getElementById("showInput").innerHTML = ""}

  
// first name validation
function validateFname() {
  const fname = document.getElementById("fname").value.trim();
  const namePattern = /^[A-Za-z'-]+$/; // letters, apostrophes, dashes only
  // check first name field if empty
  if (fname === "") {
    document.getElementById("fname-error").innerHTML = "First name field cannot be empty.";
    return false;} 
  // check pattern
  if (!fname.match(namePattern)) {
    document.getElementById("fname-error").innerHTML = "Letters, apostrophes, and dashes only.";
    return false;}
  // check length minimum
  if (fname.length < 2) {
    document.getElementById("fname-error").innerHTML = "First name cannot be less than 2 characters.";
    return false;}
  // check length maximum
  if (fname.length > 30) {
    document.getElementById("fname-error").innerHTML = "First name cannot be more than 30 characters.";
    return false; }
  // if all checks pass
  document.getElementById("fname-error").innerHTML = "";
  return true;
}

  /* Check if middle initial is valid */
function validateMname() 
{
  let minitial = document.getElementById("minitial").value.trim();
  const namePattern = /^[A-Z]$/; // exactly one uppercase letter

  // convert to uppercase if something was typed
  if (minitial !== "") {
    minitial = minitial.toUpperCase();
    document.getElementById("minitial").value = minitial;
  }

  // if the field is not blank checks if it is a single valid letter
  if (minitial !== "" && !minitial.match(namePattern)) {
    document.getElementById("mname-error").innerHTML =
      "Middle initial must be a single uppercase letter.";
    return false;
  }

  // if blank or valid then  clear the error
  document.getElementById("mname-error").innerHTML = "";
  return true;
}

  



// last name validation
function validateLname() {
  const lname = document.getElementById("lname").value.trim();
  const namePattern = /^[A-Za-z'-]+$/; // letters, apostrophes, dashes only
  // check last field is empty
  if (lname === "") {
    document.getElementById("lname-error").innerHTML = "Last name field cannot be empty.";
    return false;}
  // check pattern
  if (!lname.match(namePattern)) {
    document.getElementById("lname-error").innerHTML = "Letters, apostrophes, and dashes only.";
    return false;}
  // check length minimum
  if (lname.length < 2) {
    document.getElementById("lname-error").innerHTML = "Last name cannot be less than 2 characters.";
    return false;}
  // check length maximum
  if (lname.length > 30) {
    document.getElementById("lname-error").innerHTML = "Last name cannot be more than 30 characters.";
    return false; }
  // if all checks pass
  document.getElementById("lname-error").innerHTML = "";
  return true;
}

// this part is to show the alert box when needed
function showAlert() {
  var alertBox = document.getElementById("alert-box");
  var closeAlert = document.getElementById("close-alert");
  
  alertBox.style.display = "block";

  closeAlert.onclick = function() {
    alertBox.style.display = "none";
  };
}

// validate everything on the patient form
function validateEverything() {
  let valid = true;

  // run each validation function from the functions above
  if (!validateFname()) { valid = false; }
  if (!validateMname()) { valid = false; }
  if (!validateLname()) { valid = false; }
  if (!validateDob()) { valid = false; }
  if (!validateSsn()) { valid = false; }
  if (!validateAddress1()) { valid = false; }
  if (!validateCity()) { valid = false; }
  if (!validateZipcode()) { valid = false; }
  if (!validateEmail()) { valid = false; }
  if (!validatePhonenum()) { valid = false; }
  if (!validateUname()) { valid = false; }
  if (!validatePassword()) { valid = false; }
  if (!confirmPassword()) { valid = false; }

  // handle final validation result
  const submitBtn = document.getElementById("submit");

  if (!valid) {
    showAlert(); // show alert if anything failed
    submitBtn.disabled = true; // keep submit disabled if invalid
  } else {
    submitBtn.disabled = false; // enable submit only if all fields valid
  }

  return valid; // important so form knows whether to proceed
}








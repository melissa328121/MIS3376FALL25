 /*
program name: hw2.js
author: melissa alfaro
date created: 9/14/25
date last edited: 10/22/25
version: 2.4
description: homework 2 patient registration javascript form
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

    // hide password value (for privacy)
    let value = el.value
    if (el.type === "password") value = "********"

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
  document.getElementById("showInput").innerHTML = ""
}

// name validation functions for first, middle, last names
function validateFname() {
  const f = document.getElementById("fname").value.trim()
  if (!/^[A-Za-z'-]{1,30}$/.test(f)) {
    document.getElementById("fname-error").innerHTML = "please enter a valid first name"
    return false
  }
  document.getElementById("fname-error").innerHTML = ""
  return true
}

function validateMname() {
  const m = document.getElementById("minitial").value.trim()
  if (m && !/^[A-Za-z]{1}$/.test(m)) {
    document.getElementById("mname-error").innerHTML = "middle initial must be one letter"
    return false
  }
  document.getElementById("mname-error").innerHTML = ""
  return true
}

function validateLname() {
  const l = document.getElementById("lname").value.trim()
  if (!/^[A-Za-z'-]{1,30}$/.test(l)) {
    document.getElementById("lname-error").innerHTML = "please enter a valid last name"
    return false
  }
  document.getElementById("lname-error").innerHTML = ""
  return true
}



export const dobGenderCal = (nicNumber) => {
  let nicNumberString = nicNumber.toString();
  let year;
  let dayOfYear;
  let dob;
  let gender = "male";

  //Calculate DOB based on New NiC - 200xxxxxxxxx
  if (nicNumber.toString().length == 12) {
    year = nicNumberString.substring(0, 4);
    dayOfYear = nicNumberString.substring(4, 7);

    //Calculate DOB based on Old NiC - 90xxxxxxxV/X
  } else if (nicNumber.toString().length == 10) {
    year = nicNumberString.substring(0, 2);
    dayOfYear = nicNumberString.substring(2, 5);

    // Handle 1900 and 2000
    let currentYear = new Date().getFullYear();
    let centuryThreshold = currentYear % 100;

    year = year > centuryThreshold ? "19" + year : "20" + year;
  }

  //Decide Gender based on day value - 500+ means a Female
  if (dayOfYear > 500) {
    dayOfYear = dayOfYear - 500;
    gender = "female";
  }

  // Calculate date in UTC
  dob = new Date(Date.UTC(year, 0, dayOfYear));
  
  return { dob, gender };
};

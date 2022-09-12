function validateAge(today, dobobj) {
    var age = today.getFullYear() - dobobj.getFullYear();
    var mn = today.getMonth() - dobobj.getMonth();
    if (mn < 0 || (mn === 0 && today.getDate() < dobobj.getDate())) {
      age--;
    }
    return age;
  }
  let dobele = document.getElementById("dob");
  dobele.addEventListener("change", () => {
    let [y,m,d] = document.getElementById("dob").value.split("-");
    let dob = new Date(y,m,d);
    let today = new Date();
    age = validateAge(today, dob);
    if (age < 18 || age > 55) {
      dobele.setCustomValidity("Age must be between 18 and 55");
   
      return;
    } else {
      dobele.setCustomValidity("");
    }
  });
  let form = document.getElementById("regform");
  
  const retriveEntries = () => {
    let entries = localStorage.getItem("userData");
  
    if (entries) {
      entries = JSON.parse(entries);
    } else {
      entries = [];
    }
    return entries;
  };
  
  let Entries = retriveEntries();
  
  const displayEntries = () => {
    const entries = retriveEntries();
  
    const tablerows = entries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const terms = `<td>${entry.terms}</td>`;
  
        const row = `<tr>${name} ${email} ${password} ${dob} ${terms}</tr>`;
        return row;
      })
      .join("\n");
  
    let tableDiv = document.getElementById("entrytable");
  
    tableDiv.innerHTML = `<table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Dob</th>
      <th>Accepted terms?</th>
    </tr>
      ${tablerows}
    </table>`;
  };
  
  
  const saveUserFrom = (event) => {
    event.preventDefault();
  
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("acceptTerms").checked;
  
    let entryobj = {
      name,
      email,
      password,
      dob,
      terms,
    };
  
    Entries.push(entryobj);
  
    localStorage.setItem("userData", JSON.stringify(Entries));
  
    displayEntries();
  };
  
  form.addEventListener("submit", saveUserFrom);
  
  displayEntries();
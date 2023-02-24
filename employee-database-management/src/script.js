let employees = [
    {
        id: 1001,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
        firstName: "Thomas",
        lastName: "Leannon",
        email: "Thomas.Leannon@dummyapis.com",
        contactNumber: "4121091095",
        age: 43,
        dob: "26/08/1979",
        salary: 1,
        address: "Address1"
    },
    {
        id: 1002,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
        firstName: "Faye",
        lastName: "Sauer",
        email: "Faye.Sauer@dummyapis.com",
        contactNumber: "4914696673",
        age: 60,
        dob: "28/06/1962",
        salary: 2,
        address: "Address2"
    },
  ];

(function(){
    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
    let selectedEmployee = employees[0];
    let selectedEmployeeId = employees[0].id;

    employeeList.addEventListener("click", (e) => {
        // Select Employee Logic - Start
        if(e.target.tagName == "SPAN" && selectedEmployeeId !== e.target.id){
            selectedEmployeeId = e.target.id;
            renderEmployees();
            renderSingleEmployee();
        }
        // Select Employee Logic - end

        // Employee Delete Logic - Start;
        if(e.target.tagName === "I"){
            employees = employees.filter(emp => String(emp.id) !== e.target.parentNode.id)
            if(String(selectedEmployeeId) === e.target.parentNode.id){
                selectedEmployeeId = employees[0]?.id || -1;
                selectedEmployee = employees[0] || {};
                renderSingleEmployee();
            }
            renderEmployees();
        }
        // Employee Delete Logic - End 

    });

    // Render All Employees Logic - Start
    const renderEmployees = () => {
        employeeList.innerHTML = "";
        employees.forEach(emp => {
            const employee = document.createElement("span");
            employee.classList.add("employees__names--item");
            if(parseInt(selectedEmployeeId, 10) === emp.id){
                employee.classList.add("selected");
                selectedEmployee = emp;
            }
            employee.setAttribute("id", emp.id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`
            employeeList.append(employee);
        })
    }
    // Render All Employees Logic - End

    // Render Single Employee Logic - Start
    const renderSingleEmployee = () => {
        employeeInfo.innerHTML = `
            <img src="${selectedEmployee.imageUrl}" />
            <span class="employee__single--heading">
            ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
            </span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>Mobile - ${selectedEmployee.contactNumber}</span>
            <span>DOB - ${selectedEmployee.dob}</span>
        `
    }
    // Render Single Employee Logic - End

    renderEmployees();
    if(selectedEmployee) renderSingleEmployee();
})();
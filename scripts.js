console.log('Hello World');

$(document).ready(onReady);

let employeeInfo = [];

function onReady(){
    $('#submitInfoBtn').on('click', getEmpInfo);
    $('#displayInfo').on('click', '.delete', deleteBtn);
}




function getEmpInfo(){
    
    let empInfo = {
        fName: $('#empFirstName').val(),
        lName: $('#empLastName').val(),
        iD: $('#empIDNum').val(),
        title: $('#empTitle').val(),
        salary: $('#empSalary').val()
    };

    if (empInfo.fName === '' || empInfo.lName === '' || empInfo.iD === '' || empInfo.title === '' || empInfo.salary === '') {
        console.log('not entered');
        return false;
    }
    else{
        // Empty inputs
        $('#empFirstName').val('');
        $('#empLastName').val('');
        $('#empIDNum').val('');
        $('#empTitle').val('');
        $('#empSalary').val('');
        
        employeeInfo.push(empInfo);

        displayInfo();
        monthlyCost();
    }
}

function displayInfo(){
    el = $('#displayInfo');
    el.empty();
        for (let i = 0; i < employeeInfo.length; i++) {
            el.append(`<li>${employeeInfo[i].fName} ${employeeInfo[i].lName} ${employeeInfo[i].iD} ${employeeInfo[i].title} ${employeeInfo[i].salary} <button class="delete">Delete</button></li>`);
        }
}


function monthlyCost(){
    let el = $('#displayMonthlyCost');
    let mCost = 0;
    for (let i = 0; i < employeeInfo.length; i++) {
        mCost += Number(employeeInfo[i].salary) / 12;
        mCost = Math.ceil(mCost);
    }
    if (mCost <= 20000) {
        el.empty(mCost);
        el.append(`<h3>$${mCost}</h3>`);   
    }
    else {
        el.empty(mCost);
        el.append(`<h3 id="over20">$${mCost}</h3>`);
    }
}


function deleteBtn(){
    $(this).parent().remove();
    console.log('deleted');
    
}

$(document).ready(onReady);

let employeeInfo = [];
let totalMonthCost = 0;

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
        salary: parseInt($('#empSalary').val())
    };

    if (empInfo.fName === '' || empInfo.lName === '' || empInfo.iD === '' || empInfo.title === '' || empInfo.salary === '') {
        $('#inputDiv').empty();
        $('#inputDiv').append(`<div class="alert alert-danger" role="alert" id="alert">Not all inputs were flled</div>`) //alerts when not all inputs are filled
        return false;
    }
    else{
        $('#inputDiv').empty(); // erases alert when all inputs are filled
        // Empty inputs
        $('#empFirstName').val('');
        $('#empLastName').val('');
        $('#empIDNum').val('');
        $('#empTitle').val('');
        $('#empSalary').val('');
        
        employeeInfo.push(empInfo);

        displayInfo();
        calcMonthCost();
    }
}



function displayInfo(){
    el = $('#displayInfo');
    latestEmp = employeeInfo[employeeInfo.length -1];
            el.append(
                `<tr>
                    <th scope="row">${latestEmp.fName}</th>
                    <th scope="row">${latestEmp.lName}</th>
                    <th scope="row">${latestEmp.iD}</th>
                    <th scope="row">${latestEmp.title}</th>
                    <th scope="row" id="empSal">$${latestEmp.salary}</th>
                    <th scope="row">
                        <button class="delete btn btn-danger btn-sm">Delete</button>
                    </th>
                </tr>`);
                
                $("tr:last-child").data('sal', latestEmp.salary);
}

function calcMonthCost() {
    let lastEmp = employeeInfo[employeeInfo.length -1];
    totalMonthCost += lastEmp.salary / 12;
    //totalMonthCost = Math.ceil(totalMonthCost);

    monthlyCost();
}


function monthlyCost(){
    let el = $('#displayMonthlyCost');

    if (totalMonthCost <= 20000) {
        el.empty(totalMonthCost);
        el.append(`<h3 id="under20">Total Monthly Cost: $${totalMonthCost}</h3>`);   
    }
    else {
        el.empty(totalMonthCost);
        el.append(`<h3 id="over20">Total Monthly Cost: $${totalMonthCost}</h3>`);
    }
}


function deleteBtn(){

    let tr = $(this).parent().parent();
    
    let subSal = $(this).parent().parent().data();
    subSal = subSal.sal; // makes subSal = to the salary
    subSal = subSal * -1;
    
    totalMonthCost += subSal / 12;
    //totalMonthCost = Math.ceil(totalMonthCost);
    tr.remove();
    monthlyCost();
}
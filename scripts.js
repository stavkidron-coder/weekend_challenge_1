console.log('Hello World');

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
            el.append(
                `<tr>
                    <th scope="row">${employeeInfo[i].fName}</th>
                    <th scope="row">${employeeInfo[i].lName}</th>
                    <th scope="row">${employeeInfo[i].iD}</th>
                    <th scope="row">${employeeInfo[i].title}</th>
                    <th scope="row" id="empSal">$${employeeInfo[i].salary}</th>
                    <th scope="row"><button class="delete btn btn-danger btn-sm">Delete</button></th>
                </tr>`);
                
                $('#empSal').data('sal', employeeInfo[i].salary);
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
        el.append(`<h3 id="under20">Total Monthly Cost: $${mCost}</h3>`);   
    }
    else {
        el.empty(mCost);
        el.append(`<h3 id="over20">Total Monthly Cost: $${mCost}</h3>`);
    }
}


function deleteBtn(){
    let subSal = $('#empSal').data(); //takes in the object data in empSal
    subSal = subSal.sal; // makes subSal = to the salary
    subSal = subSal * -1;
    console.log(subSal);

    
    
    
    $(this).parent().parent().remove();
}
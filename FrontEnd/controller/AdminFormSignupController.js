var signUpAdminId = $('#signUpAdminId');
var signUpAdminName = $('#signUpAdminName');
var signUpAdminNic = $('#signUpAdminNic');
var signUpAdminContactNo = $('#signUpAdminContactNo');
var signUpAdminUserName = $('#signUpAdminUserName');
var signUpAdminPassword = $('#signUpAdminPassword');
var signUpAdminAddress = $('#signUpAdminAddress');

var signupAdminIdPattern = /^(A-)[0-9]{3}$/;
var signupAdminNamePattern = /^[A-z0-9]{3,}[ ]*[A-z]*$/;
var signupAdminNicPattern = /^([0-9]{9}[v])|([0-9]{12})$/;
var signupAdminContactNoPattern = /^[0-9]{10}$/;
var signupAdminUserNamePattern = /^([A-z]{3,}[.]*[A-z]*[0-9]*[@]?((gmail.com)|(yahoo.com)?))$/;
var signupAdminPasswordPattern = /^([A-z0-9]{3,}[.]*[A-z0-9]*[@]?)$/;
var signupAdminAddressPattern = /^[A-z0-9,/ ]*[.]?$/;

var addAdminSignUpDetailsBtn = $('#addAdminSignupDetailsBtn');
var updateAdminSignUpDetailsBtn = $('#updateAdminSignupDetailsBtn');
var deleteAdminSignUpDetailsBtn = $('#deleteAdminSignupDetailsBtn');

var signUpAdminIdLbl = $('#signUpAdminIdLbl span');
var signUpAdminNameLbl = $('#signUpAdminNameLbl span');
var signUpAdminNicLbl = $('#signUpAdminNicLbl span');
var signUpAdminContactNoLbl = $('#signUpAdminContactNoLbl span');
var signUpAdminUserNameLbl = $('#signUpAdminUserNameLbl span');
var signUpAdminPasswordLbl = $('#signUpAdminPasswordLbl span');
var signUpAdminAddressLbl = $('#signUpAdminAddressLbl span');


var fieldsArrayInAdmin = [signUpAdminId, signUpAdminName, signUpAdminNic, signUpAdminContactNo, signUpAdminUserName, signUpAdminPassword, signUpAdminAddress];

$('#signUpAdminId,#signUpAdminName,#signUpAdminNic,#signUpAdminContactNo,#signUpAdminUserName,#signUpAdminPassword,#signUpAdminAddress').off('keydown');
$('#signUpAdminId,#signUpAdminName,#signUpAdminNic,#signUpAdminContactNo,#signUpAdminUserName,#signUpAdminPassword,#signUpAdminAddress').keydown(function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
    }
});

$(document).ready(function (e) {
    generateAdminId();
    setDataToTheAdminTable();
})

signUpAdminId.off('keyup');
signUpAdminId.keyup(function (e) {
    let index = 0;
    if (validate(signupAdminIdPattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminIdLbl.text('Id')
        if (e.key == 'Enter') {
            searchAdminSignupDetails();
        }
    } else {
        signUpAdminIdLbl.text('Please enter a valid Id. Hint (A-001)');
        signUpAdminIdLbl.css('font-size', '80%');
    }
})

signUpAdminName.off('keyup');
signUpAdminName.keyup(function (e) {
    let index = 1;
    if (validate(signupAdminNamePattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminNameLbl.text('Name')
    } else {
        signUpAdminNameLbl.text('Please enter a valid Name.');
        signUpAdminNameLbl.css('font-size', '80%');
    }
})

signUpAdminNic.off('keyup');
signUpAdminNic.keyup(function (e) {
    let index = 2;
    if (validate(signupAdminNicPattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminNicLbl.text('Nic')
    } else {
        signUpAdminNicLbl.text('Please enter a valid Nic no');
        signUpAdminNicLbl.css('font-size', '80%');
    }
})

signUpAdminContactNo.off('keyup');
signUpAdminContactNo.keyup(function (e) {
    let index = 3;
    if (validate(signupAdminContactNoPattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminContactNoLbl.text('Contact No')
    } else {
        signUpAdminContactNoLbl.text('Please enter a valid contact number.');
        signUpAdminContactNoLbl.css('font-size', '80%');
    }
})

signUpAdminUserName.off('keyup');
signUpAdminUserName.keyup(function (e) {
    let index = 4;
    if (validate(signupAdminUserNamePattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminUserNameLbl.text('User Name')
    } else {
        signUpAdminUserNameLbl.text('Please enter a valid User Name.');
        signUpAdminUserNameLbl.css('font-size', '80%');
    }
})

signUpAdminPassword.off('keyup');
signUpAdminPassword.keyup(function (e) {
    let index = 5;
    if (validate(signupAdminPasswordPattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminPasswordLbl.text('Password')
    } else {
        signUpAdminPasswordLbl.text('Please enter a valid Password.');
        signUpAdminPasswordLbl.css('font-size', '80%');
    }
})

signUpAdminAddress.off('keyup');
signUpAdminAddress.keyup(function (e) {
    let index = 6;
    if (validate(signupAdminAddressPattern, fieldsArrayInAdmin, index, e, addAdminSignUpDetailsBtn, updateAdminSignUpDetailsBtn, deleteAdminSignUpDetailsBtn) == true) {
        signUpAdminAddressLbl.text('Address')
    } else {
        signUpAdminAddressLbl.text('Please enter a valid Address.');
        signUpAdminAddressLbl.css('font-size', '80%');
    }
})

addAdminSignUpDetailsBtn.off('click');
addAdminSignUpDetailsBtn.click(function () {
    var signUpDetails = {
        id: signUpAdminId.val(),
        name: signUpAdminName.val(),
        nic: signUpAdminNic.val(),
        contactNo: signUpAdminContactNo.val(),
        userName: signUpAdminUserName.val(),
        password: signUpAdminPassword.val(),
        address: signUpAdminAddress.val()
    }
    if (confirm('Do you want to save this admin details') == true) {
        $.ajax({
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(signUpDetails),
            url: "http://localhost:8080/BackEnd_war_exploded/admin",
            success: function (resp) {
                if (resp.status == 200) {
                    alert(resp.message);
                    setDataToTheAdminTable();
                    clearFieldsInAdminSignup();
                    setAdminInputBordersReset();
                    generateAdminId();
                }
            },
            error: function (ob) {
                alert(ob.message);
                setDataToTheAdminTable();
                clearFieldsInAdminSignup();
                setAdminInputBordersReset();
                generateAdminId();
            }
        })
    } else {
        alert('Saving admin details of ' + signUpAdminId.val() + ' is unsuccessful');
        clearFieldsInAdminSignup();
        generateAdminId();
        setAdminInputBordersReset();
        return;
    }
})
updateAdminSignUpDetailsBtn.off('click');
updateAdminSignUpDetailsBtn.click(function () {
    if (confirm('Do you want to update the admin details relevant to admin id - ' + signUpAdminId.val() + '') == true) {
        let admin = {
            id: signUpAdminId.val(),
            name: signUpAdminName.val(),
            nic: signUpAdminNic.val(),
            contactNo: signUpAdminContactNo.val(),
            userName: signUpAdminUserName.val(),
            password: signUpAdminPassword.val(),
            address: signUpAdminAddress.val()
        }
        $.ajax({
            url: "http://localhost:8080/BackEnd_war_exploded/admin",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(admin),
            method: "PUT",
            success: function (resp) {
                if (resp.status == 200) {
                    setDataToTheAdminTable();
                    clearFieldsInAdminSignup();
                    setAdminInputBordersReset();
                    generateAdminId();
                }
            },
            error: function (ob) {
                alert(ob.message)
                setDataToTheAdminTable();
                clearFieldsInAdminSignup();
                setAdminInputBordersReset();
                generateAdminId();
            }
        })
    } else {
        alert('Updating admin ' + signUpAdminId.val() + ' is unsuccessful');
        clearFieldsInAdminSignup();
        generateAdminId();
        setAdminInputBordersReset();
        return;
    }
})

deleteAdminSignUpDetailsBtn.off('click');
deleteAdminSignUpDetailsBtn.click(function () {
    if (confirm('Do you want to delete this admin details') == true) {
        $.ajax({
            url: "http://localhost:8080/BackEnd_war_exploded/admin?id=" + signUpAdminId.val(),
            method: "DELETE",
            success: function (resp) {
                if (resp.status == 200) {
                    setDataToTheAdminTable();
                    clearFieldsInAdminSignup();
                    setAdminInputBordersReset();
                    generateAdminId();
                }
            },
            error: function (ob) {
                alert(ob.message)
                setDataToTheAdminTable();
                clearFieldsInAdminSignup();
                setAdminInputBordersReset();
                generateAdminId();
            }
        })
    } else {
        alert("Deleting admin details is unsuccessful")
        clearFieldsInAdminSignup();
        setAdminInputBordersReset();
        generateAdminId();
    }
})

function searchAdminSignupDetails() {
    $.ajax({
        dataType: "json",
        contentType: "application/json",
        method: "GET",
        url: "http://localhost:8080/BackEnd_war_exploded/admin/searchAdmin?id=" + signUpAdminId.val(),
        success: function (resp) {
            if (resp.status == 200) {
                let adminSearchOb = resp.data;
                console.log(adminSearchOb.nic)
                signUpAdminName.val(adminSearchOb.name);
                signUpAdminNic.val(adminSearchOb.nic);
                signUpAdminContactNo.val(adminSearchOb.contactNo);
                signUpAdminUserName.val(adminSearchOb.userName);
                signUpAdminPassword.val(adminSearchOb.password);
                signUpAdminAddress.val(adminSearchOb.address);
            }
        },
        error: function (ob) {
            console.log("error")
            alert(ob.message);
        }
    })
}

function clearFieldsInAdminSignup() {
    signUpAdminId.val("");
    signUpAdminName.val("");
    signUpAdminNic.val("");
    signUpAdminContactNo.val("");
    signUpAdminUserName.val("");
    signUpAdminPassword.val("");
    signUpAdminAddress.val("");
}

function generateAdminId() {
    $.ajax({
        url: "http://localhost:8080/BackEnd_war_exploded/admin/generateId",
        method: "GET",
        success: function (resp) {
            if (resp.status == 200) {
                console.log("Log - " + resp.data);
                signUpAdminId.val(resp.data);
            }
        },
        error: function (ob) {
            alert(ob.message);
        }
    });
}

function setDataToTheAdminTable() {
    $.ajax({
        url: "http://localhost:8080/BackEnd_war_exploded/admin/getAll",
        method: "GET",
        success: function (resp) {
            let arr = resp.data;
            console.log(arr)
            adminArray.splice(0, adminArray.length);
            for (let i = 0; i < arr.length; i++) {
                adminArray.push(arr[i]);
                adminDetailsTable.children('tbody').children('tr').remove();
                if (resp.status == 200) {
                    for (let i = 0; i < arr.length; i++) {
                        console.log(arr[i].name)
                        adminDetailsTable.children('tbody').append('<tr><td>' + (i + 1) + '</td><td>' + arr[i].id + '</td><td>' + arr[i].name + '</td><td>' + arr[i].nic + '</td><td>' + arr[i].contactNo + '</td><td>' + arr[i].userName + '</td><td>' + arr[i].password + '</td><td>' + arr[i].address + '</td></tr>');
                    }
                }
            }
        },
        error: function (ob) {
            alert(ob.message);
            adminDetailsTable.children('tbody').children('tr').remove();
        }
    })
}

function setAdminInputBordersReset() {
    setBorderToDefault(fieldsArrayInAdmin);
}
$("#register-form").on("submit", e => {
    console.log($('#register-password').val())

    e.preventDefault();
    $.ajax({
        url: "/register",
        type: "POST",
        data: {
            username: $('#register-name').val(),
            password: $('#register-password').val()
        },
        dataType: 'json',
        success: () => {
            window.location.href = '/';
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$("#login-form").on("submit", e => {

    e.preventDefault();
    $.ajax({
        url: "/login",
        type: "POST",
        data: {
            username: $('#login-name').val(),
            password: $('#login-password').val()
        },
        dataType: 'json',
        success: (req, res) => {
            window.location.href = '/index';
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$("#addproduct").on("submit", e => {
    console.log(e.target);
    e.preventDefault();
    $.ajax({
        url: "/addproduct",
        type: "POST",
        data: {
            productname: $('#addproductname').val(),
            price: $('#addproductprice').val(),
            type: $('#addproducttype').val()
        },
        dataType: 'json',
        success: () => {
            location.reload()
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$(".deleteproduct").on("click", e => {
    console.log(e.target.id);
    e.preventDefault();
    $.ajax({
        url: "/deleteproduct",
        type: "DELETE",
        data: {
            _id: e.target.id
        },
        dataType: 'json',
        success: () => {
            location.reload()
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$(".editproduct").on("submit", e => {
    console.log(e.target);
    _id = e.target.id.split('_')[0]
    a = _id + 'editname'
    b = _id + 'editprice'
    c = _id + 'edittype'
    console.log('#' + a);
    e.preventDefault();
    $.ajax({
        url: "/editproduct",
        type: "POST",
        data: {
            id: e.target.id,
            productname: $('#' + a).val(),
            price: $('#' + b).val(),
            type: $('#' + c).val()
        },
        dataType: 'json',
        success: () => {
            window.location.href = '/index';
        },
        error: (err) => {
            console.log(err);
        }
    });
});
$("#form-type").on("submit", e => {
    console.log();
    e.preventDefault();
    $.ajax({
        url: "/index/" + $('#select').val(),
        method: "GET",
        data: {
            type: $('#select').val()
        },
        dataType: 'string',
        success: (req, res) => {
            window.location.href = '/index/' + $('#select').val();
        },
        error: (err) => {
            console.log(err);
        }
    });
});

//
var page = 1;


$(document).ready(function () {
    // $("#userdetail").hide();
    $('#input_username').focus();

    $('#input_username').on('keyup', function (e) {
        if (e.keyCode === 13) {
            Search();
        }
    });
});

Search = function () {
    page = 1;
    $("#loadmore").hide();
    $("#userdetail").hide();
    $('#userlist').show();
    $('#userlist').html("");
    $('#total').html("");
    var username = $('#input_username').val();
    var url = 'https://api.github.com/search/users?q=' + username + '&per_page=30&page=1';

    $.ajax({
        url: url,
        complete: function (data) {
            var userdata = data.responseJSON;

            if (userdata.message == "Not Found" || username == '') {
                $('#userlist').html("<h2> User Not Found</h2>");
            } else {
                Userlist(userdata);
            }



        }
    });

};

Userlist = function (data) {
    var Userlisthtml = "";
    console.log(data.items);
    //+ value.login +
    //value.avatar_url
    $.each(data.items, function (index, value) {

        Userlisthtml += '\
        <div class="col-md-4" onclick="Userdetail(`'+ value.url + '`);">\
        <div class="card list">\
            <div class="card-body">\
                <div class="profile2"><img id="a" src="'+ value.avatar_url + '" alt="">\
                    <span class="name_user"> '+ value.login + '</span>\
                </div>\
            </div >\
        </div >\
    </div >\
        ';
    });

    $("#total").text('Total ' + data.total_count + ' User');
    if (data.total_count > 30) {
        $("#loadmore").show();
    }

    $("#userlist").html(Userlisthtml);
}

Userdetail = function (url) {

    $('#userlist').hide();
    $("#loadmore").hide();

    $.ajax({
        url: url,
        complete: function (data) {
            var userdata = data.responseJSON;

            if (userdata.message == "Not Found" || username == '') {
                $('#userlist').html("<h2> User Not Found</h2>");
            } else {
                ShowUser(userdata);
            }



        }
    });

};

ShowUser = function (userdata) {
    $("#userdetail").show();

    console.log(userdata.avatar_url);
    $("#avartar").attr('src', userdata.avatar_url);
    $("#username").text(userdata.login);
    $("#name").text(userdata.name);
    $("#location").text(userdata.location);
    $("#email").text(userdata.email);
    $("#bio").text(userdata.bio);
    $("#followers").text(userdata.followers);
    $("#following").text(userdata.following);
    console.log(userdata);
    console.log(userdata.public_repos);

    if (userdata.public_repos == 0) {

    }



    LoadRepos(userdata.repos_url);


}

LoadRepos = function (repos_url) {
    $.ajax({
        url: repos_url,
        complete: function (data) {
            var reposdata = data.responseJSON;

            if (reposdata.message) {
                $('#repos-list').html("<h2>Not Found</h2>");
            } else {
                ShowRepos(reposdata);
            }



        }
    });
}

ShowRepos = function (reposdata) {
    var outhtml = "";
    $.each(reposdata, function (index, value) {

        outhtml += '<div class="card">\
                <div class="card-body" >\
                <div class="row">\
                        <div class="col-md-4 ">\
                        <a target="_blank" href="'+ value.html_url + '"><b>' + value.name + '</b></a> <br><span class="repos-text">' + value.full_name + '</span><br>\
                                <br>\
                                <span class="repos-text">Language:  '+ value.language + '</span>\
                                </div>\
                                <div class="col-md-8">\
                                    <div class="row">\
                                        <div class="col-lg-3">Clone url</div>\
                                        <div class="col-lg-9">\
                                            <div class="input-group">\
                                                <input type="text" class="form-control" id="'+ value.id + '" value="' + value.html_url + '">\
                                                    <span class="input-group-btn">\
                                                        <button class="btn btn-default" onclick="copy('+ value.id + ')" type="button"><i class="glyphicon glyphicon-duplicate"></i></button>\
                                                    </span>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <br>\
                                            <div class="row">\
                                                <div class="col-lg-3">\
                                    Download ZIP\
                                        </div>\
                                                <div class="col-lg-9">\
                                                    <a href="' + value.html_url + '/archive/master.zip" class="btn btn-success"><i\
                                        class="glyphicon glyphicon-download-alt"></i> Download</a>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                </div>\
                             </div>';
    });

    $("#repos").html(outhtml);

}

copy = function (element) {
    var copyText = $("#" + element)
    copyText.select();
    document.execCommand("copy");

};

Back = function () {
    $("#userdetail").hide();
    $('#userlist').show();
};

Loadmore = function () {
    page = page + 1;
    console.log(page);
    var username = $('#input_username').val();
    var url = 'https://api.github.com/search/users?q=' + username + '&per_page=30&page=' + page;

    $.ajax({
        url: url,
        complete: function (data) {
            var moredata = data.responseJSON;
            console.log(moredata);

            if (moredata.message == "Not Found" || username == '') {
            } else {
                Userlistmore(moredata);
            }



        }
    });

};

Userlistmore = function (data) {
    if (data.items.length == 0) {
        $("#loadmore").hide();
    }
    var uhtml = "";
    console.log(data.items);
    //+ value.login +
    //value.avatar_url
    $.each(data.items, function (index, value) {

        uhtml += '\
        <div class="col-md-4" onclick="Userdetail(`'+ value.url + '`);">\
        <div class="card list">\
            <div class="card-body">\
                <div class="profile2"><img id="a" src="'+ value.avatar_url + '" alt="">\
                    <span class="name_user"> '+ value.login + '</span>\
                </div>\
            </div >\
        </div >\
    </div >\
        ';
    });


    $("#userlist").append(uhtml);
}
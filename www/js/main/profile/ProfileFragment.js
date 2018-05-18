var profileFragment = {

    logoutButton : null,
    addButton : null,
    test_label : null,
    profile_name : null,
    navigateToPlanVege : null,
    navigateToPlanVegan : null,
    navigateToPlanDGluten : null,

    onCreate: function() { },

    onDeviceReady: function() {
        this.logoutButton = $("#logout_btn");
        this.addButton = $("#add_btn");
        this.test_label = $("#test_label");
        this.profile_name = $("#profile_name");

        this.logoutButton.click(this.onClickedLogout.bind(this));
        //this.addButton.click(this.testDataBase.bind(this));
        $('select').formSelect();
        $(document).ready(function(){

        });
        this.navigateToPlanVege = $("#vegetarianDiv"),
        this.navigateToPlanVegan = $("#veganDiv"),
        this.navigateToPlanDGluten = $("#glutenFreeDiv"),
        this.navigateToPlanVege.click(this.navigateToVegetarian.bind(this));
        this.navigateToPlanVegan.click(this.navigateToVegan.bind(this));
        this.navigateToPlanDGluten.click(this.navigateToGlutenFree.bind(this));


        $( "#mySelectID" ).change(function() {
            var x = $('#mySelectID').val();
            if(x == "1") {
                document.getElementById('vegetarianDiv').style.display = "block";
                document.getElementById('glutenFreeDiv').style.display = "none";
                document.getElementById('veganDiv').style.display = "none";
            }
            else if(x == "2") {
                document.getElementById('veganDiv').style.display = "block";
                document.getElementById('vegetarianDiv').style.display = "none";
                document.getElementById('glutenFreeDiv').style.display = "none";
            }
            else if(x == "3") {
                document.getElementById('glutenFreeDiv').style.display = "block";
                document.getElementById('vegetarianDiv').style.display = "none";
                document.getElementById('veganDiv').style.display = "none";
            }
            else{
                document.getElementById('glutenFreeDiv').style.display = "none";
                document.getElementById('vegetarianDiv').style.display = "none";
                document.getElementById('veganDiv').style.display = "none";
            }


        });

        $(document).ready(function() {
            $("input").change(function() {
                if($(this).is(":checked")) {
                    console.log("Is checked");
                    var alarmTime = new Date();
                    alarmTime.setMinutes(alarmTime.getMinutes() + 1);

                    var breakfastTime = new Date();
                    breakfastTime.setDate(breakfastTime.getDate()+1);
                    breakfastTime.setHours(7);
                    breakfastTime.setMinutes(0);
                    breakfastTime.setSeconds(0);

                    var snackFirstTime = new Date();
                    snackFirstTime.setDate(snackFirstTime.getDate()+1);
                    snackFirstTime.setHours(10);
                    snackFirstTime.setMinutes(0);
                    snackFirstTime.setSeconds(0);

                    var lunchTime = new Date();
                    lunchTime.setDate(lunchTime.getDate()+1);
                    lunchTime.setHours(12);
                    lunchTime.setMinutes(0);
                    lunchTime.setSeconds(0);

                    var snackSecondTime = new Date();
                    snackSecondTime.setDate(snackSecondTime.getDate()+1);
                    snackSecondTime.setHours(15);
                    snackSecondTime.setMinutes(0);
                    snackSecondTime.setSeconds(0);

                    var dinnerTime = new Date();
                    dinnerTime.setDate(dinnerTime.getDate()+1);
                    dinnerTime.setHours(18);
                    dinnerTime.setMinutes(0);
                    dinnerTime.setSeconds(0);

                    cordova.plugins.notification.local.registerPermission(function (str) {

                        cordova.plugins.notification.local.schedule({
                            id: '1',
                            title: 'Test Notification',
                            message: 'It is time to eat!',
                            date: alarmTime
                        });

                        cordova.plugins.notification.local.schedule({
                            id: '2',
                            title: 'Breakfast',
                            message: 'It is time to eat!',
                            date: breakfastTime
                        });

                        cordova.plugins.notification.local.schedule({
                            id: '3',
                            title: 'First snack',
                            message: 'It is time to eat!',
                            date: snackFirstTime
                        });

                        cordova.plugins.notification.local.schedule({
                            id: '4',
                            title: 'Lunch',
                            message: 'It is time to eat!',
                            date: lunchTime
                        });

                        cordova.plugins.notification.local.schedule({
                            id: '5',
                            title: 'Test Notification',
                            message: 'It is time to eat!',
                            date: snackSecondTime
                        });

                        cordova.plugins.notification.local.schedule({
                            id: '6',
                            title: 'Test Notification',
                            message: 'It is time to eat!',
                            date: dinnerTime
                        });
                    });
                }
                else {
                    console.log("Is Not checked");
                    cordova.plugins.notification.local.cancel(1, function() {
                    });
                    cordova.plugins.notification.local.cancel(2, function() {
                    });
                    cordova.plugins.notification.local.cancel(3, function() {
                    });
                    cordova.plugins.notification.local.cancel(4, function() {
                    });
                    cordova.plugins.notification.local.cancel(5, function() {
                    });
                    cordova.plugins.notification.local.cancel(6, function() {
                    });
                }
            })
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if(!user){
                profileFragment.navigateToLogin();
            }else {
                profileFragment.profile_name.html(user.uid);
                console.log(user.uid);
                firebase.database().ref('test_data').once('value').then(function (snapshot) {
                    profileFragment.test_label.html(snapshot.val());
                    console.log(snapshot.val());
                });
            }
        });

    },

    onClickedLogout : function () {
        firebase.auth().signOut().then(function() {
            profileFragment.navigateToLogin();
        }).catch(function(error) {
            console.log(error);
        });
    },

    navigateToLogin : function () {
        navigation.navigateToPath(  "/view/login/login.html" );
    },
    navigateToVegetarian : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "5");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },
    navigateToVegan : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "4");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },
    navigateToGlutenFree : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "1");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    }

};
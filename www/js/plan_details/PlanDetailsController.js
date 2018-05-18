var controller = {
    planID: null,
    planName: null,
    plan_link: null,
    mondayBreakfast: null,
    mondaySnack1: null,
    mondayLunch: null,
    mondaySnack2: null,
    mondayDinner: null,
    tuesdayBreakfast: null,
    tuesdaySnack1: null,
    tuesdayLunch: null,
    tuesdaySnack2: null,
    tuesdayDinner: null,
    wednesdayBreakfast: null,
    wednesdaySnack1: null,
    wednesdayLunch: null,
    wednesdaySnack2: null,
    wednesdayDinner: null,
    thursdayBreakfast: null,
    thursdaySnack1: null,
    thursdayLunch: null,
    thursdaySnack2: null,
    thursdayDinner: null,
    fridayBreakfast: null,
    fridaySnack1: null,
    fridayLunch: null,
    fridaySnack2: null,
    fridayDinner: null,
    saturdayBreakfast: null,
    saturdaySnack1: null,
    saturdayLunch: null,
    saturdaySnack2: null,
    saturdayDinner: null,
    sundayBreakfast: null,
    sundaySnack1: null,
    sundayLunch: null,
    sundaySnack2: null,
    sundayDinner: null,
    addBtn: null,
    backToPlans: null,

    onCreate: function () {
    },

    onDeviceReady: function () {
        var idid = localStorage.getItem("diet_offer_ID");
        controller.showLoader();
        this.backToPlans = $("#back_to_plans");
        this.addBtn = $("#addBtnView");
        this.planID = $("#plan_id");
        this.planName = $("#plan_name");
        this.plan_link = $("#dietLink");
        this.mondayBreakfast = $("#monday_breakfast");
        this.mondaySnack1 = $("#monday_snack1");
        this.mondayLunch = $("#monday_lunch");
        this.mondaySnack2 = $("#monday_snack2");
        this.mondayDinner = $("#monday_dinner");
        this.tuesdayBreakfast = $("#tuesday_breakfast");
        this.tuesdaySnack1 = $("#tuesday_snack1");
        this.tuesdayLunch = $("#tuesday_lunch");
        this.tuesdaySnack2 = $("#tuesday_snack2");
        this.tuesdayDinner = $("#tuesday_dinner");
        this.wednesdayBreakfast = $("#wednesday_breakfast");
        this.wednesdaySnack1 = $("#wednesday_snack1");
        this.wednesdayLunch = $("#wednesday_lunch");
        this.wednesdaySnack2 = $("#wednesday_snack2");
        this.wednesdayDinner = $("#wednesday_dinner");
        this.thursdayBreakfast = $("#thursday_breakfast");
        this.thursdaySnack1 = $("#thursday_snack1");
        this.thursdayLunch = $("#thursday_lunch");
        this.thursdaySnack2 = $("#thursday_snack2");
        this.thursdayDinner = $("#thursday_dinner");
        this.fridayBreakfast = $("#friday_breakfast");
        this.fridaySnack1 = $("#friday_snack1");
        this.fridayLunch = $("#friday_lunch");
        this.fridaySnack2 = $("#friday_snack2");
        this.fridayDinner = $("#friday_dinner");
        this.saturdayBreakfast = $("#saturday_breakfast");
        this.saturdaySnack1 = $("#saturday_snack1");
        this.saturdayLunch = $("#saturday_lunch");
        this.saturdaySnack2 = $("#saturday_snack2");
        this.saturdayDinner = $("#saturday_dinner");
        this.sundayBreakfast = $("#sunday_breakfast");
        this.sundaySnack1 = $("#sunday_snack1");
        this.sundayLunch = $("#sunday_lunch");
        this.sundaySnack2 = $("#sunday_snack2");
        this.sundayDinner = $("#sunday_dinner");
        this.addBtn.click(this.addToProfile.bind(this));
        this.backToPlans.click(this.backToMainView.bind(this));

        if (navigator.userAgent.indexOf('Android') > -1) {
            if (idid == 1)
                document.getElementById('img_id').src = "file:///android_asset/www/img/glutenFree.jpg";
            else if (idid == 2)
                document.getElementById('img_id').src = "file:///android_asset/www/img/fit.jpg";
            else if (idid == 3)
                document.getElementById('img_id').src = "file:///android_asset/www/img/muscle.jpg";
            else if (idid == 4)
                document.getElementById('img_id').src = "file:///android_asset/www/img/vegan.jpg";
            else if (idid == 5)
                document.getElementById('img_id').src = "file:///android_asset/www/img/vegetarian.jpg";
            else
                document.getElementById('img_id').src = "file:///android_asset/www/img/nutrition.jpg";
        }
        else {
            if (idid == 1)
                document.getElementById('img_id').src = "../../img/glutenFree.jpg";
            else if (idid == 2)
                document.getElementById('img_id').src = "../../img/fit.jpg";
            else if (idid == 3)
                document.getElementById('img_id').src = "../../img/muscle.jpg";
            else if (idid == 4)
                document.getElementById('img_id').src = "../../img/vegan.jpg";
            else if (idid == 5)
                document.getElementById('img_id').src = "../../img/vegetarian.jpg";
            else
                document.getElementById('img_id').src = "../../img/nutrition.jpg";
        }

        firebase.auth().onAuthStateChanged(function (user) {
            console.log(user.uid);
            firebase.database().ref('diet_offers').once('value').then(function (snapshot) {
                var item = snapshot.val();
                controller.hideLoader();
                controller.planID.html(idid);
                controller.mondayBreakfast.html(item[idid].menu.mondayMenu.breakfast);
                controller.mondaySnack1.html(item[idid].menu.mondayMenu.snack1);
                controller.mondayLunch.html(item[idid].menu.mondayMenu.lunch);
                controller.mondaySnack2.html(item[idid].menu.mondayMenu.snack2);
                controller.mondayDinner.html(item[idid].menu.mondayMenu.dinner);

                controller.tuesdayBreakfast.html(item[idid].menu.tuesdayMenu.breakfast);
                controller.tuesdaySnack1.html(item[idid].menu.tuesdayMenu.snack1);
                controller.tuesdayLunch.html(item[idid].menu.tuesdayMenu.lunch);
                controller.tuesdaySnack2.html(item[idid].menu.tuesdayMenu.snack2);
                controller.tuesdayDinner.html(item[idid].menu.tuesdayMenu.dinner);

                controller.wednesdayBreakfast.html(item[idid].menu.wednesdayMenu.breakfast);
                controller.wednesdaySnack1.html(item[idid].menu.wednesdayMenu.snack1);
                controller.wednesdayLunch.html(item[idid].menu.wednesdayMenu.lunch);
                controller.wednesdaySnack2.html(item[idid].menu.wednesdayMenu.snack2);
                controller.wednesdayDinner.html(item[idid].menu.wednesdayMenu.dinner);

                controller.thursdayBreakfast.html(item[idid].menu.thursdayMenu.breakfast);
                controller.thursdaySnack1.html(item[idid].menu.thursdayMenu.snack1);
                controller.thursdayLunch.html(item[idid].menu.thursdayMenu.lunch);
                controller.thursdaySnack2.html(item[idid].menu.thursdayMenu.snack2);
                controller.thursdayDinner.html(item[idid].menu.thursdayMenu.dinner);

                controller.fridayBreakfast.html(item[idid].menu.fridayMenu.breakfast);
                controller.fridaySnack1.html(item[idid].menu.fridayMenu.snack1);
                controller.fridayLunch.html(item[idid].menu.fridayMenu.lunch);
                controller.fridaySnack2.html(item[idid].menu.fridayMenu.snack2);
                controller.fridayDinner.html(item[idid].menu.fridayMenu.dinner);

                controller.saturdayBreakfast.html(item[idid].menu.saturdayMenu.breakfast);
                controller.saturdaySnack1.html(item[idid].menu.saturdayMenu.snack1);
                controller.saturdayLunch.html(item[idid].menu.saturdayMenu.lunch);
                controller.saturdaySnack2.html(item[idid].menu.saturdayMenu.snack2);
                controller.saturdayDinner.html(item[idid].menu.saturdayMenu.dinner);

                controller.sundayBreakfast.html(item[idid].menu.sundayMenu.breakfast);
                controller.sundaySnack1.html(item[idid].menu.sundayMenu.snack1);
                controller.sundayLunch.html(item[idid].menu.sundayMenu.lunch);
                controller.sundaySnack2.html(item[idid].menu.sundayMenu.snack2);

                controller.sundayDinner.html(item[idid].menu.sundayMenu.dinner);
            });
        });
    },

    addToProfile: function () {
        var dietID = localStorage.getItem("diet_offer_ID");
        var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('test/' + userId).once('value').then(function (snapshot) {
            var item = snapshot.val();
            if(item == null)
            {
                var dietFromdb = 9999;
            }
            else {
                var dietFromdb = item.dietIds;
            }
            if (dietFromdb == dietID) {
                document.getElementById('mssDiv').style.display = "block";
            }
            else {
                firebase.database().ref('test/' + userId).set({
                    dietIds: dietID
                });
            }
        });
    },

    backToMainView: function(){
        navigation.navigateToPath("/view/main/main.html");
    },

    showLoader: function () {
        $('.preloader-background').fadeIn();
    },

    hideLoader: function () {
        $('.preloader-background').fadeOut('slow');
    }
};
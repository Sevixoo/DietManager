var dietFragment = {

    chooseExistingBtn : null,
    createYourOwnBtn : null,
    showMenuBtn: null,
    removeBtn: null,
    obrazek: null,
    navigateToPlanVege : null,
    navigateToPlanVeg : null,
    navigateToPlanGlu : null,
    navigateToPlanMus : null,
    navigateToPlanFit : null,

    onCreate: function() { },

     onDeviceReady: function() {
         this.chooseExistingBtn = $("#choose_existingbtn");
         this.createYourOwnBtn = $("#create_your_ownbtn");
         this.showMenuBtn = $("#show_plan");
         this.removeBtn = $("#removeButton");

         this.removeBtn.click(this.removeDietID.bind(this));

         this.chooseExistingBtn.click(this.switchTab);
         this.createYourOwnBtn.click(this.switchToPlanCreation);
         this.showMenuBtn.click(this.switchToMyPlan);

         this.navigateToPlanVege = $("#mssDiv5"),
         this.navigateToPlanVeg = $("#mssDiv4"),
         this.navigateToPlanGlu = $("#mssDiv1"),
         this.navigateToPlanMus = $("#mssDiv3"),
         this.navigateToPlanFit = $("#mssDiv2"),

         dietFragment.showLoader();

         this.navigateToPlanVege.click(this.navigateToVeget.bind(this));
         this.navigateToPlanVeg.click(this.navigateToVeg.bind(this));
         this.navigateToPlanGlu.click(this.navigateToGluten.bind(this));
         this.navigateToPlanMus.click(this.navigateToMusc.bind(this));
         this.navigateToPlanFit.click(this.navigateToFit.bind(this));

         firebase.auth().onAuthStateChanged(function (user) {
         var userID = user.uid;
         firebase.database().ref('test/' + userID).once('value').then(function (snapshot) {
             var item = snapshot.val();
             dietFragment.hideLoader();
             if(item == null)
             {
              var dietFromdb   = 9999;
             }
             else {
                 var dietFromdb = item.dietIds;
             }
             if (dietFromdb == "1") {
                 document.getElementById('mssDiv1').style.display = "block";
                 document.getElementById('mssDiv2').style.display = "none";
                 document.getElementById('mssDiv3').style.display = "none";
                 document.getElementById('mssDiv4').style.display = "none";
                 document.getElementById('mssDiv5').style.display = "none";
                 document.getElementById('mssImg').style.display = "none";
                 document.getElementById('removeSection').style.display = "block";
             }
             else if(dietFromdb == "2") {
                 document.getElementById('mssDiv2').style.display = "block";
                 document.getElementById('mssDiv3').style.display = "none";
                 document.getElementById('mssDiv1').style.display = "none";
                 document.getElementById('mssDiv4').style.display = "none";
                 document.getElementById('mssDiv5').style.display = "none";
                 document.getElementById('mssImg').style.display = "none";
                 document.getElementById('removeSection').style.display = "block";
             }
             else if(dietFromdb == "3") {
                 document.getElementById('mssDiv3').style.display = "block";
                 document.getElementById('mssDiv2').style.display = "none";
                 document.getElementById('mssDiv1').style.display = "none";
                 document.getElementById('mssDiv4').style.display = "none";
                 document.getElementById('mssDiv5').style.display = "none";
                 document.getElementById('mssImg').style.display = "none";
                 document.getElementById('removeSection').style.display = "block";

             }
             else if(dietFromdb == "4") {
                 document.getElementById('mssDiv4').style.display = "block";
                 document.getElementById('mssDiv2').style.display = "none";
                 document.getElementById('mssDiv1').style.display = "none";
                 document.getElementById('mssDiv3').style.display = "none";
                 document.getElementById('mssDiv5').style.display = "none";
                 document.getElementById('mssImg').style.display = "none";
                 document.getElementById('removeSection').style.display = "block";
             }
             else if(dietFromdb == "5") {
                 document.getElementById('mssDiv5').style.display = "block";
                 document.getElementById('mssDiv2').style.display = "none";
                 document.getElementById('mssDiv1').style.display = "none";
                 document.getElementById('mssDiv4').style.display = "none";
                 document.getElementById('mssDiv3').style.display = "none";
                 document.getElementById('mssImg').style.display = "none";
                 document.getElementById('removeSection').style.display = "block";
             }
             else {
                 document.getElementById('mssDiv1').style.display = "none";
                 document.getElementById('mssDiv2').style.display = "none";
                 document.getElementById('mssDiv3').style.display = "none";
                 document.getElementById('mssDiv4').style.display = "none";
                 document.getElementById('mssDiv5').style.display = "none";
                 document.getElementById('mssImg').style.display = "block";
                 document.getElementById('removeSection').style.display = "none";

                 document.getElementById('emptyDietListMsg').innerText = "You haven't added any nutrition plan yet. In order to add a plan, please:";
                 if (navigator.userAgent.indexOf('Android') > -1)
                 {
                     document.getElementById('obrazek').src = "file:///android_asset/www/img/sad_emoji.png";
                 }
                 else {
                     document.getElementById('obrazek').src = "../../www/img/sad_emoji.png";
                 }
             }
         });
         });
     },

     switchTab: function(){
         var instance = M.Tabs.getInstance($('.tabs'));
         instance.select('test-swipe-1');
     },
    removeDietID : function () {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('test/' + userId).set({
            dietIds: 0
        });

        document.getElementById('mssDiv1').style.display = "none";
        document.getElementById('mssDiv2').style.display = "none";
        document.getElementById('mssDiv3').style.display = "none";
        document.getElementById('mssDiv4').style.display = "none";
        document.getElementById('mssDiv5').style.display = "none";
        document.getElementById('mssImg').style.display = "block";
        document.getElementById('removeSection').style.display = "none";

        document.getElementById('emptyDietListMsg').innerText = "You haven't added any nutrition plan yet. In order to add a plan, please:";
        if (navigator.userAgent.indexOf('Android') > -1)
        {
            document.getElementById('obrazek').src = "file:///android_asset/www/img/sad_emoji.png";
        }
        else {
            document.getElementById('obrazek').src = "../../www/img/sad_emoji.png";
        }
    },

    navigateToVeget : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "5");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },
    navigateToVeg : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "4");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },
    navigateToGluten : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "1");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },
    navigateToMusc : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "3");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },

    navigateToFit : function () {

        localStorage.removeItem("diet_offer_ID");
        localStorage.setItem("diet_offer_ID", "2");
        navigation.navigateToPath("/view/plan_details/plan_details.html");
    },

     switchToPlanCreation: function(){
         localStorage.setItem("dietData",JSON.stringify({
             "dietDescription": "description",
             "dietName": "New diet",
             "link": "link",
             "menu": {
                 "mondayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 },

                 "tuesdayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 },

                 "wednesdayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 },

                 "thursdayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 },

                 "fridayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 },

                 "saturdayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 },

                 "sundayMenu": {
                     "breakfast": [],
                     "dinner": [],
                     "lunch": [],
                     "snack1": [],
                     "snack2": []
                 }
             }
         }));
         navigation.navigateToPath("/view/create_nutrition_plan/create_nutrition_plan.html");
     },

     switchToMyPlan: function(){
         navigation.navigateToPath("/view/my_nutrition_plan/my_nutrition_plan.html");
     },

    showLoader: function () {
        $('.preloader-background').fadeIn();
    },

    hideLoader: function () {
        $('.preloader-background').fadeOut('slow');
    }
};
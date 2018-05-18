var dietFragment = {

    chooseExistingBtn : null,
    createYourOwnBtn : null,
    obrazek: null,
    onCreate: function() { },

     onDeviceReady: function() {
        this.chooseExistingBtn = $("#choose_existingbtn");
         this.createYourOwnBtn = $("#create_your_ownbtn");
         this.chooseExistingBtn.click(this.switchTab);
         this.createYourOwnBtn.click(this.switchToPlanCreation);
         if (navigator.userAgent.indexOf('Android') > -1)
         {
             document.getElementById('obrazek').src = "file:///android_asset/www/img/sad_emoji.png";
         }
         else {
             document.getElementById('obrazek').src = "../../www/img/sad_emoji.png";
         }
     },

     switchTab: function(){
         var instance = M.Tabs.getInstance($('.tabs'));
         instance.select('test-swipe-1');
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
     }
};
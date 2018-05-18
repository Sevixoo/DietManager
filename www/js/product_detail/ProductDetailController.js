var controller = {

    searchApiKey : "z9HfGMQzfhQBmeD6UvasVWC3Azf0e9lgbaqbz19K",
    addProductBtn : null,
    productName: null,
    calories: null,
    quantity: null,
    productTable: null,

    productId : null,
    productItemName : null,
    caloriesValue : null,

    targetDay : null,
    targetMeal : null,

    onCreate: function(arg) {
        this.productId = arg.ndbno;
        this.productItemName = arg.name;
        this.targetDay = arg.targetDay;
        this.targetMeal = arg.targetMeal;
    },

    onDeviceReady: function() {
        this.addProductBtn = $("#add_selected_product");
        this.productName = $("#product_name");
        this.calories = $("#calories");
        this.quantity = $("#quantity");
        this.productTable = [];
        this.loadProductDetails();
        this.addProductBtn.click(this.switchToCreatePlanView.bind(this));
    },

    loadProductDetails : function(){
        controller.showLoader();
        $.getJSON( "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key="+controller.searchApiKey+"&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=" + controller.productId , function(data) {
            controller.hideLoader();
            if(data.report){
                controller.displayProductDetails(data.report.foods[0].name);
                controller.productItemName = data.report.foods[0].name;
                controller.caloriesValue = data.report.foods[0].nutrients[0].gm;
                controller.calories.html(controller.caloriesValue + " cal/100g");
            }
        }).fail(function() {
            controller.hideLoader();
        });
    },

    displayProductDetails : function(name){
        this.productName.html(name);
    },

    switchToCreatePlanView: function(){
        navigation.navigateToPathWithResult("/view/create_nutrition_plan/create_nutrition_plan.html",{
            ndbno : controller.productId,
            name : controller.productItemName,
            quantity : controller.quantity.val(),
            calories : controller.caloriesValue,
            targetDay : controller.targetDay,
            targetMeal : controller.targetMeal
        });
    },

    showLoader: function () {
        $('.preloader-background').fadeIn();
    },

    hideLoader: function () {
        $('.preloader-background').fadeOut('slow');
    }

};
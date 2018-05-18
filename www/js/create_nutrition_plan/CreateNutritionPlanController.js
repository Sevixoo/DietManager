var controller = {

    addBreakfast: null,
    productName: null,
    calories: null,
    quantity: null,
    productTable: [{}],
    addProductBtn: null,
    nextDayButton: null,
    dayController: 0,
    nextDayTable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    nextDayIdsTable: ['mondayMenu', 'tuesdayMenu', 'wednesdayMenu', 'thursdayMenu', 'fridayMenu', 'saturdayMenu', 'sundayMenu'],
    planData: null,

    onCreate: function () {
        this.planData = JSON.parse(localStorage.getItem("dietData"));
    },

    onResult : function(result){
        if(result){
            this.planData.menu[result.targetDay][result.targetMeal].push({
                'name': result.name,
                'quantity': result.quantity,
                'calories': result.calories
            });
        }
    },

    onDeviceReady: function () {
        this.nextDayButton = $("#bottom_button");
        this.addProductBtn = $("#add_selected_product");
        this.productName = $("#product_name");
        this.calories = $("#calories");
        this.quantity = $("#quantity");


        $("#add_breakfast").click(function () {
            controller.navigateToAddProduct(controller.nextDayIdsTable[controller.dayController],"breakfast");
        });
        $("#add_dinner").click(function () {
            controller.navigateToAddProduct(controller.nextDayIdsTable[controller.dayController],"dinner");
        });
        $("#add_lunch").click(function () {
            controller.navigateToAddProduct(controller.nextDayIdsTable[controller.dayController],"lunch");
        });
        $("#add_snack1").click(function () {
            controller.navigateToAddProduct(controller.nextDayIdsTable[controller.dayController],"snack1");
        });
        $("#add_snack2").click(function () {
            controller.navigateToAddProduct(controller.nextDayIdsTable[controller.dayController],"snack2");
        });

        controller.displayDay(controller.planData.menu[Object.keys(controller.planData.menu)[controller.dayController]], controller.nextDayTable[controller.dayController]);
        controller.displayButtonName("NEXT DAY");
        this.displayDayName(this.nextDayTable[this.dayController]);
        this.nextDayButton.click(function () {
            controller.dayController++;
            if (controller.dayController < 6) {
                controller.displayDay(controller.planData.menu[Object.keys(controller.planData.menu)[controller.dayController]], controller.nextDayTable[controller.dayController]);
            }
            else if(controller.dayController == 6){
                controller.displayDay(controller.planData.menu[Object.keys(controller.planData.menu)[controller.dayController]], controller.nextDayTable[controller.dayController]);
                controller.displayButtonName("CREATE NUTRITION PLAN");
            }
            else {
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[0]]);
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[1]]);
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[2]]);
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[3]]);
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[4]]);
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[5]]);
                controller.normalizePlan(controller.planData.menu[Object.keys(controller.planData.menu)[6]]);

                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('test/' + userId).set({
                    myDiet: controller.planData
                }).then(function () {
                    navigation.navigateToPath("/view/main/main.html");
                });
            }

        })
    },

    displayButtonName: function(name){
        var view = $("#bottom_button");
        var buttonNameTemplate = '    <p class="center-align"><a class="waves-effect red darken-1 btn" id="next_day_button">' +
            name +
        '</a></p>\n';
        view.html(buttonNameTemplate);
    },

    displayDay: function (data, dayName) {
        this.displayDayName(dayName);
        this.displayProducts($("#breakfast_products"), data.breakfast);
        this.displayProducts($("#second_breakfast_products"), data.dinner);
        this.displayProducts($("#lunch_products"), data.lunch);
        this.displayProducts($("#dinner_products"), data.snack1);
        this.displayProducts($("#supper_products"), data.snack2);
    },

    normalizePlan: function (data){
        var array = data.breakfast;
        var name = "";

        array = data.breakfast;
        name = "";
        for (var i = 0; i < array.length; i++) {
            name += array[i].name + " " + array[i].quantity + ","
        }
        data.breakfast = name;

        array = data.dinner;
        name = "";
        for (var i = 0; i < array.length; i++) {
            name += array[i].name + " " + array[i].quantity + ","
        }
        data.dinner = name;

        array = data.lunch;
        name = "";
        for (var i = 0; i < array.length; i++) {
            name += array[i].name + " " + array[i].quantity + ","
        }
        data.lunch = name;

        array = data.snack1;
        name = "";
        for (var i = 0; i < array.length; i++) {
            name += array[i].name + " " + array[i].quantity + ","
        }
        data.snack1 = name;

        array = data.snack2;
        name = "";
        for (var i = 0; i < array.length; i++) {
            name += array[i].name + " " + array[i].quantity + ","
        }
        data.snack2 = name;
    },

    displayDayName: function (dayName) {
        var view = $("#day_name");
        var dayNameTemplate = '<h5 class="center-align" id="day_row"><b>' +
            dayName +
            '</b></h5>';
        view.html(dayNameTemplate);
    },

    navigateToAddProduct: function (targetDay, targetMeal) {
        localStorage.setItem("dietData",JSON.stringify(this.planData));
        navigation.navigateToPathWithArgument("/view/add_product/add_product.html",{
            targetDay : targetDay,
            targetMeal : targetMeal,
        });
    },

    displayProducts: function (view, data) {

        var template = '';
        if (data) {
            template = ' <table class="striped">\n' +
                '            <thead>\n' +
                '            <tr>\n' +
                '                <th>Product name</th>\n' +
                '                <th>QTY</th>\n' +
                '                <th>Calories</th>\n' +
                '            </tr>\n' +
                '            </thead>\n' +
                '            <tbody class="product_table">\n';
            for (var i = 0; i < data.length; i++) {
                template += '            <tr>\n' +
                    '                <td>' + data[i].name + '</td>\n' +
                    '                <td>' + data[i].quantity + '</td>\n' +
                    '                <td>387</td>\n' +
                    '            </tr>\n';
            }
            template += '            </tbody>\n' +
                '        </table>';
        }
        else {
            template = '';
        }
        view.html(template);
    }
};

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
    planData: {
        "dietDescription": "dietDescription",
        "dietName": "dietName",
        "link": "link",
        "menu": {
            "mondayMenu": {
                "breakfast": "Berry Wafflewich, 0% fat Greek yogurt",
                "dinner": "Berry Wafflewich, 0% fat Greek yogurt",
                "lunch": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack1": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack2": "Berry Wafflewich, 0% fat Greek yogurt"
            },

            "tuesdayMenu": {
                "breakfast": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "dinner": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "lunch": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "snack1": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "snack2": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ..."
            },

            "wednesdayMenu": {
                "breakfast": "Berry Wafflewich, 0% fat Greek yogurt",
                "dinner": "Berry Wafflewich, 0% fat Greek yogurt",
                "lunch": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack1": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack2": "Berry Wafflewich, 0% fat Greek yogurt"
            },

            "thursdayMenu": {
                "breakfast": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "dinner": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "lunch": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "snack1": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "snack2": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ..."
            },

            "fridayMenu": {
                "breakfast": "Berry Wafflewich, 0% fat Greek yogurt",
                "dinner": "Berry Wafflewich, 0% fat Greek yogurt",
                "lunch": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack1": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack2": "Berry Wafflewich, 0% fat Greek yogurt"
            },

            "saturdayMenu": {
                "breakfast": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "dinner": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "lunch": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "snack1": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ...",
                "snack2": "Spicy Chicken and Pasta, Side salad and 2 Tbsp ..."
            },

            "sundayMenu": {
                "breakfast": "Berry Wafflewich, 0% fat Greek yogurt",
                "dinner": "Berry Wafflewich, 0% fat Greek yogurt",
                "lunch": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack1": "Berry Wafflewich, 0% fat Greek yogurt",
                "snack2": "Berry Wafflewich, 0% fat Greek yogurt"
            }
        }
    },
    onCreate: function () {
    },

    onDeviceReady: function () {
        var productTable = [{'name': 'nazwa', 'quantity': 14016, 'calories': 156}];
        this.nextDayButton = $("#bottom_button");
        this.addProductBtn = $("#add_selected_product");
        this.addBreakfast = $("#add_breakfast");
        this.productName = $("#product_name");
        this.calories = $("#calories");
        this.quantity = $("#quantity");
        this.addBreakfast.click(this.navigateToAddProduct);
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
                controller.displayButtonName("BACK TO THE BEGINNING");
            }
            else {
                navigation.navigateToPath("/view/main/main.html");
                controller.dayController = 0;
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

    displayDayName: function (dayName) {
        var view = $("#day_name");
        var dayNameTemplate = '<h5 class="center-align" id="day_row"><b>' +
            dayName +
            '</b></h5>';
        view.html(dayNameTemplate);
    },

    displayProducts: function (view, data) {

        var template = '';
        if (data) {
            template = ' <table class="striped">\n' +
                '            <thead>\n' +
                '            <tr>\n' +
                '                <th>Meal description</th>\n' +
                '            </tr>\n' +
                '            </thead>\n' +
                '            <tbody class="product_table">\n' +
            /*for (var i = 0; i < data.length; i++) {
                template += '            <tr>\n' +
                    '                <td>' + data[i].name + '</td>\n' +
                    '                <td>' + data[i].quantity + '</td>\n' +
                    '                <td>387</td>\n' +
                    '            </tr>\n';
            }*/
            '                <td>' + data + '</td>\n' + '            </tbody>\n' +
                '        </table>';
        }
        else {
            template = '';
        }
        view.html(template);
    }
};

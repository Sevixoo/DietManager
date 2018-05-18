var controller = {

    searchApiKey : "z9HfGMQzfhQBmeD6UvasVWC3Azf0e9lgbaqbz19K",
    productCard: null,
    searchButton : null,
    typeProductInput : null,
    productItemsList : null,

    targetDay : null,
    targetMeal : null,

    onCreate: function(arg) {
        this.targetDay = arg.targetDay;
        this.targetMeal = arg.targetMeal;
    },

    onDeviceReady: function() {
        this.productCard = $("#product_card");
        this.searchButton = $("#search_button");
        this.typeProductInput = $("#type_product_input");
        this.productItemsList = $("#product_items_list");
        this.productCard.click(this.navigateToProductDetail);
        controller.hideLoader();
        if (navigator.userAgent.indexOf('Android') > -1) {
            document.getElementById('search_icon').src = "file:///android_asset/www/img/search.png";
        } else {
            document.getElementById('search_icon').src = "../../www/img/search.png";
        }

        this.searchButton.click(this.requestSearchProducts.bind(this));
        this.displayProductsList([]);
    },

    navigateToProductDetail: function ( ndbno , name ) {
        navigation.navigateToPathWithArgument("/view/product_detail/product_detail.html", {
            ndbno : ndbno,
            name : name,
            targetDay : controller.targetDay,
            targetMeal : controller.targetMeal
        });
    },

    requestSearchProducts : function (){
        var queryString = this.typeProductInput.val();
        controller.showLoader();
        $.getJSON( "https://api.nal.usda.gov/ndb/search/?format=json&q="+queryString+"&sort=n&max=25&offset=0&api_key=" + controller.searchApiKey, function(data) {
            controller.hideLoader();
            if(data.list){
                controller.displayProductsList(data.list.item);
            }else{
                controller.displayProductsList([]);
            }
        }).fail(function() {
            controller.hideLoader();
            console.log( "requestSearchProducts error" );
        });
    },

    displayProductsList : function ( data ){
        this.productItemsList.empty();
        if(data){
            for(var i = 0 ; i < data.length ; i++){
                this.productItemsList.append("<li class=\"collection-item\">" +
                    "<div>"+data[i].name+"<a data-id='"+data[i].ndbno+"'  href=\"#!\" class=\"secondary-content\"><i class=\"material-icons\">add</i></a></div>" +
                    "</li>");
            }
            $("#product_items_list li a").click(function (event) {
                var view = $(event.currentTarget);
                var ndbno = view.attr("data-id");
                var data = view.attr("data-id");
                controller.navigateToProductDetail(ndbno,data);
            });
        }
    },

    navigateToMain: function () {
        window.location.href = "/view/main/main.html";
    },

    showLoader: function () {
        $('.preloader-background').fadeIn();
    },

    hideLoader: function () {
        $('.preloader-background').fadeOut('slow');
    }

};
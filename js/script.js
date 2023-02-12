function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.toppings = [];
}

function Location(name, estate) {
    this.name = name;
    this.estate = estate;
}


var sizePrice = {
    small: 600,
    medium: 800,
    large: 1200
};
var toppingPrice = [{
    pepperoni: {
        small: 50,
        medium: 100,
        large: 150
    },
    veges: {
        small: 25,
        medium: 50,
        large: 75
    },
    bacon: {
        small: 50,
        medium: 75,
        large: 100
    }
}];

var crustPrice = {
    crispy: 300,
    stuffed: 200,
    gluten: 100
};

function sizeCalcPrice(size) {
    if (size === "small") {
        return sizePrice.small * 1;
    } else if (size === "medium") {
        return sizePrice.medium * 1;
    } else {
        return sizePrice.large * 1;
    }
}

function crustCalcPrice(crust) {
    if (crust === "crispy") {
        return crustPrice.crispy * 1;
    } else if (crust === "stuffed") {
        return crustPrice.stuffed * 1;
    } else {
        return crustPrice.gluten * 1;
    }
}

function toppingsCalcPrice(toppings) {
    var noOfTopping = 0;
    for (i = 0; i < toppings.length; i++) {
        if (toppings[i] == "pepperoni") {
            noOfTopping += 100;
        }
        if (toppings[i] == "veges") {
            noOfTopping += 50;
        }
        if (toppings[i] == "bacon") {
            noOfTopping += 75;
        }
    }
    return noOfTopping * 1;
}


function checkPepperoni(topping) {
    return topping === "pepperoni";
}


$("document").ready(function() {

    function getPizzaSize() {
        return $("#pizza-size")
            .find(":selected")
            .val();
    }

    function getCrust() {
        return $("#pizza-crust")
            .find(":selected")
            .val();
    }

    function getToppings() {
        var toppingList = [];
        $(".toppings :checked").each(function() {
            toppingList.push($(this).val());
        });
        return toppingList;
    }


    $("form#myform").submit(function(event) {
        event.preventDefault();
        var pizzaSize = getPizzaSize();
        var crust = getCrust();
        var toppingList = getToppings();

        var newPizza = new Pizza(pizzaSize, crust);
        newPizza.toppings.push(toppingList);
        $("#cart").hide();
        $("#table").show();
        $(".checkout").show();
        var oneOrder =
            sizeCalcPrice(pizzaSize) +
            crustCalcPrice(crust) +
            toppingsCalcPrice(toppingList);


        $("#items").append(
            "<tr>" +
            "<td>" +
            newPizza.size +
            "</td>" +
            "<td>" +
            "<p>" +
            newPizza.crust +
            "</p>" +
            "</td>" +
            "<td>" +
            newPizza.toppings +
            "</td>" +
            "<td>" +
            oneOrder +
            "</td>" +
            "</tr>"
        );
    });
    var totalQuantity = parseInt($("#quantity").val());

    function calcTotal() {
        var priceOnePizza =
            sizeCalcPrice(getPizzaSize()) +
            crustCalcPrice(getCrust()) +
            toppingsCalcPrice(getToppings());
        return priceOnePizza;
    }
    var pizzaList = [];

    $("#orderbtn").on("click", function() {
        totalQuantity += 1;
        $("#quantity").text(totalQuantity);
        pizzaList.push(calcTotal());
    });


    $("#gettotal").click(function() {
        var total = 0;
        pizzaList.forEach(function(pizza) {
            total += pizza;
        });
        $("#money").text(total);
    });


    $("#myModel").click(function() {
        var deliver = confirm(
            "Would you like us deliver your pizza to your doorstep? transport cost ksh 200."
        );
        if (deliver) {
            var place = prompt("Enter your location");
            $("#place").text(place);
            $("#success").show();
        } else {
            $("#no-delivery").show();
        }

        $("#pizza-size").val("");
        $("#pizza-crust").val("");
        $("#items").remove();
        $("#quantity").text(0);
    });
});
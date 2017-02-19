var BookIt = BookIt || {};

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signUpController = new BookIt.SignUpController();
app.signInController = new BookIt.SignInController();
app.bookingsController = new BookIt.BookingsController();

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signUpController.resetSignUpForm();
                break;
            case "page-signin":
                // Reset signin form.
                app.signInController.resetSignInForm();
                break;
            case "page-bookings":
                // Show  the list of bookings.
                app.bookingsController.showBookings();
                break;
        }
    }
});

$(document).on("pagecontainerbeforechange", function (event, ui) {

    if (typeof ui.toPage !== "object") return;
    
    switch (ui.toPage.attr("id")) {
        case "page-index":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = BookIt.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#page-main-menu");
                }
            }
    }
});

$(document).delegate("#page-signup", "pagebeforecreate", function () {

    app.signUpController.init();

    app.signUpController.$btnSubmit.off("tap").on("tap", function () {
        app.signUpController.onSignUpCommand();
    });
});

$(document).delegate("#page-signin", "pagebeforecreate", function () {

    app.signInController.init();

    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

$(document).delegate("#page-bookings", "pagebeforecreate", function () {

    app.bookingsController.init();

    //app.signInController.$btnRefresh.off("tap").on("tap", function () {
    //    app.bookingsController.onRefreshCommand();
    //});
    
});


//dans l'onglet Visite (visite-onglet.html), à la page "A la maison ce jour" (id="non")
//selon le bouton choisi, champ1 est affiché alors que champ2 et champ3 reste caché
function afficher(btn,champ1,champ2,champ3){
    if (btn.checked)
   {
        document.getElementById(champ1).style.display="inline";
        document.getElementById(champ2).style.display="none";
        document.getElementById(champ3).style.display="none";
   }
}

//dans les inputs, affiche le texte par défaut
function afficherTexte(input){
if (input.value == '') input.value = input.defaultValue;
}

//dans les inputs, supprime le texte par défaut
function supprimerTexte(input){
    if (input.value == input.defaultValue) input.value = '';
}

//redirige vers la page Confirmation Enregistrement (id="confirmation-enregistrement")
function redirectConfirmationEnregistrement(){
    document.location.href='#confirmation-enregistrement';
}

//dans l'onglet Historique, affiche les div correspondant aux onglets Visite, Medical, Viste/Medical
function openOnglet(evt, nomOnglet) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(nomOnglet).style.display = "block";
    evt.currentTarget.className += " active";
}


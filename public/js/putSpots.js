$(document).ready(function() {

    const findMeButton = $('.find-me'),
        petFriendlyMessage = "Pet friendly!",
        lostPetMessage = "Wandering pet found";

    if (!navigator.geolocation) {

        findMeButton.addClass("disabled");
        $('.no-browser-support').addClass("visible");

    } else {

        findMeButton.on('click', function(e) {

            e.preventDefault();

            navigator.geolocation.getCurrentPosition(function(position) {

                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                $('.no-browser-support').css('display', 'none');

                waitForLatReturn('click', lat, lng);

                var map = new GMaps({
                    el: '#map',
                    lat: lat,
                    lng: lng
                });

                map.addMarker({
                    lat: lat,
                    lng: lng
                });

            });

        });

    }

    let markTerritory = document.querySelectorAll("input[name='mark-spot']"),
        latLocale = $(".latitude"),
        longLocale = $(".longitude");

    $(document).on("click", ".find-me", waitForLatReturn);

    function waitForLatReturn(e, lat, lng) {
        $('.flip-container').addClass('cliqued');
        handleSpotMarking('wait', lat, lng);
    }

    function handleSpotMarking(event, lat, lng) {
        let localeTitle = 'found-lost-pet';
        for (let i = 0; i < markTerritory.length; i++) {
            if (markTerritory[i].checked) {
                localeTitle = markTerritory[i].getAttribute('id');
                if (localeTitle === "pet-friendly") {
                    $('.location-text').addClass('visible').text(petFriendlyMessage);
                } else if (localeTitle === "lost-pet") {
                    $('.location-text').addClass('visible').text(lostPetMessage);
                } else {
                    $('.location-text').addClass('visible').text("You've marked this territory");
                }
            }
        }
        markSpot({
            title: localeTitle,
            latitude: lat.toFixed(3),
            longitude: lng.toFixed(3)
        });
    }

    function markSpot(LocData) {
        console.log(LocData);
        $.post("/api/spots", LocData)
            .then(getSpots);
    }

    function getSpots() {
        $.get("/api/spots", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                //console.log('spots');
            }
        });
    }
});
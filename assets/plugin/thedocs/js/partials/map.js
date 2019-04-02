
/**
 * Display google map.
 */

+function($){

  page.initMap = function() {

    $('[data-provide~="map"]').each(function() {
      var tag = $(this),
          setting = {
            lat: '',
            lng: '',
            zoom: 13,
            markerLat: '',
            markerLng: '',
            markerIcon: '',
            markers: '',
            style: ''
          };

      setting = $.extend(setting, page.getDataOptions(tag));

      var map = new google.maps.Map( tag[0], {
        center: {
          lat: Number(setting.lat),
          lng: Number(setting.lng)
        },
        zoom: Number(setting.zoom)
      });

      // Multiple locations
      //
      if (setting.markers != '') {

        var locations = JSON.parse("[" + setting.markers.replace(/'/g, '"') + "]"),
            infowindow = new google.maps.InfoWindow(),
            marker, i;

        for (i = 0; i < locations.length; i++) {
          var markerIcon = setting.markerIcon;

          if ( locations[i].length > 3 && locations[i][3] != '' ) {
            markerIcon = locations[i][3];
          }

          marker = new google.maps.Marker({
            position: {
              lat: Number(locations[i][0]),
              lng: Number(locations[i][1])
            },
            map: map,
            animation: google.maps.Animation.DROP,
            icon: markerIcon
          });

          if ( locations[i].length > 2 && locations[i][2] != '' ) {
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(locations[i][2]);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }

        }

      }

      // Single location
      //
      else {

        var marker = new google.maps.Marker({
          position: {
            lat: Number(setting.markerLat),
            lng: Number(setting.markerLng)
          },
          map: map,
          animation: google.maps.Animation.DROP,
          icon: setting.markerIcon
        });

        if (tag.is('[data-info]')) {
          var infowindow = new google.maps.InfoWindow({
            content: tag.dataAttr('info', '')
          });

          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        }

      }


      switch (setting.style) {
        case 'light':
          map.set('styles', [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
          break;

        case 'dark':
          map.set('styles', [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}])
          break;

        default:
          if ( Array.isArray(setting.style) ) {
            map.set('styles', setting.style);
          }
      }

    });

  }

}(jQuery);


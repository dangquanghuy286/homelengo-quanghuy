/*var infoBox_ratingType='star-rating';*/

"use strict";

// ============================================================================
// PHẦN 1: HÀM TẠO DỮ LIỆU VÀ MẢNG VỊ TRÍ CHO MAP CHÍNH
// ============================================================================

// Hàm tạo HTML cho info box hiển thị thông tin bất động sản
function locationData(mapImg, mapURL, mapTitle, mapLocation, avt, name, price) {
  return (
    "" +
    '<div class="map-listing-item">' +
    '<div class="inner-box">' +
    '<div class="infoBox-close"><i class="icon icon-close2"></i></div>' +
    '<div class="image-box">' +
    '<img src="' +
    mapImg +
    '" alt="">' +
    "</div>" +
    '<div class="content">' +
    '<p class="location">' +
    '<span class="icon icon-mapPin"></span>' + // Fixed syntax error: removed extraneous "+"
    '<span class="text">' +
    mapLocation +
    "</span>" +
    "</p>" +
    '<div class="title"><a href=' +
    mapURL +
    ">" +
    mapTitle +
    "</a></div>" +
    '<ul class="list-info">' +
    '<li><span class="icon icon-bed"></span><span class="text-variant-1">Beds</span><span class="fw-6">4</span></li>' +
    '<li><span class="icon icon-bath"></span><span class="text-variant-1">Baths:</span><span class="fw-6">2</span></li>' +
    '<li><span class="icon icon-sqft"></span><span class="text-variant-1">Sqft:</span><span class="fw-6">1150</span></li>' +
    "</ul>" +
    '<div class="box-bottom">' +
    '<div class="avt-box">' +
    '<img src="' +
    avt +
    '" alt="">' +
    name +
    "</div>" +
    '<div class="price">' +
    price +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

// Mảng dữ liệu vị trí bất động sản (mỗi phần tử: [HTML info, lat, lng, id, empty div])
var locations = [
  [
    locationData(
      "images/home/house-3.jpg",
      "property-details-v1.html",
      "Casa Lomas de Machalí Machas",
      "145 Brooklyn Ave, Califonia, New York",
      "images/avatar/avt-png10.png",
      "Arlene McCoy",
      "$7250,00"
    ),
    40.711536,
    -73.994601,
    1,
    "<div></div>",
  ],
  [
    locationData(
      "images/home/house-1.jpg",
      "property-details-v1.html",
      "Casa Lomas de Machalí Machas",
      "145 Brooklyn Ave, Califonia, New York",
      "images/avatar/avt-png10.png",
      "Arlene McCoy",
      "$7250,00"
    ),
    40.710885,
    -74.016245,
    2,
    "<div></div>",
  ],
  [
    locationData(
      "images/home/house-2.jpg",
      "property-details-v1.html",
      "Casa Lomas de Machalí Machas",
      "145 Brooklyn Ave, Califonia, New York",
      "images/avatar/avt-png10.png",
      "Arlene McCoy",
      "$7250,00"
    ),
    40.715504,
    -74.010316,
    3,
    "<div></div>",
  ],
  [
    locationData(
      "images/home/house-4.jpg",
      "property-details-v1.html",
      "Casa Lomas de Machalí Machas",
      "145 Brooklyn Ave, Califonia, New York",
      "images/avatar/avt-png10.png",
      "Arlene McCoy",
      "$7250,00"
    ),
    40.711926,
    -74.006623,
    4,
    "<div></div>",
  ],
  [
    locationData(
      "images/home/house-7.jpg",
      "property-details-v1.html",
      "Casa Lomas de Machalí Machas",
      "145 Brooklyn Ave, Califonia, New York",
      "images/avatar/avt-png10.png",
      "Arlene McCoy",
      "$7250,00"
    ),
    40.709024,
    -74.012139,
    5,
    "<div></div>",
  ],
  [
    locationData(
      "images/home/house-6.jpg",
      "property-details-v1.html",
      "Casa Lomas de Machalí Machas",
      "145 Brooklyn Ave, Califonia, New York",
      "images/avatar/avt-png10.png",
      "Arlene McCoy",
      "$7250,00"
    ),
    40.704015,
    -73.992613,
    6,
    "<div></div>",
  ],
];

// ============================================================================
// PHẦN 2: HÀM XỬ LÝ ĐÁNH GIÁ (RATING)
// ============================================================================

// Hàm xử lý đánh giá số (thêm class dựa trên giá trị data-rating)
function numericalRating(ratingElem) {
  var elements = document.querySelectorAll(ratingElem);
  elements.forEach(function (element) {
    var dataRating = parseFloat(element.dataset.rating);
    if (dataRating >= 4.0) {
      element.classList.add("high");
    } else if (dataRating >= 3.0) {
      element.classList.add("mid");
    } else if (dataRating < 3.0) {
      element.classList.add("low");
    }
  });
}
numericalRating(".numerical-rating"); // Gọi hàm khi load trang

// Hàm xử lý đánh giá sao (tạo HTML sao dựa trên data-rating)
function starRating(ratingElem) {
  var elements = document.querySelectorAll(ratingElem);
  elements.forEach(function (element) {
    var dataRating = parseFloat(element.dataset.rating);

    // Hàm phụ tạo chuỗi HTML cho 5 sao
    function starsOutput(
      firstStar,
      secondStar,
      thirdStar,
      fourthStar,
      fifthStar
    ) {
      return (
        "" +
        '<span class="' +
        firstStar +
        '"></span>' +
        '<span class="' +
        secondStar +
        '"></span>' +
        '<span class="' +
        thirdStar +
        '"></span>' +
        '<span class="' +
        fourthStar +
        '"></span>' +
        '<span class="' +
        fifthStar +
        '"></span>'
      );
    }
    var fiveStars = starsOutput("star", "star", "star", "star", "star");
    var fourHalfStars = starsOutput(
      "star",
      "star",
      "star",
      "star",
      "star half"
    );
    var fourStars = starsOutput("star", "star", "star", "star", "star empty");
    var threeHalfStars = starsOutput(
      "star",
      "star",
      "star",
      "star half",
      "star empty"
    );
    var threeStars = starsOutput(
      "star",
      "star",
      "star",
      "star empty",
      "star empty"
    );
    var twoHalfStars = starsOutput(
      "star",
      "star",
      "star half",
      "star empty",
      "star empty"
    );
    var twoStars = starsOutput(
      "star",
      "star",
      "star empty",
      "star empty",
      "star empty"
    );
    var oneHalfStar = starsOutput(
      "star",
      "star half",
      "star empty",
      "star empty",
      "star empty"
    );
    var oneStar = starsOutput(
      "star",
      "star empty",
      "star empty",
      "star empty",
      "star empty"
    );
    // Thêm HTML sao phù hợp vào element
    if (dataRating >= 4.75) {
      element.innerHTML += fiveStars;
    } else if (dataRating >= 4.25) {
      element.innerHTML += fourHalfStars;
    } else if (dataRating >= 3.75) {
      element.innerHTML += fourStars;
    } else if (dataRating >= 3.25) {
      element.innerHTML += threeHalfStars;
    } else if (dataRating >= 2.75) {
      element.innerHTML += threeStars;
    } else if (dataRating >= 2.25) {
      element.innerHTML += twoHalfStars;
    } else if (dataRating >= 1.75) {
      element.innerHTML += twoStars;
    } else if (dataRating >= 1.25) {
      element.innerHTML += oneHalfStar;
    } else if (dataRating < 1.25) {
      element.innerHTML += oneStar;
    }
  });
}
starRating(".star-rating"); // Gọi hàm khi load trang

// ============================================================================
// PHẦN 3: HÀM TẠO MAP CHÍNH (MAIN MAP)
// ============================================================================

function mainMap() {
  var ib = new InfoBox(); // Khởi tạo InfoBox cho popup

  // Lấy thuộc tính zoom và scroll từ element #map
  var mapElement = document.getElementById("map");
  var mapZoomAttr = mapElement ? mapElement.dataset.mapZoom : null;
  var mapScrollAttr = mapElement ? mapElement.dataset.mapScroll : null;
  var zoomLevel =
    mapZoomAttr !== undefined && mapZoomAttr !== null
      ? parseInt(mapZoomAttr)
      : 5;
  var scrollEnabled =
    mapScrollAttr !== undefined && mapScrollAttr !== null
      ? parseInt(mapScrollAttr)
      : false;

  // Tạo map Google với tùy chỉnh style và options
  var map = new google.maps.Map(mapElement, {
    zoom: zoomLevel,
    scrollwheel: false, // Tắt scroll mặc định
    center: new google.maps.LatLng(40.709295, -74.003099), // Trung tâm tại New York
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
    },
    mapTypeControl: false,
    scaleControl: false,
    panControl: false,
    navigationControl: false,
    streetViewControl: false,
    gestureHandling: "cooperative", // Hành vi cử chỉ
    styles: [
      // Style tùy chỉnh cho map (ẩn POI, màu đường, nước...)
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
          {
            weight: "2.00",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#9c9c9c",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off", // Ẩn điểm quan tâm
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#7b7b7b",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off", // Ẩn giao thông công cộng
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#46bcec",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c8d7d4",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#070707",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
    ],
  });

  // ============================================================================
  // PHẦN 3.1: EVENT LISTENER CHO HOVER LISTING ITEM VÀ MARKER
  // ============================================================================

  // Convert mouseover/mouseout cho .listing-item-container (hiệu ứng hover với marker)
  var listingContainers = document.querySelectorAll(".listing-item-container");
  listingContainers.forEach(function (container) {
    container.addEventListener("mouseover", function () {
      var listingAttr = parseInt(container.dataset.markerId);
      if (listingAttr !== undefined && !isNaN(listingAttr)) {
        var listing_id = listingAttr - 1;
        var marker_div = allMarkers[listing_id]
          ? allMarkers[listing_id].div
          : null;
        if (marker_div) {
          marker_div.classList.add("clicked");

          // Separate mouseout listener (xử lý rời chuột)
          var mouseoutHandler = function () {
            if (!marker_div.classList.contains("infoBox-opened")) {
              marker_div.classList.remove("clicked");
            }
            container.removeEventListener("mouseout", mouseoutHandler);
          };
          container.addEventListener("mouseout", mouseoutHandler);
        }
      }
    });
  });

  // ============================================================================
  // PHẦN 3.2: TẠO INFOBOX VÀ MARKERS CHO MAP
  // ============================================================================

  var boxText = document.createElement("div");
  boxText.className = "map-box";
  var currentInfobox;
  var boxOptions = {
    content: boxText,
    disableAutoPan: false,
    alignBottom: true,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-134, -55),
    zIndex: null,
    boxStyle: { width: "360px" },
    closeBoxMargin: "0",
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(25, 25),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false,
  };
  var markerCluster, overlay, i;
  var allMarkers = []; // Mảng lưu tất cả markers
  var clusterStyles = [{ textColor: "white", url: "", height: 50, width: 50 }];
  var markerIco = '<i class="icon icon-pin"></i>'; // Placeholder icon, as original [4] is invalid HTML

  // Vòng lặp tạo markers từ locations
  for (i = 0; i < locations.length; i++) {
    var overlaypositions = new google.maps.LatLng(
        locations[i][1],
        locations[i][2]
      ),
      overlay = new CustomMarker(
        overlaypositions,
        map,
        { marker_id: i },
        markerIco
      );
    allMarkers.push(overlay);

    // Thêm event click cho marker (mở info box)
    google.maps.event.addDomListener(
      overlay,
      "click",
      (function (overlay, i) {
        return function () {
          ib.setOptions(boxOptions);
          boxText.innerHTML = locations[i][0];
          ib.close();
          ib.open(map, overlay);
          currentInfobox = locations[i][3];
          google.maps.event.addListener(ib, "domready", function () {
            var closeButtons = document.querySelectorAll(".infoBox-close");
            closeButtons.forEach(function (btn) {
              btn.addEventListener("click", function (e) {
                e.preventDefault();
                ib.close();
                var mapMarkers = document.querySelectorAll(
                  ".map-marker-container"
                );
                mapMarkers.forEach(function (marker) {
                  marker.classList.remove("clicked", "infoBox-opened");
                });
              });
            });
          });
        };
      })(overlay, i)
    );
  }

  // Tạo cluster cho markers
  var options = {
    imagePath: "images/",
    styles: clusterStyles,
    minClusterSize: 2,
  };
  markerCluster = new MarkerClusterer(map, allMarkers, options);

  // Event resize map khi thay đổi kích thước cửa sổ
  google.maps.event.addDomListener(window, "resize", function () {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });

  // ============================================================================
  // PHẦN 3.3: CUSTOM ZOOM CONTROL VÀ EVENT KHÁC
  // ============================================================================

  // Tạo custom zoom control
  var zoomControlDiv = document.createElement("div");
  var zoomControl = new ZoomControl(zoomControlDiv, map);
  function ZoomControl(controlDiv, map) {
    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
    controlDiv.style.padding = "5px";
    controlDiv.className = "zoomControlWrapper";
    var controlWrapper = document.createElement("div");
    controlDiv.appendChild(controlWrapper);
    var zoomInButton = document.createElement("div");
    zoomInButton.className = "custom-zoom-in";
    controlWrapper.appendChild(zoomInButton);
    var zoomOutButton = document.createElement("div");
    zoomOutButton.className = "custom-zoom-out";
    controlWrapper.appendChild(zoomOutButton);
    google.maps.event.addDomListener(zoomInButton, "click", function () {
      map.setZoom(map.getZoom() + 1);
    });
    google.maps.event.addDomListener(zoomOutButton, "click", function () {
      map.setZoom(map.getZoom() - 1);
    });
  }

  // Toggle scroll wheel cho map
  var scrollEnabling = document.getElementById("scrollEnabling");
  if (scrollEnabling) {
    scrollEnabling.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("enabled");
      if (this.classList.contains("enabled")) {
        map.setOptions({ scrollwheel: true });
      } else {
        map.setOptions({ scrollwheel: false });
      }
    });
  }

  // Event geolocation (tìm vị trí hiện tại)
  var geoLocation = document.getElementById("geoLocation");
  var locationLinks = document.querySelectorAll(".input-with-icon.location a");
  if (geoLocation) {
    geoLocation.addEventListener("click", function (e) {
      e.preventDefault();
      geolocate();
    });
  }
  locationLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      geolocate();
    });
  });

  // Hàm geolocate sử dụng navigator.geolocation
  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(pos);
        map.setZoom(12);
      });
    }
  }
}

// Khởi tạo mainMap nếu element #map tồn tại
var map = document.getElementById("map");
if (typeof map != "undefined" && map != null) {
  google.maps.event.addDomListener(window, "load", mainMap);
}

// ============================================================================
// PHẦN 4: HÀM TẠO MAP CHO SINGLE LISTING
// ============================================================================

function singleListingMap() {
  var singleMapElement = document.getElementById("singleListingMap");
  if (!singleMapElement) return; // Thoát nếu không có element

  // Lấy lat/lng từ data attributes
  var myLatlng = new google.maps.LatLng({
    lng: parseFloat(singleMapElement.dataset.longitude),
    lat: parseFloat(singleMapElement.dataset.latitude),
  });

  // Tạo single map với style tương tự main map
  var single_map = new google.maps.Map(singleMapElement, {
    zoom: 16,
    center: myLatlng,
    scrollwheel: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    panControl: false,
    navigationControl: false,
    streetViewControl: false,
    styles: [
      // Style giống main map (copy từ trên)
      // ... (giống phần styles trong mainMap)
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
          {
            weight: "2.00",
          },
        ],
      },
      // ... (tất cả styles khác, để ngắn gọn ở đây)
    ],
  });

  // Event click street view
  var streetView = document.getElementById("streetView");
  if (streetView) {
    streetView.addEventListener("click", function (e) {
      e.preventDefault();
      single_map.getStreetView().setOptions({
        visible: true,
        position: myLatlng,
      });
    });
  }

  // Custom zoom control cho single map (tương tự mainMap)
  var zoomControlDiv = document.createElement("div");
  var zoomControl = new ZoomControl(zoomControlDiv, single_map);
  function ZoomControl(controlDiv, single_map) {
    zoomControlDiv.index = 1;
    single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
      zoomControlDiv
    );
    controlDiv.style.padding = "5px";
    var controlWrapper = document.createElement("div");
    controlDiv.appendChild(controlWrapper);
    var zoomInButton = document.createElement("div");
    zoomInButton.className = "custom-zoom-in";
    controlWrapper.appendChild(zoomInButton);
    var zoomOutButton = document.createElement("div");
    zoomOutButton.className = "custom-zoom-out";
    controlWrapper.appendChild(zoomOutButton);
    google.maps.event.addDomListener(zoomInButton, "click", function () {
      single_map.setZoom(single_map.getZoom() + 1);
    });
    google.maps.event.addDomListener(zoomOutButton, "click", function () {
      single_map.setZoom(single_map.getZoom() - 1);
    });
  }

  // Tạo icon cho single marker và thêm marker
  var singleMapIco =
    "<i class='" +
    (singleMapElement.dataset.mapIcon || "icon icon-pin") +
    "'></i>";
  new CustomMarker(
    myLatlng,
    single_map,
    {
      marker_id: "1",
    },
    singleMapIco
  );
}

// Khởi tạo singleListingMap nếu element tồn tại
var single_map = document.getElementById("singleListingMap");
if (typeof single_map != "undefined" && single_map != null) {
  google.maps.event.addDomListener(window, "load", singleListingMap);
}

// ============================================================================
// PHẦN 5: CLASS CUSTOM MARKER (TỪ GOOGLE OVERLAYVIEW)
// ============================================================================

// Class tùy chỉnh cho marker (3D flip effect)
function CustomMarker(latlng, map, args, markerIco) {
  this.latlng = latlng;
  this.args = args;
  this.markerIco = markerIco;
  this.setMap(map);
}
CustomMarker.prototype = new google.maps.OverlayView();

// Phương thức draw: vẽ marker lên map
CustomMarker.prototype.draw = function () {
  var self = this;
  var div = this.div;
  if (!div) {
    div = this.div = document.createElement("div");
    div.className = "map-marker-container";
    div.innerHTML =
      '<div class="marker-container">' +
      '<div class="marker-card">' +
      '<div class="front face">' +
      self.markerIco +
      "</div>" +
      '<div class="back face">' +
      self.markerIco +
      "</div>" +
      '<div class="marker-arrow"></div>' +
      "</div>" +
      "</div>";
    // Event click cho marker (mở info box)
    div.addEventListener("click", function (event) {
      var mapMarkers = document.querySelectorAll(".map-marker-container");
      mapMarkers.forEach(function (marker) {
        marker.classList.remove("clicked", "infoBox-opened");
      });
      google.maps.event.trigger(self, "click");
      this.classList.add("clicked", "infoBox-opened");
    });
    if (typeof self.args.marker_id !== "undefined") {
      div.dataset.markerId = self.args.marker_id;
    }
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }
  // Cập nhật vị trí pixel
  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
  if (point) {
    div.style.left = point.x + "px";
    div.style.top = point.y + "px";
  }
};

// Phương thức remove: xóa marker
CustomMarker.prototype.remove = function () {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
    // Note: Xóa class nếu cần (an toàn trong browser hiện đại)
    if (this.div) this.div.classList.remove("clicked");
  }
};

// Phương thức getPosition: trả về vị trí LatLng
CustomMarker.prototype.getPosition = function () {
  return this.latlng;
};

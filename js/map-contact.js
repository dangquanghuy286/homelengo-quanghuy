/*var infoBox_ratingType='star-rating';*/

"use strict";

// ============================================================================
// PHẦN 1: HÀM TẠO DỮ LIỆU VÀ MẢNG VỊ TRÍ CHO MAP LIÊN HỆ
// ============================================================================

// Hàm tạo HTML cho info box hiển thị thông tin văn phòng (hình ảnh, địa chỉ, điện thoại, email)
function locationData(img, address, phone, email) {
  return (
    "" +
    '<div class="contact-map-item">' +
    '<div class="inner-box">' +
    '<div class="infoBox-close"><i class="icon icon-close2"></i></div>' +
    '<div class="image-box">' +
    '<img src="' +
    img +
    '" alt="">' +
    "</div>" +
    '<div class="content">' +
    '<div class="title">Office address' +
    "</div>" +
    '<ul class="list-info">' +
    '<li><span class="icon icon-map-trifold"></span>' +
    address +
    "</li>" +
    '<li><span class="icon icon-phone-line"></span>' +
    phone +
    "</li>" +
    '<li><span class="icon icon-mail-line"></span>' +
    email +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

// Mảng dữ liệu vị trí văn phòng (chỉ 1 vị trí: [HTML info, lat, lng, id, empty div])
var locations = [
  [
    locationData(
      "images/banner/contact.jpg",
      "101 E 129th St, East Chicago, IN 46312, US",
      "1-333-345-6868",
      "themesflat@gmail.com"
    ),
    40.709327,
    -74.004815,
    1,
    "<div></div>",
  ],
];

// ============================================================================
// PHẦN 2: HÀM XỬ LÝ ĐÁNH GIÁ (RATING) - GIỮ NGUYÊN NHƯ MAP CHÍNH
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
// PHẦN 3: HÀM TẠO MAP LIÊN HỆ (CONTACT MAP)
// ============================================================================

function mainMap() {
  var ib = new InfoBox(); // Khởi tạo InfoBox cho popup

  // Lấy thuộc tính zoom và scroll từ element #map-contact
  var mapElement = document.getElementById("map-contact");
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

  // Tạo map Google với tùy chỉnh style và options (tương tự map chính)
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
  // PHẦN 3.1: EVENT LISTENER CHO HOVER LISTING ITEM VÀ MARKER (CÓ THỂ KHÔNG ÁP DỤNG CHO CONTACT)
  // ============================================================================

  // Convert mouseover/mouseout cho .listing-item-container (nếu có, hiệu ứng hover với marker)
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
  // PHẦN 3.2: TẠO INFOBOX VÀ MARKERS CHO MAP LIÊN HỆ
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
  var allMarkers = []; // Mảng lưu tất cả markers (ở đây chỉ 1)
  var clusterStyles = [{ textColor: "white", url: "", height: 50, width: 50 }];
  var markerIco = '<i class="icon icon-pin"></i>'; // Placeholder icon, vì locations[i][4] là "<div></div>"

  // Vòng lặp tạo markers từ locations (chỉ 1 marker)
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

  // Tạo cluster cho markers (với 1 marker, cluster không áp dụng nhiều)
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

  // Toggle scroll wheel cho map (nếu có element #scrollEnabling)
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

  // Event geolocation (tìm vị trí hiện tại, nếu có element #geoLocation hoặc .input-with-icon.location a)
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

// Khởi tạo mainMap nếu element #map-contact tồn tại
var map = document.getElementById("map-contact");
if (typeof map != "undefined" && map != null) {
  google.maps.event.addDomListener(window, "load", mainMap);
}

// ============================================================================
// PHẦN 4: CLASS CUSTOM MARKER (TỪ GOOGLE OVERLAYVIEW) - GIỮ NGUYÊN NHƯ MAP CHÍNH
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
    // Note: Xóa class nếu cần (an toàn trong browser hiện đại, dù div đã null)
    if (this.div) this.div.classList.remove("clicked");
  }
};

// Phương thức getPosition: trả về vị trí LatLng
CustomMarker.prototype.getPosition = function () {
  return this.latlng;
};

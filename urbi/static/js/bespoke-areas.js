// static/js/bespoke-areas.js

/* global L, scrollama, turf */

(function () {
  const radii = [0, 100, 200, 300, 5000, 10000];

  let map;
  let geojsonLayer;
  let centralCentroid;
  let statsByRadius = {};
  let circleLayer = null;

  const steps = document.querySelectorAll(".step");
  let scroller = null;

  // Track active step and user interaction
  let activeStepIndex = null;
  let userMovedMap = false;
  let programmaticMove = false;

  // Used to move the map above each step on mobile / portrait screens
  let mapColumn = null;
  let mapHomeMarker = null;

  if (typeof scrollama === "function") {
    scroller = scrollama();
  } else {
    console.error("Scrollama library not loaded – scrollytelling disabled.");
  }

  function isVerticalScreen() {
    return window.matchMedia("(max-width: 800px), (orientation: portrait)").matches;
  }

  function setupMobileMapMovement() {
    mapColumn = document.getElementById("map-column");

    if (!mapColumn || mapHomeMarker) return;

    mapHomeMarker = document.createComment("original map-column position");
    mapColumn.parentNode.insertBefore(mapHomeMarker, mapColumn);
  }

  function moveMapForStep(index) {
    if (!mapColumn || !mapHomeMarker) return;

    const activeStep = steps[index];
    if (!activeStep) return;

    if (isVerticalScreen()) {
      activeStep.parentNode.insertBefore(mapColumn, activeStep);
    } else {
      mapHomeMarker.parentNode.insertBefore(mapColumn, mapHomeMarker.nextSibling);
    }

    if (map && typeof map.invalidateSize === "function") {
      setTimeout(function () {
        map.invalidateSize();
      }, 150);
    }

    if (scroller && typeof scroller.resize === "function") {
      setTimeout(function () {
        scroller.resize();
      }, 150);
    }
  }

  function getActiveStepIndex() {
    const activeIndex = Array.from(steps).findIndex(function (step) {
      return step.classList.contains("is-active");
    });

    return activeIndex >= 0 ? activeIndex : 0;
  }

  function formatPct(x) {
    if (x == null || isNaN(x)) return "n/a";
    return (x * 100).toFixed(1) + " %";
  }

  function formatNumber(x) {
    if (x == null || isNaN(x)) return "n/a";
    return x.toLocaleString("nl-NL");
  }

  function initMap() {
    setupMobileMapMovement();

    map = L.map("map", {
      zoomControl: false
    });

    // Expose map globally so your layout can call window.map.invalidateSize()
    window.map = map;

    // Detect genuine user interaction.
    // Programmatic flyTo() should not count as user movement.
    map.on("dragstart zoomstart", function () {
      if (!programmaticMove) {
        userMovedMap = true;
      }
    });

    L.tileLayer(
      "https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
      {
        attribution: "&copy; CartoDB"
      }
    ).addTo(map);

    map.attributionControl.addAttribution(
      'Source: Public data from <a href="https://www.cbs.nl" target="_blank">CBS</a> (2024)'
    );

    fetch("/data/cbs_bespoke_example.geojson")
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        geojsonLayer = L.geoJSON(data, {
          style: baseStyle,
          onEachFeature: onEachFeature
        }).addTo(map);

        // Initial map view
        map.setView([52.37, 4.89], 14);

        // Compute central centroid in WGS84
        const central = data.features.find(function (f) {
          return f.properties.is_central === true;
        });

        if (central) {
          centralCentroid = turf.center(central).geometry.coordinates; // [lon, lat]
        }

        return fetch("/data/cbs_bespoke_stats.json");
      })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (statsArray) {
        statsArray.forEach(function (row) {
          statsByRadius[row.radius_m] = row;
        });

        initScroller();
      })
      .catch(function (err) {
        console.error("Error loading data:", err);
      });
  }

  function baseStyle(feature) {
    const props = feature.properties;
    const isCentral = !!props.is_central;
    const share = props.nonnative_share;

    let fillColor = "#e5e7eb";

    if (share != null) {
      if (share < 0.2) fillColor = "#fad1d1ff";
      else if (share < 0.4) fillColor = "#e76e6eff";
      else if (share < 0.6) fillColor = "#d33434ff";
      else if (share < 0.8) fillColor = "#b91010ff";
      else fillColor = "#780404ff";
    }

    return {
      color: isCentral ? "#111827" : "#ffffff",
      weight: isCentral ? 2 : 0.3,
      fillColor: fillColor,
      fillOpacity: isCentral ? 0.9 : 0.75
    };
  }

  function highlightWithinRadius(radius) {
    if (!geojsonLayer) return;

    geojsonLayer.setStyle(function (feature) {
      const props = feature.properties;
      const distance = props.dist_m;
      const isCentral = !!props.is_central;
      const share = props.nonnative_share;

      let opacity = 0.05;
      let weight = 0.1;

      if (distance <= radius) {
        opacity = 0.8;
        weight = isCentral ? 2 : 0.4;
      }

      let fillColor = "#e5e7eb";

      if (share != null) {
        if (share < 0.2) fillColor = "#fad1d1ff";
        else if (share < 0.4) fillColor = "#e76e6eff";
        else if (share < 0.6) fillColor = "#d33434ff";
        else if (share < 0.8) fillColor = "#b91010ff";
        else fillColor = "#780404ff";
      }

      return {
        color: isCentral ? "#111827" : "#ffffff",
        weight: weight,
        fillColor: fillColor,
        fillOpacity: opacity
      };
    });

    drawCircle(radius);
  }

  function drawCircle(radius) {
    if (!centralCentroid || !map) return;

    if (circleLayer) {
      map.removeLayer(circleLayer);
    }

    const latlng = [centralCentroid[1], centralCentroid[0]];

    circleLayer = L.circle(latlng, {
      radius: radius,
      fillOpacity: 0,
      color: "#111827",
      weight: 1.5,
      dashArray: "4 4",
      interactive: false
    });

    circleLayer.addTo(map);
  }

  function onEachFeature(feature, layer) {
    const p = feature.properties;
    const share = p.nonnative_share;
    const shareText = share != null ? (share * 100).toFixed(1) + "%" : "n/a";

    const popup = `
      <strong>Grid cell</strong><br/>
      Total population: ${formatNumber(p.total_pop)}<br/>
      Non-natives: ${formatNumber(p.nonnative_cnt)}<br/>
      Share non-natives: ${shareText}
    `;

    layer.bindPopup(popup);
  }

  function updateStats(stepIndex) {
    const radius = radii[stepIndex];

    const statsDiv = document.querySelector(`#stats-step-${stepIndex + 1}`);
    if (!statsDiv) return;

    const stats = statsByRadius[radius];

    if (!stats) {
      statsDiv.innerHTML = "No stats available.";
      return;
    }

    statsDiv.innerHTML = `
      <div>Radius: <strong>${radius} m</strong></div>
      <div>Cells included: <strong>${stats.cells_included}</strong></div>
      <div>Total population: <strong>${formatNumber(stats.total_pop)}</strong></div>
      <div>Non-natives: <strong>${formatNumber(stats.nonnative_count)}</strong></div>
      <div>Share non-natives: <strong>${formatPct(stats.nonnative_share)}</strong></div>
    `;
  }

  function autoZoomToStep(index) {
    if (!centralCentroid || !map) return;

    const centerLatLng = [centralCentroid[1], centralCentroid[0]];

    let targetZoom = 14;

    if (index === 4 || index === 5) {
      targetZoom = 11;
    }

    programmaticMove = true;

    map.flyTo(centerLatLng, targetZoom, {
      animate: true,
      duration: 0.6
    });

    setTimeout(function () {
      programmaticMove = false;
    }, 900);
  }

  function setActiveStep(index) {
    const isSameStep = activeStepIndex === index;

    // On mobile, physically move the map above the active step.
    // On desktop, keep the map in its original left column.
    moveMapForStep(index);

    // If Scrollama fires again for the same step, do not reset the map.
    if (isSameStep) {
      return;
    }

    activeStepIndex = index;

    steps.forEach(function (step, i) {
      if (i === index) {
        step.classList.add("is-active");
      } else {
        step.classList.remove("is-active");
      }
    });

    const radius = radii[index];

    if (index === 0) {
      highlightWithinRadius(0);
    } else {
      highlightWithinRadius(radius);
    }

    updateStats(index);

    /*
     * Auto-zoom only when entering a new step.
     * After that, the user can freely pan/zoom without the map snapping back.
     */
    userMovedMap = false;
    autoZoomToStep(index);
  }

  function initScroller() {
    if (!scroller) return;

    scroller
      .setup({
        step: ".step",
        offset: 0.6,
        debug: false
      })
      .onStepEnter(function (response) {
        setActiveStep(response.index);
      });

    window.addEventListener("resize", function () {
      moveMapForStep(getActiveStepIndex());

      if (scroller && typeof scroller.resize === "function") {
        scroller.resize();
      }

      if (map && typeof map.invalidateSize === "function") {
        setTimeout(function () {
          map.invalidateSize();
        }, 150);
      }
    });

    setActiveStep(0);
  }

  document.addEventListener("DOMContentLoaded", initMap);
})();
$(function () {
  /* For sidebar purposes */
  var sidebar = $("<div />").css({
    position: "fixed",
    top: "70px",
    right: "0",
    background: "#fff",
    "border-radius": "5px 0px 0px 5px",
    padding: "10px 15px",
    "font-size": "16px",
    "z-index": "99999",
    cursor: "pointer",
    color: "#3c8dbc",
    "box-shadow": "0 1px 3px rgba(0,0,0,0.1)"
  }).html("<i class='fa fa-music'></i>").addClass("no-print");

  var sidebar_settings = $("<div />").css({
    "padding": "10px",
    position: "fixed",
    top: "70px",
    right: "-450px",
    background: "#fff",
    border: "0px solid #ddd",
    "width": "450px",
    "z-index": "99999",
    "box-shadow": "0 1px 3px rgba(0,0,0,0.1)"
  }).addClass("no-print");
  var music_list = $("<ul />", {"class": 'list-unstyled'});
  var music_playlist =
          $("<li />", {style: "float:left; width: 50%; padding: 5px;"})
          .append("<a href='javascript:void(0);' onclick='select_music_provider(\"playlist\")' style='display: block; box-shadow: -1px 1px 2px rgba(0,0,0,0.0);' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 10px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 40px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 40px; background: #f4f5f7;'></span></div>"
                  + "<p class='text-center'>Playlist</p>"
                  + "</a>");
  music_list.append(music_playlist);
  var music_pandora =
          $("<li />", {style: "float:left; width: 50%; padding: 5px;"})
          .append("<a href='javascript:void(0);' onclick='select_music_provider(\"pandora\")' style='display: block; box-shadow: -1px 1px 2px rgba(0,0,0,0.0);' class='clearfix full-opacity-hover'>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 10px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 40px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 40px; background: #f4f5f7;'></span></div>"
                  + "<p class='text-center'>Pandora</p>"
                  + "</a>");
  music_list.append(music_pandora);
  var music_spotify =
          $("<li />", {style: "float:left; width: 50%; padding: 5px;"})
          .append("<a href='javascript:void(0);' onclick='select_music_provider(\"spotify\")' style='display: block; box-shadow: -1px 1px 2px rgba(0,0,0,0.0);' class='clearfix full-opacity-hover'>"
                  + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 10px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 10px; background: #fefefe;'></span></div>"
                  + "<div><span style='display:block; width: 20%; float: left; height: 40px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 40px; background: #f4f5f7;'></span></div>"
                  + "<p class='text-center'>Spotify</p>"
                  + "</a>");
  music_list.append(music_spotify);

  sidebar_settings.append("<h4 class='text-light-blue' style='margin: 0 0 5px 0; border-bottom: 1px solid #ddd; padding-bottom: 15px;'>Music</h4>");
  sidebar_settings.append(music_list);

  sidebar.click(function () {
    if (!$(this).hasClass("open")) {
      $(this).animate({"right": "450px"});
      sidebar_settings.animate({"right": "0"});
      $(this).addClass("open");
    } else {
      $(this).animate({"right": "0"});
      sidebar_settings.animate({"right": "-450px"});
      $(this).removeClass("open");
    }
  });

  $("body").append(sidebar);
  $("body").append(sidebar_settings);

});


function select_music_provider(provider_name) {  
  console.log(provider_name);
}


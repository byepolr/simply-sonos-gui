//setup LocalStorage
selectedDevice = null;

SonosDevices = [];
if(typeof require === "function"){
  require("/Users/jasonjones/Projects/NodeSonos/lib/commands");
  var Network = require("/Users/jasonjones/Projects/NodeSonos/lib/network");
  var network = new Network();
  console.log("Discovery mode");
  network.udp.discover({"timeout":5000});

  network.udp.on("found-device", function(device){
    console.log("Found New Device: "+device);
    SonosDevices.push(device);
    updateDeviceListing();
  });

  network.udp.on("error", function(error){
    console.log(error);
  });
}

function updateDeviceListing(){
  console.log("updating listings");
  var html = [];
  SonosDevices.forEach(function(device, index){
    if(selectedDevice == null) { selectDevice(index); }
    html.push('<li><a onclick="selectDevice('+index+')"><i class="fa fa-circle-o"></i> '+device.zoneName+'</a></li>');
  });
  $("#device-listing").html(html.join(""));
}updateDeviceListing();

function selectDevice(deviceIndex){
  selectedDevice = SonosDevices[deviceIndex];
  refreshAllData(selectedDevice);
}


function updateTrackInfo(device){
  if(device && device.ipAddress != null){
    this.getCurrentTrack.send({"ipAddress": device.ipAddress}, function(error, track){
      if(error){
        console.log(error);
      }else{
        albumArtUrl = track.details.metaData.albumArt
        if(typeof albumArtUrl === "string" && albumArtUrl.indexOf("http://")){
          albumArtUrl = "http://"+device.ipAddress+":1400"+track.details.metaData.albumArt;
        }

        $(".current-artist").html(track.details.metaData.artist);
        $(".current-song").html(track.details.metaData.title);
        $(".current-album").html(track.details.metaData.album);
        $(".current-album-art").attr("src", albumArtUrl);
      }
    });
  }
}

function updateDeviceDisplay(device){
  $("#zone-name").html(device.zoneName);
  $("#device-display-title").html(device.zoneName+" Queue");
}

function updateQueue(device){
  this.getQueue.send({"ipAddress": device.ipAddress}, function(error, result){
    if(error){
      console.log(error);
    }else{

      var html = ['\
              <tr>\
                <th></th>\
                <th>Title</th>\
                <th>Artist</th>\
                <th>Album</th>\
                <th>length</th>\
              </tr>\
              '];


      result.tracks.forEach(function(track, index){
        var imageArt = "http://"+device.ipAddress+":1400"+track.details.metaData.albumArt;
        var songTitle = track.details.metaData.title;
        var artist = track.details.metaData.artist;
        var album = track.details.metaData.album;
        html.push('\
              <tr>\
                <td><img src="'+imageArt+'" width="25" class="img-circle"/></td>\
                <td>"'+songTitle+'"</td>\
                <td>"'+artist+'"</td>\
                <td>"'+album+'"</td>\
                <td>3:25</td>\
              </tr>\
              ');
      });

      $("#device-queue").html('<table class="table table-hover">'+html.join("")+'</table>');
    }
  });
}

var isPlaying = true;
function playPauseSong(){
  var device = selectedDevice;
  if(device && device.ipAddress != null){
    if(isPlaying){
      this.pause.send({"ipAddress": device.ipAddress}, callback);
    }else{
      this.play.send({"ipAddress": device.ipAddress}, callback);
    }
  
    function callback(error){
      if(error){
        console.log(error);
      }else{
        isPlaying = (isPlaying) ? false : true;
        updateTrackInfo(device);
        updateQueue(device);
      }
    }
  }
}

function playNextSong(){
  var device = selectedDevice;
  if(device && device.ipAddress != null){
    this.nextSong.send({"ipAddress": device.ipAddress}, function(error){
    if(error){
      console.log(error);
    }else{
      updateTrackInfo(device);
      updateQueue(device);
    }
  });
  }
}

function playPrevSong(){
  var device = selectedDevice;
  console.log("not implemented yet");
  if(device && device.ipAddress != null){
    
  }
}

function refreshAllData(device){
    var device = device || selectedDevice;
    if(device && device.ipAddress != null){
      updateTrackInfo(device);
      updateDeviceDisplay(device);
      updateQueue(device);
      updateVolumeControl(device);
    }
}

function updateVolumeControl(device){
  device = device || selectedDevice
  if(device && device.ipAddress != null){
    getVolume.send({"ipAddress":device.ipAddress}, function(error, result){
      var level = (Number(result.volume) > 0) ? Number(result.volume) : 0;
      $("#volume_slider").ionRangeSlider("update", {"from":level});
    });
  }
}

setInterval(function(){
  refreshAllData(selectedDevice);
}, 7777);


$("#volume_slider").ionRangeSlider({
  min: 0,
  max: 100,
  type: 'single',
  step: 1,
  from: 0,
  prettify: true,
  hasGrid: false,
  hideMinMax: true,
  onChange: function(obj){
    addToQueueAndProcess(obj);
  }
});

//we only want 1 additional item to be on the queue, so really we are going to replace the old one with the new on
var processingData = null;
var isProcessing = false;
function addToQueueAndProcess(data){
  processingData = data || processingData;
  if(!isProcessing && processingData != null && selectedDevice && selectedDevice.ipAddress != null){
    isProcessing = true;
    var level = processingData.fromNumber;
    processingData = null;
    setVolume.send({"ipAddress":selectedDevice.ipAddress, "level":level}, function(error){
      isProcessing = false;
      if(error){
        console.log(error);
      }
      addToQueueAndProcess();
    });
  }
}

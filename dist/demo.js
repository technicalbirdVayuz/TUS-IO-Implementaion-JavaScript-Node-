// /* global tus */
// /* eslint no-console: 0 */
// var upload          = null;
// var uploadIsRunning = false;
// var toggleBtn       = document.querySelector("#toggle-btn");
// var resumeCheckbox  = document.querySelector("#resume");
// var input           = document.querySelector("input[type=file]");
// var progress        = document.querySelector(".progress");
// var progressBar     = progress.querySelector(".bar");
// var alertBox        = document.querySelector("#support-alert");
// var uploadList      = document.querySelector("#upload-list");
// var chunkInput      = document.querySelector("#chunksize");
// var endpointInput   = document.querySelector("#endpoint");

// if (!tus.isSupported) {
//   alertBox.classList.remove("hidden");
// }

// if (!toggleBtn) {
//   throw new Error("Toggle button not found on this page. Aborting upload-demo. ");
// }

// toggleBtn.addEventListener("click", function (e) {
//   e.preventDefault();

//   if (upload) {
//     if (uploadIsRunning) {
//       upload.abort();
//       toggleBtn.textContent = "resume upload";
//       uploadIsRunning = false;
//     } else {
//       upload.start();
//       toggleBtn.textContent = "pause upload";
//       uploadIsRunning = true;
//     }
//   } else {
//     if (input.files.length > 0) {
//       startUpload();
//     } else {
//       input.click();
//     }
//   }
// });

// input.addEventListener("change", startUpload);

// function startUpload() {
//   var file = input.files[0];
//   // Only continue if a file has actually been selected.
//   // IE will trigger a change event even if we reset the input element
//   // using reset() and we do not want to blow up later.
//   if (!file) {
//     return;
//   }

//   var endpoint = endpointInput.value;
//   var chunkSize = parseInt(chunkInput.value, 10);
//   if (isNaN(chunkSize)) {
//     chunkSize = Infinity;
//   }

//   toggleBtn.textContent = "pause upload";

//   var options = {
//     endpoint: endpoint,
//     resume  : !resumeCheckbox.checked,
//     chunkSize: chunkSize,
//     retryDelays: [0, 1000, 3000, 5000],
//     metadata: {
//       filename: file.name,
//       filetype: file.type
//     },
//     onError : function (error) {
//       if (error.originalRequest) {
//         if (window.confirm("Failed because: " + error + "\nDo you want to retry?")) {
//           upload.start();
//           uploadIsRunning = true;
//           return;
//         }
//       } else {
//         window.alert("Failed because: " + error);
//       }

//       reset();
//     },
//     onProgress: function (bytesUploaded, bytesTotal) {
//       var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
//       progressBar.style.width = percentage + "%";
//       console.log(bytesUploaded, bytesTotal, percentage + "%");
//     },
//     onSuccess: function () {
//       var anchor = document.createElement("a");
//       anchor.textContent = "Download " + upload.file.name + " (" + upload.file.size + " bytes)";
//       anchor.href = upload.url;
//       anchor.className = "btn btn-success";
//       uploadList.appendChild(anchor);

//       reset();
//     }
//   };

//   upload = new tus.Upload(file, options);
//   upload.start();
//   uploadIsRunning = true;
// }

// function reset() {
//   input.value = "";
//   toggleBtn.textContent = "start upload";
//   upload = null;
//   uploadIsRunning = false;
// }
/* global tus */
/* eslint no-console: 0 */

var upload = null;
var alertEl = document.querySelector('.js-support-alert');
var endpointInputEl = document.querySelector('.js-upload-endpoint');
var resumeEndpointInputEl = document.querySelector('.js-resume-endpoint');
var chunkInputEl = document.querySelector('.js-chunk-size');
var stopBtnEl = document.querySelector('.js-stop-button');
var resumeBtnEl = document.querySelector('.js-resume-button');
var inputEl = document.querySelector('input[type=file]');
var progressBar = document.querySelector('.progress-bar');

// var input           = document.querySelector("input[type=file]");

if (!tus.isSupported) {
    alertEl.classList.toggle('hidden');
}
/*
stopBtnEl.addEventListener('click', function(e) {
    e.preventDefault();

    if (upload) {
        upload.abort();
        resumeBtnEl.classList.remove('disabled');
        stopBtnEl.classList.add('disabled');
    }
});

resumeBtnEl.addEventListener('click', function(e) {
    e.preventDefault();
    if (upload) {
        resumeBtnEl.classList.add('disabled');
        stopBtnEl.classList.remove('disabled');
        upload._resumeUpload();
    }
});*/

function reset() {
    inputEl.value = '';
    stopBtnEl.classList.add('disabled');
}

inputEl.addEventListener('change', function(e) {
    var file = e.target.files[0];
    // Only continue if a file has actually been selected.
    // IE will trigger a change event if we reset the input element
    // inside reset() and we do not want to blow up later.
/*  var upload = new tus.Upload(file, {
        endpoint: endpointInputEl.value,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
            filename: file.name,
            filetype: file.type,
            user_id:"customized"
        },
        onError: function(error) {
            console.log("Failed because: " + error)
        },
        onProgress: function(bytesUploaded, bytesTotal) {
            var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
            console.log(bytesUploaded, bytesTotal, percentage + "%")
        },
        onSuccess: function() {
            console.log("Download %s from %s", upload.file.name, upload.url)
        }
    })

    // Start the upload
    upload.start()*/



        if (!file) {
        return;
    }

    console.log('selected file', file);

    stopBtnEl.classList.remove('disabled');
    var chunkSize = parseInt(chunkInputEl.value, 10);
    if (isNaN(chunkSize)) {
        chunkSize = Infinity;
    }

    var options = {
        endpoint: endpointInputEl.value,
        chunkSize: chunkSize,
        metadata: {
            filename: file.name,
            user_id: "Ankit",
        },
         header: {
            "key":"value"
        },
        beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
        onError: function(error) {
            if (error.originalRequest) {
                if (confirm('Failed because: ' + error + '\nDo you want to retry?')) {
                    options.resume = false;
                    options.uploadUrl = upload.url;
                    upload = new tus.Upload(file, options);
                    upload.start();
                    return;
                }
            } else {
                alert('Failed because: ' + error);
            }

            reset();
        },
        onProgress: function(bytesUploaded, bytesTotal) {
            var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
            progressBar.style.width = percentage + '%';
            progressBar.textContent = percentage + '%';
            progressBar.setAttribute('aria-valuenow', percentage);
            console.log(bytesUploaded, bytesTotal, percentage + '%');
        },
        onSuccess: function(data) {
            // console.log(data);
              var anchor = document.createElement("a");
      anchor.textContent = "Download " +upload.url + upload.file.name + " (" + upload.file.size + " bytes)";
      anchor.href = upload.url;
      anchor.className = "btn btn-success";
      uploadList.appendChild(anchor);
        reset();
        },
    };

    if (resumeEndpointInputEl.value !== '') {
        options.uploadUrl = resumeEndpointInputEl.value;
        options.user = "resumeEndpointInputEl";
    }

    upload = new tus.Upload(file, options);
    upload.start();
});


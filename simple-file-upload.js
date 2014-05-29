function uploadFile(url, file, callback) {
    if (!file)
        return false;
    var data = new FormData();
    data.append('file', file);
    var xhr = new XMLHttpRequest();
    xhr.file = file;
    if (xhr.upload) {
        xhr.upload.onprogress = function(e) {
            var done = e.position || e.loaded, total = e.totalSize || e.total;
            $("progress").show();
            $("progress").attr("value", (Math.floor(done / total * 1000) / 10));
            console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done / total * 1000) / 10) + '%');
        };
    }
    xhr.onreadystatechange = function(e) {
        if (4 == this.readyState) {
            $("progress").hide();
            //console.log(['xhr upload complete', e]);
            try {
                console.log(this.responseText);
                var data = JSON.parse(this.responseText);
                if (callback)
                    callback(data);
            } catch (err) {
                console.log(err);
                alert("Error uploading the file");
                return false;
            }
        }
    };
    xhr.open('post', url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);
}
var ProfileImageModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },
    componentDidMount: function(){
      this.setupImageCropping();
    },
    componentDidMount: function(){
      this.setupImageCropping();
    },
    setupImageCropping: function() {
      var el = $('.crop-area')[0];

      var vanilla = new Croppie(el, {
          // enforceBoundary: false,
          viewport: { width: 200, height: 200 },
          boundary: { width: 300, height: 300 },
          showZoomer: false,
          // enableResize: true,
          enableOrientation: true
      });
      vanilla.bind({
          url: this.props.imgSrc,
      });
      this.vanilla = vanilla;
      // vanilla.result('blob').then(function(blob) {
      //     // do something with cropped blob
      //     console.log("fadsfadfadfasfadsfa");
      // });
      
      // vanilla.result('blob').then(function(blob) {
      //     // do something with cropped blob
      // });
      
      // resize.croppie('bind');
      

     
      // setTimeout(function(){
        
      // }, 200);

    },
    resultantImage: function() {
      // this.vanilla.result('blob').then(function(blob) {
      //     // do something with cropped blob
      //     debugger;
      //     console.log("fadsfadfadfasfadsfa");
      // });

      // debugger;
      // this.vanilla.croppie('result', {
      //     type: 'canvas',
      //     size: 'viewport'
      // }).then(function (resp) {
      //     debugger;
      //     $('.crop-area').attr('src', resp);
      // });
      var _this = this;
      // debugger;
      // this.vanilla.result('blob').then(function(blob) {
      //     // do something with cropped blob
      //     debugger;
      //     _this.props.updateCroppedImage(resp);
      // });
      var reader = new FileReader();
      reader.onload = function (e) {
        $uploadCrop.croppie('bind', {
          url: e.target.result
        }).then(function(){
          //console.log('jQuery bind complete');
        });
      }
      this.vanilla.result('base64','original').then(function (resp) {
        debugger;
          console.log(resp);
          $(".abcd").src(resp).show();
          // window.opener.postMessage(resp, '*');
        _this.props.updateCroppedImage(resp);
          // $('.crop-area').attr('src', resp);
              // var blobBin = atob(resp.split(',')[1]);
              // var array = [];
              // for (var i = 0; i < blobBin.length; i++) {
              //     array.push(blobBin.charCodeAt(i));
              // }
              // debugger;
              // var file = new Blob([new Uint8Array(array)], {type: 'image/png'});
              // var reader = new FileReader();
              // var url = reader.readAsDataURL(file);
              // console.log(reader.result);
              //How to assign this to image
      });

      // $uploadCrop.croppie('result', {
      //     type: 'canvas',
      //     size: 'viewport'
      // }).then(function (resp) {
      //     var blobBin = atob(resp.split(',')[1]);
      //     var array = [];
      //     for (var i = 0; i < blobBin.length; i++) {
      //         array.push(blobBin.charCodeAt(i));
      //     }
      //     var file = new Blob([new Uint8Array(array)], {type: 'image/png'});
      //     //How to assign this to image
      // }); 
    },
    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },
    handleClick: function(e){
      this.props.handleClick();
    },
    handleDelete: function() {
      this.props.handleDelete();
    },
    render: function() {
      return (
        <div className="modal fade" id="profileImageModal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Upload Image</h4>
              </div>
              <div className="modal-body">
              <img className="abcd" hidden src=''/>
                <div className="modal-profile-image">
                  <img className="crop-area image-responsive" src={this.props.imgSrc}/>
                </div>
                <div className="profile-buttons-holder" data-header-id={this.props.headerId}>
                 
                  <div className="row nav-row">
                    <button className="btn btn-primary" onClick={this.resultantImage}>Image</button>
                    <button className="btn btn-primary" onClick={this.handleClick}>Upload Image</button>
                    <button className="btn btn-danger" onClick={this.handleDelete}>Delete Image</button>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="pagination-centered">
                    <p>Disclaimer. Keep in mind that in some US states, having a photo on your resume is forbidden.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
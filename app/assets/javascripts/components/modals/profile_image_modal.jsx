var ProfileImageModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true, imgSrc: this.props.imgSrc };
    },
    componentDidMount: function(){
      var _this = this;
      // Initialize Croppie after modal is shown otherwise zoom value disturbed
      $("#profileImageModal").on('shown.bs.modal', function () {
        // if vanilla already exist than duplicate images will create...
        if (!_this.vanilla) {
          _this.setupImageCropping();
        }
       });
    },

    setupImageCropping: function() {
      var el = $('#crop-area')[0];
      
      var vanilla = new Croppie(el, {
          enforceBoundary: false,
          // enableExif: false,
          viewport: { width: 200, height: 200 },
          boundary: { width: 300, height: 300 },
          enableZoom: true,
          showZoomer: false,
          enableResize: true,
          enableOrientation: true
      });
      // binding vanilla to the componentDidUpdate
      this.vanilla = vanilla;
    },

    resultantImage: function() {
      var _this = this;
      this.vanilla.result('base64','original').then(function (resp) {
        _this.props.updateCroppedImage(resp);
        _this.setState({
            imgSrc: [resp]
        });
      });
      $("#profileImageModal").modal('hide');
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    handleClick: function(e){
      $('#img_selector').show().focus().trigger('click');
    },

    handleDelete: function() {
      // first need to update canvas bind url otherwise state will not change...
      this.vanilla.bind({url: "/images/default_avatar.png"});
      this.setState({
          imgSrc: "/images/default_avatar.png"
      })
      this.props.handleDelete();
    },

    _onChange: function(e){
      // Assuming only image
      var _this =  this;
      var file = this.refs.file.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

       reader.onloadend = function (e) {
        // first need to update canvas bind url other wise state will not change...
          _this.vanilla.bind({url: reader.result});
          _this.setState({
              imgSrc: [reader.result]
          });
          _this.props.saveImage(reader.result);
          // $("#profileImageModal").modal('hide');
        }.bind(this);
    },

    render: function() {
      return (
        <div className="modal fade" id="profileImageModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Upload Image</h4>
                <form hidden>
                  <input 
                    ref="file"
                    id="img_selector"
                    type="file" 
                    name="user[image]"
                    multiple="true"
                    onChange={this._onChange}/>
                 </form>
              </div>
              <div className="modal-body">
                <div>
                  <img id="crop-area" className="image-responsive" src={this.state.imgSrc}/>
                </div>
                <div className="profile-buttons-holder" data-header-id={this.props.headerId}>
                  <button className="btn btn-primary" onClick={this.resultantImage}>Select</button>
                  <button className="btn btn-primary" onClick={this.handleClick}>Upload Image</button>
                  <button className="btn btn-danger" onClick={this.handleDelete}>Delete Image</button>
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
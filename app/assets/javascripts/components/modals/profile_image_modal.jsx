var ProfileImageModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },
    componentDidMount: function(){
      var _this = this;
      // Initialize Croppie after modal is shown otherwise zoom value disturbed
      $("#profileImageModal").on('shown.bs.modal', function () {
          _this.setupImageCropping();
       });
    },
    componentDidUpdate: function(){
      // this.setupImageCropping();
    },
    setupImageCropping: function() {
      var el = $('.crop-area')[0];
      
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
      });
      $("#profileImageModal").modal('hide');
    },
    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      debugger;
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
                <div className="modal-profile-image">
                  <img className="crop-area image-responsive" src={this.props.imgSrc}/>
                </div>
                <div className="profile-buttons-holder" data-header-id={this.props.headerId}>
                 
                  <div className="row nav-row">
                    <button className="btn btn-primary" onClick={this.resultantImage}>Select</button>
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
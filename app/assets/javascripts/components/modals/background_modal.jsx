var BackgroundModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    changeBackground: function(e){
      this.props.handleBackground(e);
    },

    render: function() {
      var BackgroundImages = this.props.resumeStyle.available_background_images;
      var bg_img = this.props.resumeStyle.background_img;
      return (
        <div className="modal fade" id="backgroundModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Choose a Background</h4>
              </div>
              <div className="modal-body">
                <div className="background-reorder-page">
                  <div className="bg-box">
                    {
                      
                      BackgroundImages.map((img, index) => (
                        bg_img === img
                          ? <p key={index}><img src={"/assets/"+img} data-image-name={img} className="img-responsive" onClick={this.changeBackground}/><span className="color-state-selected"><i className="fa fa-check"></i></span></p>
                          : <p key={index}><img src={"/assets/"+img} data-image-name={img} className="img-responsive" onClick={this.changeBackground}/></p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
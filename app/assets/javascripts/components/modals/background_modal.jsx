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
      var BackgroundImages = this.props.resumeStyle.available_background_images
      return (
        <div className="modal fade" id="backgroundModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Rearrange</h4>
              </div>
              <div className="modal-body">
                <div className="background-reorder-page">
                  <div className="bg-box">
                    {
                      BackgroundImages.map((img, index) => (
                        <img src={"/assets/"+img} key={index} data-image-name={img} className="img-responsive" onClick={this.changeBackground}/>
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
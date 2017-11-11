var ProfileImageModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },
    componentDidMount: function(){
      
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
    handleImageStyleChange: function(e){
      this.props.handleImageStyleChange(e);
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
                <div className="profile-image">
                  <img src={this.props.imgSrc} className={this.props.profileImageStyle}/>
                </div>
                <div className="profile-buttons-holder" data-header-id={this.props.headerId}>
                  <button className="btn btn-default" onClick={this.handleImageStyleChange} data-style="circle">Circle</button>
                  <button className="btn btn-default" onClick={this.handleImageStyleChange} data-style="rounded">Rounded</button>
                  <button className="btn btn-default" onClick={this.handleImageStyleChange} data-style="thumbnail">Thumbnail</button>
                  <button className="btn btn-primary" onClick={this.handleClick}>Upload Image</button>
                  <button className="btn btn-danger" onClick={this.handleDelete}>Delete Image</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      );
    }
});
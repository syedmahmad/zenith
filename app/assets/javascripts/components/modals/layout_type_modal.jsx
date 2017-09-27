var LayoutTypeModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    handleLayoutChange: function(e){
      this.props.handleLayoutChange(e);
    },

    render: function() {
      var currentLayout = this.props.currentLayout
      return (
        <div className="modal fade" id="layoutTypeModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Templates</h4>
              </div>
              <div className="modal-body">
                <div className="layout-type-modal">
                  <div className="template" data-layout-type="single" onClick={this.handleLayoutChange}>
                    <i className="fa fa-bars fa-3x"></i>
                    Single
                  </div>
                  <div className="template" data-layout-type="double" onClick={this.handleLayoutChange}>
                    <i className="fa fa-columns fa-3x"></i>
                    Double
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
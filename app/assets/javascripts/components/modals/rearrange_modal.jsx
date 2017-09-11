var RearrangeModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    render: function() {
        return (
          <div className="modal fade" id="rearrangeModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Rearrange</h4>
                </div>
                <div className="modal-body">
                </div>
              </div>
              
            </div>
          </div>
        );
    }
});
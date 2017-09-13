var AddSectionModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },
    handleAddSection: function(e){
      this.props.handleAddSection(e);
    },

    render: function() {
      var sections = <AddSections handleAddSection={this.handleAddSection} sections={this.props.sections}/>;
      return (
        <div className="modal fade" id="addSectionModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Add Section</h4>
              </div>
              <div className="modal-body">
                {sections}
              </div>
            </div>
            
          </div>
        </div>
      );
    }
});
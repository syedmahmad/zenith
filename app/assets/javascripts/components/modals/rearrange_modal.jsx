var RearrangeModal = React.createClass({
  getInitialState: function() {
    return { isModalOpen: true, sections: this.props.sections};
  },

  openModal: function() {
    this.setState({ isModalOpen: true });
  },

  closeModal: function() {
    this.setState({ isModalOpen: false });
  },
  handleRearrange: function(){
    this.props.handleRearrage();
    this.setState({sections: this.props.sections})
  },

  render: function() {
    pages = this.props.pages
    sectionData = this.props.sectionData
    var sections = <RearrangeSections layout_type={this.props.layout_type} pages={pages} sectionData={sectionData} handleRearrange={this.handleRearrange} sections={this.state.sections}/>;
    return (
      <div className="modal fade" id="rearrangeModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Rearrange</h4>
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
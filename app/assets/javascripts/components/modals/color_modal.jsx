var ColorModal = React.createClass({
    getInitialState: function() {
      return { isModalOpen: true };
    },

    openModal: function() {
      this.setState({ isModalOpen: true });
    },

    closeModal: function() {
      this.setState({ isModalOpen: false });
    },

    changeColor: function(e){
      this.props.handleColor(e);
    },

    render: function() {
      var colors = this.props.resumeStyle.available_colors
      return (
        <div className="modal fade" id="colorModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Rearrange</h4>
              </div>
              <div className="modal-body">
                <div className="color-reorder-page">
                  {
                    colors.map((color, index) => (
                      <p key={index} data-color-name={color} onClick={this.changeColor}>{color}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
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
      let userMessage;
          if (this.props.loggedIn) {
            userMessage = (
              <span>
                <h2>{ `Welcome Back ${ this.props.name }` }</h2>
                <p>You can visit settings to reset your password</p>
              </span>
            )
          } else {
            userMessage = (
              <h2>Hey man! Sign in to see this section</h2>
            )
          }



      var selected_color = this.props.resumeStyle.color
      var colors = this.props.resumeStyle.available_colors
      return (
        <div className="modal fade" id="colorModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Select Color Combination</h4>
              </div>
              <div className="modal-body">
                <div className="color-reorder-page">
                  {
                    colors.map((color, index) => (
                      selected_color === color
                        ? <p key={index} style={{background: color}} data-color-name={color} onClick={this.changeColor}><div className="color-state-selected"><i className="fa fa-check"></i></div></p>
                        : <p key={index} style={{background: color}} data-color-name={color} onClick={this.changeColor}></p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
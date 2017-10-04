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


      var primary_color = this.props.resumeStyle.primary_color
      var secondary_color = this.props.resumeStyle.secondary_color
      var available_secondary_colors = this.props.resumeStyle.available_secondary_colors
      var available_primary_colors = this.props.resumeStyle.available_primary_colors
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
                    available_primary_colors.map((pri_color, index) => (
                      available_secondary_colors.map((sec_color, index) => (
                        pri_color === primary_color && sec_color === secondary_color
                          ? <div className="color-holder" onClick={this.changeColor} data-pri-color-name={pri_color} data-sec-color-name={sec_color}>
                              <div className="outer-color" style={{background: pri_color}}>
                                <div className="inner-color" style={{background: sec_color}}>
                                  <div className="color-state-selected"><i className="fa fa-check"></i></div>
                                </div>
                              </div>
                            </div>
                          : <div className="color-holder" onClick={this.changeColor} data-pri-color-name={pri_color} data-sec-color-name={sec_color}>
                              <div className="outer-color" style={{background: pri_color}}>
                                <div className="inner-color" style={{background: sec_color}}>
                                </div>
                              </div>
                            </div>                    
                      ))
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
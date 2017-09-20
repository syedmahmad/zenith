var PassionItem = React.createClass({

  getInitialState: function(){
    var passion = this.props.passion;
    return {name: passion.name};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.passion.id}></i>
           </a>
        </div>
         <li className="section-item" data-passion-id={this.props.passion.id}>
            <div className="icon-holder pull-left">
               <i className="fa fa-bolt" aria-hidden="true"></i>
            </div>
            <h5>
               <div className="form-group">
                  <input
                    type="string"
                    name="name"
                    className="form-control"
                    placeholder="Your Passion"
                    value={this.state.name}
                    onChange={ this.handleChange }
                  />
               </div>
            </h5>
         </li>
      </div>
    )
  }
});
var TechnologyItem = React.createClass({

  getInitialState: function(){
    var technology = this.props.technology;
    return {name: technology.name, tec_names: technology.tec_names};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
         <li className="section-item" data-technology-id={this.props.technology.id}>
            <div id="edit_able" className="hide-section">  
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
               </a>
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.technology.id}></i>
               </a>
            </div>
            <h5>
               <div className="form-group">
                  <input
                    type="string"
                    name="name"
                    className="form-control"
                    placeholder="Group Title"
                    value={this.state.name}
                    onChange={ this.handleChange }
                  />
               </div>
            </h5>
            <h6>
               <div className="form-group">
                  <input
                    type="string"
                    name="tec_names"
                    className="form-control"
                    placeholder="Tech"
                    value={this.state.tec_names}
                    onChange={ this.handleChange }
                  />
               </div>
            </h6>
         </li>
      </div>
    )
  }
});
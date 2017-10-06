var OptionItem = React.createClass({

  componentDidMount: function(){
    $('.show_hide_section input').bootstrapToggle();
  },

  render: function() {
  	checked = this.props.model[this.props.item]
  	name = this.props.section+this.props.item+this.props.sectionId
    return (
    	<div className="box-holder-toggle" >
        <label>{this.props.item}</label>
        <span className="toggle-holder">
    		  <input type="checkbox" data-size="mini" data-toggle="toggle" name={name} data-item-name={this.props.item} className="option_item" onClick={this.props.handleShowHideChange} type="checkbox" checked={checked} data-toggle="toggle"/>
    	  </span>
      </div>
    	
    )
  }
});
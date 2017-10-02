var OptionItem = React.createClass({

  render: function() {
  	checked = this.props.model[this.props.item]
    return (
    	<div>
    		<input name={this.props.item} className="option_item" onClick={this.props.handleShowHideChange} type="checkbox" checked={checked} data-toggle="toggle"/>
    	</div>
    	
    )
  }
});
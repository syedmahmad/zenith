var OptionItem = React.createClass({

  render: function() {
  	checked = this.props.model[this.props.item]
  	name = this.props.section+this.props.item+this.props.sectionId
    return (
    	<div>
    		<input name={name} data-item-name={this.props.item} className="option_item" onClick={this.props.handleShowHideChange} type="checkbox"  data-toggle="toggle"/>
    	</div>
    	
    )
  }
});
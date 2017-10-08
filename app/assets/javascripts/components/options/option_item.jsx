var OptionItem = React.createClass({

  render: function() {
  	checked = this.props.model[this.props.item]
  	name = this.props.section+this.props.item+this.props.sectionId
    return (
    	<div className="box-holder-toggle">
        <label>{this.props.item}</label>
        <span className="toggle-holder">
          <label className="switch">
            <input type="checkbox" onChange={this.props.handleShowHideChange} data-size="mini" data-toggle="toggle" name={name} data-item-name={this.props.item} className="option_item" type="checkbox" checked={checked} data-toggle="toggle"/>
            <span className="slider round"></span>
          </label>
        </span>

      </div>
    	
    )
  }
});
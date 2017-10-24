var Outcomes = React.createClass({

  render: function() {
    outcome = this.props.outcome;

    return (
      <div className="media top-xty no-bottom">
        <div className="media-left media-left-xs">
          <i className="icon icon-dot-1 bullet-dot">
            
          </i>
        </div>
        <div className="media-body">
          <div className="editable-field-wrapper">
            <textarea className="editable-field editable-field-muted editable-field-sm" value={outcome} placeholder="What was an example of a successful outcome of this activity? (e.g. Made 30+ partnerships)" autocomplete="off" rows="1"/>
          </div>
        </div>
      </div>
    )
  }
});
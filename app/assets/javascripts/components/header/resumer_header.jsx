var ResumeHeader = React.createClass({
  render: function() {
    var header = this.props.header;
    return (
      <div className="col-md-12">
        <h2>{header.name}</h2>
        <p>{header.title}</p>
        <p>{header.email}</p>
        <p>{header.location}</p> 
      </div>
    )
  }
});
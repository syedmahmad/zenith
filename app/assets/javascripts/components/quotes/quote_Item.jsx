var QuoteItem = React.createClass({

  getInitialState: function(){
    var quote = this.props.quote;
    return {name: quote.name};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitquote: function(e){
    e.preventDefault();
    this.props.updateResume(
      {quote: {name: this.state.name}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitquote}>
          <div><input
            type="string"
            name="name"
            className="name"
            placeholder="Quote"
            value={this.state.name}
            onChange={ this.handleChange }
          /></div>
          
          <div className='row'>
            <div className='col-sm-4'>
              <input hidden type="submit" value="Save" className='btn btn-primary' />
            </div>
          </div>
        </form>
      </div>
    )
  }
});
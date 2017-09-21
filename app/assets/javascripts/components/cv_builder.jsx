var CvBuilder = React.createClass({
  getInitialState: function() {
    return {pages: 2, sectionData: [{name:"Certificates", page: 0}, {name:"Volunteers", page: 1}], layoutSections: ["Certificates", "Volunteers"], resume_ids: this.props.resume_ids, resume: this.props.resume};
  },
  removeArrayItem: function(arr, itemToRemove) {
    return arr.filter(item => item !== itemToRemove)
  },
  componentDidUpdate: function(prevProps, prevState){
    elem = $(".page").last()
    if(elem[0].scrollHeight > elem[0].offsetHeight){
      
    }
  },
  updateResume: function(formData){
    var _this = this;
    $.ajax({
      url: ("http://localhost:3000/resumes/"+_this.state.resume.id),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(projects) {
        // this.setState({projects: projects, showNewForm: false});
        // onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        // onError(response.responseJSON)
      }
    });
  },
  handleRearrage: function(){
    var arr = $('.rearrange-section-item').map(function() {
      return $(this).data('sectionName');
    }).get();

    this.setState({layoutSections: arr});
  },
  handleAddSection: function(e){
    var newSection = $(e.target).data("sectionName");
    this.state.layoutSections.push(newSection);
    this.setState({layoutSections: this.state.layoutSections});
  },
  handleRemoveSection: function(e){
    var removeSection = $(e.target).data("sectionName");
    var positionInSections = this.state.layoutSections.indexOf(removeSection);
    this.state.layoutSections.splice(positionInSections, 1);
    this.setState({layoutSections: this.state.layoutSections});
  },

  render: function() {
    var data = [];
    var data_1 = [];
    var selectedSections = [];
    var MyComponent = null;
    var state = this.state;
    var key = "";
    var header = this.state.resume["header"];
    var _this = this;

    // this.state.layoutSections.forEach(function(section) {
    //   section = section.substr(0,1).toUpperCase()+section.substr(1);
    //   MyComponent = window[section];
    //   key = section + "holder";
    //   data.push(<MyComponent handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume}/>);
    // });

    for(i=0;i<_this.state.pages;i++){
      data = [];
      selectedSections = [];
      $.grep(_this.state.sectionData, function(item){
        if(item.page == i){
          selectedSections.push(item.name);
        }
      });

      _this.state.layoutSections.forEach(function(section) {
        debugger;
        if($.inArray(section, selectedSections) > -1){
          section = section.substr(0,1).toUpperCase()+section.substr(1);
          MyComponent = window[section];
          key = section + "holder"+i;
          data.push(<MyComponent handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume}/>);
        }
      });
      key = "page-"+i;  
      data_1.push(<Page key={key} header={header} updateResume={_this.updateResume} page_data={data} />);
    };

    return (
      <div className="cv-builder-container">
        <div className="right_col" role="main">
          <div className="clearfix"></div>
          <div className="row">
            {data_1}  
          </div>
        </div>
        <RearrangeModal handleRearrage={this.handleRearrage} sections={this.state.layoutSections}/>
        <AddSectionModal handleAddSection={this.handleAddSection} sections={this.state.layoutSections}/>
      </div>
    )
  }
});
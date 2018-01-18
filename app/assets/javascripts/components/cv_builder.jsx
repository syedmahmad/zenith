var CvBuilder = React.createClass({
  getInitialState: function() {
    return {underline: this.props.resume.layout.underline, layout_type: this.props.resume.layout.layout_type, pages: this.props.resume.pages, sectionData: this.props.resume.layout.section_data, layoutSections: this.props.resume.layout.section_names, resume_ids: this.props.resume_ids, resume: this.props.resume, resumeStyle: this.props.resume.resume_style};
  },
  removeArrayItem: function(arr, itemToRemove) {
    return arr.filter(item => item !== itemToRemove)
  },
  componentDidUpdate: function(prevProps, prevState){
    this.removeEmptyPages();
    this.setupLayout();
    this.updateStyle();
    this.handleSubSectionRearrange();
    this.handleShowHideButtonStyle();
    this.removeEmptySections();

    resume = _this.state.resume;
    keys = Object.keys(resume);
    params = {};

    resume["layout"]["section_names"] = _this.state.layoutSections;
    resume["layout"]["section_data"] = _this.state.sectionData;
    resume["pages"] = _this.state.pages;

    $.each(keys, function(index, key){
      if(key == "id" || key == "pages"){
        params[key] = resume[key];
      }else{
        if(key == "education"){
          params["educations_attributes"] = resume[key];
        }else{
          params[key+"_attributes"] = resume[key];
        }
      }
    });

    this.updateResume({resume: params});
    this.setupRearrangeModal();
  },
  componentDidMount: function(){
    var _this = this;
    _this.updateStyle();

    $.each($("textarea"), function(index, el){
      $(el).height(el.scrollHeight+"px");
    });

    $("textarea").on("keydown", function(e){
      e.target.style.height = "1px";
      e.target.style.height = (e.target.scrollHeight)+"px";
    });

    $(document).on("click", function(e){
      if(!$(e.target).data("calenderTarget") && !$(e.target).parents().hasClass("calendar-holder") && !$(e.target).parents().hasClass("ui-datepicker-header")){
        $(".calendar-holder").hide();
      }
      if(!$(e.target).parents().hasClass("icon-holder")){
        $(".acheivement-icon-holder,.award-icon-holder,.strength-icon-holder,.passion-icon-holder").hide();
      }
    });
    this.handleSubSectionRearrange();
    this.handleShowHideButtonStyle();
    this.setupRearrangeModal();
  },
  setupRearrangeModal: function(){
    if(this.state.pages > 3){
      $("#rearrangeModal .modal-dialog").css({width: this.state.pages * 200});
    }
  },
  handleSubSectionRearrange: function(){
    var _this = this;
    $(document).find(".section-items-list ul").sortable({
      handle: ".sub-section-rearrange",
      stop: function  (e, ui) {
        data = [];
        sectionName = $(e.target.closest(".section-items")).data("sectionName").toLowerCase()
        itemsList = $(e.target).find(".section-item")
        itemsList.each(function(i, item){
          data.push({"id": $(item).data("sectionId"), "item_index": i})
        });
        _this.handleSubItemRearrange(sectionName, data);
      }
    });
  },
  handleShowHideButtonStyle: function(){
    $.each($(".show_hide_section"), function(index, el){
      height = $(el).height();
      height = height + 75;
      $(el).css("top", "-"+height+"px")
    });
  },
  handleSubItemRearrange: function(section, data){
    if(section == "education"){
      section = "educations";
    }
    params = {resume: {[section+"_attributes"]: data}}
    this.updateResume(params)
  },
  updateStyle: function(){
    var _this = this;
    //check border_bottom
    if (!this.state.underline) {
      $(".cv-builder .heading-area").each(function(e,val){ 
        $(val).addClass("remove-border");
      });
    } else {
      $(".cv-builder .heading-area").each(function(e,val){ 
        $(val).removeClass("remove-border");
      });
    }

    //update slider color...
    $(".input-range").css("background-color", _this.state.resumeStyle.secondary_color);

    // apply primary color
    $(".cv-builder :input:not(.secondary-color)").each(function(e,val){
      var aa = _this.state.resumeStyle.primary_color;
      if (aa.charAt(0) == "#") {
        aa = aa.replace("#","color-");
      }
      //only apply color for form control...
      if ($(val).hasClass("form-control")){
        $(val).removeClass("color").css('color', _this.state.resumeStyle.primary_color);
        // remove all classes with prefix....
        $.each(val.classList,function(index, value) {
          if(value && value.indexOf("color-")==0) {
              $(val).removeClass(value);
          }
        });
        $(val).addClass(aa);
      }
    });
    $(".cv-builder .secondary-color").each(function(e,val){
      var aa = _this.state.resumeStyle.secondary_color;
      if (aa.charAt(0) == "#") {
        aa = aa.replace("#","color-");
      }

      $(val).removeClass("color").css('color', _this.state.resumeStyle.secondary_color);
      // remove all classes with prefix....
      $.each(val.classList,function(index, value) {
        if(value && value.indexOf("color-")==0) {
            $(val).removeClass(value);
        }
      });
      $(val).addClass(aa);
    });

    // apply primary_font.. Here no need font-size
    $(".cv-builder .primary_font").each(function(e,val){ 
      $(val).css('font-family', "'"+_this.state.resumeStyle.primary_font+"'");
    });

    // apply primary_font
    $(".cv-builder :input:not(.primary_font)").each(function(e,val){ 
      if ($(val).hasClass("sub-header")) {
        $(val).css({'font-family': _this.state.resumeStyle.secondary_font,
          'font-size': parseInt(_this.state.resumeStyle.font_size) + 2 + "px"})
      } else if ($(val).hasClass("sub-color-area")) {
        $(val).css({'font-family': _this.state.resumeStyle.secondary_font,
          'font-size': parseInt(_this.state.resumeStyle.font_size) + 1 + "px"})
      } else {
        $(val).css({'font-family': _this.state.resumeStyle.secondary_font,
          'font-size': _this.state.resumeStyle.font_size})
      }
    });
  },
  setupLayout: function(){
    var elements = null;
    elements = $(".page")
    _this = this;
    var sectionData1 = [];
    var resume = _this.state.resume;
    var sectionData = _this.state.sectionData;
    var updateResumeFlag = false;

    $.each(elements, function( index, elem ) {
      while(elem.scrollHeight > elem.offsetHeight){
        updateResumeFlag = true;
        var lastElmObj = $(elem).find(".section-items").last();
        var lastElm = $(lastElmObj).data("sectionName");
        var subSectionId = 0;
        var elmCol = 0;
        
        if(_this.state.layout_type == "double"){
          leftCol = $(elem).find(".resume-col-left");
          rightCol = $(elem).find(".resume-col-right");

          if(leftCol.height() > rightCol.height()){
            lastElmObj = $(leftCol).find(".section-items").last();
            lastElm = $(leftCol).find(".section-items").last().data("sectionName");
          }else{
            lastElmObj = $(rightCol).find(".section-items").last();
            elmCol = 1;
            lastElm = $(rightCol).find(".section-items").last().data("sectionName");
          }
        }

        if(lastElm.toLowerCase() == "summary" || $(lastElmObj).find(".section-item .show_hide_section").length == 1){
          subSectionId = $(lastElmObj).find(".section-item .show_hide_section").closest(".section-item").data("sectionId");
          if(lastElm.toLowerCase() == "summary" || subSectionId){
            $(lastElmObj).html("");
            sectionData = $.grep(_this.state.sectionData, function (a) {
                            if (a.name == lastElm) {
                                a.page = index + 1;
                            }
                            return  a;
                        });
            if(lastElm.toLowerCase() == "summary"){
              $(lastElmObj).removeClass("section-items");
            }
          }else{
            _this.setState({resume: resume, pages: _this.calculatePages(), sectionData: sectionData});
            return false;
          }


        }else{
          subSectionId = $(lastElmObj).find(".section-item .show_hide_section").last().closest(".section-item").data("sectionId");
          if(subSectionId){
            $(lastElmObj).find(".section-item .show_hide_section").last().closest(".section-item").html("");
            sectionData.push({name: lastElm, page: index + 1, column: elmCol});
          }else{
            _this.setState({resume: resume, pages: _this.calculatePages(), sectionData: sectionData});
            return false;
          }
        }
        
        var itemsObj = null;

        itemsObj = $.grep(resume[lastElm.toLowerCase()], function (item) {
          if(item.id == subSectionId){
            item.page = index + 1;
          }
          return item;
        });

        if(lastElm.toLowerCase() == "education"){
          lastElm = "educations";
        }

        resume[lastElm.toLowerCase()] = itemsObj;
        resume["layout"]["section_data"] = sectionData;
        resume["layout"]["section_names"] = resume.layoutSections;
      }
      if(updateResumeFlag){
        _this.setState({resume: resume, pages: _this.calculatePages(), sectionData: sectionData});
      }
    });
  },
  
  calculatePages: function(){
    var pages = 0;
    this.state.sectionData.forEach(function(item){
      if(parseInt(item.page) > pages){
        pages = parseInt(item.page);
      }
    })
    return pages + 1;
  },

  removeEmptyPages: function(){
    var _this = this;
    var pages = 0;
    var sectionData1 = _this.state.sectionData;
    var resume = _this.state.resume;
    var page = 0;
    var itemsObj = null;
    $.each($(".page"), function( index, elem ) {
      if($(elem).find(".section-items").length == 0 && $(elem).find(".personal-info").length == 0){
        if((index + 1) < $(".page").length){
          sectionData1 = [];
          $.grep(sectionData, function (a) {
            page = parseInt(a.page)
            if(page > index) {
              a.page = page - 1;
              itemsObj = null;
              section = a.name.toLowerCase();
              
              itemsObj = $.grep(resume[section], function (item) {
                itemPage = parseInt(item.page);
                if(itemPage == page){
                  item.page = a.page;
                }
                return item;
              });
              resume[section] = itemsObj;
            }
            sectionData1.push(a)
          });
        }

        pages = _this.calculatePages();
        _this.setState({resume: resume, sectionData: sectionData1, pages: pages});
      }
    });
  },

  removeEmptySections: function () {
    //comment
    var sections = $(".page .section-items");
    $.each(sections, function( index, el ) {
      if($(el).find("li.section-item").length == 0 && $(el).closest(".section-items").data("sectionName").toLowerCase() != "summary"){
        _this.handleRemoveSection(null, el);
      }
    });
  },
  updateResume: function(formData){
    var _this = this;
    $.ajax({
      url: (this.props.host+"resumes/"+_this.state.resume.id),
      dataType: 'json',
      type: 'PATCH',
      contentType: 'multipart/form-data',
      data: formData,
      success: function(data) {
        // onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        // onError(response.responseJSON)
      }
    });
  },
  updateResumeState: function(section, attribute, value, id){
    itemsObj = null;
    resume = this.state.resume;
    itemsObj = $.grep(resume[section], function (item) {
      if(item.id == parseInt(id)){
        item[attribute] = value;
      }
      return item;
    });
    resume[section] = itemsObj;
    this.setState({resume: resume});
  },
  createSubSection: function(formData,sectionName){
    var _this = this;
    var resume = _this.state.resume;
    subSectionPage = $(".section-items [data-section-name="+sectionName+"]").last().closest(".page-holder").data("pageIndex");
    formData["page"] = parseInt(subSectionPage) - 1;
    $.ajax({
      url: (_this.props.host+"resumes/"+_this.props.resume.id+"/create_sub_record"),
      dataType: 'json',
      type: 'POST',
      contentType: 'multipart/form-data',
      data: formData,
      success: function(item) {
        resume[sectionName].unshift(item);
        _this.setState({resume: resume});
      }.bind(this),
      error: function(response, status, err) {
      }
    });
  },
  removeSubSection: function(formData,sectionName){
    var _this = this;
    resume = _this.state.resume;
    $.ajax({
      url: (this.props.host+"resumes/"+_this.state.resume.id+"/delete_sub_record"),
      type: 'DELETE',
      contentType: 'multipart/form-data',
      data: formData,
      success: function(item) {
        var position = _this.state.resume[sectionName].findIndex(i => i.id === item.id);
        resume[sectionName].splice(position, 1);
        _this.setState({resume: resume});
      }.bind(this),
      error: function(response, status, err) {
      }
    });
  },
  setupSections: function(sectionItems, rearrange=false, itemName="", itemIndex=0){
    var _this = this;
    var sectionData = _this.state.sectionData;
    var sectionData1 = [];
    var sectionDataArr = [];
    var resume = _this.state.resume;
    var params = {};
    var section_names;
    var sectionNameArr = [];
    var rightClass = ".resume-col-right";
    var leftClass = ".resume-col-left";

    if(rearrange){
      rightClass = ".rearrange-resume-col-right";
      leftClass = ".rearrange-resume-col-left";
    }
    section_names = sectionItems.map(function(index, elem) {
      if(!sectionNameArr.includes($(elem).data('sectionName'))){
        var pageIndex = 0;
        if(rearrange){
          pageIndex = $(elem).closest(".reorder-page").data('page');
        }else{
          pageIndex = parseInt($(elem).closest(".page").data('pageIndex')) - 1;
        }

        if(index != itemIndex && itemName == $(elem).data('sectionName')){
        }else{
          sectionNameArr.push($(elem).data('sectionName'));
          var itemsObj = null;
          if($(elem).data('sectionName').toLowerCase() != "resumeheader"){
            itemsObj = $.grep(resume[$(elem).data('sectionName').toLowerCase()], function (item) {
              item.page = pageIndex;
              
              if($(elem).parents(rightClass).length > 0){
                item.column = 1
              }else if($(elem).parents(leftClass).length > 0){
                item.column = 0
              }
              return item;
            });

            resume[$(elem).data('sectionName').toLowerCase()] = itemsObj;
          }

          $.grep(sectionData, function (a) {
            if(!sectionDataArr.includes(a.name)) {
              if(itemIndex != index && itemName == a.name){
              }else{
                if (a.name == $(elem).data('sectionName')) {
                    a.page = pageIndex;
                    if($(elem).parents(rightClass).length > 0){
                      a.column = 1
                    }else if($(elem).parents(leftClass).length > 0){
                      a.column = 0
                    }
                }
                sectionDataArr.push(a.name);
                sectionData1.push(a);
              }
            }
          });
          return $(elem).data('sectionName');
        }
      }
    }).get();

    if(sectionData1 != _this.state.sectionData){
      if(rearrange){
        if(_this.state.layout_type == "single"){
          $(".rearrange-section-modal").sortable("cancel");
          $(".rearrange-section-modal").sortable("destroy");
        }else if(_this.state.layout_type == "double"){
          $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable("cancel");
          $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable("destroy");
        }
      }
      
      var pages = resume.pages;
      $.each($(".reorder-page"), function( index, elem ) {
        if($(elem).find(".rearrange-section-item").length == 0 && $(elem).find(".rearrange-header").length == 0){
          pages = _this.state.pages - 1;
        }
      });

      _this.setState({resume: resume, pages: pages, layoutSections: section_names, sectionData: sectionData1});
    }

  },

  handleRearrage: function(prevUiItem){
    var _this = this;
    if(prevUiItem.data("sectionName") != prevUiItem.prev(".rearrange-section-item").data("sectionName")){
      sectionItems = $('.rearrange-section-item')
      itemIndex = sectionItems.index(prevUiItem)
      itemName = $(prevUiItem).data("sectionName")
      _this.setupSections(sectionItems, true, itemName, itemIndex);
    }else{
      var newState = _this.state;
      if(_this.state.layout_type == "single"){
          $(".rearrange-section-modal").sortable("cancel");
          $(".rearrange-section-modal").sortable("destroy");
        }else if(_this.state.layout_type == "double"){
          $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable("cancel");
          $(".rearrange-resume-col-left, .rearrange-resume-col-right").sortable("destroy");
        }
      _this.setState(newState)
    }
  },
  handleAddSection: function(e){
    var newSection = $(e.target).data("sectionName");
    var resume = this.state.resume;
    sections = this.state.layoutSections
    sectionData = this.state.sectionData
    sections.push(newSection);

    var itemsObj = null;
    var params = {};
    var sectionPage = parseInt($(".page").last().data("pageIndex")) - 1;
    itemsObj = $.grep(resume[newSection.toLowerCase()], function (item) {
      item.page = sectionPage;
      item.column = 0;
      return item;
    });
    params[newSection.toLowerCase()+"_attributes"] = itemsObj;
    resume[newSection.toLowerCase()] = itemsObj;

    sectionData.push({name: newSection, page: sectionPage, column: 0});
    if (this.props.current_user) {
      params["layout_attributes"] = {};
      params["layout_attributes"]["id"] = resume.layout.id;
      params["layout_attributes"]["section_names"] = sections;
      params["layout_attributes"]["section_data"] = sectionData;
      this.updateResume({resume: params});
    }

    this.setState({resume: resume, layoutSections: sections, sectionData: sectionData});
  },
  handleBackground: function(e) {
    var img = $(e.target).data("imageName");
    params = {id: this.props.resume.resume_style.id, "background_img": img};
    this.updateResume({resume: {resume_style_attributes: params}});

    this.state.resumeStyle.background_img = img;
    this.setState({resumeStyle: this.state.resumeStyle}); 
  },
  handleFont: function(e) {
    var f_name = $(e.target).data("name");
    var font = $(e.target).data("fontName");
    params = {id: this.props.resume.resume_style.id};
    params[f_name] = font;
    this.updateResume({resume: {resume_style_attributes: params}});

    this.state.resumeStyle[f_name] = font;
    this.setState({resumeStyle: this.state.resumeStyle});
  },
  handleColor: function(e) {
    var pri_color = $(e.target.closest(".color-holder")).data("priColorName");
    var sec_color = $(e.target.closest(".color-holder")).data("secColorName");

    params = {id: this.props.resume.resume_style.id, "primary_color": pri_color, "secondary_color": sec_color};
    this.updateResume({resume: {resume_style_attributes: params}});

    this.state.resumeStyle.primary_color = pri_color;
    this.state.resumeStyle.secondary_color = sec_color;
    this.setState({resumeStyle: this.state.resumeStyle});
  },
  handleRemoveSection: function(e, el=null){
    var _this = this;
    var removeSection = null;
    var pageIndex = -1;
    if(e){
      pageIndex = parseInt($(e.target).closest(".page").data("pageIndex")) - 1;
      removeSection = $(e.target).data("sectionName");
    }else{
      pageIndex = parseInt($(el).closest(".page").data("pageIndex")) - 1;
      removeSection = $(el).closest(".section-items").data("sectionName");
    }

    var positionInSections = _this.state.layoutSections.indexOf(removeSection);
    var positionInSectionData = null;
    _this.state.sectionData.forEach(function(item, index) {
      if(item.name == removeSection){
        if(pageIndex >= 0){
          if(item.page == pageIndex){
            _this.state.sectionData.splice(index, 1);
          }
        }else{
          _this.state.sectionData.splice(index, 1);
          _this.state.layoutSections.splice(positionInSections, 1);
        }
        return;
      }      
    });

    if (_this.props.current_user) {
      if(pageIndex < 0){
        params = {id: _this.props.resume.layout.id, "section_names": _this.state.layoutSections, "section_data": _this.state.sectionData};
      }else{
        params = {id: _this.props.resume.layout.id, "section_data": _this.state.sectionData};
      }
      _this.updateResume({resume: {layout_attributes: params}});
    }
    _this.setState({layoutSections: _this.state.layoutSections, sectionData: _this.state.sectionData});
  },
  handleLayoutChange: function(e){
    var resume = this.state.resume;
    selectedLayout = $(e.currentTarget).data("layoutType")
    if(selectedLayout != this.state.layout_type){
      resume["layout"]["layout_type"] = selectedLayout;
      this.setState({resume: resume, layout_type: selectedLayout});
    }
  },
  handleUnderlineChange: function(e){
    params = {id: this.props.resume.layout.id, "underline": $(e.target).prop("checked")};
    this.updateResume({resume: {layout_attributes: params}});
    this.setState({underline: $(e.target).prop("checked")});
  },

  removeChild: function(){
  },

  handleShowHideChange: function(e){
    section = $(e.target).closest(".show_hide_section").data("sectionName")
    field = $(e.target).data("itemName")
    value = $(e.target).prop("checked")
    itemId = $(e.target).closest(".show_hide_section").data("sectionId")

    params = {resume: {[section+"_attributes"]: {[field]: value, id: itemId}}}
    this.updateResume(params)
    newState = this.state
    if(section == "header"){
      newState.resume[section][field] = value
    }else{
      newState.resume[section].forEach(function(item, index) {
        if(item.id == parseInt(itemId)){
          newState.resume[section][index][field] = value
        }      
      });
    }
    this.setState(newState)
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
    data_right = []
    data_left = []
    for(i=0;i<_this.state.pages;i++){
      data = [];
      data_right = [];
      data_left = [];
      selectedSections = [];
      $.grep(_this.state.sectionData, function(item){
        if(item.page == i){
          selectedSections.push(item.name);
          if(item.column == 1){
            data_right.push(item.name);
          }else{
            data_left.push(item.name);
          }
        }
      });
      if(_this.state.layout_type == "double"){
        key = "double-page"+i;
        data.push(<Double page={i} updateStyle={_this.updateStyle} setupLayout={_this.setupLayout} handleShowHideChange={_this.handleShowHideChange} data_right={data_right} data_left={data_left} layoutSections={_this.state.layoutSections} selectedSections={selectedSections} handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume} updateResumeState={_this.updateResumeState} createSubSection={_this.createSubSection}  removeSubSection={_this.removeSubSection}/>);
      }else{
        _this.state.layoutSections.forEach(function(section) {
          if($.inArray(section, selectedSections) > -1){
            section = section.substr(0,1).toUpperCase()+section.substr(1);
            MyComponent = window[section];
            key = section + "holder"+i;
            data.push(<MyComponent page={i} updateStyle={_this.updateStyle} setupLayout={_this.setupLayout} handleShowHideChange={_this.handleShowHideChange} handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume} updateResumeState={_this.updateResumeState} createSubSection={_this.createSubSection}  removeSubSection={_this.removeSubSection}/>);
          }
        });
      }

      key = "page-"+i;  
      data_1.push(<Page handleShowHideChange={_this.handleShowHideChange} key={key} page_index={i+1} header={header} updateResume={_this.updateResume} updateResumeState={_this.updateResumeState} resume={state.resume} page_data={data} createSubSection={_this.createSubSection} removeSubSection={_this.removeSubSection} resumeStyle={_this.state.resume.resume_style}/>);
    };
    return (
      <div className="cv-builder-container">
        <div className="right_col" role="main">
          <div className="clearfix"></div>
          <div className="row build-cv">
            {data_1}  
          </div>
        </div>
        <RearrangeModal layout_type={this.state.layout_type} pages={this.state.pages} sectionData={this.state.sectionData} handleRearrage={this.handleRearrage} sections={this.state.layoutSections}/>
        <AddSectionModal handleAddSection={this.handleAddSection} sections={this.state.layoutSections}/>
        <BackgroundModal handleBackground={this.handleBackground} resumeStyle={this.state.resumeStyle}/>
        <FontModal handleFont={this.handleFont} resumeStyle={this.state.resumeStyle}/>
        <ColorModal handleColor={this.handleColor} resumeStyle={this.state.resumeStyle}/>
        <LayoutTypeModal handleLayoutChange={this.handleLayoutChange} handleUnderlineChange={this.handleUnderlineChange} currentLayout={this.state.layout_type} underline={this.state.underline}/>
      </div>
    )
  }
});

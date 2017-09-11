var SideBar = React.createClass({
  render: function() {
    return (
      <div className="main_container">
        <div className="side_bar_holder">
          <div className="col-md-3 left_col">
            <div className="left_col scroll-view">
              <div className="navbar nav_title">
                <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Zenith CV</span></a>
              </div>
              <div className="clearfix"></div>

              <div className="profile">
                <div className="profile_pic">
                  <img src="/images/img.jpg" className="img-circle profile_img"></img>
                </div>
                <div className="profile_info">
                  <span>Welcome,</span>
                  <h2>John Doe</h2>
                </div>
              </div>

              <br />

              <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">

                <div className="menu_section">
                  <h3>General</h3>
                  <ul className="nav side-menu">
                    <li data-toggle="modal" data-target="#rearrangeModal"> <a><i className="fa fa-home"></i> Rearrange <span className="fa fa-chevron-down"></span></a>
                    </li>
                    <li data-toggle="modal" data-target="#addSectionModal"><a><i className="fa fa-edit"></i> Add Section <span className="fa fa-chevron-down"></span></a>
                    </li>
                    <li><a><i className="fa fa-desktop"></i> UI Elements <span className="fa fa-chevron-down"></span></a>
                    </li>
                  </ul>
                </div>

              </div>

              <div className="sidebar-footer hidden-small">
                <a data-toggle="tooltip" data-placement="top" title="Settings">
                  <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                  <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Lock">
                  <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Logout">
                  <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});